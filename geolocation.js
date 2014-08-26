var clientName;
var socket = io.connect("http://127.0.0.1:3000");

function init(){
  setNameEvent(setLocationButtonEvent);
  specCheck();
  closeWindowEvent();
}

function closeWindowEvent(){
  //화면을 닫을 때 나오는 팝업창에서 그대로 머물기를 누를 경우 서버와 통신하지 않도록 하기
  window.addEventListener('beforeunload', function(e){
    console.log(e);
    e.preventDefault();
    (e || window.event).returnValue = clientName + "connection close";
    if(clientName!="")
      socket.emit('close user', { "clientName" : clientName});
  });
}

function setNameEvent(callback){
  var section = document.getElementsByTagName("section")[0];
  section.addEventListener('touchend', function(e){
    var button = document.getElementsByClassName("nameBtn")[0];
    if(e.target === button){
      console.log("name button event");
      var nameField = document.getElementsByTagName("input")[0];
      if(nameField.value === ""){
        alert("이름을 입력하세요");
      } else {
        clientName = nameField.value;
        button.innerHTML = "위치 찾기";
        button.classList.add("locBtn");
        button.classList.remove("nameBtn");
        nameField.parentNode.innerHTML = clientName + " 님의 위치는 다음과 같습니다.";
        callback();
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }
  });
}

function specCheck(){
  if (!navigator.geolocation) {
    alert("geolocation 을 사용할 수 없습니다.");
  } else {

  }
}

function setLocationButtonEvent(){
    var button = document.getElementsByClassName("locBtn")[0];
    var section = document.getElementsByTagName("section")[0];
    section.addEventListener('touchend', function(e){
      if(e.target === button){  
        console.log("location button event");
        navigator.geolocation.getCurrentPosition(success, error);
      }
    });
}

document.addEventListener('DOMContentLoaded', function(){
  init();  
});

function error() {
  console.log("사용자의 위치를 찾을 수 없습니다.")
};

function success(position){
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;
  // DOM에 추가하기
  var ul = document.getElementsByTagName("ul")[0]
  var positionInfo = "<li>위도 : " +  latitude + "</li><li>경도 : " + longitude + "</li>";
  ul.innerHTML = positionInfo;
  sendData(position.coords);
}

function sendData(coords){
  // debugger;
  var data = {
    "latitude" : coords.latitude,
    "longitude" : coords.longitude,
    "clientName" : clientName
  }
  socket.emit('update user', data);
}




var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var totalData = new Object();

http.listen(3000, function(){
  totalData['lastId'] = 0;
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('update user', function(data){
    io.emit('sync data', updateData(data));
  });

  socket.on('map opened', function(){
    io.emit('initial data', allData());
  });

  socket.on('close user', function(data){
    removeData(data);
    //io.emit('remove data', data);
  });
});

function removeData(data){
  var name = data.clientName;
  if(totalData.hasOwnProperty(name)){
    data.did = totalData[name].did;
    delete totalData[name];
    io.emit('remove data', data);
  }
}

function updateData(data){
  var name = data.clientName;
  if(!totalData.hasOwnProperty(name)){
    totalData.lastId++;
    totalData[name] = {
      "clientName" : data.clientName,
      "latitude" : data.latitude,
      "longitude" : data.longitude,
      "did" : totalData.lastId
    };
    data.did = totalData.lastId;
  } else {
    totalData[name].latitude = data.latitude;
    totalData[name].longitude = data.longitude;
    data.did = totalData[name].did;
  }
  return data;
}

function allData(){
  var dataList = [];
  for (key in totalData){
    if(key != "size" && key != "lastId")
      dataList.push(totalData[key]);
  }
  return dataList;
}

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/admin', function(req, res){
  res.sendfile('admin.html');
});

app.get('/map', function(req, res){
  res.sendfile('map.html');
});

// index.html 에서 script 파일 404 문제 해결하기
app.get('/geolocation.js', function(req, res){
  res.sendfile('geolocation.js');
});
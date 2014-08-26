var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg + "ㅁㅁ");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/admin', function(req, res){
  res.sendfile('admin.html');
});


app.get('/map', function(req, res){
  res.sendfile('map.html');
});

var express = require('express');
require('dotenv').config();
var socket = require('socket.io');
var ejsLayouts = require('express-ejs-layouts');
var port = process.env.PORT || 2000;
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});





var server = app.listen(port, function() {
  console.log('Running on Port: ' + port);
});

var io = socket(server);

io.sockets.on("connection", function(socket){
  console.log(socket.id);

  socket.on('send-chat', function(data) {
    console.log(`User ${socket.id} sent chat: ${data}`);
    io.emit('rec-chat', socket.id + ': ' + data);
  });

  socket.on('mouse', function(data) {
    socket.broadcast.emit('mouse', data);
  })

  socket.on('disconnect', function(){
    console.log('Client: ' + socket.id + 'disconnected.')
  })
});

console.log('working!!!')
var socket = io.connect('http://localhost:3000');

$(document).ready(function() {
  $('#user').text(`Connected as: ${socket.id}`)
  $('#sub').click(function(e) {
    e.preventDefault();
    console.log('button clicked')
    socket.emit('send-chat', $('#m').val());
  });

  socket.on('rec-chat', function(msg) {
    $('#msg').append($('<li>').text(msg));
  });

  socket.on('mouse', function(data) {
    fill('red');
    noStroke();
    ellipse(data.x, data.y, 15, 15);
  });
});

function setup() {
  var can = createCanvas(700, 400);
  background(0);
  can.parent('draw-area');
};

function mouseDragged() {
  fill('limegreen');
  noStroke();
  ellipse(mouseX, mouseY, 15, 15);
  sendMouse(mouseX, mouseY);
};

function sendMouse(xpos, ypos) {
  var data = {
    x: xpos,
    y: ypos
  };
  socket.emit('mouse', data);
};

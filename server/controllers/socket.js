var line_history = [];

module.exports = function(socket) {
  // for (var i in line_history) {
  //    socket.emit('draw_line', { line: line_history[i] } );
  // }

  socket.on('chatMessage', function(from, msg){
    socket.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    socket.emit('notifyUser', user);
   });


  socket.on('draw_line', function (data) {
     // add received line to history
     line_history.push(data.line);
     // send line to all clients
     socket.emit('draw_line', { line: data.line });
  });
}

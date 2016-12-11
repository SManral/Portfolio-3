module.exports = function(socket) {
  socket.emit('init', {
    name: 'test'
  });
}

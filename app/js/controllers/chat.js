angular.module('myApp')
.controller('Chat', ['$scope','$http','$state', function($scope, $http, $state){
var socket = io();

function submitfunction(){
	
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}
 
function notifyTyping() { 
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
$('#messages').empty();
socket.on('chatMessage', function(from, newMsg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>:<strong> ' + newMsg.content + ' </strong><br/><span>'+newMsg.created+'</span>'+ '</li>');
});
 
socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});
 
$(document).ready(function(){
  $scope.user = JSON.parse(localStorage.getItem("User-Data"));
  var name = $scope.user.username;
  $('#user').val(name);

  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
});
 
}]);

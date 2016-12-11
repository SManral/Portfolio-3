var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var server   = require('http').Server(app);
var io  = require('socket.io')(server);
var path = require('path');

var authenticationController = require('./server/controllers/authentication_controller');

//database name portfolio3db
mongoose.connect('mongodb://localhost:27017/portfolio3db');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));



//route for the index file
app.get('/', function(req, res){
	//send the index.html in the specified directory
	res.sendFile(__dirname + '/index.html');
})

//Register events on socket connection

io.on('connection', function(socket){ 
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
   });
 });

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
})

//route for authentication for users
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);


server.listen('3000', function(){
	console.log('Server working');
})


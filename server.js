var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var socket = require('./server/controllers/socket.js');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var authenticationController = require('./server/controllers/authentication_controller');

//database name portfolio3db
mongoose.connect('mongodb://localhost:27017/portfolio3db');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

//Authentication for users
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);


app.get('/', function(req, res){
	res.sendFile(__dirname + '\\index.html');
})
// app.listen('3000', function(){
// 	console.log('Server working');
// })

//require('./server/controllers/blackboard_controller');

// io.on('connection', function(socket){
// 	console.log('A user is connected');
//
// 	socket.emit('init', {
// 		name: 'TEST'
// 	});
//
// 	// socket.on('add_user', function(user){
// 	// 	io.emit('response', {
// 	// 		test:'test',
// 	// 		user: user
// 	// 	})
// 	// });
//
// 	socket.on('disconnect', function(){
// 		console.log('user disconnected');
// 	});
// });

io.sockets.on('connection', socket);

server.listen('3000', function(){
	console.log('Server working');
});

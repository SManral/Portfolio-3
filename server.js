var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authenticationController = require('./server/controllers/authentication_controller');

mongoose.connect('mongodb://localhost:27017/portfolio3db');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

//Authentication for users
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);


app.get('/', function(req, res){
	res.sendfile('index.html');
})
app.listen('3000', function(){
	console.log('Server working');
})
var mongoose = require('mongoose');
var User = require('../datasets/users');

module.exports.signup = function(req, res){
	req.body.username = req.body.username.toLowerCase();
	req.body.password = req.body.password.toLowerCase();
	User.find({
		'$or': [{username: req.body.username}, {password: req.body.password}]
	}, function(err, result){
		console.log(result);
		if(result.length === 0) {
			var user = new User(req.body);
			user.save();
			var userData = {
				username : req.body.username,
				email: req.body.email,
				_id: user._id,
				firstname: req.body.firstName
			}
			console.log(userData);
			res.json({res: 'success', data: userData});
		}
		else {
			res.json({res: 'error', error: err});
		}
	})
}
//server side authentication for user login, if username and password match exists in
//the database then user logs in successfull else gets an error message.
module.exports.login = function(req, res){
	req.body.username = req.body.username.toLowerCase();
	req.body.password = req.body.password.toLowerCase();
	User.find({
		'$and': [{username:req.body.username},{password:req.body.password}]
	}, function(err, success){
		if(success && success.length == 1){
			var user = success[0];
			var userData = {
				username: user.username,
				firstname: user.firstname,
				_id: user._id,
				lastname: user.lastname
			}
			console.log(userData);
			res.json({res: "success", data: userData});
		}
		else {
			res.json({res: 'error', data:'Login or password are wrong'});
		}
	})
}

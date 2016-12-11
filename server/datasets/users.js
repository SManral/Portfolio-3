//schema for storing users details upon creating a new acoount
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	username: {
    type: String,
    index: {
    	unique: true
    },
    required: true
  },
	email: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName : String,
	phone : String,
	password : String
})
module.exports = mongoose.model('User', UserSchema);

//schema for chat
var mongoose = require('mongoose');
var ChatSchema = new mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});
module.exports = mongoose.model('Chat', ChatSchema);


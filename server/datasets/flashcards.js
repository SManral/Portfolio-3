//schema for chat
var mongoose = require('mongoose');
var FlashCardSchema = new mongoose.Schema({
  front: String,
  back: String,
});
module.exports = mongoose.model('FlashCards', FlashCardSchema);


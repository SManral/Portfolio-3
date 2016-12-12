var mongoose = require('mongoose');
var Card = require('../datasets/flashcards');
module.exports.insert = function(req, res){
	console.log(req.body);
	var card = new Card(req.body);
	card.save(function(err) {
		if(err)
			throw err;
		else {
			var cardData = {
				front : req.body.front,
				back: req.body.back,
				_id: card._id
			}
			console.log(cardData);
			res.json({res: 'success', data: cardData});
		}
	})
}

module.exports.get = function(req, res){
	Card.find({})
        .exec(function(err, result){
          if(err)
            throw err;
          else {
				console.log(result);
				res.json({res: 'success', data: result});
            }
        });
}
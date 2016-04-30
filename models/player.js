var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

 //A model of player      
var playerSchema = new Schema({
	name: {type: String},
	score: {type: Number}
});

module.exports = mongoose.model('Player',playerSchema);
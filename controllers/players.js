var mongoose = require('mongoose');  
var Player  = mongoose.model('Player');


/** 
* Save the result of a championship, stores the player name and his respective score,
* if some player exist the points will be added to his acumulated score.
* @param player: Name of the player to save
* @param points: Number of points to add
* @param res: to send the response
*/
exports.verifyPlayerRegister = function (player, points,res){
	Player.findOne({ name: player}, function (err, reg){
  		if(reg){  			
  			reg.score += points;
  			reg.save(function(err) {
		        if (err){		        	
		            return res.send(500,{"error" : err.message});		       
		        }		       
		        console.log(reg);
		    });  				    		    		   
  		}
  		else{
  			var newPlayer =  new Player({
		        name: player,
		        score: points
		    });
		    newPlayer.save(function(err, resp) {
		        if(err) return res.status(500).send( err.message);
		    console.log(newPlayer);		    
		    });
  		}
	});
}


/** 
* Get the player names and positions from the request and send it to verify if exist and save
* the player data.
* @param req: request with the result to store
* @param res: to send the response
*/
exports.saveResult = function(req, res){
	var first = req.body.first,
		second = req.body.second;

	exports.verifyPlayerRegister(first,3,res); //request to save first place with 3 points
	exports.verifyPlayerRegister(second,1,res); //request to save second place with 1 point

	return res.status(200).jsonp({status: 'success'});
};

/** 
* Get the top of champions ordered in descending, if the request doesn't has a count parameter
* then list the top 10, else the top of count sent in the request
* @param req: request with the result to store
* @param res: to send the response
*/
exports.getTop = function(req, res){
	var top = 10;
	if(req.query.count){
		top = req.query.count;		
	}	
	console.log("TOP: "+top);
	Player.find().sort({score: 'descending'}).limit(parseInt(top)).exec(function(err, players){		
        players.forEach( function(player) {
    		console.log(player);
    	});
	});
}
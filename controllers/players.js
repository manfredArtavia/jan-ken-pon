var mongoose = require('mongoose');  
var Player  = mongoose.model('Player');


/** 
* Save the result of a championship, stores the first place with a score of 3 points
* and the second place with 1 point, if some player exist the points will be added
* to his acumulated score
*/
exports.verifyPlayerRegister = function (player, points,res){
	Player.findOne({ name: player}, function (err, reg){
  		if(reg){  			
  			reg.score += points;

  			reg.save(function(err) {
		        if (err){		        	
		            return res.send(500,{"error" : err.message});		        }		        
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
* 
* @param req request with the result to store
* @param res to send the response
*/
exports.saveResult = function(req, res){
	var first = req.body.first,
		second = req.body.second;

	exports.verifyPlayerRegister(first,3,res); //save first place
	exports.verifyPlayerRegister(second,1,res); //save second place

	return res.status(200).jsonp({'status':'Successfuly'});
};
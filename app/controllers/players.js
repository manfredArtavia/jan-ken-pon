var mongoose = require('mongoose');  
var Player  = mongoose.model('Player');


/** 
* Save the result of a championship, stores the player name and his respective score,
* if some player exist the points will be added to his acumulated score.
* @param player{Srting}: Name of the player to save
* @param points{Integer}: Number of points to add
* @param res{Object}: to send the response
*/
exports.verifyPlayerRegister = function (player, points,res){
	Player.findOne({ name: player}, function (err, reg){
  		if(reg){  			
  			reg.score += points;
  			reg.save(function(err) {
		        if (err){		        	
		            return res.send(500,{"error" : err.message});		       
		        }		       		        
		    });  				    		    		   
  		}
  		else{
  			var newPlayer =  new Player({
		        name: player,
		        score: points
		    });
		    newPlayer.save(function(err, resp) {
		        if(err) return res.status(500).send( err.message);		      
		    });
  		}
	});
}


/** 
* Get the player names and positions from the request and send it to verify if exist and save
* the player data.
* @param req{Object}: request with the result to store
* @param res{Object}: to send the response
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
* @param req{Object}: request with the number of the top
* @param res{Object}: to send the response
*/
exports.getTop = function(req, res){
	var top = 10;
	if(req.query.count){
		top = req.query.count;		
	}		
	Player.find().sort({score: 'descending'}).limit(parseInt(top)).exec(function(err, players){		        
    	return res.status(200).jsonp({players: players});
	});
}


/** 
* Clear the database
* @param req{Object}: request with the order 
* @param res{Object}: to send the response
*/
exports.clearDB = function(req, res){
	Player.remove({}, function(err) { 
		if (err){		        	
            return res.send(500,{"error" : err.message});		       
        }
  		return res.status(200).jsonp({status: 'success'});
	});
}

/**
* Start a new championship
* @param req{Object}: the request with the championship structure
* @param res{Object}: to send the response
*/
exports.newChampionship =  function(req,res){
	// if the request is valid
	if(req.body.data !== undefined){
		var championship = JSON.parse(req.body.data),		
			result = championshipResult(championship) //championship result,
			champion = [result[0],result[1]],
			subChampion = [result[2],result[3]];
		
		exports.verifyPlayerRegister(champion[0],3); //store the score value of the champion
		exports.verifyPlayerRegister(subChampion[0],1); //store the score value of the subchampion
		
		console.log(champion);
		console.log(subChampion);
		return res.status(200).jsonp({winner: champion});
	}
	else{
		throw "Invalid request data";	
	}

}


/** 
* Get the result the championship
* @param req{Array}: the championship to verify
* @return res{Array}: the championship result with four values, the name and strategy of each player,
* ordered descending from Champion to Subchampion
*/
function championshipResult(championship){   	
	if(championship.length == 2 || championship.length == 4){
		if (typeof championship[0][0] === 'string') {
	    	return matchResult(championship)
		} 
	    return matchResult([championshipResult(championship[0]),championshipResult(championship[1])])	    
    }else{
    	throw  "Wrong championship structure";
    }
}

/** 
* Get the result of a single match and convert to lower case the strategy of each player
* @param req{Array}: the match to verify
* @return res{Array}: a single array with four values, the name and strategy of each player,
* ordered descending from winner to loser
*/
function matchResult(match){	
	match[0][1] = match[0][1].toLowerCase();
	match[1][1] = match[1][1].toLowerCase();
	console.log(match);
	if(validStrategies(match[0][1]) && validStrategies(match[1][1])){
		//player 1 wins. If the result of the match is draw player 1 wins too
		if(match[0][1] === "r" && match[1][1] === "s" ||
		   match[0][1] === "p" && match[1][1] === "r" ||
		   match[0][1] === "s" && match[1][1] === "p" ||
		   match[0][1] === match[1][1]){	   		   

		   if(match[0].length < 3){
			   match[0].push(match[1][0])
			   match[0].push(match[1][1])
			}
			else {
				match[0][2] = match[1][0];
				match[0][3] = match[1][1];
			}		
		   return match[0];
		}		
		//player 2 wins	
		else{			
			if(match[1].length < 3){
			   match[1].push(match[0][0])
			   match[1].push(match[0][1])
			}
			else {
				match[1][2] = match[0][0];
				match[1][3] = match[0][1];
			}	
		   	return match[1];
		}
	}
	else
		throw "Invalid strategy on this match: "+ match.slice(0,2);
}

/** 
* Validate if the strategy is correct
* @param req{String}: Strategy to validate
* @return res{Bool}: true if its correct, false if its incorrect
*/
function validStrategies(strategy) {	
	switch (strategy) {
		case "r":
			return true
			break;
		case "s":
			return true
			break;
		case "p":
			return true
			break;
		default:
			return false
			break;
	}
}
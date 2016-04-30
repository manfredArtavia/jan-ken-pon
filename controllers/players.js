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
    	return res.status(200).jsonp({players: players});
	});
}

/**
* Start a new tournament
* @param req{Object}: the request with the tournament structure
* @param res: to send the response
*/
exports.newChampionship =  function(req,res){
	/*tournament = [
	[
	[ ["Armando", "p"], ["Dave", "s"] ],
	[ ["Richard", "R"], ["Michael", "S"] ]
	],
	[
	[ ["Allen", "s"], ["Omer", "p"] ],
	[ ["John", "r"], ["Robert", "p"] ]
	]
];*/
	tournament = [
	[
		[
			[ ["Shalke 04", "R"], ["Real Madrid", "S"] ],
			[ ["Zenit", "R"], ["BVB", "P"] ]
		],
		[
			[ ["Olympiacos", "R"], ["ManU", "P"] ],
			[ ["Arsenal", "P"], ["Bayern", "S"] ]
		]
	],
	[
		[
			[ ["City", "R"], ["Barca", "P"] ],
			[ ["Milan", "P"], ["Atletico", "S"] ]
		],
		[
			[ ["Leverksen", "T"], ["PSG", "P"] ],
			[ ["Galatasaray", "P"], ["Chelsea", "S"] ],			
		],

	]
]

	var result =tournamentResult(tournament),
	champion = [result[0],result[1]],
	subChampion = [result[2],result[3]];;	
	
	console.log('Champion: '+ champion+"\n");
	console.log('subChampion: '+ subChampion);
}


/** 
* Get the result the tournament
* @param req{Array}: the tournament to verify
* @return res{Array}: the tournament result with four values, the name and strategy of each player,
* ordered descending from Champion to Subchampion
*/
function tournamentResult(tournament){   	
	if(tournament.length != 2 || tournament.length != 4){
		return "Bad Structure";
	}
	if (typeof tournament[0][0] === 'string') {
    	return matchResult(tournament)
	} 
    return matchResult([tournamentResult(tournament[0]),tournamentResult(tournament[1])])	    
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
		//player 1 wins if the result of the match is draw player 1 wins too
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
		return "Invalid strategy";
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
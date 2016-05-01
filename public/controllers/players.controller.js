(function() {
    'use strict';

    angular
        .module('jankenpon')
        .controller('PlayersController', PlayersController);

    function PlayersController($scope, PlayersFactory) { 
    	
    	$scope.clearDB = clearDB;
    	
    	// get the top list
    	function clearDB(){
	    	PlayersFactory.clearDB($scope.maxTop);	    	
        }        
    }
})();		
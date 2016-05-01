(function() {
    'use strict';

    angular
        .module('jankenpon')
        .controller('PlayersController', PlayersController);

    function PlayersController($scope, PlayersFactory) { 
    	
    	$scope.clearDB = clearDB;
    	
    	// clear database
    	function clearDB(){
	    	PlayersFactory.clearDB();	            
        }        
    }
})();		
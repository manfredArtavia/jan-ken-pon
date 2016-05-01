(function() {
    'use strict';

    angular
        .module('jankenpon')
        .controller('TopController', TopController);

    function TopController($scope, TopFactory, PlayersFactory) { 
    	$scope.maxTop = 10;
    	$scope.getTop = getTop;
    	$scope.clearDB = clearDB;
    	
    	/** 
        * Use the top factory to  get the top of champions,
        * if the top to show is 0 don't make request and clear the top        
        */
    	function getTop(){   
            if($scope.maxTop === 0 ){
                $scope.players = [];
            }else {
                TopFactory.getTop($scope.maxTop)
                .then(function (response) {                                
                    $scope.players = response.players;
                });    
            }	    	
        }

        /** 
		* Use the players factory to clear the database of players and then clear the top 
        */
    	function clearDB(){
	    	PlayersFactory.clearDB();	
            $scope.players = [];
        }  

        getTop();
    }
})();		
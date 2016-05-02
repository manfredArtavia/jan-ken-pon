(function() {
    'use strict';

    angular
        .module('jankenpon')
        .controller('TopController', TopController);

    function TopController($scope, TopFactory) { 
    	$scope.maxTop = 10;
    	$scope.getTop = getTop;
    	$scope.clearDB = clearDB;    
    	
    	/** 
        * Use the top factory to  get the top of champions,
        * if the top to show is 0 don't make request and clear the top        
        */
    	function getTop(){         
            $scope.topMessage = "";
            if($scope.maxTop === 0 ){
                $scope.players = [];                
            }else {
                TopFactory.getTop($scope.maxTop)
                .then(function (response) {                                
                    $scope.players = response.players;                    
                    if(response.players.length === 0){                        
                        $scope.topMessage = "No champions to show."
                    }
                });    
            }	    	
        }

        /** 
		* Use the players factory to clear the database of players and then clear the top 
        */
    	function clearDB(){
	    	TopFactory.clearDB();	
            $scope.players = [];
            $scope.topMessage = "No champions to show."
        }  

        getTop();
    }
})();		
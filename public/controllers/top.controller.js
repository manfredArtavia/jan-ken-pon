(function() {
    'use strict';

    angular
        .module('jankenpon')
        .controller('TopController', TopController);

    function TopController($scope, TopFactory) { 
    	$scope.maxTop = 10;
    	$scope.getTop = getTop;
    	
    	// get the top list
    	function getTop(){
	    	TopFactory.getTop($scope.maxTop)
	    	.then(function (response) {                                
	            $scope.players = response.players;
	        }); 
        }

        getTop();
    }
})();		
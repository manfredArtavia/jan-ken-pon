(function() {
    'use strict';

    angular
        .module('jankenpon')
        .controller('top', top);

    function top($scope) { 
    	$scope.greeting = "Hello from the controller";
    }
})();		
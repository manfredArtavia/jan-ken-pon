(function() {
    'use strict';

    angular
        .module('jankenpon')
        .factory('TopFactory', TopFactory);

    function TopFactory($http, $q) { 
    	var factory = {
            getTop: getTop
        };

        return factory;
	    /** 
		* Get the top list of champions ordered descending
		* @param quantity{Integer}: number max of the top list
		* @return promise{Object}: the top list to show 
		*/
	    function getTop(quantity) {
	        var defered = $q.defer();
	        var promise = defered.promise;
	        var url = '/api/championship/top?count=' + quantity;

	        $http.get(url)
	            .success(function(response) {
	            	console.log(response);
	                defered.resolve(response);
	            })
	            .error(function(err) {
	                defered.reject(err);
	            });

	        return defered.promise;
	    }    	
    }
})();		
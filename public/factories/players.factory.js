(function() {
    'use strict';

    angular
        .module('jankenpon')
        .factory('PlayersFactory', PlayersFactory);

    function PlayersFactory($http, $q) { 
    	var factory = {
            clearDB: clearDB
        };

        return factory;
	    /** 
		* Get the top list of champions ordered descending
		* @param quantity{Integer}: number max of the top list
		* @return promise{Object}: the top list to show 
		*/
	    function clearDB() {
	        var defered = $q.defer();
	        var promise = defered.promise;

	        $http.get('/api/championship/clear')
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
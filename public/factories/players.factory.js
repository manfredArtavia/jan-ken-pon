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
		* Make the request to clear the database		
		* @return promise{Object}: the status of the response
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
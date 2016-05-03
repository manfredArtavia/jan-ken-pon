(function() {
    'use strict';

    angular
        .module('jankenpon')
        .factory('TopFactory', TopFactory);

    function TopFactory($http, $q) { 
    	var factory = {
            getTop: getTop,
            clearDB: clearDB
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
	                defered.resolve(response);
	            })
	            .error(function(err) {
	                defered.reject(err);
	            });

	        return defered.promise;
	    }

	    /** 
		* Make the request to clear the database		
		* @return promise{Object}: the status of the response
		*/
	    function clearDB() {
	        var defered = $q.defer();
	        var promise = defered.promise;
	            $http({
	            	method: 'DELETE',
	            	url: '/api/championship/clear',
	            	data: ''
	            })
	            .success(function(response) {							
	            	defered.resolve(response);
	            })
	            .error(function(err) {
	            	defered.reject(err);
	            });
	        return defered.promise;
	    }    	
    }
})();		
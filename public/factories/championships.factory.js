(function() {
    'use strict';

    angular
        .module('jankenpon')
        .factory('ChampionshipsFactory', ChampionshipsFactory);

    function ChampionshipsFactory($http, $q) { 
    	var factory = {
            startChampionship: startChampionship
        };

        return factory;
	    
	    /** 
		* Make the request to clear the database		
		* @return promise{Object}: the status of the response
		*/
	    function startChampionship(championship) {
	        var defered = $q.defer(),
	        promise = defered.promise,
	        data = {
	        	data: championship
	        };

	        $http({
				method: 'POST',
				url: '/api/championship/new',
				data: data
			})
			.success(function(response) {

				defered.resolve(response);
			})
			.error(function(err) {
				console.log(err);
				defered.reject(err);
			});

	        return defered.promise;
	    }
	        	
    }
})();		
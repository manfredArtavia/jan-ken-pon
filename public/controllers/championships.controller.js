(function() {
    'use strict';

    angular
        .module('jankenpon')
        .controller('ChampionshipsController', ChampionshipsController);

    function ChampionshipsController($scope, ChampionshipsFactory) { 
    	$scope.readFile = readFile;
    	
        /** 
        * upload a file with the championship structure and use the championshipsFactory
        * to send it to the API         
        */
        function readFile () {            
            document.getElementById("openFile").addEventListener('change', function () {
                 var fileReader = new FileReader();
                 fileReader.onload = function () {
                    ChampionshipsFactory.startChampionship(this.result)
                        .then(function (response) {
                             $scope.champion = response;
                             console.log(response);
                        })
                    
                 }
                 fileReader.readAsText(this.files[0]);
            })
        }        
    	
    }
})();		
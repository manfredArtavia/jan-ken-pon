(function() {
    'use strict';

    angular
    .module('jankenpon')
    .controller('ChampionshipsController', ChampionshipsController);

    function ChampionshipsController($scope, ChampionshipsFactory) {     	
        document.getElementById("openFile").addEventListener('change', readFile);

        /** 
        * upload a file with the championship structure and use the championshipsFactory
        * to send it to the API         
        */        
        function readFile() {
            try {
                var fileReader = new FileReader();
                fileReader.onload = function () {                                        
                    ChampionshipsFactory.startChampionship(this.result)
                    .then(function (response) { 
                    console.log(response);
                    $scope.result = "The champion is "+response.winner[0]+",\n using "+response.winner[1].toUpperCase()+" strategy.";
                    document.getElementById("showResultBtn").click();

                    $scope.champion = response;                                                               
                 })            
                }                
                fileReader.readAsText(this.files[0]);
            } catch(e) {                
                return e;         
            }
        }
    }        

    
})();		
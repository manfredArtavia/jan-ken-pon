(function() {
	'use strict';
	angular
	.module('jankenpon')
	.controller('FilesController',FilesController);

	function FilesController ($scope) {		
		$scope.files = [
			{
		 		title: "Example 1",
		 		championship: "[\n\t[ \"Armando\", \"P\" ], [ \"Dave\", \"S\" ]\n]",
		 		height: 3,
		 		description: "In this example Dave will be the winner"

		 	},
		 	{
		 		title: "Example 2",
		 		championship: "[\n \t[\t [ [\"Armando\", \"P\"], [\"Dave\", \"S\"] ],\n \t \t [ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ]",
		 		/*['\n'
		 			'\t'[
		 				'\t''\t'[ ["Armando", "P"], ["Dave", "S"] ],'\n'
						'\t''\t'[ ["Richard", "R"], ["Michael", "S"] ]],'\n'				
						[
						'\t''\t'[ ["Allen", "S"], ["Omer", "P"] ],'\n'
						'\t''\t'[ ["John", "R"], ["Robert", "P"] ]]'\n'
				]*/				
				height: 9,
		 		description: "In this example Richard will be the winner"
		 	},		 	
		]
	console.log($scope.files)
	}

})();
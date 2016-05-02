(function() {
	'use strict';
	angular
	.module('jankenpon')
	.controller('FilesController',FilesController);

	function FilesController ($scope) {	
		$scope.downloadTextAsFile = downloadTextAsFile;
		
		// array with the examples files content
		$scope.files = [
			{
				id: "example1",
		 		title: "Example 1",
		 		championship: "[\n\t[ \"Armando\", \"P\" ], [ \"Dave\", \"S\" ]\n]",
		 		height: 3,
		 		description: "In this example Dave will be the winner"

		 	},
		 	{
				id: "example2",
		 		title: "Example 2",
		 		championship: "[\n\t[ \"Dave\", \"P\" ], [ \"Armando\", \"S\" ]\n]",
		 		height: 3,
		 		description: "In this example Armando will be the winner"

		 	},
		 	{
				id: "example3",
		 		title: "Example 3",
		 		championship: "[\n\t[ \"Dave\", \"P\" ], [ \"Armando\", \"P\" ]\n]",
		 		height: 3,
		 		description: "In this example Dave will be the winner because exist a draw and he is the first"

		 	},
		 	{
		 		id: "example4",
		 		title: "Example 4",
		 		championship: "[\n \t[\t [ [\"Armando\", \"P\"], [\"Dave\", \"S\"] ],\n \t \t [ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ]",			
				description: "In this example Richard will be the winner",		
				height: 9		 		
		 	},
		 	{
		 		id: "example5",
		 		title: "Example 5",
		 		championship: "[[\n \t[\t [ [\"Armando\", \"P\"], [\"Dave\", \"S\"] ],\n \t \t [ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ], [\n \t[\t [ [\"Charlie\", \"P\"], [\"Dante\", \"S\"] ],\n \t \t [ [\"Peter\", \"R\"], [\"Manfred\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allan\", \"S\"], [\"Homer\", \"P\"] ], \n \t \t [ [\"Johnny\", \"R\"], [\"Ronald\", \"P\"] ]\n\t] \n ]]",		 						
				description: "In this example Richard will be the winner because exist a draw and he is the first",		
				height: 14	 		
		 	},
		 	{
		 		id: "example6",
		 		title: "Example 6",
		 		championship: "[[\n \t[\t [ [\"Charlie\", \"P\"], [\"Dante\", \"S\"] ],\n \t \t [ [\"Peter\", \"R\"], [\"Manfred\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allan\", \"S\"], [\"Homer\", \"P\"] ], \n \t \t [ [\"Johnny\", \"R\"], [\"Ronald\", \"P\"] ]\n\t] \n ],[\n \t[\t [ [\"Armando\", \"P\"], [\"Dave\", \"S\"] ],\n \t \t [ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ]]",		 								 		
				description: "In this example Peter will be the winner because exist a draw and now he is the first",		
				height: 14		 				
		 	}
		 	,
		 	{
		 		id: "example7",
		 		title: "Example 7",
		 		championship: "[[\n \t[\t [ [\"Charlie\", \"S\"], [\"Dante\", \"S\"] ],\n \t \t [ [\"Peter\", \"R\"], [\"Manfred\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allan\", \"P\"], [\"Homer\", \"P\"] ], \n \t \t [ [\"Johnny\", \"P\"], [\"Ronald\", \"R\"] ]\n\t] \n ],[\n \t[\t [ [\"Armando\", \"P\"], [\"Dave\", \"S\"] ],\n \t \t [ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t], \n \n \t[ \t [ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ], \n \t \t [ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t] \n ]]",
				description: "In this example Allan will be the winner because exist a draw and now he is the first",		
				height: 14		 				
		 	}
		]

		/** 
		* Download a file with the content and name gave.
		* make an 'a' tag to download the text file. 
		* A way to leave a side a library
		* @param championship{String}: the content of the file
		* @param exampleName{String}: the name of the file
		*/
		function downloadTextAsFile(championship, exampleName)
		{
			    var fileContent = new Blob([championship], {type:'text/plain'}),
				    link = document.createElement("a");

			    link.download = exampleName;
			    link.innerHTML = "Download File";
			    if (window.webkitURL != null)
			    {
			        // Chrome
			        link.href = window.webkitURL.createObjectURL(fileContent);
			    }
			    else
			    {
			        // Firefox
			        link.href = window.URL.createObjectURL(fileContent);
			        link.onclick = destroyClickedElement;
			        link.style.display = "none";
			        document.body.appendChild(link);
			    }
			    link.click();
		}				
	}

})();
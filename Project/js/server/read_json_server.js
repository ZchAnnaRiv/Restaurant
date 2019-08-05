	const express = require("express");
	var cors = require('cors');
	const app = express();

	app.use(cors());

	function getPageCount(dishes, quantityElementsOnPage) {
	    return Math.ceil(JSON.parse(dishes)['dishes'].length / quantityElementsOnPage);
	}

	function getCurrentPage(dishes, currentPageNumber, typeOfDish) {
	    let dishesJson = JSON.parse(dishes)['dishes'];
	    let resultArray = new Array();
	    for (var i = currentPageNumber * 6; i < ((currentPageNumber * 6) + 6); i++) {
	        if(dishesJson[i] === undefined) return resultArray;
	        if (dishesJson['typeOfDish'] == typeOfDish) {
		        resultArray.push(dishesJson[i]);
		        console.log(dishesJson[i].name); 
		        }
	    }
	    return resultArray;
	}

	

	app.get("/dishes/:count", function(request, response) {
	    const fs = require("fs");
	    fs.readFile("json/Dishes.json", "utf8",
	        function(error, data) {
	            if (error) throw error; 
	            let result = getCurrentPage(data, request.params.count);
	            response.end(JSON.stringify(result)); 
	        });
	});

	app.get("/countPage/:typeOfDish", function(request, response) {
	    const fs = require("fs");
	    fs.readFile("json/Dishes.json", "utf8",
	        function(error, data) {
	            if (error) throw error;
	            var result = getPageCount(data, 6, request.params.typeOfDish);
	            response.end(result.toString());
	        });
	});


	app.listen(3000);
	const express = require("express");
	var cors = require('cors');
	const app = express();

	app.use(cors());

	function getPageCount(dishes, quantityElementsOnPage, typeOfDish) {
	    let dishesJSON = JSON.parse(dishes)['dishes'];
	    let length = dishesJSON.length;
	    for (var i = 0; i < dishesJSON.length; i++) {
	        if (dishesJSON[i].typeOfDish != typeOfDish) {
	            length--;
	        }
	    }
	    return Math.ceil(length / quantityElementsOnPage);
	}
	function Sorting(jsonObj){
	    for (var i = 0; i < jsonObj.length-1; i++) {
	    if (jsonObj[i].price<jsonObj[i+1].price) {
	        let temp = jsonObj[i];
	        jsonObj[i] = jsonObj[i+1];
	        jsonObj[i+1] = temp;
	    }
	    }
	    return jsonObj;
	}


	function getCurrentPage(dishes, currentPageNumber, typeOfDish) {
	    let dishesJson = JSON.parse(dishes)['dishes'];
	    Sorting(dishesJson);
	    let resultArray = new Array();
	    let tempArray = new Array();
	    for (var i = 0; i < dishesJson.length; i++) {
	    	if (dishesJson[i].typeOfDish == typeOfDish) {
	    		tempArray.push(dishesJson[i]);
	    	}
	    }
	    for (var i = currentPageNumber*6; i < currentPageNumber*6+6; i++) {
	    	if (tempArray[i] === undefined) 
	        {
	        	return resultArray;
	        }
	        resultArray.push(tempArray[i]);
	    }
	    return resultArray;
	}

	function getReservedTables(tables,time){
		let tablesJSON = JSON.parse(tables);
		let resultArray = new Array();
		for (var i = 0; i < tablesJSON.length; i++) {
		for (var j = 0; j < tablesJSON[i].time.length; j++) {
			
			if (tablesJSON[i].time[j] == time) {
				resultArray.push(tablesJSON[i]);
			}	
			}	

		}
		return resultArray;
	}
	function setNewReservedTable(jsonOBJ, time, idTable, number) {
		let tables = JSON.parse(jsonOBJ);
		for (var indexOfTable = 0; indexOfTable < tables.length; indexOfTable++) {
			if (tables[indexOfTable].id == idTable) {
				tables[indexOfTable].time.push(time);
				tables[indexOfTable].number.push(number);
				return tables;
			}
		}
		return tables;
	}

	app.get("/dishes/:count/:typeOfDish", function(request, response) {
	    const fs = require("fs");
	    fs.readFile("json/Dishes.json", "utf8",
	        function(error, data) {
	            if (error) throw error;
	            let result = getCurrentPage(data, request.params.count, request.params.typeOfDish);
	            response.end(JSON.stringify(result));
	        });
	});

	app.get("/countPage/:typeOfDish", function(request, response) {
	    const fs = require("fs");
	    fs.readFile("json/Dishes.json", "utf8",
	        function(error, data) {
	            if (error) throw error;
	            let result = getPageCount(data, 6, request.params.typeOfDish);
	            response.end(JSON.stringify(result));
	        });
	});

	app.get("/tables/:time", function(request, response) {
	    const fs = require("fs");
	    fs.readFile("json/Tables.json", "utf8",
	        function(error, data) {
	            if (error) throw error;
	            let result = getReservedTables(data, request.params.time);
	            response.end(JSON.stringify(result));
	        });
	});

	app.get("/tables/:time/:tableNumber/:userNumber", function (request, response) {
		const fs = require("fs");
		console.log("345");
		let resultWrite = "";
		fs.readFile("json/Tables.json", "utf8",
			function (error, fileValues) {
				if (error) throw error;
				console.log("123");
				let result = setNewReservedTable(fileValues, request.params.time, request.params.tableNumber, request.params.userNumber);
				resultWrite = JSON.stringify(result);
				fs.writeFile("json/Tables.json", resultWrite, function (error, data) {
					if (error) throw error;
				});
				console.log(resultWrite);
				response.end(resultWrite);
			});
	});



	app.listen(3000);
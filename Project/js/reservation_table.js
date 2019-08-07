	window.onload = function() {
	    selectDayMonthYears();
	    selectHours();
	    readTextFileTables("15.08.2019-10-12");
	    PageCounter('Main');
   		 readTextFile('Main',0);
	}

	function readTextFileTables(time) {
	    var rawFile = new XMLHttpRequest();
	    let url = "http://localhost:3000/tables/" + time;
	    rawFile.open("GET", url);
	    rawFile.onreadystatechange = function() {
	        if (rawFile.readyState === 4) {
	            var Tables = JSON.parse(rawFile.responseText);
	            showReservedTables(Tables);
	        }
	    }
	    rawFile.send(null)
	}

	function getFreeTables() {
	    let day = document.getElementById('selectDay').value;
	    let month = document.getElementById('selectMonth').value;
	    let year = document.getElementById('selectYear').value;
	    let hours = document.getElementById('selectHours').value;

	    let resultValue = String(day + "." + month + "." + year + "-" + hours);
	    console.log(resultValue);
	    readTextFileTables(resultValue);
	}

	function showReservedTables(jsonObj) {
	    let tablesJSON = jsonObj;
	    let reserved = new Array();
	    selectTables();
	    let optionTables = document.getElementsByClassName('option-free-tables');
	    let tablesOnPage = document.getElementsByClassName('one-reserv-table');
	    let freeTables = tablesOnPage;
	    let thatTable1 = 0;
	    let arrayId = new Array();
	    for (var i = 0; i < tablesOnPage.length; i++) {
	        console.log("Pochemy tyt rabotaet..." + tablesOnPage[i].id);
	        tablesOnPage[i].style.backgroundColor = "#fff";
	        tablesOnPage[i].style.color = "#000";
	        tablesOnPage[i].value = i + 1;

	    }
	    for (var i = 0; i < tablesOnPage.length; i++) {

	        if (tablesJSON[i] !== undefined) {


	            let thatTable = tablesJSON[i].Id;
	            console.log("DO" + tablesOnPage[thatTable].id);
	            tablesOnPage[thatTable].style.backgroundColor = "#F1D950";
	            tablesOnPage[thatTable].style.color = "#DF0101";
	            tablesOnPage[thatTable].value = "R";
	            console.log("Posle" + tablesOnPage[thatTable].id);

	        }
	    }

	    for (var j = 0; j < freeTables.length; j++) {

	        if (tablesJSON[j] !== undefined) {
	            arrayId.push(tablesJSON[j].Id);
	        }
	    }
	    for (var i = 0; i < optionTables.length; i++) {
	        for (var j = 0; j < arrayId.length; j++) {

	            if ((optionTables[i].innerHTML - 1) == arrayId[j]) {
	                console.log(optionTables[i].innerHTML);
	                optionTables[i].style.display = "none";

	            }
	        }

	    }



	}

	function selectDayMonthYears() {
	    for (var i = 1; i < 32; i++) {
	        let Days = document.createElement('option');
	        Days.textContent = i;
	        document.getElementById('selectDay').appendChild(Days);
	    }
	    for (var i = 1; i < 13; i++) {
	        let Months = document.createElement('option');
	        Months.textContent = i;
	        document.getElementById('selectMonth').appendChild(Months);
	    }
	    let date = new Date();
	    let year = date.getFullYear();
	    for (var i = year; i <= year + 1; i++) {
	        let Years = document.createElement('option');
	        Years.textContent = i;
	        document.getElementById('selectYear').appendChild(Years);
	    }
	}

	function selectHours() {
	    for (var i = 10; i < 22; i++) {
	        let Hours = document.createElement('option');
	        Hours.textContent = i + "-" + (i + 2);
	        i++;
	        document.getElementById('selectHours').appendChild(Hours);
	    }
	}

	function selectTables() {
	    document.getElementById('selectTables').innerHTML = "";
	    let tables = document.getElementsByClassName('one-reserv-table');
	    for (var i = 0; i < tables.length; i++) {
	        if (tables[i].style.background != "#F1D950") {
	            let tablesOpt = document.createElement('option');
	            tablesOpt.textContent = i + 1;
	            tablesOpt.setAttribute("class", "option-free-tables");
	            tablesOpt.setAttribute("display", "block");
	            console.log("a chto tyt s Tables" + tablesOpt.innerHTML);
	            document.getElementById('selectTables').appendChild(tablesOpt);
	        }
	    }

	    return document.getElementById('selectTables');


	}

	function setDisplayParam(idName, state) {
	    let cl = document.getElementById(idName);
	    cl.style.display = state;
	}

	function StartWindow() {
	    document.getElementById("ReserveWindowBack").style.display = "block";
	}

	window.onclick = function(event) {
	    if (event.target == document.getElementById("ReserveWindowBack")) {
	        document.getElementById("ReserveWindowBack").style.display = "none";
	    }

	}
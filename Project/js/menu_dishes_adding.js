PageCounter('Main');
readTextFile('Main',0);

function readTextFile(typeOfDish,NumberPage) {
    var rawFile = new XMLHttpRequest();
    let url = "http://localhost:3000/dishes/" +NumberPage + "/" +typeOfDish;
    rawFile.open("GET", url);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            var MainDish = JSON.parse(rawFile.responseText);
            showDish(MainDish);
        }
    }
    rawFile.send(null)
}

function PageCounter(typeOfDish) {
    var request = new XMLHttpRequest();
    request.open("GET", 'http://localhost:3000/countPage/typeOfDish', true);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            for (var i = 0; i < request.responseText; i++) {
                var li = document.createElement('li');
                li.innerHTML = '<button class="pagination-button" onclick = "readTextFile('+ typeOfDish +','+ Number(i) + ')">' + (Number(i) + 1) + '</button>';
                document.getElementById("dish-pagination").appendChild(li);
            }
        }
    }
    request.send(null);
}

function showDish(jsonobj) {
    var dishes = jsonobj;
    document.getElementById("dish-list").innerHTML = "";
    for (var i = 0; i < dishes.length; i++) {
        if (dishes[i] === undefined) {
            return;
        }

        var newDiv1 = document.createElement('div');
        var newDiv2 = document.createElement('div');
        var newImg = document.createElement('img');
        var newP1 = document.createElement('p');
        var newP2 = document.createElement('p');
        var newP3 = document.createElement('p');

        newImg.setAttribute("src", dishes[i].image);
        newDiv2.appendChild(newImg);

        newP1.innerHTML = dishes[i].name;
        newP2.innerHTML = dishes[i].describe;
        newP3.innerHTML = dishes[i].weight + " " + dishes[i].price;

        newDiv1.setAttribute("class", "dish");
        newDiv2.setAttribute("class", "img-size");
        newP2.setAttribute("class", "dish-describe");

        newDiv1.appendChild(newDiv2);
        newDiv1.appendChild(newP1);
        newDiv1.appendChild(newP2);
        newDiv1.appendChild(newP3);
        document.getElementById("dish-list").appendChild(newDiv1);
    }
}
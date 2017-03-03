// var myFirstVariable = 20;
// var secondVariable = 35;
// var myName = "Isabel";
// var amIAmerican = false;
// var numbers = [12, 214, 523, 645, 86];
// var myObject = {name: "Isabel", age: "18"};
//var circleSize = 50;

// function preload(){ // load the data before the page is open
// 	// run the preload function first, otherwise Javascript run all the function at the same time

// }

// var myData = [12, 43, 15, 25, 34];
// var labels = ['Colombia', 'Peru', 'Venezuela', 'Chile', 'Argentina'];

var refugeeTable; // building the variable outside the function, all of the function could access the variable
var topRefugeesTable = new p5.Table;
var maxTotal = 0;
var maxLabel = 0;
var maxLength = 550;
var headers = ['Country','Refugees','Asylum-seekers','Returned refugees','IDPs','Returned IDPs','Stateless','Others of concern','Total']


function preload() { // preload runs first before all others
	refugeeTable = loadTable('../data/RefugeesUNHCR.csv', 'csv', 'header'); // it's a csv, and has the header
	console.log('Done loading table...');
}

// function setup(){ //
// 	console.log(myFirstVariable); // console is a great way to troubleshooting
// 	print(myFirstVariable);
// 	var thirdVariable = myFirstVariable + secondVariable + myName; // concatenate treat the number as text, treat them in order
// 	var forthVariable = myName + secondVariable + myFirstVariable;
// 	print(thirdVariable);
// 	print(forthVariable);
// 	print(typeof(thirdVariable));
// 	print(numbers[0]);
// 	for (var i = 0; i < 100; i++) {
// 		print(i);
// 	}
// 	var i = 0;
// 	while (i < 100) {
// 		print(i);
// 		i++;
// 	}
// 	createCanvas(800, 800); // 500 pixol
// 	console.log('All good... Proceed!!!');
// }

function setup() { // before the draw()
	createCanvas(800, 4000);
	// textAlign(LEFT, TOP); ?
	textSize(12);
	console.log('Setup complete');
	print(refugeeTable.getRowCount() + ' rows loaded');
	print(refugeeTable.getColumnCount() + ' columns loaded');
	for (var i = 0; i < refugeeTable.getRowCount(); i++) {
		maxTotal = max(refugeeTable.getNum(i, 'Total'), maxTotal);
		maxLabel = max(refugeeTable.getString(i, 'Country').length, maxLabel);
	}
	print('Maximum total is ' + maxTotal);
	print('Maximum label length is ' + maxLabel);
	createNewTable();
}

function createNewTable() {
	for (var i = 0; i < headers.length; i++) {
		topRefugeesTable.addColumn(headers[i]);
	}
	for (var i = 0; i < refugeeTable.getRowCount(); i++) {
		var totalRefugees = refugeeTable.getNum(i, 'Total');

		if (totalRefugees >= 100000) {
			var newRow = topRefugeesTable.addRow();

			for (var j = 0; j < headers.length; j++) {
				newRow.setString(headers[j], refugeeTable.getString(i, headers[j]));
			}
		}
	}
	print('New top refugee table created');
}

function drawCountries(category) {
	fill(0);
	noStroke();
	textAlign(LEFT, TOP);
	for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
		var total = topRefugeesTable.getNum(i, category);
		var length = map(total, 0, maxTotal, 0, maxLength);
		rect(maxLabel * 5, 10 + 15 * i, length, 12);
		text(nfc(total, 0), maxLabel * 5 + length + 5, 10 + 15 * i);
	}

	textAlign(RIGHT, TOP);
	for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
		text(topRefugeesTable.getString(i, 'Country'), maxLabel * 5 - 5, 10 + 15 * i);
	}
}

function draw() {
	background(255);
	// drawCountries(RefugeeTable);
	drawCountries('Total');
}

// function draw() {
// 	background(255);
// 	fill(0);
// 	noStroke();
// 	textAlign(LEFT, TOP);
// 	for (var i = 0; i < refugeeTable.getRowCount(); i++) {
// 		var total = refugeeTable.getNum(i, 'Total');
// 		var rectTotal = map(total, 0, maxTotal, 0, maxLength); // map functionis super useful
// 		rect(maxLabel * 5, 50 + 20 * i, rectTotal, 15);
// 		text(nfc(total, 0), maxLabel * 5 + rectTotal + 5, 50 + 20 * i);
// 	}

// 	textAlign(RIGHT, TOP);
// 	for (var i = 0; i < refugeeTable.getRowCount(); i++) {
// 		text(refugeeTable.getString(i, 'Country'), maxLabel * 5 - 5, 50 + 20 * i);
// 	}
// }

// function draw() {
// 	background(255);
// 	textAlign(RIGHT, TOP);
// 	for (var i = 0; i < myData.length; i++) {
// 		rect(80, 50 + 20 * i, myData[i] * 10, 15); // rect(X position, Y position, width, height)
// 		text(labels[i], 75, 50 + 20 * i); // text(text, X position, Y position)
// 		text(myData[i], 95 + myData[i] * 10, 50 + 20 * i);
// 	}

// }


// function draw(){ // running 60 times per second
// 	background(200, 200, 200); // RGB: 0 black
// 	if (mouseIsPressed) {
// 		fill(255);
// 	} else {
// 		fill(0);
// 	}
// 	stroke(200, 0, 50);
// 	strokeWeight(1);
// 	ellipse(mouseX, mouseY, circleSize, circleSize); // x, y coordinate, width, height
// }

// function myFirstFunction(x1, x2, x3){
// 	var x4 = x1 * x2 * x3;
// 	return x4;
// }
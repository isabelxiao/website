var childTable;
var gender = {"boys": 0, "girls": 0};
var age = {"0 - 5": 0, "6 - 11": 0, "12 - 17": 0};
var yearList = {1984: 0, 1990: 0, 1991: 0, 1994: 0, 1995: 0, 1996: 0, 1997: 0, 1998: 0, 1999: 0, 2000: 0, 2001: 0, 2002: 0, 2003: 0, 2004: 0, 2005: 0, 2006: 0, 2007: 0, 2008: 0, 2009: 0, 2010: 0, 2011: 0, 2012: 0, 2013: 0, 2014: 0, 2015: 0,};



function preload() {
	childTable = loadTable('../data/children_sexual.csv', 'csv', 'header');
	console.log("Done loading table");
}

function setup() {
	createCanvas(1000, 1500);
	textSize(28);
	console.log("Setup complete");
	print(childTable.getRowCount() + " rows loaded");
	print(childTable.getColumnCount() + " colums loaded");

	for (var i = 0; i < childTable.getRowCount(); i++) {
		if (childTable.getString(i, 'GENERO') == "Mujer") {
			gender["girls"] += childTable.getNum(i, 'TOTAL');
		} else if (childTable.getString(i, 'GENERO') == "Hombre") {
			gender["boys"] += childTable.getNum(i, 'TOTAL');
		}

		if (childTable.getString(i, 'CICLO VITAL') == "entre 0 y 5") {
			age["0 - 5"] += childTable.getNum(i, 'TOTAL');
		} else if (childTable.getString(i, 'CICLO VITAL') == "entre 6 y 11") {
			age["6 - 11"] += childTable.getNum(i, 'TOTAL');
		} else if (childTable.getString(i, 'CICLO VITAL') == "entre 12 y 17") {
			age["12 - 17"] += childTable.getNum(i, 'TOTAL');
		}
		var aYear = childTable.getNum(i, 'ANIO OCURRENCIA');
		yearList[aYear] += childTable.getNum(i, 'TOTAL');
	}
}

function draw() {
	fill(0);
	noStroke();
	// gender
	textAlign(RIGHT, TOP);
	text("Victims by gender", 650, 10);
	rect(300, 50, gender["girls"], 30);
	text("Girls", 290, 50);
	rect(300, 50 + 40, gender["boys"], 30);
	text("Boys", 290, 50 + 40);

	textAlign(LEFT, TOP);
	text(gender["girls"], 310 + gender["girls"], 50);
	text(gender["boys"], 310 + gender["boys"], 50 + 40);

	// age group
	textAlign(RIGHT, TOP);
	text("Victims by age groups", 675, 250);
	rect(300, 300, age["0 - 5"], 30);
	text("0 - 5 years old", 290, 300);
	rect(300, 300 + 40, age["6 - 11"], 30);
	text("6 - 11 years old", 290, 300 + 40);
	rect(300, 300 + 40 * 2, age["12 - 17"], 30);
	text("12 - 17 years old", 290, 300 + 40 * 2);

	textAlign(LEFT, TOP);
	text(age["0 - 5"], 310 + age["0 - 5"], 300);
	text(age["6 - 11"], 310 + age["6 - 11"], 300 + 40);
	text(age["12 - 17"], 310 + age["12 - 17"], 300 + 40 * 2);

	// year
	var count = 0;
	text("Victims by year", 425, 540);
	yearArr = Object.keys(yearList);
	for (var i = 1984; i < 2016; i++) {
		if (yearArr.indexOf(i.toString()) > -1) {
			count++;
			print(count);
			textAlign(RIGHT, TOP);
			rect(300, 550 + 40 * count, yearList[i] * 5.5, 30);
			text(i, 290, 550 + 40 * count);
			textAlign(LEFT, TOP);
			text(yearList[i], 310 + yearList[i] * 5.5, 550 + 40 * count)
		}
	}
}



// ***** Global variables ***** //
var refugeeTable;
var topRefugeesTable = new p5.Table;
var maxTotal = 0;
var maxLabel = 0;
var maxLength = 500;
var headers = ['Country','Refugees','Asylum-seekers','Returned refugees','IDPs','Returned IDPs','Stateless','Others of concern','Total']
var startChartY = 100; // put it as a variable, not sure 100 is a right one
var selectedButton = 8;

// ***** Preload function ***** //
function preload(){
    refugeeTable = loadTable('../data/RefugeesUNHCR.csv', 'csv', 'header');
    console.log('Done loading table...');
}

// ***** Setup function ***** //
function setup(){
    createCanvas(800, 3000);
    textSize(12);
    console.log('Setup complete...');
    print(refugeeTable.getRowCount() + ' rows loaded...');
    print(refugeeTable.getColumnCount() + ' columns loaded...');
    for (var i = 0; i < refugeeTable.getRowCount(); i++) {
        //maxTotal = max(refugeeTable.getNum(i, 'Total'), maxTotal);
        maxLabel = max(refugeeTable.getString(i, 'Country').length, maxLabel);
    }
    // print('Maximum total is ' + maxTotal);
    print('Maximum label length is ' + maxLabel);
    createNewTable();
}

// ****** Create new table function ******** //
function createNewTable(){
    for (var i = 0; i < headers.length; i++) {
        topRefugeesTable.addColumn(headers[i]);
    }
    for (var i = 0; i < refugeeTable.getRowCount(); i++) {
        var totalRefugees = refugeeTable.getNum(i, 'Total');
        if (totalRefugees >= 100000) {
            var newRow = topRefugeesTable.addRow()
                        for (var j = 0; j < headers.length; j++) {
                            newRow.setString(headers[j], refugeeTable.getString(i, headers[j]));
                        }
        }
    }
    print('New top refugee table created...');
    print(topRefugeesTable);
}

function showDetails() {
    if (mouseY > 101 && mouseY < 884) {
        var selectedRow = 0;
        selectedRow = Math.floor((mouseY - 100) / 14)
        text(topRefugeesTable.getString(selectedRow, 'Country'), 600, 120);
        text(topRefugeesTable.getString(selectedRow, 'Total'), 600, 150);
        text(topRefugeesTable.getString(selectedRow, 'Asylum-seekers'), 600, 170);
    }
}

function drawButtons() {
 
    for (var i = 1; i < headers.length; i++) {
        if (selectedButton == i) {
            fill(150, 150, 150)
        }
        else {
            noFill();
        }
        stroke(0);
        strokeWeight(1);
        rect(50 + 80 * i, 30, 75, 20);

        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(headers[i], 90 + 80 * i, 40);
    }
}

function mousePressed() {
    // if (mouseX > 130 && mouseX < 205 && mouseY > 30 && mouseY < 50) {
    //     selectedButton = 1;
    // }
    if (mouseX > 130 && mouseX < 765 && mouseY > 30 && mouseY < 50) {
        ith = Math.floor((mouseX - 50) / 80);
        if (mouseX < (ith + 1) * 80 + 45) {
            selectedButton = ith;
        }
    }
}

function drawCountries(category){
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);

    maxTotal = 0;
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        maxTotal = max(topRefugeesTable.getNum(i, category), maxTotal);
    }

    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        var total = topRefugeesTable.getNum(i, category);
        var length = map(total, 0, maxTotal, 0, maxLength);
        rect(maxLabel * 5, startChartY + 2 + 14 * i, length, 12);
        text(nfc(total, 0), maxLabel * 5 + length + 5, startChartY + 14 * i);
    }
    textAlign(RIGHT, TOP);
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        text(topRefugeesTable.getString(i, 'Country'), maxLabel * 5 - 5, startChartY + 14 * i);
    }
}

// ***** Draw function ***** //
function draw(){
    background(255);
    text(str(mouseX) + ', ' + str(round(mouseY)), mouseX, mouseY); // a little trick, help you place the button
    // drawCountries(refugeeTable);
    drawCountries(headers[selectedButton]);
    drawButtons();
    showDetails();
}
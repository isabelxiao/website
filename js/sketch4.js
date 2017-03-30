var apiKey = 'cec2d84442ee7c53dded0803899518af';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city;
var units = 'metric';
var weatherData;
var temperature = 0;
var windSpeed = 0;
var windAngle = 0;
var button;
var bgBlue = 255;
var bgRed = 255;
var bgGreen = 255;
var cloud = -1;
var cnv;
var weatherDiv;

var wind;
var positions = [];

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2 + 250;
	cnv.position(x, y);
}

function setup() {
	cnv = createCanvas(700, 700);
	centerCanvas();
	button = select("#submit");
	city = select("#city");
	createWeatherDiv("", "", "");
	button.mousePressed(queryAPI);
	for (var i = 0; i < 102; i++) 
		positions[i] = createVector(random(width), random(height));
	wind = createVector(); // A wind direction vector
}

function windowResized() {
	centerCanvas();
}

function queryAPI() {
	var query = baseURL + city.value() + '&apiKey=' + apiKey + '&units=' + units;
	loadJSON(query, getWeatherData);
}

function getWeatherData(apiData) {
	weatherData = apiData;
	temperature = weatherData.main.temp;
	if (temperature < -5)
		posTemp = -5;
	else if (temperature > 30)
		posTemp = 30;
	else 
		posTemp = temperature;

	bgBlue = 255 - posTemp / 35 * 255;
	bgRed = posTemp / 35 * 255;
	bgGreen = 0;

	cloud = weatherData.clouds.all;

    windSpeed = weatherData.wind.speed;
    windAngle = radians(weatherData.wind.deg + 90);
    wind = p5.Vector.fromAngle(windAngle).mult(windSpeed / 2.5);
    weatherDiv.remove();
    createWeatherDiv(floor(temperature), cloud, windSpeed);
    // var temperatureDiv = createDiv("Temperature: " + floor(temperature) + "&deg;" + "    Cloudness: " + cloud +  "%" + "    Wind Speed: " + windSpeed + " m/s");
    // temperatureDiv.parent("weatherData");

}

function createWeatherDiv(x, y, z) {
	weatherDiv = createDiv("Temperature: " + x + "&deg;" + "  --  Cloudness: " + y +  "%" + "  --  Wind Speed: " + z + " m/s");
	weatherDiv.parent("weatherData");
}


function draw() {

	background(255);


	fill(bgRed, bgGreen, bgBlue, 110);
	noStroke();
	rect(0, 0, 700, 700);

	for (var i = 0; i < cloud + 1; i++) {

		var randomXY = createVector(random(0, 2), random(0, 2));

		positions[i].add(wind).add(randomXY);

		if (positions[i].x > width)  positions[i].x = -60;
  		if (positions[i].x < -60)      positions[i].x = width;
  		if (positions[i].y > height) positions[i].y = -60;
  		if (positions[i].y < -60)      positions[i].y = height;

  		drawCloud(positions[i].x, positions[i].y);
	}
}

function drawCloud(cloudX, cloudY) {
	noStroke();
	fill(250);
    ellipse(cloudX + 35,cloudY + 20,50,40);
    ellipse(cloudX + 55,cloudY + 30,60,30);
    ellipse(cloudX + 60,cloudY + 20,20,20);
    ellipse(cloudX + 15,cloudY + 30,30,20);  
    ellipse(cloudX + 35,cloudY + 35,40,30);   
}

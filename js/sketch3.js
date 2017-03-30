//var citibikeData;
var apiKey = 'cec2d84442ee7c53dded0803899518af';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city;
var units = 'metric';
var weatherData;
var temperature = 0;
var humidity = 0;
var button;

// preload function: force to load first
// function preload() {
// 	var query = baseURL + city + '&apiKey=' + apiKey + '&units=' + units;
// 	// citibikeData = loadJSON('../data/citibike.json'); // loading the json file into the global variable
// 	weatherData = loadJSON(query);
// 	console.log('The JSON file has been loaded...');

// }


function setup() {
	createCanvas(800, 800);
	button = select("#submit"); // link the id of the button, # represents id
	city = select("#city");
	button.mousePressed(queryAPI);
	// var query = baseURL + city + '&apiKey=' + apiKey + '&units=' + units;
	// loadJSON(query, getWeatherData); // first, load the JSON; second, do another thing
	// call back: call it when you finish the first step
	// get the information and pass it to the second function
	// follow a specific order: after the query is finished, do the second step

	// console.log(citibikeData.data.stations[0].num_bikes_available); // asynchromics
	// console.log(weatherData);
}

function queryAPI() {
	var query = baseURL + city.value() + '&apiKey=' + apiKey + '&units=' + units;
	loadJSON(query, getWeatherData); // first, load the JSON; second, do another thing
}

function getWeatherData(apiData) { // apiData is a JSON object, the result of loadJSON(query)
	weatherData = apiData;
	temperature = weatherData.main.temp;
	humidity = weatherData.main.humidity;
	console.log(weatherData);
	// console.log(temperature);
}

function draw() {
	background(255);
	fill(0);
	noStroke();

	if (weatherData) { // weatherData == undefined means false, make sure weatherData has data in it
		// if statement is important!
		ellipse(200, 200, temperature * 10, temperature * 10);
	}
}

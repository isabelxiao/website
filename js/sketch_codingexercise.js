var minRadius = 1;
var maxRadius = 60;
var maxDist = 900;

function setup() {
	createCanvas(800, 4000);
}

function draw() {
	background(255)
	noStroke();
	colorMode(HSB);
	for (var i = 0; i < 60; i++) {
		for (var j = 0; j < 60; j++) {
			fill(i * 6, j * 5 / 3, 100);
			rect(20 + i * 10, 20 + j * 10, 10, 10);
		}
	}

	stroke(0);
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			var x = 40 + i * 40;
			var y = 700 + j * 40;
			var d = dist(mouseX, mouseY, x, y);
			if (d / 5 > 240) {
				var color = 240;
			} else {
				var color = d / 5;
			}
			fill(color);

			if (d > 600) {
				var r = maxRadius;
			} else {
				var r = d / 600 * maxRadius;
			}
			ellipse(40 + i * 40, 700 + j * 40, r, r);
		}
	}
}
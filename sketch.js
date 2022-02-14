let a;

let foodList = new Array(100).fill(null);
let poisonList = [];

function setup() {
	createCanvas(windowWidth*.9, windowHeight*.9);
	a = new Agent(createVector(width / 2, height / 2));

	foodList = foodList.map(f => (f = new food()));
}

function draw() {
	background(0);

	foodList.forEach(f => f.display());

	a.behaviours(foodList);
	a.update();
	a.show();
}

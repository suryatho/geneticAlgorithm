let population;

function setup() {
	createCanvas(windowWidth*.9, windowHeight*.9);
	a = new Agent(createVector(width / 2, height / 2));

	population = new PopulationHandler(10, 100, 100);
}

function draw() {
	background(0);

	population.update();
	// console.log(population.food.length)
}

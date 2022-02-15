class PopulationHandler {
	constructor(len, foodLen, poisonLen) {
		this.population = new Array(len).fill(null).map(() => new Agent());
		this.food = new Array(foodLen).fill(null).map(() => new food())
		this.poison = new Array(poisonLen).fill(null).map(() => new poison())
	}

	update() {
		this.food.forEach(f => {
			f.display();
		});
		this.poison.forEach(p => {
			p.display();
		});

		this.population.forEach(n => {
			n.behaviours(this.food, this.poison);
			n.update();
			n.show();
		});

		if (random() <= 0.01) this.food.push(new food());
		if (random() <= 0.01) this.poison.push(new poison());

		if (this.population.every(a => a.health <= 0)) this.nextGen();
	}

	nextGen() {
		// console.log("Time for next generation!")
	}
}

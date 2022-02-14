class PopulationHandler {
	constructor(len) {
		this.population = new Array(len).fill(null).map(a => new Agent());
	}

	update() {
		this.population.forEach(n => {
			n.update();
			n.display();
		});
	}
}

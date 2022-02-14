class edible {
	constructor() {
		this.nutrition;
		this.color = color(255);
		this.pos = createVector(random(width), random(height));
	}

	display() {
		fill(this.color);
		ellipse(this.pos.x, this.pos.y, 10);
	}
}

class food extends edible {
	constructor() {
		super();
		this.nutrition = 1;
		this.color = color(0, 255, 0);
	}
}

class poison extends edible {
	constructor() {
		super();
		this.nutrition = -1;
		this.color = color(255, 0, 0);
	}
}

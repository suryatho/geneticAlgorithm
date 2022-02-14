class Agent {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector();
		this.acc = createVector();

		this.maxForce = 0.5;
		this.maxSpeed = 5;
		this.w = 10;

		//DNA based traits
		this.perception = 100;
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI / 2);
		fill(255);
		triangle(-this.w * 0.8, this.w, 0, -this.w, this.w * 0.8, this.w);
		pop();
	}

	update() {
		this.acc.limit(this.maxForce);
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	eat(ediblesArr) {
		const closeByEdibles = ediblesArr.filter(
			e => this.dist(e.pos) <= this.perception
		);
		if (closeByEdibles.length == 0) return this.applyForce(createVector(0, 0));
		
		const closestEdible = closeByEdibles.reduce((closest, current) => {
			const closestD = this.dist(closest.pos);
			const currentD = this.dist(current.pos);
			return closestD < currentD ? closest : current;
		})
		return this.steer(closestEdible.pos);
	}

	behaviours(food) {
		const foodForce = this.eat(food);
		this.applyForce(foodForce);
	}

	edges() {
		if (
			x < this.w * 2 ||
			x > width - this.w * 2 ||
			y < this.w * 2 ||
			y > height - this.w * 2
		)
			this.steerCenter();
	}

	steerCenter() {
		this.steer(width / 2, height / 2);
	}

	steer(target) {
		let desired = target.sub(this.pos);
		desired.limit(this.maxSpeed);
		let steer = desired.sub(this.vel);
		steer.limit(this.maxAcc);
		return steer;
	}

	applyForce = f => this.acc.add(f);

	dist = p => this.pos.dist(p);
}

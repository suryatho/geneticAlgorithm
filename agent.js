class Agent {
	constructor(dna) {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector();
		this.acc = createVector();

		this.maxForce = 0.3;
		this.maxSpeed = 5;
		this.w = 10;
		this.health = 300;
		this.fitness = 0;

		//DNA based traits
		this.dna = dna? new agentDNA(dna.perception, dna.foodW, dna.poisonW): new agentDNA();
		this.perception = this.dna.perception;
		this.foodW = this.dna.foodW;
		this.poisonW = this.dna.poisonW;
	}

	show() {
		if (this.health <= 0) return;
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI / 2);
		fill(255);
		triangle(-this.w * 0.8, this.w, 0, -this.w, this.w * 0.8, this.w);
		pop();
	}

	update(food, poison) {
		if (this.health <= 0) return;

		//do the behaviours
		this.behaviours(food, poison);

		//all calculations for position here
		this.acc.limit(this.maxForce);
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.edges();

		//changing values for health and fitness
		this.health--;
		this.fitness++;
	}

	eat(ediblesArr) {
		if (!ediblesArr) return createVector(0, 0);
		const closeByEdibles = ediblesArr.filter(e => this.dist(e.pos) <= this.perception);
		
		if (closeByEdibles.length == 0) return createVector(0, 0);
		
		const closestEdible = closeByEdibles.reduce((closest, current) => {
			const closestD = this.dist(closest.pos);
			const currentD = this.dist(current.pos);
			return (closestD < currentD) ? closest : current;
		})

		if (this.dist(closestEdible.pos) <= this.maxSpeed) {
			this.health += closestEdible.nutrition;
			const index = ediblesArr.indexOf(closestEdible);
			ediblesArr.splice(index, 1);
		}

		return this.steer(closestEdible.pos);
	}

	behaviours(food, poison) {
		let foodForce = this.eat(food);
		foodForce.mult(this.foodW);
		this.applyForce(foodForce);

		let poisonForce = this.eat(poison);
		poisonForce.mult(this.poisonW);
		this.applyForce(poisonForce);
	}

	edges() {
		if(
			this.pos.x > width ||
			this.pos.y > height ||
			this.pos.x < 0 ||
			this.pos.y < 0
		) this.steerCenter();
	}

	steer(target) {
		let desired = p5.Vector.sub(target, this.pos);
		desired.limit(this.maxSpeed);
		let steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxAcc);
		return steer;
	}

	steerCenter() {
		this.applyForce(this.steer(createVector(width/2, width/2)).mult(0.6));
	}

	applyForce = f => this.acc.add(f);

	dist = p => this.pos.dist(p);
}

class agentDNA {
    constructor(dna) {
        if (dna) {
            this.perception = dna.perception;
            this.foodW = dna.foodW;
            this.poisonW = dna.poisonW;
        } else {
            this.perception = random(20, 150);
            this.foodW = random(-1, 1);
            this.poisonW = random(-1, 1);
        }   
    }
}
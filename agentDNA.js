class agentDNA {
    constructor(perception, food, poison) {
        if (perception && food && poison) {
            this.perception = dna.perception;
            this.foodW = dna.foodW;
            this.poisonW = dna.poisonW;
        } else {
            this.perception = random(20, 150);
            this.foodW = random(-1, 1);
            this.poisonW = random(-1, 1);
        }   
    }

    breed(mateDNA) {
        let newPerception = random() >= 0.5 ? mateDNA.perception : this.perception;
        let newFoodW = random() >= 0.5 ? mateDNA.foodW : this.foodW;
        let newPoisonW = random() >= 0.5 ? mateDNA.poisonW : this.poisonW;
        return new agentDNA(newPerception, newFoodW, newPoisonW);
    }
}
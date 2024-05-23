export type Flavors = [number, number, number, number, number];
export type Apricorn = 'Red' | 'Ylw' | 'Blu' | 'Grn' | 'Pnk' | 'Wht' | 'Blk';
export type Performance = 'Power' | 'Stamina' | 'Skill' | 'Jump' | 'Speed' | 'NoFlav';
export type Recipe = {
    "Perf": Performance,
    "Recipe": Apricorn[],
    "Flavors": Flavors,
    "Mildness": number
}

export default class Apriblender {
    static apriTable: Record<Apricorn, Flavors> = {
        "Red": [4, -2, 0, 0, 0],
        "Ylw": [0, 4, -2, 0, 0],
        "Blu": [0, 0, 4, -2, 0],
        "Grn": [0, 0, 0, 4, -2],
        "Pnk": [-2, 0, 0, 0, 4],
        "Wht": [-2, -2, -2, -2, -2],
        "Blk": [2, 2, 2, 2, 2]
    };

    static colorIndex: Record<Apricorn, number> = {
        "Red": 0, "Ylw": 1, "Blu": 2, "Grn": 3, "Pnk": 4, "Wht": 5, "Blk": 6
    }
    static inverseColorIndex: Apricorn[] = ["Red", "Ylw", "Blu", "Grn", "Pnk", "Wht", "Blk"];

    static tastes: string[] = ["Spicy", "Sour", "Dry", "Bitter", "Sweet"];
    static attributes: Performance[] = ["Power", "Stamina", "Skill", "Jump", "Speed"];

    static strongMessages: string[][] = [
        ["It's a spicy flavor.", "A little sour.", "A refined, dry taste.", "A somewhat bitter taste.", "A sweet taste."],
        ["A pungent flavor.", "An invigorating flavor.", "A strong, dry taste!", "A slightly bitter flavor.", "A nice, sweet taste."],
        ["So spicy, you'll sweat!", "Mmmmmph! Sour!", "Incredibly dry!", "An intense bitterness!", "Very sweet!"],
        ["So spicy, it causes coughing!", "Unbearably sour!", "A pervadingly dry taste!", "A massively bitter taste!", "A sickly-sweet flavor!"],
        ["A resounding spiciness!", "A deep sourness!", "A deep-seated, dry taste!", "A sinking bitterness!", "A melt-in-your-mouth sweetness."],
        ["The ultimate spiciness!", "An extremely sour taste!", "An extremely dry taste!", "The peak of bitterness!", "So incredibly sweet!"]
    ];

    static secondStrongMessages: string[][] = [
        ["A hint of spicy taste...", "A hint of sourness.", "A slight dry taste...", "Barely a hint of bitterness.", "Barely a hint of sweetness..."],
        ["A little salty.", "A little sour.", "A light dry taste", "Just a little bitter.", "Just a little sweet..."],
        ["Quite spicy.", "Quite sour.", "A quite dry taste.", "A strongly bitter taste.", "A strongly sweet taste..."],
        ["A strong spiciness.", "Intensely sour.", "An intensely dry taste.", "Intensely bitter.", "An intensely sweet taste..."]
    ];

    static thirdStrongMessages: string[][] = [
        ["A very faint spiciness.", "A very faint sourness.", "A very faint dry taste.", "A very faint bitterness.", "A very faint sweetness."],
        ["Merely a hint of spiciness.", "Merely a hint of sourness.", "A hint of dry taste.", "Merely a hint of bitterness.", "Merely a hint of sweetness."],
        ["The spiciness comes through.", "The sourness comes through.", "The dryness comes through.", "The bitterness comes through.", "The sweetness comes through."]
    ];

    flavors: Flavors;
    flavor: number;
    mildness: number;
    liquidLevel: number;

    memory: Apricorn[];

    constructor(juice: Flavors = [0, 0, 0, 0, 0], mildness: number = 0, memory: Apricorn[] = [], liquidLevel: number = 0) {
        this.flavors = [...juice];
        this.flavor = this.flavors.reduce((a, b) => a + b, 0);
        if (this.flavor > 100) throw new Error("Total flavor exceeds 100");
        this.mildness = mildness;
        this.liquidLevel = liquidLevel;

        this.memory = memory;
    }

    capTaste(taste: number): number { return Math.max(0, Math.min(taste, 63)); }
    capFlavor(flavor: number): number { return Math.max(0, Math.min(flavor, 100)); }
    capMildness(mildness: number): number { return Math.max(0, Math.min(mildness, 255)); }

    blend(apricorns: Apricorn[]): Apriblender {
        for (const apricorn of apricorns) {
            const deltas = Apriblender.apriTable[apricorn];
            if (deltas === undefined) continue;

            this.liquidLevel = 3;
            const order = this.getOrder();

            this.flavors = this.flavors.map((flavor, index) => this.capTaste(flavor + deltas[index])) as Flavors;

            const boosted = new Set(Array.from(Array(5).keys()).filter(index => deltas[index] > 0));
            if (Array.from(boosted).filter(x => !order.slice(0, 2).includes(x)).length > 0) {
                this.mildness = this.capMildness(this.mildness - 10);
            }

            this.flavor = this.flavors.reduce((a, b) => a + b, 0);
            if (this.flavor > 100 && apricorn !== "Wht") {
                const unboosted = new Set(Array.from(Array(5).keys()).filter(index => !boosted.has(index)));
                const overflow = this.flavor - 100;

                if (apricorn === "Blk") {
                    const available = Array.from(Array(5).keys()).filter(index => this.flavors[index] > overflow);
                    const randomIndex = available[Math.floor(Math.random() * available.length)];
                    this.flavors[randomIndex] -= overflow;
                } else {
                    const available = Array.from(unboosted).filter(index => this.flavors[index] > overflow);
                    for (const index of order) {
                        if (available.includes(index)) {
                            this.flavors[index] -= overflow;
                            break;
                        }
                    }
                }

                this.flavor = 100;
            }

            this.memory.push(apricorn);
        }

        return this;
    }

    apriFactor(): Record<Performance, number> {
        const deltas = [0, 0, 0, 0, 0];
        const order = this.getOrder();

        const strongest = order[0];
        const secondStrongest = order[1];
        const weakest = order[order.length - 1];

        deltas[strongest] = Math.floor(this.flavors[strongest] * 3 / 2 + 10);
        deltas[secondStrongest] = Math.floor(this.flavors[secondStrongest] * 3 / 2);
        if (this.mildness < 200) {
            deltas[weakest] = -Math.floor((1 - Math.floor(this.mildness / 25) / 10) * (this.flavors[strongest] + this.flavors[secondStrongest]));
        } else if (this.mildness < 255) {
            deltas[weakest] = -Math.floor((this.flavors[strongest] + this.flavors[secondStrongest]) / 5);
        } else if (this.mildness === 255) {
            deltas[weakest] = -Math.floor((this.flavors[strongest] + this.flavors[secondStrongest]) / 10);
        }

        const result: Record<string, number> = {};
        for (let i = 0; i < 5; i++) {
            result[Apriblender.attributes[i]] = deltas[i];
        }

        return result;
    }

    juiceTitle(): string {
        const strongest = this.getOrder()[0];
        if (this.flavor === 0) return "NoFlav";
        else return Apriblender.attributes[strongest];
    }

    apricornTotal(): number {
        return this.memory.length;
    }

    taste(): string {
        const order = this.getOrder();
        let output = "";
        const nonzero = this.getNonzero();

        if (this.flavor === 0) {
            if (this.apricornTotal() > 0) return "There's absolutely no flavor!\nIt seems like you need to put in \na colored Apricorn.";
            else return "The Aprijuice is not done!\nPut Apricorns in the Apriblender \nand click it to taste!";
        }

        const strongest = order[0];
        const secondStrongest = order[1];
        const thirdStrongest = order[2];
        const secondWeakest = this.getSecondWeakest();
        const weakest = this.getWeakest();

        const differential = nonzero === 4 ? this.flavors[strongest] - this.flavors[weakest] : this.flavors[strongest] - this.flavors[secondWeakest];

        if (nonzero >= 4) {
            if (this.flavors[strongest] <= 7) return "The flavor is still quite weak. It \nwould be good to put in some \nApricorns with color...";
            if (this.flavors[strongest] <= 20 && differential <= 12) return "Unspeakably incredible flavor!\nIts tastes are evenly balanced.\nI can't tell what kind of flavor!";
            if (this.flavors[strongest] > 20 && differential <= 12) return "Incredibly unspeakable flavor!\nIts tastes are all competing.\nI can't tell what kind of flavor!";
        }

        if (this.flavors[strongest] <= 20) output += Apriblender.strongMessages[0][strongest] + "\n";
        else if (this.flavors[strongest] <= 30) output += Apriblender.strongMessages[1][strongest] + "\n";
        else if (this.flavors[strongest] <= 40) output += Apriblender.strongMessages[2][strongest] + "\n";
        else if (this.flavors[strongest] <= 50) output += Apriblender.strongMessages[3][strongest] + "\n";
        else if (this.flavors[strongest] <= 62) output += Apriblender.strongMessages[4][strongest] + "\n";
        else if (this.flavors[strongest] === 63) output += Apriblender.strongMessages[5][strongest] + "\n";

        if (nonzero >= 2) {
            if (this.flavors[secondStrongest] <= 20) output += Apriblender.secondStrongMessages[0][secondStrongest] + "\n";
            else if (this.flavors[secondStrongest] <= 30) output += Apriblender.secondStrongMessages[1][secondStrongest] + "\n";
            else if (this.flavors[secondStrongest] <= 40) output += Apriblender.secondStrongMessages[2][secondStrongest] + "\n";
            else if (this.flavors[secondStrongest] > 40) output += Apriblender.secondStrongMessages[3][secondStrongest] + "\n";
        }

        if (nonzero <= 2) {
            output += "A refreshing aftertaste!";
        } else if (nonzero === 5) {
            output += "A disgusting aftertaste.";
        } else if (nonzero === 4) {
            output += `Eliminating ${Apriblender.tastes[order[order.length - 1]].toLowerCase()} flavor...`;
        } else {
            if (this.flavors[thirdStrongest] <= 10) output += Apriblender.thirdStrongMessages[0][thirdStrongest];
            else if (this.flavors[thirdStrongest] <= 20) output += Apriblender.thirdStrongMessages[1][thirdStrongest];
            else if (this.flavors[thirdStrongest] > 20) output += Apriblender.thirdStrongMessages[2][thirdStrongest];
        }

        return output;
    }

    blenderColor(): Apricorn {
        const nonzero = this.getNonzero();
        if (nonzero >= 4 || this.flavor === 0) return "Blk" as Apricorn;

        const strongest = this.getOrder()[0]
        switch (Apriblender.tastes[strongest]) {
            case "Spicy": return "Red";
            case "Sour": return "Ylw";
            case "Dry": return "Blu";
            case "Bitter": return "Grn";
            case "Sweet": return "Pnk";
        }
        return "Blk";
    }

    step(steps: number): Apriblender {
        this.mildness = this.capMildness(this.mildness + Math.floor(steps / 100));
        return this;
    }

    dropLiquid(): void {
        this.liquidLevel = Math.max(1, this.liquidLevel - 1);
    }

    setMildness(mild: number): number {
        if (mild === -1) this.mildness = 255;
        else if (mild === 256) this.mildness = 0;
        else this.mildness = this.capMildness(mild);
        return this.mildness;
    }

    getOrder(): number[] {
        return Array.from(Array(5).keys()).sort((a, b) => this.flavors[b] - this.flavors[a]);
    }

    getNonzero(): number {
        return this.flavors.filter(flavor => flavor > 0).length;
    }

    getWeakest(): number {
        const order = this.getOrder();
        let minIndex = order[order.length - 1];
        let minimum = this.flavors[minIndex];
        for (const index of order.reverse()) {
            if (this.flavors[index] <= minimum) minIndex = index;
        }
        return minIndex;
    }

    getSecondWeakest(): number {
        const order = this.getOrder();
        const minimum = this.flavors[order[order.length - 1]];
        for (const index of order.reverse()) {
            if (this.flavors[index] > minimum) {
                return index === order[0] ? order[order.length - 2] : index;
            }
        }
        return order[order.length - 2];
    }
}
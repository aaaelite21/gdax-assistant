class Band {
    constructor(min, percision) {
        this.count = 0;

        this.price = {};
        this.price.min = min;
        this.price.max = min + percision;
        this.price.mean = (this.price.min + this.price.max) * 0.5;
    }

    add(volume) {
        this.count++;
        if (volume) volume += volume;
    }

}

class BandList {
    constructor(minVal, maxVal, percision) {
        this.bands = [];
        this.sectionCount = Math.round((maxVal - minVal) / percision);
        this.bandSize = (maxVal - minVal) / this.sectionCount;

        for (let i = 0; i <= this.sectionCount; i++) {
            this.bands.push(new Band(minVal + this.bandSize * i, percision));
        }
    }

    /**
     *
     * @param {Number[]} SandR
     */
    analyze(SandR) {
        //get the number of turn arounds in each section
        SandR.forEach(price => {
            for (let i = 0; i < this.bands.length; i++) {
                let b = this.bands[i]
                if (price >= b.price.min && price < b.price.max) {
                    b.count++;
                    break;
                }
            }
        });

        //sort by most turn arounds
        this.bands.sort((a, b) => {
            if (a.count < b.count) {
                return 1;
            }
            if (a.count > b.count) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        //remove bands with zero count
        while (this.bands[this.bands.length - 1].count === 0) {
            this.bands.pop();
        }
    }

    seperateSupportAndResistance(price) {
        let support = [];
        let resistance = [];
        this.bands.forEach((band) => {
            if (band.price.mean > price) {
                resistance.push(band)
            } else {
                support.push(band)
            }
        });

        return {
            support: support.sort((a, b) => {
                if (a.price.mean < b.price.mean) return 1;
                if (a.price.mean > b.price.mean) return -1;
                return 0;
            }),
            resistance: resistance.sort((a, b) => {
                if (a.price.mean < b.price.mean) return -1;
                if (a.price.mean > b.price.mean) return 1;
                return 0;
            })
        }
    }

    pow(exp) {
        return Math.pow(this.percision, exp);
    }
}

module.exports = {
    Band: Band,
    BandList: BandList
}
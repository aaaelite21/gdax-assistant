class Band {
  constructor(min, bandSize) {
    this.count = 0;
    this.rank = Infinity;
    this.price = {};
    this.price.min = min;
    this.price.max = min + bandSize;
    this.price.mean = (this.price.min + this.price.max) * 0.5;
  }

  add(volume) {
    this.count++;
    if (volume) volume += volume;
  }
}

class BandList extends Array {
  constructor(a, b, c) {
    super();
    if (b !== undefined && c !== undefined) {
      let minVal = a,
        maxVal = b,
        bandSize = c;
      this.bandSize = bandSize;
      while (minVal < maxVal) {
        this.push(new Band(minVal, bandSize));
        minVal += this.bandSize;
      }
    } else {
      this.bandSize = a;
    }
  }

  /**
   *
   * @param {Number[]} SandR
   */
  analyze(SandR) {
    //get the number of turn arounds in each section
    SandR.forEach((price, rank) => {
      for (let i = 0; i < this.length; i++) {
        let b = this[i];
        if (price >= b.price.min && price < b.price.max) {
          if (rank < b.rank) b.rank = rank;
          b.count++;
          break;
        }
      }
    });

    //sort by most turn arounds
    this.orderByCount();

    //remove bands with zero count
    if (this.length > 0) {
      while (this[this.length - 1].count === 0) {
        this.pop();
      }
    }

    this.orderByPrice();
  }

  //added this for cleaner code
  seperate(price) {
    return this.seperateSupportAndResistance(price);
  }

  seperateSupportAndResistance(price) {
    let support = new BandList(this.bandSize);
    let resistance = new BandList(this.bandSize);
    this.forEach((band) => {
      if (band.price.mean > price) {
        resistance.push(band);
      } else {
        support.push(band);
      }
    });

    support.orderByPrice(-1);

    return {
      support: support,
      resistance: resistance,
    };
  }

  orderByRank(direction) {
    if (direction === undefined || direction !== -1) {
      this.sort((a, b) => {
        return a.rank - b.rank;
      });
    } else if (direction === -1) {
      this.sort((a, b) => {
        return b.rank - a.rank;
      });
    }
  }
  orderByCount(direction) {
    if (direction === undefined || direction !== -1) {
      this.sort((a, b) => {
        return b.count - a.count;
      });
    } else if (direction === -1) {
      this.sort((a, b) => {
        return a.count - b.count;
      });
    }
  }
  orderByPrice(direction) {
    if (direction === undefined || direction !== -1) {
      this.sort((a, b) => {
        return a.price.mean - b.price.mean;
      });
    } else if (direction === -1) {
      this.sort((a, b) => {
        return b.price.mean - a.price.mean;
      });
    }
  }
}

module.exports = {
  Band: Band,
  BandList: BandList,
};

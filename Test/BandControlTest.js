const assert = require("assert");
const BandControl = require("../Lib/BandControl");
const TestData = require("./TestData");

describe("#BandControl", () => {
  describe("#BandList", () => {
    describe("#Constructor", () => {
      const max = 201,
        min = 100,
        percission = 10;
      let bandlist = new BandControl.BandList(min, max, percission);
      it("is an array of bands", () => {
        bandlist.forEach((element) => {
          assert(element instanceof BandControl.Band);
        });
      });
      it("has a length of max-min over percission rounded up", () => {
        let target = Math.ceil((max - min) / percission);
        assert.equal(bandlist.length, target);
      });
      it("has a final max value greater than or equal to the range max", () => {
        let target = max;
        assert(bandlist[bandlist.length - 1].price.max >= target);
      });
    });
    describe("#SortingMethods", () => {
      const max = 201,
        min = 100,
        percission = 10;
      let bandlist = new BandControl.BandList(min, max, percission);
      bandlist.map((b) => {
        b.rank = Math.round(Math.random() * 1000);
        b.count = Math.round(Math.random() * 1000);
        return b;
      });
      describe("#orderByRank", () => {
        it("puts the bands in assending order of rank", () => {
          bandlist.orderByRank();
          for (let index = 1; index < bandlist.length; index++) {
            const e = bandlist[index];
            const ep = bandlist[index - 1];
            assert(e.rank >= ep.rank);
          }
          assert.notEqual(bandlist[0].rank, bandlist[bandlist.length - 1].rank);
        });
        it("puts the bands in desending order of rank", () => {
          bandlist.orderByRank(-1);
          for (let index = 1; index < bandlist.length; index++) {
            const e = bandlist[index];
            const ep = bandlist[index - 1];
            assert(e.rank <= ep.rank);
          }
          assert.notEqual(bandlist[0].rank, bandlist[bandlist.length - 1].rank);
        });
      });
      describe("#orderByCount", () => {
        it("puts the bands in desending order of count", () => {
          bandlist.orderByCount();
          for (let index = 1; index < bandlist.length; index++) {
            const e = bandlist[index];
            const ep = bandlist[index - 1];
            assert(e.count <= ep.count);
          }
          assert.notEqual(
            bandlist[0].count,
            bandlist[bandlist.length - 1].count,
          );
        });
        it("puts the bands in assending order of count", () => {
          bandlist.orderByCount(-1);
          for (let index = 1; index < bandlist.length; index++) {
            const e = bandlist[index];
            const ep = bandlist[index - 1];
            assert(e.count >= ep.count);
          }
          assert.notEqual(
            bandlist[0].count,
            bandlist[bandlist.length - 1].count,
          );
        });
      });
      describe("#orderByPrice", () => {
        it("puts the bands in assending order of price", () => {
          bandlist.orderByPrice();
          for (let index = 1; index < bandlist.length; index++) {
            const e = bandlist[index];
            const ep = bandlist[index - 1];
            assert(e.price.mean > ep.price.mean);
          }
          assert.notEqual(
            bandlist[0].price.mean,
            bandlist[bandlist.length - 1].price.mean,
          );
        });
        it("puts the bands in desending order of price", () => {
          bandlist.orderByPrice(-1);
          for (let index = 1; index < bandlist.length; index++) {
            const e = bandlist[index];
            const ep = bandlist[index - 1];
            assert(e.price.mean < ep.price.mean);
          }
          assert.notEqual(
            bandlist[0].price.mean,
            bandlist[bandlist.length - 1].price.mean,
          );
        });
      });
    });
    describe("#seperateSupportAndResistance", () => {
      const max = 201,
        min = 100,
        percission = 10;
      let bandlist = new BandControl.BandList(min, max, percission);
      bandlist.map((b) => {
        b.rank = Math.round(Math.random() * 1000);
        b.count = Math.round(Math.random() * 1000);
        return b;
      });
      it("returns two BandLists objects", () => {
        let sr = bandlist.seperateSupportAndResistance(153);
        assert(sr.support instanceof BandControl.BandList);
        assert(sr.resistance instanceof BandControl.BandList);
      });
      it("resistance and support object has the same bandSize as original object", () => {
        let sr = bandlist.seperateSupportAndResistance(153);
        assert(sr.support.bandSize, bandlist.bandSize);
        assert(sr.resistance.bandSize, bandlist.bandSize);
      });
      it("splits all bands amongst the s and r band lists", () => {
        let sr = bandlist.seperateSupportAndResistance(153);
        assert.equal(sr.support.length + sr.resistance.length, bandlist.length);
      });
      it("s and r's bands provide the same data that is in the old", () => {
        let sr = bandlist.seperate(153);
        bandlist.orderByPrice();
        sr.resistance.orderByPrice();
        sr.support.orderByPrice();
        assert.equal(
          sr.resistance[sr.resistance.length - 1].count,
          bandlist[bandlist.length - 1].count,
        );
        assert.equal(
          sr.resistance[sr.resistance.length - 1].rank,
          bandlist[bandlist.length - 1].rank,
        );
        assert.equal(sr.support[0].count, bandlist[0].count);
        assert.equal(sr.support[0].rank, bandlist[0].rank);
      });
      it("puts the support in price by desending order", () => {
        let { support } = bandlist.seperate(153);
        for (let i = 1; i < support.length - 1; i++) {
          assert(support[i - 1].price.mean > support[i].price.mean);
        }
      });
    });
    describe("#analyse", () => {
      const max = 201,
        min = 100,
        percission = 10;
      it("it removes all bands that do not appear in the S and R array", () => {
        let bl = new BandControl.BandList(min, max, percission);
        bl.analyze([125]);
        assert.equal(bl.length, 1);
      });
      it("assigns a rank to the bands based on their most recent accurance", () => {
        let bl = new BandControl.BandList(min, max, percission);
        bl.analyze([125, 125]);
        assert.equal(bl[0].rank, 0);
      });
      it("assigns a count to the bands based on the number of times a price was in it", () => {
        let bl = new BandControl.BandList(min, max, percission);
        bl.analyze([125, 121, 135]);
        assert.equal(bl[0].count, 2);
      });
    });
    describe("#currentBand", () => {
      const max = 201,
        min = 100,
        percission = 10;
      it("it returns the band that the currnet price is in", () => {
        let bl = new BandControl.BandList(min, max, percission);
        bl.analyze([125]);
        let c = bl.currentBand(120);
        assert.deepEqual(c.price, { min: 120, max: 130, mean: 125 });
      });
      it("it returns -1 if not is a price band", () => {
        let bl = new BandControl.BandList(min, max, percission);
        bl.analyze([125]);
        let c = bl.currentBand(15);
        assert.equal(c, -1);
      });
    });
  });
});

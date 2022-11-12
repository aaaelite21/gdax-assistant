const GdaxAssistant = require("../GdaxAssistant");
const {
  Adx,
  Sma,
  Atr,
  Highest,
  Lowest,
  IndexOfHighest,
  IndexOfLowest,
  Aroon,
  Percentile,
  Roi,
  FibRetracement,
} = GdaxAssistant.Indicators;
const assert = require("assert");
const TestData = require("gdax-sim-test-data");
const TestTimeFrame = TestData.candles.oneHour.slice().reverse();
describe("#Indicators", () => {
  describe("#Sma", () => {
    it("gets the sma", () => {
      assert.strictEqual(Sma(TestTimeFrame).toFixed(2), "435.14");
    });
  });
  describe("#Highest", () => {
    it("gets the Highest High as default", () => {
      assert.strictEqual(Highest(TestTimeFrame), 436);
    });
  });
  describe("#Lowest", () => {
    it("gets the Lowest close as default", () => {
      assert.strictEqual(Lowest(TestTimeFrame), 434.33);
    });
  });
  describe("#IndexOfLowest", () => {
    it("gets the index of the Lowest close as default", () => {
      assert.strictEqual(IndexOfLowest(TestTimeFrame), 58);
    });
  });
  describe("#IndexOfHighest", () => {
    it("gets the index of the highest close as default", () => {
      assert.strictEqual(IndexOfHighest(TestTimeFrame), 14);
    });
  });
  describe("#Roi", () => {
    it("get the ROI over the given time frame as a percent", () => {
      assert.strictEqual(Roi(TestTimeFrame).toFixed(2), "0.27");
    });
  });
  describe("#Aroon", () => {
    let aroon = Aroon(TestTimeFrame);
    it("gets the aroon-up", () => {
      assert.strictEqual(aroon.up.toFixed(2), "76.67");
    });
    it("gets the aroon-down", () => {
      assert.strictEqual(aroon.down.toFixed(2), "21.67");
    });
    it("gets the aroon-osilator", () => {
      assert.strictEqual(aroon.oscillator.toFixed(2), "55.00");
    });
  });
  describe("#Percentile", () => {
    let arr = [
      {
        close: 8,
      },
      {
        close: 9,
      },
      {
        close: 7,
      },
      {
        close: 10,
      },
      {
        close: 6,
      },
      {
        close: 5,
      },
      {
        close: 1,
      },
      {
        close: 4,
      },
      {
        close: 3,
      },
      {
        close: 2,
      },
    ];
    const clone = arr.slice(0);
    let percent = Percentile(arr, "close", 0.75);
    it("gets the percentile", () => {
      assert.strictEqual(percent, 8);
    });
    it("does not change candles", () => {
      assert.deepEqual(arr, clone);
    });
  });
});

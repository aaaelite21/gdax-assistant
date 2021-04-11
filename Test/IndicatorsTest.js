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
  describe("#FibRetracement", () => {
    it("works when the start is less than the end", () => {
      let fibs = FibRetracement(0, 100);
      assert.strictEqual(fibs.fib_000, 100);
      assert.strictEqual(fibs.fib_236, 76.4);
      assert.strictEqual(fibs.fib_382, 61.8);
      assert.strictEqual(fibs.fib_500, 50);
      assert.strictEqual(fibs.fib_618, 38.2);
      assert.strictEqual(fibs.fib_786.toFixed(1), "21.4");
      assert.strictEqual(fibs.fib_1000, 0);
    });
    it("works when the start is greater than the end", () => {
      let fibs = FibRetracement(100, 0);
      assert.strictEqual(fibs.fib_000, 0);
      assert.strictEqual(fibs.fib_236.toFixed(1), "23.6");
      assert.strictEqual(fibs.fib_382, 38.2);
      assert.strictEqual(fibs.fib_500, 50);
      assert.strictEqual(fibs.fib_618, 61.8);
      assert.strictEqual(fibs.fib_786.toFixed(1), "78.6");
      assert.strictEqual(fibs.fib_1000, 100);
    });
  });
});

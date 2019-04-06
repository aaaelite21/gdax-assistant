const Candle = require('../GdaxAssistant').Candle;
const assert = require('assert');
const TestData = require('./TestData');

describe('#Candle', () => {
    let testCandle = TestData.SingleCandleAsGdaxArray;
    let c = new Candle(testCandle);
    describe("#init", () => {
        it('has the proper time', () => {
            assert.equal(c.time, testCandle[0]);
        });
        it('multiplies the time by 1000 to compensate for accuracy of only 1 sec', () => {
            let targetTime = (new Date()).getTime();
            let timeTestCandleArray = [
                targetTime,
                TestData.SingleCandleAsGdaxArray[1],
                TestData.SingleCandleAsGdaxArray[2],
                TestData.SingleCandleAsGdaxArray[3],
                TestData.SingleCandleAsGdaxArray[4],
                TestData.SingleCandleAsGdaxArray[5],
                TestData.SingleCandleAsGdaxArray[6]
            ];
            timeTestCandleArray[0] = Math.round(targetTime / 1000);
            let timeTestCandle = new Candle(timeTestCandleArray);
            assert.equal(timeTestCandle.time, Math.round(targetTime / 1000) * 1000);
        });
        it('has the proper low', () => {
            assert.equal(c.low, testCandle[1])
        });
        it('has the proper high', () => {
            assert.equal(c.high, testCandle[2])
        });
        it('has the proper open', () => {
            assert.equal(c.open, testCandle[3])
        });
        it('has the proper close', () => {
            assert.equal(c.close, testCandle[4])
        });
        it('has the proper volume', () => {
            assert.equal(c.volume, testCandle[5])
        });
        it('has the proper percent', () => {
            assert.equal(c.percent, 100 * (testCandle[4] - testCandle[3]) / testCandle[3])
        });
        it('has the proper green', () => {
            assert.equal(c.percent, 100 * (testCandle[4] - testCandle[3]) / testCandle[3])
        });
        it('has the proper red', () => {
            assert.equal(c.percent, 100 * (testCandle[4] - testCandle[3]) / testCandle[3])
        });
    });

    describe("#toCsv", () => {
        it("returns the candle as a csv parseable string", () => {
            assert.equal(c.toCsv(), "0, 8, 12, 10, 11, 124")
        });
    });

    describe("#toArray", () => {
        it("returns the array as the gdax formatted array", () => {
            assert.deepEqual(TestData.SingleCandleAsGdaxArray, c.toArray());
        });
    });
});
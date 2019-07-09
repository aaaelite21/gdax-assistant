const GdaxAssistant = require('../GdaxAssistant');
const {
    Sma,
    Atr,
    Highest,
    Lowest,
    IndexOfHighest,
    IndexOfLowest,
    Aroon,
    Percentile
} = GdaxAssistant.Indicators;
const assert = require('assert');
const TestData = require('gdax-sim-test-data');
const TestTimeFrame = TestData.candles.oneHour.slice().reverse();
describe('#Indicators', () => {
    describe('#Sma', () => {
        it('gets the sma', () => {
            assert.equal(Sma(TestTimeFrame).toFixed(2), "435.14");
        });
    });
    describe('#Atr', () => {
        it('gets the Atr', () => {
            assert.equal(Atr(TestTimeFrame).toFixed(2), "0.07");
        });
    });
    describe('#Highest', () => {
        it('gets the Highest High as default', () => {
            assert.equal(Highest(TestTimeFrame), 436);
        });
    });
    describe('#Lowest', () => {
        it('gets the Lowest close as default', () => {
            assert.equal(Lowest(TestTimeFrame), 434.33);
        });
    });
    describe('#IndexOfLowest', () => {
        it('gets the index of the Lowest close as default', () => {
            assert.equal(IndexOfLowest(TestTimeFrame), 58);
        });
    });
    describe('#IndexOfHighest', () => {
        it('gets the index of the highest close as default', () => {
            assert.equal(IndexOfHighest(TestTimeFrame), 14);
        });
    });
    describe('#Aroon', () => {
        let aroon = Aroon(TestTimeFrame);
        it('gets the aroon-up', () => {
            assert.equal(aroon.up.toFixed(2), 76.67);
        });
        it('gets the aroon-down', () => {
            assert.equal(aroon.down.toFixed(2), 21.67);
        });
        it('gets the aroon-osilator', () => {
            assert.equal(aroon.oscillator.toFixed(2), 55.00);
        });
    });
    describe('#Percentile', () => {
        let arr = [{
            close: 8
        }, {
            close: 9
        }, {
            close: 7
        }, {
            close: 10
        }, {
            close: 6
        }, {
            close: 5
        }, {
            close: 1
        }, {
            close: 4
        }, {
            close: 3
        }, {
            close: 2
        }];
        const clone = arr.slice(0);
        let percent = Percentile(arr, "close", 0.75);
        it('gets the percentile', () => {
            assert.equal(percent, 8);
        });
        it('does not change candles', () => {
            assert.deepEqual(arr, clone);
        });
    });
});
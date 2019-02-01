const GdaxAssistant = require('../GdaxAssistant');
const {
    Sma,
    Atr,
    Highest,
    Lowest
} = GdaxAssistant.Indicators;
const assert = require('assert');
const TestData = require('./TestData');
const TestTimeFrame = TestData.BTC_USD_10_HOURS.reverse();
describe('#Indicators', () => {
    describe('#Sma', () => {
        it('gets the sma', () => {
            assert.equal(Sma(TestTimeFrame).toFixed(2), "3703.16");
        });
    });
    describe('#Atr', () => {
        it('gets the Atr', () => {
            assert.equal(Atr(TestTimeFrame).toFixed(2), "10.64");
        });
    });
    describe('#Highest', () => {
        it('gets the Highest High as default', () => {
            assert.equal(Highest(TestTimeFrame), 3745);
        });
    });
    describe('#Lowest', () => {
        it('gets the Lowest Low as default', () => {
            assert.equal(Lowest(TestTimeFrame), 3681.8);
        });
    });
});
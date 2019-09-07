const {
    Chart,
    Candle
} = require('../GdaxAssistant');
const TestData = require('gdax-sim-test-data');
const TestReturnedData = TestData.gdaxOutput.fifteenOneMinutes;
const assert = require('assert');

describe('Gdax-Chart', () => {
    describe('#Constructor', () => {
        it('has an array of gdax candles', () => {
            let c = new Chart(TestReturnedData);
            c.candles.forEach((ChartCandle) => {
                assert(ChartCandle instanceof Candle);
            });
        });
        it('has a candle array the same length as the input array', () => {
            let c = new Chart(TestReturnedData);
            assert.equal(c.candles.length, TestReturnedData.length);
        });
    });

    describe('#Adx', () => {
        it('has no value above 100', () => {
            let c = new Chart(TestReturnedData);
            let a = c.Adx(14);
            console.log(a)
            assert.equal(a.pDi, 95.12480499220196);
            assert.equal(a.nDi, 0);
            assert.equal(a.adx, 100);

        });
    });

    describe('#Sma', () => {
        let c = new Chart(TestReturnedData);
        it('returns the sma of the designated time frame', () => {
            let t = 0;
            for (let i = 0; i < c.candles.length; i++) {
                t += c.candles[i].close;
            }
            let sma = c.Sma(c.candles.length);
            assert.equal(sma, (t / c.candles.length));
        });
        it('returns the sma of the offset time frame', () => {
            let t = 0;
            for (let i = 1; i < c.candles.length; i++) {
                t += c.candles[i].close;
            }
            let sma = c.Sma(c.candles.length - 1, 1);
            assert.equal(sma, (t / (c.candles.length - 1)));
        });
        it('returns the sma of the lhoc value', () => {
            let t = 0;
            for (let i = 0; i < c.candles.length; i++) {
                t += c.candles[i].high;
            }
            let sma = c.Sma(c.candles.length, 0, 'high');
            assert.equal(sma, (t / c.candles.length));
        });
    });
    describe('#Highest', () => {
        let c = new Chart(TestReturnedData);
        it('returns the highest close of the designated time frame', () => {
            let h = c.Highest(c.candles.length);
            assert.equal(h, 3688.02);
        });
        it('returns the highest close of the offset time frame', () => {
            let h = c.Highest(c.candles.length - 4, 4);
            assert.equal(h, 3686.06);
        });
        it('returns the highest of the lhoc value', () => {
            let h = c.Highest(c.candles.length, 0, 'low');
            assert.equal(h, 3686.59);
        });
    });
    describe('#Lowest', () => {
        let c = new Chart(TestReturnedData);
        it('returns the lowest close of the designated time frame', () => {
            let l = c.Lowest(c.candles.length);
            assert.equal(l, 3683.56);
        });
        it('returns the lowest close of the offset time frame', () => {
            let l = c.Lowest(c.candles.length - 11, 11);
            assert.equal(l, 3683.56);
        });
        it('returns the lowest of the lhoc value', () => {
            let l = c.Lowest(c.candles.length - 11, 11, 'high');
            assert.equal(l, 3683.56);
        });
    });
    describe('#Atr', () => {
        let c = new Chart(TestReturnedData);
        it('returns the Atr of the designated time frame', () => {
            let t = 0;
            for (let i = 0; i < c.candles.length; i++) {
                t += Math.abs(c.candles[i].open - c.candles[i].close);
            }

            let atr = c.Atr(c.candles.length);
            assert.equal(atr, t / c.candles.length);
        });
        it('returns the Atr of the offset time frame', () => {
            let t = 0;
            for (let i = 2; i < c.candles.length; i++) {
                t += Math.abs(c.candles[i].open - c.candles[i].close);
            }

            let atr = c.Atr(c.candles.length - 2, 2);
            assert.equal(atr, t / (c.candles.length - 2));
        });

    });
    describe('#Aroon', () => {
        let c = new Chart(TestReturnedData);
        it('returns the aroon up', () => {
            assert.equal(c.Aroon(5).up, 100);
        });
        it('returns the aroon down', () => {
            assert.equal(c.Aroon(5).down, 60);
        });
        it('returns the aroon oscillator', () => {
            assert.equal(c.Aroon(5).oscillator, 40);
        });
    });
    describe('#IndexOfLowest & Lowest', () => {
        let c = new Chart(TestReturnedData);
        it('returns index of lowest close', () => {
            assert.equal(c.IndexOfLowest(2, 0, 'low'), 1);
        });
        it('returns lowest close', () => {
            assert.equal(c.Lowest(2, 0, 'low'), 3685.56);
        });
    });
});
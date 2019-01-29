const Candle = require('./GdaxCandle');
const Indicators = require('./Indicators');
class GdaxChart {
    constructor(RawCandleData) {
        //most recent is 0
        this.candles = [];
        for (let i = 0; i < RawCandleData.length; i++) {
            let c = new Candle(RawCandleData[i]);
            this.candles.push(c);
        }
    }

    Atr(length, offset) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Atr(targetTimeFrame);
    }

    Highest(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        if (lhoc === undefined) lhoc = 'high';
        return Indicators.Highest(targetTimeFrame, lhoc);
    }

    Lowest(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        if (lhoc === undefined) lhoc = 'low';
        return Indicators.Lowest(targetTimeFrame, lhoc);
    }

    Sma(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        if (lhoc === undefined) lhoc = 'close';
        return Indicators.Sma(targetTimeFrame, lhoc);
    }

    PreProcess(length, ofs) {
        if (length > this.candles.length) throw "Not enough candles";
        let offset = ofs === undefined ? 0 : Math.abs(ofs);
        let targetTimeFrame = this.candles.slice(offset, offset + length);
        return targetTimeFrame;
    }
}

module.exports = GdaxChart;
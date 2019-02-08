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

    Aroon(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Aroon(targetTimeFrame, lhoc)
    }

    Atr(length, offset) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Atr(targetTimeFrame);
    }

    Highest(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Highest(targetTimeFrame, lhoc);
    }

    IndexOfHighest(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.IndexOfHighest(targetTimeFrame, lhoc);
    }

    IndexOfLowest(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.IndexOfLowest(targetTimeFrame, lhoc);
    }

    Lowest(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Lowest(targetTimeFrame, lhoc);
    }

    Sma(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
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
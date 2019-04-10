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

    Aroon(length, offset) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Aroon(targetTimeFrame)
    }

    Atr(length, offset) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Atr(targetTimeFrame);
    }

    Highest(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Highest(targetTimeFrame, lhoc);
    }

    Ichimoku(tenkanLength, kijunLength, periodLength, clouOffset) {
        let targetTimeFrame = this.PreProcess(Math.max(periodLength + clouOffset), 0);
        return Indicators.Ichimoku(targetTimeFrame, tenkanLength, kijunLength, periodLength, clouOffset)
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

    Rms(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Rms(targetTimeFrame, lhoc);
    }

    Sma(length, offset, lhoc) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Sma(targetTimeFrame, lhoc);
    }

    Vwap(length, offset) {
        let targetTimeFrame = this.PreProcess(length, offset);
        return Indicators.Vwap(targetTimeFrame)
    }

    PreProcess(length, ofs) {
        if (length > this.candles.length) throw "Not enough candles";
        let offset = ofs === undefined ? 0 : Math.abs(ofs);
        let targetTimeFrame = this.candles.slice(offset, offset + length);
        return targetTimeFrame;
    }
}

module.exports = GdaxChart;
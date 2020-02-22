const Candle = require("./GdaxCandle");
const Indicators = require("./Indicators");
class GdaxChart {
  constructor(RawCandleData) {
    //most recent is 0
    this.candles = [];
    for (let i = 0; i < RawCandleData.length; i++) {

      let c;

      if (i < RawCandleData.length - 1)
        c = new Candle(RawCandleData[i], RawCandleData[i + 1]);
      else
        c = new Candle(RawCandleData[i]);

      this.candles.push(c);
    }
  }

  Adx(length, look_back, offset) {
    let lb = look_back === undefined ? Infinity : look_back;
    let ofs = offset === undefined ? 0 : Math.abs(offset);
    let targetTimeFrame = this.candles.slice(ofs, this.candles.length);
    return Indicators.Adx(targetTimeFrame, length, lb);
  }

  Dmi(length, look_back, offset) {
    return this.Adx(length, look_back, offset);
  }

  Aroon(length, offset) {
    let targetTimeFrame = this.PreProcess(length, offset);
    return Indicators.Aroon(targetTimeFrame);
  }

  Atr(length, look_back, offset) {
    let lb = look_back === undefined ? Infinity : look_back;
    let ofs = offset === undefined ? 0 : Math.abs(offset);
    let targetTimeFrame = this.candles.slice(ofs, this.candles.length);
    return Indicators.Atr(targetTimeFrame, length, lb);
  }
  BollingerBands(length, stdv, offset, lhoc) {
    let targetTimeFrame = this.PreProcess(length, offset);
    return Indicators.BollingerBands(targetTimeFrame, stdv, lhoc);
  }

  Ema(length, look_back, offset, lhoc) {
    let lb = look_back === undefined ? Infinity : look_back;
    let ofs = offset === undefined ? 0 : Math.abs(offset);
    let targetTimeFrame = this.candles.slice(ofs, this.candles.length);
    return Indicators.Ema(targetTimeFrame, length, lb, lhoc);
  }

  Highest(length, offset, lhoc) {
    let targetTimeFrame = this.PreProcess(length, offset);
    return Indicators.Highest(targetTimeFrame, lhoc);
  }

  Ichimoku(tenkanLength, kijunLength, periodLength, clouOffset) {
    let targetTimeFrame = this.PreProcess(
      Math.max(periodLength + clouOffset),
      0
    );
    return Indicators.Ichimoku(
      targetTimeFrame,
      tenkanLength,
      kijunLength,
      periodLength,
      clouOffset
    );
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

  Macd(short_length, long_length, smoothing, look_back, offset, lhoc) {
    let lb = look_back === undefined ? Infinity : look_back;
    let ofs = offset === undefined ? 0 : Math.abs(offset);
    let targetTimeFrame = this.candles.slice(ofs, this.candles.length);
    return Indicators.Macd(targetTimeFrame, short_length, long_length, smoothing, lb, lhoc);
  }

  Percentile(length, percentile, offset, lhoc) {
    let targetTimeFrame = this.PreProcess(length, offset);
    return Indicators.Percentile(targetTimeFrame, lhoc, percentile);
  }

  PivotPoints(offset) {
    let targetTimeFrame = this.PreProcess(1, offset);
    return Indicators.PivotPoints(targetTimeFrame);
  }

  Rsi(length, look_back, offset) {
    let lb = look_back === undefined ? Infinity : look_back;
    let ofs = offset === undefined ? 0 : Math.abs(offset);
    let targetTimeFrame = this.candles.slice(ofs, this.candles.length);
    return Indicators.Rsi(targetTimeFrame, length, lb);
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
    return Indicators.Vwap(targetTimeFrame);
  }

  PreProcess(length, ofs) {
    if (length > this.candles.length) throw "Not enough candles";
    let offset = ofs === undefined ? 0 : Math.abs(ofs);
    let targetTimeFrame = this.candles.slice(offset, offset + length);
    return targetTimeFrame;
  }
}

module.exports = GdaxChart;
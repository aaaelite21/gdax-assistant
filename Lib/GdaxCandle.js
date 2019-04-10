//LHOCV
class Candle {
    constructor(SingleGdaxCandleArray) {
        this.time = SingleGdaxCandleArray[0] * 1000;
        this.low = SingleGdaxCandleArray[1];
        this.high = SingleGdaxCandleArray[2];
        this.open = SingleGdaxCandleArray[3];
        this.close = SingleGdaxCandleArray[4];
        this.volume = SingleGdaxCandleArray[5];
        this.percent = 100 * (this.close - this.open) / this.open;
        this.green = this.close > this.open;
        this.red = this.close < this.open;
    }

    toArray() {
        return [this.time / 1000, this.low, this.high, this.open, this.close, this.volume]
    }

    toCsv() {
        let c = ", ";
        return (this.time / 1000 + c + this.low + c + this.high + c + this.open + c + this.close + c + this.volume);
    }
}

module.exports = Candle;
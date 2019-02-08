function Sma(candles, lhoc) {
    let sum = 0;
    lhoc = lhoc === undefined ? 'close' : lhoc;
    for (let i = 0; i < candles.length; i++) {
        sum += candles[i][lhoc];
    }
    return sum / candles.length;
};

function Atr(candles) {
    return (candles.map((candle) => {
        return Math.abs(candle.open - candle.close);
    }).reduce(getSum) / candles.length);
};

function Highest(candles, lhoc) {
    lhoc = lhoc === undefined ? 'high' : lhoc;
    let points = candles.map((candle) => {
        return candle[lhoc];
    });

    return max(points);
};

function IndexOfHighest(candles, lhoc) {
    lhoc = lhoc === undefined ? 'high' : lhoc;
    let points = candles.map((candle) => {
        return candle[lhoc];
    });
    let indexOfMax = -1;
    let max = -Infinity;
    points.forEach((value, index) => {
        if (value >= max) {
            indexOfMax = index;
            max = value;
        }
    });

    return indexOfMax;
};

function Lowest(candles, lhoc) {
    lhoc = lhoc === undefined ? 'low' : lhoc;
    let points = candles.map((candle) => {
        return candle[lhoc];
    });

    return min(points);
};

function IndexOfLowest(candles, lhoc) {
    lhoc = lhoc === undefined ? 'low' : lhoc;
    let points = candles.map((candle) => {
        return candle[lhoc];
    });
    let indexOfMin = -1;
    let min = Infinity;
    points.forEach((value, index) => {
        if (value <= min) {
            indexOfMin = index;
            min = value;
        }
    });

    return indexOfMin;
};

function Aroon(candles, lhoc) {
    lhoc = lhoc === undefined ? 'close' : lhoc;
    let up = 100 * (candles.length - IndexOfHighest(candles, lhoc)) / candles.length;
    let down = 100 * (candles.length - IndexOfLowest(candles, lhoc)) / candles.length
    let oscillator = up - down
    return {
        up: up,
        down: down,
        oscillator: oscillator
    }
};

module.exports = {
    Atr: Atr,
    Aroon: Aroon,
    Highest: Highest,
    IndexOfHighest: IndexOfHighest,
    IndexOfLowest: IndexOfLowest,
    Lowest: Lowest,
    Sma: Sma

}

function getSum(total, num) {
    return total + num;
}

function max(array) {
    let max = -Infinity;
    array.forEach(element => {
        if (element > max) {
            max = element;
        }
    });
    return max;
}

function min(array) {
    let min = Infinity;
    array.forEach(element => {
        if (element < min) {
            min = element;
        }
    });
    return min;
}
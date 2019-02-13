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
    lhoc = lhoc === undefined ? 'close' : lhoc;
    let points = candles.map((candle) => {
        return candle[lhoc];
    });

    return max(points);
};

function IndexOfHighest(candles, lhoc) {
    lhoc = lhoc === undefined ? 'close' : lhoc;
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
    lhoc = lhoc === undefined ? 'close' : lhoc;
    let points = candles.map((candle) => {
        return candle[lhoc];
    });

    return min(points);
};

function IndexOfLowest(candles, lhoc) {
    lhoc = lhoc === undefined ? 'close' : lhoc;
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

function Vwap(candles) {
    let sum = 0;
    let totalVolume = 0;
    for (let i = 0; i < candles.length; i++) {
        sum += ((candles[i].high + candles[i].low + candles[i].open) / 3) * candles[i].volume;
        totalVolume += candles[i].volume;
    }
    return sum / totalVolume;
}

function AlexEma(candles, lhoc) {
    lhoc = lhoc === undefined ? 'close' : lhoc;
    let sum = 0;
    let total = 0;

    let points = candles.map((candle) => {
        return candle[lhoc];
    });

    points.forEach((value, index) => {
        let scale = index + 1
        total += scale;
        sum += scale * value;
    })

    return sum / total;
}

function Rms(candles, lhoc) {
    lhoc = lhoc === undefined ? 'close' : lhoc;
    let mean = 0,
        squaredMean = 0;
    let points = candles.map((candle) => {
        return candle[lhoc];
    });

    points.forEach((value) => {
        mean += value;
    });

    mean /= points.length;

    points.forEach((value) => {
        squaredMean += Math.pow(value - mean, 2);
    });

    squaredMean /= points.length;

    return Math.sqrt(squaredMean);
}

module.exports = {
    AlexEma: AlexEma,
    Atr: Atr,
    Aroon: Aroon,
    Highest: Highest,
    IndexOfHighest: IndexOfHighest,
    IndexOfLowest: IndexOfLowest,
    Lowest: Lowest,
    Rms: Rms,
    Sma: Sma,
    Vwap: Vwap

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
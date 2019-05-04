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

function Aroon(candles) {
    let up = 100 * (candles.length - IndexOfHighest(candles, 'high')) / candles.length;
    let down = 100 * (candles.length - IndexOfLowest(candles, 'low')) / candles.length
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
        sum += ((candles[i].high + candles[i].low + candles[i].close) / 3) * candles[i].volume;
        totalVolume += candles[i].volume;
    }
    return sum / totalVolume;
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

function Ichimoku(candles, tenkanLength, kijunLength, periodLength, clouOffset) {
    let tenkansen = (Highest(candles.slice(0, tenkanLength), 'high') +
        Lowest(candles.slice(0, tenkanLength), 'low')) / 2;
    let kijunsen = (Highest(candles.slice(0, kijunLength), 'high') +
        Lowest(candles.slice(0, kijunLength), 'low')) / 2;

    let senkouSpanB = (Highest(candles.slice(clouOffset, clouOffset + periodLength), 'high') +
        Lowest(candles.slice(clouOffset, clouOffset + periodLength), 'low')) / 2;

    let oldTenkansen = (Highest(candles.slice(clouOffset, clouOffset + tenkanLength), 'high') +
        Lowest(candles.slice(clouOffset, clouOffset + tenkanLength), 'low')) / 2;
    let oldKijunsen = (Highest(candles.slice(clouOffset, clouOffset + kijunLength), 'high') +
        Lowest(candles.slice(clouOffset, clouOffset + kijunLength), 'low')) / 2;
    let senkouSpanA = (oldTenkansen + oldKijunsen) / 2;

    return {
        cloud: {
            top: Math.max(senkouSpanA, senkouSpanB),
            bottom: Math.min(senkouSpanA, senkouSpanB),
            bullish: senkouSpanA > senkouSpanB,
            bearish: senkouSpanB > senkouSpanA
        },
        tkCross: tenkansen > kijunsen,
        ktCross: kijunsen > tenkansen,
        kijunsen: kijunsen,
        tenkansen: tenkansen
    }
}

function Rsi(candles, lhoc) {
    let length = candles.length;
    lhoc = lhoc === undefined ? 'close' : lhoc;
    let points = candles.map((value) => {
        return value[lhoc];
    }).reverse();

    let sumGains = 0,
        countGains = 0,
        countLosses = 0,
        sumLoss = 0;

    for (let i = 1; i < points.length; i++) {
        let diff = points[i] - points[i - 1];
        if (diff >= 0) {
            sumGains += diff;
            countGains++;
        } else {
            sumLoss -= diff;
            countLosses++;
        }
    }

    if (countGains === 0) return 0;
    if (countLosses === 0) return 100;

    let rs = (sumGains / length) / (sumLoss / length);

    return 100 - (100 / (1 + rs));
}

module.exports = {
    Atr: Atr,
    Aroon: Aroon,
    Highest: Highest,
    Ichimoku: Ichimoku,
    IndexOfHighest: IndexOfHighest,
    IndexOfLowest: IndexOfLowest,
    Lowest: Lowest,
    Rms: Rms,
    Rsi: Rsi,
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
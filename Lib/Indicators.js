function Sma(candles, lhoc) {
    let sum = 0;
    lhoc = lhoc === undefined ? "close" : lhoc;
    for (let i = 0; i < candles.length; i++) {
        sum += candles[i][lhoc];
    }
    return sum / candles.length;
}

function Atr(candles) {
    return (
        candles
        .map(candle => {
            return Math.abs(candle.open - candle.close);
        })
        .reduce(getSum) / candles.length
    );
}

function Highest(candles, lhoc) {
    lhoc = lhoc === undefined ? "close" : lhoc;
    let points = candles.map(candle => {
        return candle[lhoc];
    });

    return max(points);
}

function IndexOfHighest(candles, lhoc) {
    lhoc = lhoc === undefined ? "close" : lhoc;
    let points = candles.map(candle => {
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
}

function Lowest(candles, lhoc) {
    lhoc = lhoc === undefined ? "close" : lhoc;
    let points = candles.map(candle => {
        return candle[lhoc];
    });

    return min(points);
}

function IndexOfLowest(candles, lhoc) {
    lhoc = lhoc === undefined ? "close" : lhoc;
    let points = candles.map(candle => {
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
}

function Aroon(candles) {
    let up =
        (100 * (candles.length - IndexOfHighest(candles, "high"))) / candles.length;
    let down =
        (100 * (candles.length - IndexOfLowest(candles, "low"))) / candles.length;
    let oscillator = up - down;
    return {
        up: up,
        down: down,
        oscillator: oscillator
    };
}

function Vwap(candles) {
    let sum = 0;
    let totalVolume = 0;
    for (let i = 0; i < candles.length; i++) {
        sum +=
            ((candles[i].high + candles[i].low + candles[i].close) / 3) *
            candles[i].volume;
        totalVolume += candles[i].volume;
    }
    return sum / totalVolume;
}

function Rms(candles, lhoc) {
    lhoc = lhoc === undefined ? "close" : lhoc;
    let mean = 0,
        squaredMean = 0;
    let points = candles.map(candle => {
        return candle[lhoc];
    });

    points.forEach(value => {
        mean += value;
    });

    mean /= points.length;

    points.forEach(value => {
        squaredMean += Math.pow(value - mean, 2);
    });

    squaredMean /= points.length;

    return Math.sqrt(squaredMean);
}

function Ichimoku(
    candles,
    tenkanLength,
    kijunLength,
    periodLength,
    clouOffset
) {
    let tenkansen =
        (Highest(candles.slice(0, tenkanLength), "high") +
            Lowest(candles.slice(0, tenkanLength), "low")) /
        2;
    let kijunsen =
        (Highest(candles.slice(0, kijunLength), "high") +
            Lowest(candles.slice(0, kijunLength), "low")) /
        2;

    let senkouSpanB =
        (Highest(candles.slice(clouOffset, clouOffset + periodLength), "high") +
            Lowest(candles.slice(clouOffset, clouOffset + periodLength), "low")) /
        2;

    let oldTenkansen =
        (Highest(candles.slice(clouOffset, clouOffset + tenkanLength), "high") +
            Lowest(candles.slice(clouOffset, clouOffset + tenkanLength), "low")) /
        2;
    let oldKijunsen =
        (Highest(candles.slice(clouOffset, clouOffset + kijunLength), "high") +
            Lowest(candles.slice(clouOffset, clouOffset + kijunLength), "low")) /
        2;
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
    };
}

function Rsi(candles, length, look_back) {
    let {
        avg_gains,
        avg_losses
    } = SmoothedAverageLossAndGains(candles, length, look_back);

    if (avg_gains === 0) {
        return 0;
    }
    if (avg_losses === 0) {
        return 100;
    } else {
        let rs = avg_gains / avg_losses;
        return 100 - 100 / (1 + rs);
    }
}

function SmoothedAverageLossAndGains(candles, length, look_back) {
    let current = candles[0].close - candles[1].close
    let ret = {
        avg_gains: current > 0 ? current : 0,
        avg_losses: current < 0 ? -1 * current : 0
    }

    //keep it accurate as we reach the end
    let N = length;
    if (candles.length > length && look_back > 0) {

        //get the previous value
        let prime = SmoothedAverageLossAndGains(candles.slice(1), length, look_back - 1);
        ret.avg_gains = ((N - 1) * prime.avg_gains + ret.avg_gains) / N;
        ret.avg_losses = ((N - 1) * prime.avg_losses + ret.avg_losses) / N;
    } else {
        let sumGains = 0,
            sumLoss = 0;

        for (let i = 0; i < length - 1; i++) {
            let diff = candles[i].close - candles[i + 1].close;
            if (diff > 0) {
                sumGains += diff;
            } else {
                sumLoss -= diff;
            }
        }

        ret.avg_gains = sumGains / N;
        ret.avg_losses = sumLoss / N;
    }

    return ret;
}

function Percentile(candles, lhoc, percentile) {
    lhoc = lhoc === undefined ? "close" : lhoc;
    let arr = candles.map(candle => {
        return candle[lhoc];
    });
    arr.sort();
    let index = Math.round(arr.length * percentile);

    return arr[index];
}

/**
 *
 * @param {Array} candles
 * @param {Number} length
 */
function Adx(candles, length, look_back) {
    //get the atr
    let adx = 0;
    let atr = SmoothedAtr(candles, length, look_back);
    let pDi = (100 * SmoothedPositiveMovemnet(candles, length, look_back)) / atr;
    let nDi = (100 * SmoothedNegativeMovemnet(candles, length, look_back)) / atr;
    let sum = Math.abs(pDi + nDi);
    let dx = Math.abs(pDi - nDi) / (sum === 0 ? 1 : sum);

    if (candles.length > length && look_back > 0) {
        //keep it accurate as we reach the end
        let N = length;
        //get the previous value
        let prime = Adx(candles.slice(1), length, look_back - 1).dx;
        dx = ((N - 1) * prime + dx) / N;
    }

    adx = dx * 100;
    return {
        adx: adx,
        pDi: pDi,
        nDi: nDi,
        dx: dx
    };
}

function SmoothedPositiveMovemnet(candles, length, look_back) {
    let ret = null;

    //get the current dm (eazy)
    let up_move = candles[0].high - candles[1].high;
    let down_move = candles[1].low - candles[0].low;
    let cdm = 0;
    if (up_move > down_move && up_move > 0) cdm = up_move;

    if (candles.length > length && look_back > 0) {
        //keep it accurate as we reach the end
        let N = length;
        //get the previous value
        let prime = SmoothedPositiveMovemnet(candles.slice(1), length, look_back - 1);
        ret = ((N - 1) * prime + cdm) / N;
    } else {
        //base case
        ret = cdm;
    }

    //Yo no me gusta multiple return values
    return ret;
}

function SmoothedNegativeMovemnet(candles, length, look_back) {
    let ret = null;

    //get the current dm (eazy)
    let up_move = candles[0].high - candles[1].high;
    let down_move = candles[1].low - candles[0].low;

    let cdm = 0;
    if (down_move > up_move && down_move > 0) cdm = down_move;

    if (candles.length > length && look_back > 0) {
        //keep it accurate as we reach the end
        let N = length;
        //get the previous value
        let prime = SmoothedNegativeMovemnet(candles.slice(1), length, look_back - 1);
        ret = ((N - 1) * prime + cdm) / N;
    } else {
        //base case
        ret = cdm;
    }

    //Yo no me gusta multiple return values
    return ret;
}

function SmoothedAtr(candles, length, look_back) {
    let c = candles[0];
    let ret = c.tr;
    if (candles.length > length && look_back > 0) {
        let N = length;
        let prime = SmoothedAtr(candles.slice(1), length, look_back - 1);
        ret = ((N - 1) * prime + ret) / N;
    }

    return ret;
}

module.exports = {
    Adx: Adx,
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
    Vwap: Vwap,
    Percentile: Percentile
};

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
module.exports = {
    Sma: function (candles, value) {
        let sum = 0;
        value = value === undefined ? 'close' : value;
        for (let i = 0; i < candles.length; i++) {
            sum += candles[i][value];
        }
        return sum / candles.length;
    },
    Atr: function (candles) {
        return (candles.map((candle) => {
            return Math.abs(candle.open - candle.close);
        }).reduce(getSum) / candles.length);
    },
    Highest: function (candles, value) {
        value = value === undefined ? 'high' : value;
        let points = candles.map((candle) => {
            return candle[value];
        });

        return max(points);
    },
    Lowest: function (candles, value) {
        value = value === undefined ? 'low' : value;
        let points = candles.map((candle) => {
            return candle[value];
        });

        return min(points);
    }
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
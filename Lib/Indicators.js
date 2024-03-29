let BandControl = require("./BandControl");

function PivotPoints(candles) {
  let high = candles[0].high,
    low = candles[0].low,
    close = candles[0].close;

  let P = (high + low + close) / 3;
  let R1 = P * 2 - low;
  let R2 = P + (high - low);
  let S1 = P * 2 - high;
  let S2 = P - (high - low);

  return {
    s1: S1,
    s2: S2,
    r1: R1,
    r2: R2,
  };
}

function Sma(candles, lhoc) {
  let sum = 0;
  lhoc = lhoc === undefined ? "close" : lhoc;
  for (let i = 0; i < candles.length; i++) {
    sum += candles[i][lhoc];
  }
  return sum / candles.length;
}

function Atr(candles, length, offset) {
  return SmoothedAtr(candles, length, offset);
}

function Highest(candles, lhoc) {
  lhoc = lhoc === undefined ? "close" : lhoc;
  let points = candles.map((candle) => {
    return candle[lhoc];
  });

  return max(points);
}

function IndexOfHighest(candles, lhoc) {
  lhoc = lhoc === undefined ? "close" : lhoc;
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
}

function Lowest(candles, lhoc) {
  lhoc = lhoc === undefined ? "close" : lhoc;
  let points = candles.map((candle) => {
    return candle[lhoc];
  });

  return min(points);
}

function IndexOfLowest(candles, lhoc) {
  lhoc = lhoc === undefined ? "close" : lhoc;
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
    oscillator: oscillator,
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
  let total = 0,
    mean = 0,
    squaredMean = 0;

  let points = candles.map((candle) => {
    return candle[lhoc];
  });

  points.forEach((value) => {
    total += value;
  });

  mean = total / points.length;

  points.forEach((value) => {
    squaredMean += Math.pow(value - mean, 2);
  });

  squaredMean /= points.length;

  return Math.sqrt(squaredMean);
}

function Roi(candles, lhoc) {
  lhoc = lhoc === undefined ? "close" : lhoc;
  return (
    100 *
    ((candles[0][lhoc] - candles[candles.length - 1][lhoc]) /
      candles[candles.length - 1][lhoc])
  );
}

function Ichimoku(
  candles,
  tenkanLength,
  kijunLength,
  periodLength,
  cloudOffset,
) {
  let cloudOffsetIndex = cloudOffset - 1;

  let tenkansen =
    (Highest(candles.slice(0, tenkanLength), "high") +
      Lowest(candles.slice(0, tenkanLength), "low")) /
    2;
  let kijunsen =
    (Highest(candles.slice(0, kijunLength), "high") +
      Lowest(candles.slice(0, kijunLength), "low")) /
    2;

  let senkouSpanB =
    (Highest(
      candles.slice(cloudOffsetIndex, cloudOffsetIndex + periodLength),
      "high",
    ) +
      Lowest(
        candles.slice(cloudOffsetIndex, cloudOffsetIndex + periodLength),
        "low",
      )) /
    2;

  let oldTenkansen =
    (Highest(
      candles.slice(cloudOffsetIndex, cloudOffsetIndex + tenkanLength),
      "high",
    ) +
      Lowest(
        candles.slice(cloudOffsetIndex, cloudOffsetIndex + tenkanLength),
        "low",
      )) /
    2;

  let oldKijunsen =
    (Highest(
      candles.slice(cloudOffsetIndex, cloudOffsetIndex + kijunLength),
      "high",
    ) +
      Lowest(
        candles.slice(cloudOffsetIndex, cloudOffsetIndex + kijunLength),
        "low",
      )) /
    2;

  let senkouSpanA = (oldTenkansen + oldKijunsen) / 2;

  let forward = [];

  for (let i = 1; i < cloudOffset; i++) {
    let cofs = cloudOffsetIndex - i;

    let temp_senkouSpanB =
      (Highest(candles.slice(cofs, cofs + periodLength), "high") +
        Lowest(candles.slice(cofs, cofs + periodLength), "low")) /
      2;

    let temp_oldTenkansen =
      (Highest(candles.slice(cofs, cofs + tenkanLength), "high") +
        Lowest(candles.slice(cofs, cofs + tenkanLength), "low")) /
      2;

    let temp_oldKijunsen =
      (Highest(candles.slice(cofs, cofs + kijunLength), "high") +
        Lowest(candles.slice(cofs, cofs + kijunLength), "low")) /
      2;

    let temp_senkouSpanA = (temp_oldTenkansen + temp_oldKijunsen) / 2;

    forward.push({
      top: Math.max(temp_senkouSpanA, temp_senkouSpanB),
      bottom: Math.min(temp_senkouSpanA, temp_senkouSpanB),
      bullish: temp_senkouSpanA > temp_senkouSpanB,
      bearish: temp_senkouSpanB > temp_senkouSpanA,
    });
  }

  return {
    cloud: {
      top: Math.max(senkouSpanA, senkouSpanB),
      bottom: Math.min(senkouSpanA, senkouSpanB),
      bullish: senkouSpanA > senkouSpanB,
      bearish: senkouSpanB > senkouSpanA,
      forward: forward,
    },
    tkCross: tenkansen > kijunsen,
    ktCross: kijunsen > tenkansen,
    kijunsen: kijunsen,
    tenkansen: tenkansen,
  };
}

function KnowSureThing(candles, lhoc, short, long, signal) {
  //need to have atleast 45 candles
  lhoc = lhoc === undefined ? "close" : lhoc;
  short = short === undefined ? 10 : short;
  long = long === undefined ? 15 : long;
  signal = signal === undefined ? 9 : signal;

  let cc = candles.slice(0, candles.length);
  let kstArray = [];
  for (let i = 0; i < signal; i++) {
    kstArray.push(_KST(cc, lhoc, short, long));
    cc.shift();
  }

  return { kst: kstArray[0], signal: average(kstArray) };
}

function Rsi(candles, length, look_back) {
  let { avg_gains, avg_losses } = SmoothedAverageLossAndGains(
    candles,
    length,
    look_back,
  );

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

function Percentile(candles, lhoc, percentile) {
  lhoc = lhoc === undefined ? "close" : lhoc;
  let arr = candles.map((candle) => {
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
    dx: dx,
  };
}

function Ema(candles, length, look_back, lhoc) {
  lhoc = lhoc === undefined ? "close" : lhoc;
  let ret = 0;
  if (candles.length > length && look_back > 0) {
    //keep it accurate as we reach the end
    let N = length;
    let k = 2 / (N + 1);
    let price = candles[0][lhoc];
    //get the previous value
    let prime = Ema(candles.slice(1), length, look_back - 1, lhoc);
    ret = k * (price - prime) + prime;
  } else {
    ret = Sma(candles.slice(0, length), lhoc);
  }

  return ret;
}

function BollingerBands(candles, stdv, lhoc) {
  stdv = stdv === undefined ? 2 : stdv;
  lhoc = lhoc === undefined ? "close" : lhoc;
  let sma = Sma(candles, lhoc);
  let rms = Rms(candles, lhoc);

  return {
    sma: sma,
    top: sma + rms * stdv,
    bottom: sma - rms * stdv,
  };
}

function Macd(candles, shortLength, longLength, smoothing, look_back, lhoc) {
  let macdArray = [],
    long,
    short;
  for (let i = 0; i < candles.length - longLength; i++) {
    let c = candles.slice(i, candles.length);
    let _short = Ema(c, shortLength, look_back, lhoc),
      _long = Ema(c, longLength, look_back, lhoc);
    if (i === 0) {
      short = _short;
      long = _long;
    }
    macdArray.push({
      macd: _short - _long,
    });
  }

  let signal = Ema(macdArray, smoothing, 100, "macd"),
    macd = macdArray[0].macd;

  return {
    short: short,
    long: long,
    macd: macd,
    signal: signal,
    histogram: macd - signal,
  };
}

function SrLevels(candles, smoothing, bandSize, lhoc) {
  lhoc = lhoc === undefined ? "close" : lhoc;
  smoothing = smoothing === undefined ? 10 : smoothing;
  bandSize =
    bandSize === undefined ? Atr(candles, smoothing, smoothing * 5) : bandSize;
  let sp = []; //smoothed points
  let dx_sp = []; //rate of change between each smoothed point

  for (let i = 0; i < candles.length - smoothing; i++) {
    sp.push(Sma(candles.slice(i, i + smoothing), lhoc));
    if (i > 0) {
      dx_sp.push(sp[i - 1] - sp[i]);
    }
  }

  sp.pop(); //get rid of odd man out who has no rate of change

  let SandR = [];

  for (let i = 1; i < dx_sp.length; i++) {
    if (
      (dx_sp[i] >= 0 && dx_sp[i - 1] < 0) ||
      (dx_sp[i] <= 0 && dx_sp[i - 1] > 0)
    ) {
      SandR.push(sp[i]);
    }
  }

  let minVal = min(SandR);
  let maxVal = max(SandR);

  let bl = new BandControl.BandList(minVal, maxVal, bandSize);

  bl.analyze(SandR);

  return bl;
}

module.exports = {
  Adx: Adx,
  Atr: Atr,
  Aroon: Aroon,
  BollingerBands: BollingerBands,
  Ema: Ema,
  Highest: Highest,
  KST: KnowSureThing,
  Ichimoku: Ichimoku,
  IndexOfHighest: IndexOfHighest,
  IndexOfLowest: IndexOfLowest,
  Lowest: Lowest,
  Macd: Macd,
  PivotPoints: PivotPoints,
  Rms: Rms,
  Rsi: Rsi,
  Roi: Roi,
  Sma: Sma,
  SrLevels: SrLevels,
  Vwap: Vwap,
  Percentile: Percentile,
};

function ROC(currentValue, previousValue) {
  return (currentValue / previousValue - 1) * 100;
}

function _KST(candles, lhoc, short, long) {
  //Calc RCMA #1 10-Period SMA of 10-period ROC
  let rcm1 = [],
    //Calc RCMA #2 10-Period SMA of 15-period ROC
    rcm2 = [],
    //Calc RCMA #3 10-Period SMA of 20-period ROC
    rcm3 = [],
    //Calc RCMA #4 15-Period SMA of 30-period ROC
    rcm4 = [];
  for (let i = 0; i < long; i++) {
    if (i < 10) {
      rcm1.push(ROC(candles[i][lhoc], candles[i + short][lhoc]));
      rcm2.push(ROC(candles[i][lhoc], candles[i + long][lhoc]));
      rcm3.push(ROC(candles[i][lhoc], candles[i + short * 2][lhoc]));
    }
    rcm4.push(ROC(candles[i][lhoc], candles[i + long * 2][lhoc]));
  }
  let rmca1 = average(rcm1),
    rmca2 = average(rcm2),
    rmca3 = average(rcm3),
    rmca4 = average(rcm4);

  return rmca1 + rmca2 * 2 + rmca3 * 3 + rmca4 * 4;
}

function average(array) {
  let total = 0;
  array.forEach((val) => {
    total += val;
  });
  return total / array.length;
}

function max(array) {
  let max = -Infinity;
  array.forEach((element) => {
    if (element > max) {
      max = element;
    }
  });
  return max;
}

function min(array) {
  let min = Infinity;
  array.forEach((element) => {
    if (element < min) {
      min = element;
    }
  });
  return min;
}

function SmoothedAverageLossAndGains(candles, length, look_back) {
  let current = candles[0].close - candles[1].close;
  let ret = {
    avg_gains: current > 0 ? current : 0,
    avg_losses: current < 0 ? -1 * current : 0,
  };

  //keep it accurate as we reach the end
  let N = length;
  if (candles.length > length && look_back > 0) {
    //get the previous value
    let prime = SmoothedAverageLossAndGains(
      candles.slice(1),
      length,
      look_back - 1,
    );
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
    let prime = SmoothedPositiveMovemnet(
      candles.slice(1),
      length,
      look_back - 1,
    );
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
    let prime = SmoothedNegativeMovemnet(
      candles.slice(1),
      length,
      look_back - 1,
    );
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

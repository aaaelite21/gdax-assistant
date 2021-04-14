# Gdax-Assistant

A library of useful tools and classes for working with information gathered via the Coinbase-Pro (Gdax) API

## Gdax-Chart

## Indicators

### Atr

- Average true range of the set length

### Aroon

- Gets the Arron up, down and oscillator of the specafied time

### Highest

- Gets the highest candle variable over the specafied time frame

### Lowest

- Gets the lowest candle variable over the specafied time frame

### Sma

- Gets the smotthed moving average of the specafied candle variable

### Adx/Dmi

- Gets the Adx, +Di (pDi) and -Di (nDi) of the current set of data

### PivotPoints

- returns two support values (s1, s2) where s1 > s2 and two resistance values (r1, r2) where r1 < r2.

- JSON object format: {s1, s2, r1, r2}

### Macd

- input: (short ema length, long ema length, smoothing length, recursive lookback, offset, candle attribute)
- output: { short: short ema value, long: long ema value, macd: macd value, signal: signal line value, histogram: macd - signal}

```
    let pivots = chart.PivotPoints();
    console.log(pivots.r2);
    console.log(pivots.r1);
    console.log(pivots.s1);
    console.log(pivots.s2);
```

### Know Sure Thing (KST)

- input: (lhoc: string, short: int, long: int, signal: int)
  - defaults ('close', 10, 15, 9)
- output {kst: float, signal: float}

### SrBands

- input: (smoothing, bandSize, length, offset, lhoc)
  - Defaults
    - smoothing: 10
    - bandSize: Atr(smoothing)
    - length: chart.candles.length (all candles)
    - offset: 0
    - lhoc: 'close'
- output: BandList Object
  - BandList []: Band Objects sorted by the count (highest count at 0 index)
    - Bands
      - count #: number of times there is a turn around in that band intender to determine the value/weight of a given band
      - rank #: periods since smoothed average tested that level
      - price {}:
        - min #: min price in the band
        - max #: max price in the band
        - mean #: mean of the min and max values
    - orderByRank(dir)
      - sorts the BandList by rank in assending order. if dir = -1 desending order
    - orderByPrice(dir)
      - sorts the BandList by price.mean in desending order. if dir = -1 assending order
    - orderByCount(dir)
      - sorts the BandList by count rank in assending order. if dir = -1 desneding order
    - getCurrent(price)
      - gets the current band that the price resides in and returns -1 if there is no range
    - seperateSupportAndResistance(price): seperates the bads into those above and below price
      - shorthand mapping: seperate(price)
      - inputs:
        - price #: price used to mark what is support and what is resistance
        - output:
          - object containing two sorted BandList objects, resistance and support
            - resistance: band's with a price.mean above the input price. 0 index is lowest price
            - support: band's with a price.mean below the input price. 0 index is highest price
  - Example:
  ```
   let bands = chart.SrBands();
   let sr = bands.seperateSupportAndResistance(chart.candles[0].close);
   sr.resistance.reverse().forEach(r => {
        console.log(r.price.mean);
      });
      console.log();
      sr.support.forEach(s => {
        console.log(s.price.mean);
      });
  ```

## Gdax-Candle

    -   time: millisecond time of open
    -   low: low price for the candle
    -   high: high price for the candle
    -   open: opening price for the candle
    -   close: closing price for the candle
    -   volume: volume for the candle
    -   percent: percent change open to close
    -   diff: change in price (close - open)
    -   range: difference of high and low (high - low)
    -   green: close > open
    -   red: close < open
    -   head: high - max(open, close)
    -   tail: min(open, close) - tail
    -   body: max(close, open) - min(close, open)
    -   twap: (close + low + high) / 3
    -   tr: true range (only if previous candle)

    function toArray()
        -   Returns a gdax pattern array of
            time, low, high, open, close, volume

    function toArray()
        -   Returns a gdax pattern csv string of
            time, low, high, open, close, volume

## Fibs

Code

```
const { Fibs } = require("gdax-assistant");

let levels = Fibs(50, 100);
```

### Outputs

```
levels = {
fib_n0618: 130.9,
fib_n0389: 119.1,
fib_0000: 100,
fib_0236: 88.2,
fib_0382: 80.9,
fib_0500: 75,
fib_0618: 69.1,
fib_0786: 60.699999999999996,
fib_1000: 50,
fib_1414: 29.299999999999997,
fib_2414: -20.700000000000003
}
```

The above code is used when calulating the fibs retracements and extensions after a move from 50 to 100 dollars.
The "n" in the name denotes a negative number. For example n0618 is the -0.618 extension level.

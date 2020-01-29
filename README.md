# Gdax-Assistant

A library of useful tools and classes for working with information gathered via the Coinbase-Pro (Gdax) API

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

```
    let pivots = chart.PivotPoints();
    console.log(pivots.r2);
    console.log(pivots.r1);
    console.log(pivots.s1);
    console.log(pivots.s2);
```

## Gdax-Chart

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

```

```

module.exports = function Fibs(start, end) {
  const levels = [
    -0.618,
    -0.382,
    0.236,
    0.382,
    0.5,
    0.618,
    0.786,
    1.414,
    2.414,
  ];
  let diff = Math.abs(start - end);
  let fibs = levels.map((value) => {
    return diff * value;
  });
  return {
    fib_n0618: end > start ? end - fibs[0] : end + fibs[0],
    fib_n0389: end > start ? end - fibs[1] : end + fibs[1],
    fib_0000: end,
    fib_0236: end > start ? end - fibs[2] : end + fibs[2],
    fib_0382: end > start ? end - fibs[3] : end + fibs[3],
    fib_0500: end > start ? end - fibs[4] : end + fibs[4],
    fib_0618: end > start ? end - fibs[5] : end + fibs[5],
    fib_0786: end > start ? end - fibs[6] : end + fibs[6],
    fib_1000: start,
    fib_1414: end > start ? end - fibs[7] : end + fibs[7],
    fib_2414: end > start ? end - fibs[8] : end + fibs[8],
  };
};

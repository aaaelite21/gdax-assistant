const { Fibs } = require("../GdaxAssistant");
const assert = require("assert");

describe("#FibRetracement", () => {
  it("works when the start is less than the end", () => {
    let fibs = Fibs(0, 100);
    assert.strictEqual(fibs.fib_n0618, 161.8);
    assert.strictEqual(fibs.fib_n0389, 138.2);
    assert.strictEqual(fibs.fib_0000, 100);
    assert.strictEqual(fibs.fib_0236, 76.4);
    assert.strictEqual(fibs.fib_0382, 61.8);
    assert.strictEqual(fibs.fib_0500, 50);
    assert.strictEqual(fibs.fib_0618, 38.2);
    assert.strictEqual(fibs.fib_0786.toFixed(1), "21.4");
    assert.strictEqual(fibs.fib_1414.toFixed(1), "-41.4");
  });
  it("works when the start is greater than the end", () => {
    let fibs = Fibs(100, 0);
    assert.strictEqual(fibs.fib_n0618, -61.8);
    assert.strictEqual(fibs.fib_n0389, -38.2);
    assert.strictEqual(fibs.fib_0000, 0);
    assert.strictEqual(fibs.fib_0236.toFixed(1), "23.6");
    assert.strictEqual(fibs.fib_0382, 38.2);
    assert.strictEqual(fibs.fib_0500, 50);
    assert.strictEqual(fibs.fib_0618, 61.8);
    assert.strictEqual(fibs.fib_0786.toFixed(1), "78.6");
    assert.strictEqual(fibs.fib_1000, 100);
    assert.strictEqual(fibs.fib_1414, 141.4);
    assert.strictEqual(fibs.fib_2414, 241.4);
  });
});

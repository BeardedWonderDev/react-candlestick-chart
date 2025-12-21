const assert = require("node:assert/strict");
const test = require("node:test");

const {
  computeSMA,
  deriveSMAPeriod,
  getSMAValues,
} = require("../dist/utils/sma.js");

const makeCandles = () => [
  { date: 1, open: 10, close: 12, high: 13, low: 9 },
  { date: 2, open: 12, close: 11, high: 14, low: 10 },
  { date: 3, open: 11, close: 15, high: 16, low: 11 },
  { date: 4, open: 15, close: 14, high: 17, low: 13 },
];

test("deriveSMAPeriod uses defaults and clamps to visible count", () => {
  assert.equal(deriveSMAPeriod(100, undefined), 10);
  assert.equal(deriveSMAPeriod(20, { mode: "visibleRatio", value: 0.1 }), 5);
  assert.equal(deriveSMAPeriod(3, { mode: "visibleRatio", value: 0.1 }), 3);
});

test("deriveSMAPeriod respects custom min/max and ratio", () => {
  assert.equal(
    deriveSMAPeriod(50, { mode: "visibleRatio", value: 0.2, min: 12, max: 30 }),
    12,
  );
  assert.equal(
    deriveSMAPeriod(200, { mode: "visibleRatio", value: 0.2, min: 5, max: 30 }),
    30,
  );
});

test("computeSMA returns nulls until the window is filled", () => {
  const values = [1, 2, 3, 4, 5];
  assert.deepEqual(computeSMA(values, 3), [null, null, 2, 3, 4]);
});

test("computeSMA returns values immediately for period 1", () => {
  const values = [4, 5, 6];
  assert.deepEqual(computeSMA(values, 1), [4, 5, 6]);
});

test("getSMAValues extracts the configured source", () => {
  const candles = makeCandles();
  assert.deepEqual(getSMAValues(candles, "close"), [12, 11, 15, 14]);
  assert.deepEqual(getSMAValues(candles, "open"), [10, 12, 11, 15]);
  assert.deepEqual(getSMAValues(candles, "high"), [13, 14, 16, 17]);
  assert.deepEqual(getSMAValues(candles, "low"), [9, 10, 11, 13]);
});

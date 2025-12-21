"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeSMA = exports.getSMAValues = exports.getSMAValueSource = exports.deriveSMAPeriod = exports.clamp = void 0;
const DEFAULT_RATIO = 0.1;
const DEFAULT_MIN_PERIOD = 5;
const DEFAULT_MAX_PERIOD = 200;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
exports.clamp = clamp;
const deriveSMAPeriod = (visibleCount, period) => {
    if (visibleCount <= 0)
        return 0;
    const ratioInput = period === null || period === void 0 ? void 0 : period.value;
    const ratio = typeof ratioInput === "number" && Number.isFinite(ratioInput) && ratioInput > 0
        ? ratioInput
        : DEFAULT_RATIO;
    const minInput = period === null || period === void 0 ? void 0 : period.min;
    const maxInput = period === null || period === void 0 ? void 0 : period.max;
    const minPeriod = typeof minInput === "number" && Number.isFinite(minInput) && minInput >= 1
        ? Math.floor(minInput)
        : DEFAULT_MIN_PERIOD;
    const maxPeriod = typeof maxInput === "number" && Number.isFinite(maxInput) && maxInput >= 1
        ? Math.floor(maxInput)
        : DEFAULT_MAX_PERIOD;
    const unclamped = Math.round(visibleCount * ratio);
    const upperBound = Math.min(Math.max(maxPeriod, 1), visibleCount);
    const effectiveMin = Math.min(Math.max(minPeriod, 1), upperBound);
    return (0, exports.clamp)(unclamped, effectiveMin, upperBound);
};
exports.deriveSMAPeriod = deriveSMAPeriod;
const getSMAValueSource = (candle, source) => {
    switch (source) {
        case "open":
            return candle.open;
        case "high":
            return candle.high;
        case "low":
            return candle.low;
        case "close":
        default:
            return candle.close;
    }
};
exports.getSMAValueSource = getSMAValueSource;
const getSMAValues = (candles, source) => candles.map((candle) => (0, exports.getSMAValueSource)(candle, source));
exports.getSMAValues = getSMAValues;
const computeSMA = (values, period) => {
    if (period <= 0)
        return values.map(() => null);
    if (period === 1)
        return values.map((v) => v);
    const result = new Array(values.length).fill(null);
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
        if (i >= period)
            sum -= values[i - period];
        if (i >= period - 1)
            result[i] = sum / period;
    }
    return result;
};
exports.computeSMA = computeSMA;

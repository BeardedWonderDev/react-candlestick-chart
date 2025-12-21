import dataType from "../types/DataType";
import SMAType, { SMAPeriodType } from "../types/SMAType";

const DEFAULT_RATIO = 0.1;
const DEFAULT_MIN_PERIOD = 5;
const DEFAULT_MAX_PERIOD = 200;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const deriveSMAPeriod = (
  visibleCount: number,
  period?: SMAPeriodType,
): number => {
  if (visibleCount <= 0) return 0;

  const ratioInput = period?.value;
  const ratio =
    typeof ratioInput === "number" && Number.isFinite(ratioInput) && ratioInput > 0
      ? ratioInput
      : DEFAULT_RATIO;

  const minInput = period?.min;
  const maxInput = period?.max;

  const minPeriod =
    typeof minInput === "number" && Number.isFinite(minInput) && minInput >= 1
      ? Math.floor(minInput)
      : DEFAULT_MIN_PERIOD;

  const maxPeriod =
    typeof maxInput === "number" && Number.isFinite(maxInput) && maxInput >= 1
      ? Math.floor(maxInput)
      : DEFAULT_MAX_PERIOD;

  const unclamped = Math.round(visibleCount * ratio);
  const upperBound = Math.min(Math.max(maxPeriod, 1), visibleCount);
  const effectiveMin = Math.min(Math.max(minPeriod, 1), upperBound);
  return clamp(unclamped, effectiveMin, upperBound);
};

export const getSMAValueSource = (
  candle: dataType,
  source: NonNullable<SMAType["source"]>,
): number => {
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

export const getSMAValues = (
  candles: dataType[],
  source: NonNullable<SMAType["source"]>,
): number[] => candles.map((candle) => getSMAValueSource(candle, source));

export const computeSMA = (
  values: number[],
  period: number,
): Array<number | null> => {
  if (period <= 0) return values.map(() => null);
  if (period === 1) return values.map((v) => v);

  const result: Array<number | null> = new Array(values.length).fill(null);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    if (i >= period - 1) result[i] = sum / period;
  }
  return result;
};

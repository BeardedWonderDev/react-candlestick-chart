import dataType from "../types/DataType";
import SMAType, { SMAPeriodType } from "../types/SMAType";
export declare const clamp: (value: number, min: number, max: number) => number;
export declare const deriveSMAPeriod: (visibleCount: number, period?: SMAPeriodType) => number;
export declare const getSMAValueSource: (candle: dataType, source: NonNullable<SMAType["source"]>) => number;
export declare const getSMAValues: (candles: dataType[], source: NonNullable<SMAType["source"]>) => number[];
export declare const computeSMA: (values: number[], period: number) => Array<number | null>;

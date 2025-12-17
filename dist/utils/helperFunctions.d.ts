import DataType from "../types/DataType";
import dataType from "../types/DataType";
export declare const stringDateNormalizer: (dateTime: string) => string;
export declare const dateArrayNormalizer: (data: (string | number)[]) => number[];
export declare const dataNormalizer: (data: any[]) => DataType[];
export declare const calculateCandleWidthDate: (times: number[]) => [candleWidth: number, candleLockerWidth: number];
export declare const getCursorPoint: (id: string, evt: MouseEvent) => {
    x: number;
    y: number;
};
export declare const getTouchPoint: (id: string, evt: TouchEvent) => {
    x: number;
    y: number;
};
export declare const findCandleIndex: (inpArray: dataType[], candleLockerWidthDate: number, keyDate: number) => number;

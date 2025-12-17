import React from "react";
import { DataViewerTextsType } from "./types/DataViewerTextsType";
import { DataViewerColorsType } from "./types/DataViewerColorsType";
import { ColorsPropType } from "./types/ColorsType";
import SMAType from "./types/SMAType";
declare const CandlestickChart: React.FC<{
    data: any;
    id: string;
    width: number;
    height: number;
    decimal?: number;
    dataViewerTexts?: DataViewerTextsType;
    dataViewerColors?: DataViewerColorsType;
    scrollZoom?: {
        enable: boolean;
        max: number;
    };
    rangeSelector?: {
        enable: boolean;
        height: number;
        initialRange?: {
            type: "month" | "day" | "hour" | "percent" | "milliseconds";
            value: number;
        };
    };
    enableResetButton?: boolean;
    responsiveBreakPoint?: number;
    ColorPalette?: ColorsPropType;
    sma?: SMAType;
}>;
export default CandlestickChart;

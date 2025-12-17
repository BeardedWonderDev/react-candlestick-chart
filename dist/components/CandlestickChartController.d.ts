import React from "react";
import { DataViewerColorsType } from "../types/DataViewerColorsType";
import { DataViewerTextsType } from "../types/DataViewerTextsType";
import { ColorsType } from "../types/ColorsType";
import SMAType from "../types/SMAType";
declare const CandlestickChartController: React.FC<{
    chartData: any;
    id: string;
    width: number;
    height: number;
    decimal: number;
    dataViewerTexts: DataViewerTextsType;
    dataViewerColors: DataViewerColorsType;
    sma: SMAType;
    scrollZoom: {
        enable: boolean;
        max: number;
    };
    ColorPalette: ColorsType;
    rangeSelector: {
        enable: boolean;
        height: number;
        initialRange: {
            type: "month" | "day" | "hour" | "percent" | "milliseconds";
            value: number;
        };
    };
    responsiveBreakPoint: number;
    enableResetButton: boolean;
}>;
export default CandlestickChartController;

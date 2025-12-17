import React from "react";
declare const CandlesSelectorLinesAndLabels: React.FC<{
    candlesCanvasId: string;
    chartId: string;
    xScaleFunction: any;
    yScaleFunction: any;
    scrollZoom: {
        enable: boolean;
        max: number;
    };
}>;
export default CandlesSelectorLinesAndLabels;

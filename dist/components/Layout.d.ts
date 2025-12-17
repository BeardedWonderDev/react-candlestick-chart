import React, { SVGProps } from "react";
import { DataViewerTextsType } from "../types/DataViewerTextsType";
import { DataViewerColorsType } from "../types/DataViewerColorsType";
declare const Layout: React.FC<{
    id: string;
    width: number;
    height: number;
    children: React.ReactNode;
    xScaleFunction: any;
    yScaleFunction: any;
    RSXScaleFunction: any;
    RSYScaleFunction: any;
    dataViewerTexts: DataViewerTextsType;
    dataViewerColors: DataViewerColorsType;
    decimal: number;
    candlesCanvasId: string;
    chartElement: SVGProps<SVGForeignObjectElement>;
    responsiveBreakPoint: number;
    enableResetButton: boolean;
    rangeSelector: {
        enable: boolean;
        height: number;
        initialRange: {
            type: "month" | "day" | "hour" | "percent" | "milliseconds";
            value: number;
        };
    };
}>;
export default Layout;

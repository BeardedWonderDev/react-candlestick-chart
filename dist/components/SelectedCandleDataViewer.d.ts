import React from "react";
import { DataViewerTextsType } from "../types/DataViewerTextsType";
import { DataViewerColorsType } from "../types/DataViewerColorsType";
declare const SelectedCandleDataViewer: React.FC<{
    dataViewerTexts: DataViewerTextsType;
    dataViewerColors: DataViewerColorsType;
    decimal: number;
}>;
export default SelectedCandleDataViewer;

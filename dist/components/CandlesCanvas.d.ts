import React from "react";
import SMAType from "../types/SMAType";
declare const CandlesCanvas: React.FC<{
    id: string;
    xScaleFunction: any;
    yScaleFunction: any;
    sma: SMAType;
}>;
export default CandlesCanvas;

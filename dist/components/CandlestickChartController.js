"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataContext_1 = require("../context/DataContext");
const Layout_1 = __importDefault(require("./Layout"));
const react_1 = __importStar(require("react"));
const ConfigtDataContext_1 = require("../context/ConfigtDataContext");
const d3 = __importStar(require("d3"));
const helperFunctions_1 = require("../utils/helperFunctions");
const CandlesCanvas_1 = __importDefault(require("./CandlesCanvas"));
const CandlesSelectorLinesAndLabels_1 = __importDefault(require("./CandlesSelectorLinesAndLabels"));
const ColorsContext_1 = require("../context/ColorsContext");
const CandlestickChartController = ({ chartData, id, width, height, decimal, dataViewerTexts, dataViewerColors, sma, scrollZoom, rangeSelector, responsiveBreakPoint, enableResetButton, ColorPalette, }) => {
    const dispatchData = (0, DataContext_1.useDataDispatch)();
    const dispatchConfig = (0, ConfigtDataContext_1.useConfigDispatch)();
    const data = (0, DataContext_1.useData)();
    const config = (0, ConfigtDataContext_1.useConfigData)();
    const candlesCanvasId = `${id}-candles-canvas`;
    const dispatchColors = (0, ColorsContext_1.useColorsDispatch)();
    const [yScaleFunction, setYScaleFunction] = (0, react_1.useState)(null);
    const [xScaleFunction, setXScaleFunction] = (0, react_1.useState)(null);
    const [RSYScaleFunction, setRSYScaleFunction] = (0, react_1.useState)(null);
    const [RSXScaleFunction, setRSXScaleFunction] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        dispatchColors({ type: "changeColors", colorPalette: ColorPalette });
    }, [ColorPalette]);
    (0, react_1.useEffect)(() => {
        dispatchData({
            type: "changeInitData",
            initData: (0, helperFunctions_1.dataNormalizer)(chartData),
        });
    }, [chartData]);
    (0, react_1.useEffect)(() => {
        dispatchConfig({
            type: "changeDecimal",
            decimal: decimal,
        });
    }, [decimal]);
    (0, react_1.useEffect)(() => {
        var _a;
        let newYScaleFunction = d3
            .scaleLinear()
            .domain([
            data.minMaxShownPrice.max +
                config.emptySpaceFromTopPercent * data.minMaxShownPrice.max,
            data.minMaxShownPrice.min -
                config.emptySpaceFromBottomPercent * data.minMaxShownPrice.min,
        ])
            .range([0, (_a = config.canvasHeight) !== null && _a !== void 0 ? _a : 0]);
        setYScaleFunction(() => newYScaleFunction);
    }, [data.minMaxShownPrice, config.canvasHeight]);
    (0, react_1.useEffect)(() => {
        var _a;
        let newXScaleFunction = d3
            .scaleTime()
            .domain([data.shownRange.start, data.shownRange.end])
            .range([0, (_a = config.canvasWidth) !== null && _a !== void 0 ? _a : 0]);
        setXScaleFunction(() => newXScaleFunction);
    }, [data.shownRange, config.canvasWidth]);
    (0, react_1.useEffect)(() => {
        var _a;
        let newRSYScaleFunction = d3
            .scaleLinear()
            .domain([
            data.minMaxInitPrice.max +
                config.emptySpaceFromTopPercentRS * data.minMaxInitPrice.max,
            data.minMaxInitPrice.min -
                config.emptySpaceFromBottomPercentRS * data.minMaxInitPrice.min,
        ])
            .range([0, (_a = config.rangeSelectorRealHeight) !== null && _a !== void 0 ? _a : 0]);
        setRSYScaleFunction(() => newRSYScaleFunction);
    }, [
        data.minMaxInitPrice,
        rangeSelector.height,
        config.rangeSelectorRealHeight,
    ]);
    (0, react_1.useEffect)(() => {
        var _a;
        let newRSXScaleFunction = d3
            .scaleTime()
            .domain([data.minMaxInitDate.min, data.minMaxInitDate.max])
            .range([0, (_a = config.canvasWidth) !== null && _a !== void 0 ? _a : 0]);
        setRSXScaleFunction(() => newRSXScaleFunction);
    }, [data.minMaxInitDate, config.canvasWidth]);
    return (react_1.default.createElement(Layout_1.default, { xScaleFunction: xScaleFunction, yScaleFunction: yScaleFunction, id: id, width: width, height: height, dataViewerColors: dataViewerColors, dataViewerTexts: dataViewerTexts, decimal: decimal, rangeSelector: rangeSelector, RSYScaleFunction: RSYScaleFunction, RSXScaleFunction: RSXScaleFunction, candlesCanvasId: candlesCanvasId, responsiveBreakPoint: responsiveBreakPoint, enableResetButton: enableResetButton, chartElement: react_1.default.createElement("foreignObject", { width: config.canvasWidth, height: config.canvasHeight },
            react_1.default.createElement(CandlesCanvas_1.default, { id: candlesCanvasId, xScaleFunction: xScaleFunction, yScaleFunction: yScaleFunction, sma: sma })) },
        react_1.default.createElement(CandlesSelectorLinesAndLabels_1.default, { xScaleFunction: xScaleFunction, yScaleFunction: yScaleFunction, chartId: id, candlesCanvasId: candlesCanvasId, scrollZoom: scrollZoom })));
};
exports.default = CandlestickChartController;

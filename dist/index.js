"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DataContext_1 = require("./context/DataContext");
const ConfigtDataContext_1 = require("./context/ConfigtDataContext");
const DataViewerAndSelectorsContext_1 = require("./context/DataViewerAndSelectorsContext");
const ColorsContext_1 = require("./context/ColorsContext");
const CandlestickChartController_1 = __importDefault(require("./components/CandlestickChartController"));
const CandlestickChart = ({ data, id, width, height, decimal, dataViewerTexts, dataViewerColors, scrollZoom, rangeSelector, responsiveBreakPoint, enableResetButton = true, ColorPalette, sma, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
    return (react_1.default.createElement(DataContext_1.DataProvider, null,
        react_1.default.createElement(ConfigtDataContext_1.ConfigDataProvider, null,
            react_1.default.createElement(DataViewerAndSelectorsContext_1.DataViewerAndSelectorsProvider, null,
                react_1.default.createElement(ColorsContext_1.ColorsProvider, null,
                    react_1.default.createElement(CandlestickChartController_1.default, { chartData: data, id: id, width: width, height: height, decimal: decimal !== null && decimal !== void 0 ? decimal : 0, responsiveBreakPoint: responsiveBreakPoint !== null && responsiveBreakPoint !== void 0 ? responsiveBreakPoint : 400, sma: {
                            enable: (_a = sma === null || sma === void 0 ? void 0 : sma.enable) !== null && _a !== void 0 ? _a : false,
                            source: (_b = sma === null || sma === void 0 ? void 0 : sma.source) !== null && _b !== void 0 ? _b : "close",
                            period: {
                                mode: "visibleRatio",
                                value: (_d = (_c = sma === null || sma === void 0 ? void 0 : sma.period) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 0.1,
                                min: (_f = (_e = sma === null || sma === void 0 ? void 0 : sma.period) === null || _e === void 0 ? void 0 : _e.min) !== null && _f !== void 0 ? _f : 5,
                                max: (_h = (_g = sma === null || sma === void 0 ? void 0 : sma.period) === null || _g === void 0 ? void 0 : _g.max) !== null && _h !== void 0 ? _h : 200,
                            },
                            stroke: sma === null || sma === void 0 ? void 0 : sma.stroke,
                            strokeWidth: sma === null || sma === void 0 ? void 0 : sma.strokeWidth,
                        }, scrollZoom: {
                            enable: scrollZoom ? scrollZoom.enable : false,
                            max: scrollZoom ? scrollZoom.max : 1,
                        }, rangeSelector: {
                            enable: rangeSelector ? rangeSelector.enable : false,
                            height: rangeSelector ? rangeSelector.height : 0,
                            initialRange: rangeSelector && rangeSelector.initialRange
                                ? rangeSelector.initialRange
                                : { type: "percent", value: 100 },
                        }, ColorPalette: {
                            background: ColorPalette && ColorPalette.background
                                ? ColorPalette.background
                                : "#161b26",
                            grid: ColorPalette && ColorPalette.grid
                                ? ColorPalette.grid
                                : "#222631",
                            tick: ColorPalette && ColorPalette.tick
                                ? ColorPalette.tick
                                : "#b2b5be",
                            selectorLine: ColorPalette && ColorPalette.selectorLine
                                ? ColorPalette.selectorLine
                                : "rgba(178,181,190,0.5)",
                            selectorLabelBackground: ColorPalette && ColorPalette.selectorLabelBackground
                                ? ColorPalette.selectorLabelBackground
                                : "#2a2e39",
                            selectorLabelText: ColorPalette && ColorPalette.selectorLabelText
                                ? ColorPalette.selectorLabelText
                                : "#b2b5be",
                            greenCandle: ColorPalette && ColorPalette.greenCandle
                                ? ColorPalette.greenCandle
                                : "#089981",
                            redCandle: ColorPalette && ColorPalette.redCandle
                                ? ColorPalette.redCandle
                                : "#e13443",
                            longPosition: ColorPalette && ColorPalette.longPosition
                                ? ColorPalette.longPosition
                                : "#fff",
                            shortPosition: ColorPalette && ColorPalette.shortPosition
                                ? ColorPalette.shortPosition
                                : "#fff",
                            sl: ColorPalette && ColorPalette.sl ? ColorPalette.sl : "#F9DB04",
                            tp: ColorPalette && ColorPalette.tp ? ColorPalette.tp : "#04F5F9",
                            RSChartStroke: ColorPalette && ColorPalette.RSChartStroke
                                ? ColorPalette.RSChartStroke
                                : "#04F5F9",
                            RSChartOverlay: ColorPalette && ColorPalette.RSChartOverlay
                                ? ColorPalette.RSChartOverlay
                                : "#000",
                            RSChartOverlayResize: ColorPalette && ColorPalette.RSChartOverlayResize
                                ? ColorPalette.RSChartOverlayResize
                                : "#e13443",
                            resetButtonColor: ColorPalette && ColorPalette.resetButtonColor
                                ? ColorPalette.resetButtonColor
                                : "#04F5F9",
                        }, enableResetButton: enableResetButton, dataViewerTexts: {
                            shortPosition: (_j = dataViewerTexts === null || dataViewerTexts === void 0 ? void 0 : dataViewerTexts.shortPosition) !== null && _j !== void 0 ? _j : "Short",
                            longPosition: (_k = dataViewerTexts === null || dataViewerTexts === void 0 ? void 0 : dataViewerTexts.longPosition) !== null && _k !== void 0 ? _k : "Long",
                            stopLoss: (_l = dataViewerTexts === null || dataViewerTexts === void 0 ? void 0 : dataViewerTexts.stopLoss) !== null && _l !== void 0 ? _l : "sl",
                            takeProfit: (_m = dataViewerTexts === null || dataViewerTexts === void 0 ? void 0 : dataViewerTexts.takeProfit) !== null && _m !== void 0 ? _m : "tp",
                            open: (_o = dataViewerTexts === null || dataViewerTexts === void 0 ? void 0 : dataViewerTexts.open) !== null && _o !== void 0 ? _o : "O",
                            high: (_p = dataViewerTexts === null || dataViewerTexts === void 0 ? void 0 : dataViewerTexts.high) !== null && _p !== void 0 ? _p : "H",
                            low: (_q = dataViewerTexts === null || dataViewerTexts === void 0 ? void 0 : dataViewerTexts.low) !== null && _q !== void 0 ? _q : "L",
                            close: (_r = dataViewerTexts === null || dataViewerTexts === void 0 ? void 0 : dataViewerTexts.close) !== null && _r !== void 0 ? _r : "C",
                        }, dataViewerColors: {
                            shortPositionLabel: (_s = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.shortPositionLabel) !== null && _s !== void 0 ? _s : "#b2b5be",
                            shortPositionData: (_t = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.shortPositionData) !== null && _t !== void 0 ? _t : "#fff",
                            longPositionLabel: (_u = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.longPositionLabel) !== null && _u !== void 0 ? _u : "#b2b5be",
                            longPositionData: (_v = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.longPositionData) !== null && _v !== void 0 ? _v : "#fff",
                            stopLossLabel: (_w = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.stopLossLabel) !== null && _w !== void 0 ? _w : "#b2b5be",
                            stopLossData: (_x = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.stopLossData) !== null && _x !== void 0 ? _x : "#F9DB04",
                            takeProfitLabel: (_y = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.takeProfitLabel) !== null && _y !== void 0 ? _y : "#b2b5be",
                            takeProfitData: (_z = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.takeProfitData) !== null && _z !== void 0 ? _z : "#04F5F9",
                            openLabel: (_0 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.openLabel) !== null && _0 !== void 0 ? _0 : "#b2b5be",
                            openDataUp: (_1 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.openDataUp) !== null && _1 !== void 0 ? _1 : "#089981",
                            openDataDown: (_2 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.openDataDown) !== null && _2 !== void 0 ? _2 : "#e13443",
                            highLabel: (_3 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.highLabel) !== null && _3 !== void 0 ? _3 : "#b2b5be",
                            highDataUp: (_4 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.highDataUp) !== null && _4 !== void 0 ? _4 : "#089981",
                            highDataDown: (_5 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.highDataDown) !== null && _5 !== void 0 ? _5 : "#e13443",
                            lowLabel: (_6 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.lowLabel) !== null && _6 !== void 0 ? _6 : "#b2b5be",
                            lowDataUp: (_7 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.lowDataUp) !== null && _7 !== void 0 ? _7 : "#089981",
                            lowDataDown: (_8 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.lowDataDown) !== null && _8 !== void 0 ? _8 : "#e13443",
                            closeLabel: (_9 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.closeLabel) !== null && _9 !== void 0 ? _9 : "#b2b5be",
                            closeDataUp: (_10 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.closeDataUp) !== null && _10 !== void 0 ? _10 : "#089981",
                            closeDataDown: (_11 = dataViewerColors === null || dataViewerColors === void 0 ? void 0 : dataViewerColors.closeDataDown) !== null && _11 !== void 0 ? _11 : "#e13443",
                        } }))))));
};
exports.default = CandlestickChart;

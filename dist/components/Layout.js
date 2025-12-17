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
const react_1 = __importStar(require("react"));
const DataContext_1 = require("../context/DataContext");
const ConfigtDataContext_1 = require("../context/ConfigtDataContext");
const d3 = __importStar(require("d3"));
const SelectedCandleDataViewer_1 = __importDefault(require("./SelectedCandleDataViewer"));
const RSChart_1 = __importDefault(require("./RSChart"));
const DataViewerAndSelectorsContext_1 = require("../context/DataViewerAndSelectorsContext");
const ColorsContext_1 = require("../context/ColorsContext");
const Layout = ({ id, width, height, yScaleFunction, xScaleFunction, children, dataViewerTexts, dataViewerColors, decimal, chartElement, RSYScaleFunction, RSXScaleFunction, candlesCanvasId, responsiveBreakPoint, enableResetButton, rangeSelector, }) => {
    const yAxisId = `${id}-yAxis`;
    const xAxisId = `${id}-xAxis`;
    const yAxisIdRS = `${yAxisId}-RS`;
    const xAxisIdRS = `${xAxisId}-RS`;
    const resetBtnId = `${id}-reset-btn`;
    const colors = (0, ColorsContext_1.useColors)();
    const [reset, setReset] = (0, react_1.useState)(false);
    const [resetInitialize, setResetInitialize] = (0, react_1.useState)(false);
    const dispatchConfig = (0, ConfigtDataContext_1.useConfigDispatch)();
    const dispatchData = (0, DataContext_1.useDataDispatch)();
    const dispatchDataViewer = (0, DataViewerAndSelectorsContext_1.useDataViewerAndSelectorsDispatch)();
    const data = (0, DataContext_1.useData)();
    const config = (0, ConfigtDataContext_1.useConfigData)();
    const paddingLeft = 25;
    const paddingTop = 10;
    const paddingBottom = 30;
    const paddingRight = (0, react_1.useMemo)(() => 2.5 +
        data.minMaxInitPrice.max.toFixed(config.decimal).toString().length *
            config.characterFontWidth, [data.minMaxInitPrice.max, config.decimal]);
    const initialRangeCalculator = (initialRange, initData, candleWidthDate, candleLockerWidthDate) => {
        if (initData.length < 2 || !initialRange || !candleWidthDate)
            return;
        if (initialRange.type === "percent") {
            let val;
            if (initialRange.value > 100)
                val = 100;
            else if (initialRange.value <= 0.1)
                val = 0.1;
            else
                val = initialRange.value;
            let lastDate = initData[initData.length - 1].date;
            let firstDate = initData[0].date;
            let range = lastDate - firstDate;
            range *= val / 100;
            let newStartRange = lastDate - range;
            dispatchData({
                type: "changeShownRange",
                shownRange: {
                    start: newStartRange + candleWidthDate / 2,
                    end: lastDate + candleWidthDate / 2,
                },
            });
        }
        else {
            let rangeInMilliSeconds = 0;
            let val = initialRange.value <= 0 ? 0 : initialRange.value;
            let coeff = 3.6 * Math.pow(10, 6);
            if (initialRange.type === "milliseconds")
                rangeInMilliSeconds = val;
            else if (initialRange.type === "hour")
                rangeInMilliSeconds = val * coeff;
            else if (initialRange.type === "day")
                rangeInMilliSeconds = val * coeff * 24;
            else if (initialRange.type === "month")
                rangeInMilliSeconds = val * coeff * 24 * 30;
            let nCandle = Math.ceil(rangeInMilliSeconds / candleLockerWidthDate);
            let lastDate = initData[initData.length - 1].date;
            let startDate = lastDate - (nCandle - 1) * candleLockerWidthDate;
            let startRange = startDate - candleWidthDate / 2;
            let endRange = lastDate + candleWidthDate / 2;
            dispatchData({
                type: "changeShownRange",
                shownRange: {
                    start: startRange,
                    end: endRange,
                },
            });
        }
    };
    let resetHandler = () => {
        initialRangeCalculator(rangeSelector.initialRange, data.initData, data.candleWidthDate, data.candleLockerWidthDate);
        dispatchDataViewer({ type: "changeShowLines", showLines: false });
        setReset(true);
    };
    (0, react_1.useEffect)(() => {
        if (reset) {
            setTimeout(() => {
                dispatchData({
                    type: "changeShownRange",
                    shownRange: {
                        start: data.shownRange.start + 1,
                        end: data.shownRange.end,
                    },
                });
            }, 10);
            setReset(false);
        }
    }, [reset, data.shownRange]);
    (0, react_1.useEffect)(() => {
        if (!resetInitialize &&
            rangeSelector.initialRange &&
            data.initData.length > 2 &&
            data.candleWidthDate > 0) {
            initialRangeCalculator(rangeSelector.initialRange, data.initData, data.candleWidthDate, data.candleLockerWidthDate);
            dispatchDataViewer({ type: "changeShowLines", showLines: false });
            setResetInitialize(true);
        }
        let resetBtn = document.getElementById(`${resetBtnId}`);
        if (resetBtn) {
            resetBtn.addEventListener("click", resetHandler);
        }
        return () => {
            if (resetBtn) {
                resetBtn.removeEventListener("click", resetHandler);
            }
        };
    }, [
        rangeSelector.initialRange,
        data.initData,
        data.candleWidthDate,
        resetInitialize,
    ]);
    (0, react_1.useEffect)(() => {
        if (width !== 0 && height !== 0) {
            dispatchConfig({
                type: "changeDiagramDimension",
                canvasHeight: height - (paddingBottom + paddingTop + 6) - rangeSelector.height,
                canvasWidth: width - (paddingLeft + paddingRight) - 2,
                chartHeight: height - (paddingBottom + paddingTop + 6),
                rangeSelectorRealHeight: rangeSelector.height - 2 * paddingBottom,
            });
        }
    }, [width, height, config.decimal, rangeSelector.height]);
    (0, react_1.useEffect)(() => {
        dispatchConfig({
            type: "changeIsMobile",
            isMobile: width < responsiveBreakPoint,
        });
    }, [width, height, responsiveBreakPoint]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (yScaleFunction) {
            d3.select(`#${yAxisId}`).html("");
            let yAxis = d3
                .axisRight(yScaleFunction)
                .tickSize((_a = config.canvasWidth) !== null && _a !== void 0 ? _a : 0);
            d3.select(`#${yAxisId}`).append("g").call(yAxis);
            d3.select(`#${yAxisId} .domain`).remove();
            d3.selectAll(`#${yAxisId} g text`).attr("transform", "translate(5,0)");
            d3.selectAll(`#${yAxisId} .tick line`).style("stroke", colors.grid);
            d3.selectAll(`#${yAxisId} .tick text`).style("fill", colors.tick);
        }
    }, [yScaleFunction, config.canvasWidth]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (xScaleFunction) {
            d3.select(`#${xAxisId}`).html("");
            let xAxis = d3
                .axisBottom(xScaleFunction)
                .ticks(((_a = config.canvasWidth) !== null && _a !== void 0 ? _a : 0) / 100)
                .tickSize((_b = config.canvasHeight) !== null && _b !== void 0 ? _b : 0);
            d3.select(`#${xAxisId}`).append("g").call(xAxis);
            d3.select(`#${xAxisId} .domain`).remove();
            d3.selectAll(`#${xAxisId} g text`).attr("transform", "translate(0,7)");
            d3.selectAll(`#${xAxisId} .tick line`).style("stroke", colors.grid);
            d3.selectAll(`#${xAxisId} .tick text`).style("fill", colors.tick);
        }
    }, [xScaleFunction, config.canvasWidth, config.canvasHeight]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (rangeSelector.enable) {
            if (RSYScaleFunction) {
                d3.select(`#${yAxisIdRS}`).html("");
                let yAxis = d3
                    .axisRight(RSYScaleFunction)
                    .tickSize((_a = config.canvasWidth) !== null && _a !== void 0 ? _a : 0)
                    .ticks(config.rangeSelectorRealHeight / 30);
                d3.select(`#${yAxisIdRS}`).append("g").call(yAxis);
                d3.select(`#${yAxisIdRS} .domain`).remove();
                d3.selectAll(`#${yAxisIdRS} g text`).attr("transform", "translate(5,0)");
                d3.selectAll(`#${yAxisIdRS} .tick line`).style("stroke", colors.grid);
                d3.selectAll(`#${yAxisIdRS} .tick text`).style("fill", colors.tick);
            }
        }
    }, [
        RSYScaleFunction,
        config.canvasWidth,
        rangeSelector.enable,
        config.rangeSelectorRealHeight,
    ]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (rangeSelector.enable) {
            if (RSXScaleFunction) {
                d3.select(`#${xAxisIdRS}`).html("");
                let xAxis = d3
                    .axisBottom(RSXScaleFunction)
                    .ticks(((_a = config.canvasWidth) !== null && _a !== void 0 ? _a : 0) / 100)
                    .tickSize((_b = config.rangeSelectorRealHeight) !== null && _b !== void 0 ? _b : 0);
                d3.select(`#${xAxisIdRS}`).append("g").call(xAxis);
                d3.select(`#${xAxisIdRS} .domain`).remove();
                d3.selectAll(`#${xAxisIdRS} g text`).attr("transform", "translate(0,10)");
                d3.selectAll(`#${xAxisIdRS} .tick line`).style("stroke", colors.grid);
                d3.selectAll(`#${xAxisIdRS} .tick text`).style("fill", colors.tick);
            }
        }
    }, [xScaleFunction, config.canvasWidth, config.rangeSelectorRealHeight]);
    return (react_1.default.createElement("div", { id: id, style: {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            display: "inline-block",
            position: "relative",
            background: colors.background,
        } },
        enableResetButton ? (react_1.default.createElement("div", { style: {
                display: "flex",
                width: "100%",
                height: "0",
                justifyContent: "end",
            } },
            react_1.default.createElement("div", { style: {
                    marginTop: "10px",
                    position: "relative",
                    zIndex: 10,
                    cursor: "pointer",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: `${colors.resetButtonColor}`,
                    color: `${colors.resetButtonColor}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    padding: "10px",
                }, id: `${resetBtnId}` }, "Reset"))) : (react_1.default.createElement(react_1.default.Fragment, null)),
        react_1.default.createElement(SelectedCandleDataViewer_1.default, { decimal: decimal, dataViewerTexts: dataViewerTexts, dataViewerColors: dataViewerColors }),
        react_1.default.createElement("svg", { width: config.canvasWidth, height: config.chartHeight, style: { overflow: "inherit", cursor: "crosshair", userSelect: "none" } },
            react_1.default.createElement("g", { id: `${yAxisId}` }),
            react_1.default.createElement("g", { id: `${xAxisId}` }),
            chartElement,
            rangeSelector.enable ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("g", { id: `${yAxisIdRS}`, style: {
                        transform: `translate(0,${config.canvasHeight ? config.canvasHeight + paddingBottom : 0}px`,
                    } }),
                react_1.default.createElement("g", { id: `${xAxisIdRS}`, style: {
                        transform: `translate(0,${config.canvasHeight ? config.canvasHeight + paddingBottom : 0}px`,
                    } }),
                react_1.default.createElement("foreignObject", { width: config.canvasWidth, height: config.rangeSelectorRealHeight, id: `${id}-range-selector`, y: config.canvasHeight ? config.canvasHeight + paddingBottom : 0 },
                    react_1.default.createElement(RSChart_1.default, { id: id, RSXScaleFunction: RSXScaleFunction, RSYScaleFunction: RSYScaleFunction, candlesCanvasId: candlesCanvasId })))) : (react_1.default.createElement(react_1.default.Fragment, null)),
            children)));
};
exports.default = Layout;

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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const helperFunctions_1 = require("../utils/helperFunctions");
const ConfigtDataContext_1 = require("../context/ConfigtDataContext");
const DataContext_1 = require("../context/DataContext");
const d3 = __importStar(require("d3"));
const DataViewerAndSelectorsContext_1 = require("../context/DataViewerAndSelectorsContext");
const ColorsContext_1 = require("../context/ColorsContext");
const CandlesSelectorLinesAndLabels = ({ candlesCanvasId, chartId, xScaleFunction, yScaleFunction, scrollZoom, }) => {
    const priceViewerLineId = "priceViewerLine";
    const dateViewerLineId = "dateViewerLine";
    const charWidth = 7.8;
    const priceLabelHeight = 25;
    const dateLabelWidth = 150;
    const dateLabelHeight = 25;
    const colors = (0, ColorsContext_1.useColors)();
    const config = (0, ConfigtDataContext_1.useConfigData)();
    const data = (0, DataContext_1.useData)();
    const dispatchDataViewer = (0, DataViewerAndSelectorsContext_1.useDataViewerAndSelectorsDispatch)();
    const dataViewer = (0, DataViewerAndSelectorsContext_1.useDataViewerAndSelectors)();
    const dispatchData = (0, DataContext_1.useDataDispatch)();
    const dispatchConfigData = (0, ConfigtDataContext_1.useConfigDispatch)();
    const [positionX, setPositionX] = (0, react_1.useState)(0);
    const [positionY, setPositionY] = (0, react_1.useState)(0);
    const [updateZoom, setUpdateZoom] = (0, react_1.useState)(false);
    const [onRSChart, setOnRSChart] = (0, react_1.useState)(false);
    const [panTarget, setPanTarget] = (0, react_1.useState)(0);
    const [panDateWidth, setPanDateWidth] = (0, react_1.useState)(0);
    const [priceLabelTranslateY, setPriceLabelTranslateY] = (0, react_1.useState)(0);
    const priceLabelWidth = (0, react_1.useMemo)(() => 2.5 +
        data.minMaxInitPrice.max.toFixed(config.decimal).toString().length *
            charWidth, [config.decimal, data.minMaxInitPrice.max]);
    const [priceLabelValue, setPriceLabelValue] = (0, react_1.useState)(0);
    const [dateLabelTranslateX, setDateLabelTranslateX] = (0, react_1.useState)(0);
    const [dateLabelValue, setDateLabelValue] = (0, react_1.useState)("");
    const [dateLinePosition, setDateLinePosition] = (0, react_1.useState)(0);
    const [firstRender, setFirstRender] = (0, react_1.useState)(true);
    const zoomTouchDistanceStart = (0, react_1.useRef)(0);
    const zoomTouchDistanceEnd = (0, react_1.useRef)(0);
    const currentZoom = (0, react_1.useRef)(0);
    const inTouchZoom = (0, react_1.useRef)(false);
    const mouseMove = (evt) => {
        dispatchDataViewer({ type: "changeShowLines", showLines: true });
        let point = (0, helperFunctions_1.getCursorPoint)(candlesCanvasId, evt);
        setPositionX(point.x);
        setPositionY(point.y);
    };
    const touchMove = (evt) => {
        evt.preventDefault();
        dispatchDataViewer({ type: "changeShowLines", showLines: false });
        if (evt.touches.length === 1 && !inTouchZoom.current) {
            dispatchConfigData({ type: "changePan", pan: true });
            if (config.pan) {
                let point = (0, helperFunctions_1.getTouchPoint)(candlesCanvasId, evt);
                setPositionX(point.x);
                setPositionY(point.y);
            }
            dispatchDataViewer({ type: "changeCandleIndex", candleIndex: -1 });
        }
        else if (evt.touches.length === 2) {
            inTouchZoom.current = true;
            zoomTouchDistanceEnd.current = Math.hypot(evt.touches[0].pageX - evt.touches[1].pageX, evt.touches[0].pageY - evt.touches[1].pageY);
            let diff = zoomTouchDistanceStart.current - zoomTouchDistanceEnd.current;
            let coeffDiff = parseInt((diff / 3).toFixed(0));
            if (coeffDiff > currentZoom.current) {
                currentZoom.current = coeffDiff;
                setUpdateZoom("down");
            }
            else if (coeffDiff < currentZoom.current) {
                currentZoom.current = coeffDiff;
                setUpdateZoom("up");
            }
        }
    };
    const touchEnd = (evt) => {
        evt.preventDefault();
        inTouchZoom.current = false;
        dispatchConfigData({ type: "changePan", pan: false });
        zoomTouchDistanceStart.current = 0;
        zoomTouchDistanceEnd.current = 0;
        currentZoom.current = 0;
    };
    const touchStart = (evt) => {
        if (onRSChart)
            return;
        let point = (0, helperFunctions_1.getTouchPoint)(candlesCanvasId, evt);
        setPositionX(point.x);
        setPositionY(point.y);
        if (evt.touches.length === 1) {
            dispatchDataViewer({ type: "changeShowLines", showLines: true });
        }
        else if (evt.touches.length === 2) {
            zoomTouchDistanceStart.current = Math.hypot(evt.touches[0].pageX - evt.touches[1].pageX, evt.touches[0].pageY - evt.touches[1].pageY);
        }
    };
    const mouseLeave = () => {
        dispatchDataViewer({ type: "changeShowLines", showLines: false });
        dispatchConfigData({ type: "changePan", pan: false });
        dispatchDataViewer({ type: "changeCandleIndex", candleIndex: -1 });
    };
    const mouseWheel = (evt) => {
        if (onRSChart)
            return;
        setUpdateZoom(evt.deltaY > 0 ? "up" : "down");
    };
    const mouseEnterRSChart = () => {
        setOnRSChart(true);
    };
    const mouseEnterCanvas = () => {
        setOnRSChart(false);
    };
    const canvasMouseDown = () => {
        dispatchConfigData({ type: "changePan", pan: true });
    };
    const canvasMouseUp = () => {
        dispatchConfigData({ type: "changePan", pan: false });
        dispatchDataViewer({ type: "changeCandleIndex", candleIndex: -1 });
    };
    (0, react_1.useEffect)(() => {
        let canvas = document.querySelector(`#${candlesCanvasId}`);
        let mainSvgChart = document.querySelector(`#${chartId} svg`);
        let rangeSelector = document.querySelector(`#${chartId}-range-selector`);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mousemove", mouseMove);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mouseenter", mouseEnterCanvas);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("touchstart", mouseEnterCanvas);
        mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.addEventListener("mousedown", canvasMouseDown);
        mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.addEventListener("mouseup", canvasMouseUp);
        mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.addEventListener("mouseleave", mouseLeave);
        mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.addEventListener("wheel", mouseWheel, { passive: true });
        rangeSelector === null || rangeSelector === void 0 ? void 0 : rangeSelector.addEventListener("mousemove", mouseLeave);
        rangeSelector === null || rangeSelector === void 0 ? void 0 : rangeSelector.addEventListener("touchmove", mouseLeave);
        rangeSelector === null || rangeSelector === void 0 ? void 0 : rangeSelector.addEventListener("touchstart", mouseEnterRSChart);
        rangeSelector === null || rangeSelector === void 0 ? void 0 : rangeSelector.addEventListener("mouseenter", mouseEnterRSChart);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("touchmove", touchMove);
        mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.addEventListener("touchstart", touchStart);
        mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.addEventListener("touchend", touchEnd);
        return () => {
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener("touchmove", touchMove);
            mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.removeEventListener("touchstart", touchStart);
            mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.removeEventListener("touchend", touchEnd);
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener("mousemove", mouseMove);
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener("mouseenter", mouseEnterCanvas);
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener("touchstart", mouseEnterCanvas);
            mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.removeEventListener("mousedown", canvasMouseDown);
            mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.removeEventListener("mouseup", canvasMouseUp);
            mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.removeEventListener("mouseleave", mouseLeave);
            mainSvgChart === null || mainSvgChart === void 0 ? void 0 : mainSvgChart.removeEventListener("wheel", mouseWheel);
            rangeSelector === null || rangeSelector === void 0 ? void 0 : rangeSelector.removeEventListener("mousemove", mouseLeave);
            rangeSelector === null || rangeSelector === void 0 ? void 0 : rangeSelector.removeEventListener("mouseenter", mouseEnterRSChart);
            rangeSelector === null || rangeSelector === void 0 ? void 0 : rangeSelector.removeEventListener("touchmove", mouseLeave);
            rangeSelector === null || rangeSelector === void 0 ? void 0 : rangeSelector.removeEventListener("touchstart", mouseEnterRSChart);
        };
    }, [onRSChart, config.pan]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (config.canvasWidth && config.canvasHeight) {
            let translateY = positionY >= config.canvasHeight - priceLabelHeight / 2
                ? config.canvasHeight - priceLabelHeight
                : positionY <= priceLabelHeight / 2
                    ? 0
                    : positionY - priceLabelHeight / 2;
            setPriceLabelTranslateY(translateY);
            let priceLabelValue = (_a = yScaleFunction === null || yScaleFunction === void 0 ? void 0 : yScaleFunction.invert(positionY).toFixed(config.decimal)) !== null && _a !== void 0 ? _a : 0;
            setPriceLabelValue(priceLabelValue);
        }
    }, [positionY, config.decimal, config.canvasWidth, config.canvasHeight]);
    (0, react_1.useEffect)(() => {
        if (config.canvasWidth) {
            let selectedCandleIndex = (0, helperFunctions_1.findCandleIndex)(data.shownData, data.candleLockerWidthDate, xScaleFunction.invert(positionX).getTime());
            dispatchDataViewer({
                type: "changeCandleIndex",
                candleIndex: selectedCandleIndex,
            });
            let posX = selectedCandleIndex === -1
                ? positionX
                : xScaleFunction(data.shownData[selectedCandleIndex].date);
            setDateLinePosition(posX);
            let translateX = posX >= config.canvasWidth - dateLabelWidth / 2
                ? config.canvasWidth - dateLabelWidth
                : posX <= dateLabelWidth / 2
                    ? 0
                    : posX - dateLabelWidth / 2;
            setDateLabelTranslateX(translateX);
            let dateLabelValue = d3.timeFormat("%a %d %b '%y %H:%M")(xScaleFunction.invert(posX));
            setDateLabelValue(dateLabelValue);
        }
    }, [
        positionX,
        config.canvasWidth,
        data.candleLockerWidthDate,
        dateLabelWidth,
        config.pan,
    ]);
    (0, react_1.useEffect)(() => {
        if (positionX)
            setFirstRender(false);
    }, [positionX]);
    (0, react_1.useEffect)(() => {
        if (!updateZoom || !xScaleFunction || !config.canvasWidth)
            return;
        if (updateZoom && scrollZoom.enable && !firstRender) {
            if (updateZoom === "up" &&
                data.zoomFactor * data.incrementZoomFactor > scrollZoom.max)
                return;
            dispatchDataViewer({ type: "changeShowLines", showLines: false });
            let target = dataViewer.candleIndex === -1
                ? xScaleFunction.invert(positionX).getTime()
                : data.shownData[dataViewer.candleIndex].date;
            dispatchDataViewer({ type: "changeCandleIndex", candleIndex: -1 });
            let newZoomFactor = (data.zoomFactor *=
                updateZoom === "up"
                    ? data.incrementZoomFactor
                    : data.decrementZoomFactor);
            let newWidthInDate = Math.round((data.minMaxInitDate.max - data.minMaxInitDate.min) / newZoomFactor);
            let coefficient = Math.round((newWidthInDate * positionX) / config.canvasWidth);
            setUpdateZoom(false);
            dispatchData({
                type: "changeShownRange",
                shownRange: {
                    start: target - coefficient,
                    end: target - coefficient + newWidthInDate,
                },
            });
        }
    }, [updateZoom, xScaleFunction, config.canvasWidth, firstRender]);
    (0, react_1.useEffect)(() => {
        if (config.pan) {
            setPanTarget(xScaleFunction === null || xScaleFunction === void 0 ? void 0 : xScaleFunction.invert(positionX));
            setPanDateWidth(data.minMaxShownDate.max - data.minMaxShownDate.min);
        }
    }, [config.pan]);
    (0, react_1.useEffect)(() => {
        if (config.pan) {
            let fraction = positionX / config.canvasWidth;
            let startShownDate = panTarget - fraction * panDateWidth;
            let endShownDate = startShownDate + panDateWidth;
            dispatchData({
                type: "changeShownRange",
                shownRange: { start: startShownDate, end: endShownDate },
            });
        }
    }, [positionX]);
    return (react_1.default.createElement(react_1.default.Fragment, null, dataViewer.showLines && !config.pan ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("line", { strokeDasharray: "2,2", stroke: colors.selectorLine, id: dateViewerLineId, x1: dateLinePosition, y1: 0, x2: dateLinePosition, y2: config.canvasHeight }),
        react_1.default.createElement("line", { x1: 0, y1: positionY, x2: config.canvasWidth, y2: positionY, strokeDasharray: "2,2", stroke: colors.selectorLine, id: priceViewerLineId }),
        react_1.default.createElement("g", { transform: `translate(${config.canvasWidth},${priceLabelTranslateY})` },
            react_1.default.createElement("rect", { fill: colors.selectorLabelBackground, width: priceLabelWidth, height: priceLabelHeight }),
            react_1.default.createElement("text", { style: {
                    fontSize: "12px",
                    fill: colors.selectorLabelText,
                    fontFamily: "monospace",
                }, x: 5, y: 15 }, priceLabelValue)),
        react_1.default.createElement("g", { transform: `translate(${dateLabelTranslateX},${config.canvasHeight})` },
            react_1.default.createElement("rect", { fill: colors.selectorLabelBackground, width: dateLabelWidth, height: dateLabelHeight }),
            react_1.default.createElement("text", { style: {
                    fontSize: "12px",
                    fill: colors.selectorLabelText,
                    fontFamily: "monospace",
                }, x: 5, y: 15 }, dateLabelValue)))) : (react_1.default.createElement(react_1.default.Fragment, null))));
};
exports.default = CandlesSelectorLinesAndLabels;

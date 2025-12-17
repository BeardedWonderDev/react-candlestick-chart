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
const ConfigtDataContext_1 = require("../context/ConfigtDataContext");
const DataContext_1 = require("../context/DataContext");
const d3 = __importStar(require("d3"));
const helperFunctions_1 = require("../utils/helperFunctions");
const ColorsContext_1 = require("../context/ColorsContext");
const RSChart = ({ id, RSXScaleFunction, RSYScaleFunction, candlesCanvasId }) => {
    const chartId = `${id}-RSChart`;
    const data = (0, DataContext_1.useData)();
    const dispatchData = (0, DataContext_1.useDataDispatch)();
    const config = (0, ConfigtDataContext_1.useConfigData)();
    const leftPanId = `${chartId}-left-pan`;
    const rightPanId = `${chartId}-right-pan`;
    const panId = `${chartId}-pan`;
    const [pathData, setPathData] = (0, react_1.useState)();
    const [leftPan, setLeftPan] = (0, react_1.useState)(false);
    const [rightPan, setRightPan] = (0, react_1.useState)(false);
    const [pan, setPan] = (0, react_1.useState)(false);
    const [panTarget, setPanTarget] = (0, react_1.useState)(0);
    const [positionX, setPositionX] = (0, react_1.useState)(0);
    const [leftDistanceToTarget, setLeftDistanceToTarget] = (0, react_1.useState)(0);
    const [panAreaWidth, setPanAreaWidth] = (0, react_1.useState)(0);
    const [sizer, setSizer] = (0, react_1.useState)(4);
    const colors = (0, ColorsContext_1.useColors)();
    (0, react_1.useEffect)(() => {
        if (config.isMobile) {
            setSizer(10);
        }
        else {
            setSizer(4);
        }
    }, [config.isMobile]);
    const mouseMove = (evt) => {
        let point = (0, helperFunctions_1.getCursorPoint)(candlesCanvasId, evt);
        setPositionX(point.x);
    };
    const touchMove = (evt) => {
        if (!pan) {
            setPan(true);
        }
        let point = (0, helperFunctions_1.getTouchPoint)(candlesCanvasId, evt);
        setPositionX(point.x);
    };
    const touchStart = (evt) => {
        let point = (0, helperFunctions_1.getTouchPoint)(candlesCanvasId, evt);
        setPositionX(point.x);
    };
    const touchEnd = () => setPan(false);
    const leftPanMouseDown = () => setLeftPan(true);
    const rightPanMouseDown = () => setRightPan(true);
    const panMouseDown = () => setPan(true);
    const panMouseUp = () => {
        setLeftPan(false);
        setRightPan(false);
        setPan(false);
    };
    (0, react_1.useEffect)(() => {
        let RSChart = document.querySelector(`#${chartId}`);
        let leftPanBtn = document.querySelector(`#${leftPanId}`);
        let rightPanBtn = document.querySelector(`#${rightPanId}`);
        let panArea = document.querySelector(`#${panId}`);
        panArea.addEventListener("mousedown", panMouseDown);
        leftPanBtn.addEventListener("mousedown", leftPanMouseDown);
        leftPanBtn.addEventListener("touchstart", leftPanMouseDown);
        leftPanBtn.addEventListener("mouseup", panMouseUp);
        leftPanBtn.addEventListener("touchend", panMouseUp);
        rightPanBtn.addEventListener("mousedown", rightPanMouseDown);
        rightPanBtn.addEventListener("touchstart", rightPanMouseDown);
        rightPanBtn.addEventListener("mouseup", panMouseUp);
        rightPanBtn.addEventListener("touchend", panMouseUp);
        RSChart.addEventListener("mouseup", panMouseUp);
        RSChart.addEventListener("mouseleave", panMouseUp);
        RSChart.addEventListener("mousemove", mouseMove);
        RSChart.addEventListener("touchmove", touchMove);
        RSChart.addEventListener("touchstart", touchStart);
        RSChart.addEventListener("touchend", touchEnd);
        return () => {
            panArea.removeEventListener("mousedown", panMouseDown);
            leftPanBtn.removeEventListener("mousedown", leftPanMouseDown);
            leftPanBtn.removeEventListener("touchstart", leftPanMouseDown);
            leftPanBtn.removeEventListener("mouseup", panMouseUp);
            leftPanBtn.removeEventListener("touchend", panMouseUp);
            rightPanBtn.removeEventListener("mousedown", rightPanMouseDown);
            rightPanBtn.removeEventListener("touchstart", rightPanMouseDown);
            rightPanBtn.removeEventListener("mouseup", panMouseUp);
            rightPanBtn.removeEventListener("touchend", panMouseUp);
            RSChart.removeEventListener("mouseup", panMouseUp);
            RSChart.removeEventListener("mouseleave", panMouseUp);
            RSChart.removeEventListener("mousemove", mouseMove);
            RSChart.removeEventListener("touchmove", touchMove);
            RSChart.removeEventListener("touchstart", touchStart);
            RSChart.removeEventListener("touchend", touchEnd);
        };
    }, [pan]);
    (0, react_1.useEffect)(() => {
        if (pan) {
            setPanTarget(positionX);
            setLeftDistanceToTarget(positionX - RSXScaleFunction(data.minMaxShownDate.min));
            setPanAreaWidth(data.minMaxShownDate.max - data.minMaxShownDate.min);
        }
        else {
            setPanTarget(0);
            setLeftDistanceToTarget(0);
        }
    }, [pan]);
    (0, react_1.useEffect)(() => {
        if (leftPan) {
            let newLeftShownDate = RSXScaleFunction.invert(positionX).getTime();
            if (newLeftShownDate < data.minMaxInitDate.min)
                return;
            if (newLeftShownDate >=
                data.minMaxShownDate.max - data.candleLockerWidthDate)
                return;
            dispatchData({
                type: "changeShownRange",
                shownRange: { start: newLeftShownDate, end: data.shownRange.end },
            });
        }
        else if (rightPan) {
            let newRightShownDate = RSXScaleFunction.invert(positionX).getTime();
            if (newRightShownDate > data.minMaxInitDate.max)
                return;
            if (newRightShownDate <=
                data.minMaxShownDate.min + data.candleLockerWidthDate)
                return;
            dispatchData({
                type: "changeShownRange",
                shownRange: { start: data.shownRange.start, end: newRightShownDate },
            });
        }
        else if (panTarget !== 0) {
            let leftTarget = positionX - leftDistanceToTarget;
            let leftTargetDate = RSXScaleFunction.invert(leftTarget).getTime();
            dispatchData({
                type: "changeShownRange",
                shownRange: {
                    start: leftTargetDate,
                    end: leftTargetDate + panAreaWidth,
                },
            });
        }
    }, [positionX]);
    (0, react_1.useEffect)(() => {
        const points = [];
        for (let i = 0; i < data.initData.length; i++) {
            points.push([
                data.initData[i].date,
                (data.initData[i].high + data.initData[i].low) / 2,
            ]);
        }
        let lineGenerator = d3.line().curve(d3.curveCardinal);
        lineGenerator
            .x(function (d) {
            return RSXScaleFunction(d[0]);
        })
            .y(function (d) {
            return RSYScaleFunction(d[1]);
        });
        setPathData(lineGenerator(points));
    }, [
        RSXScaleFunction,
        RSYScaleFunction,
        config.canvasWidth,
        config.rangeSelectorRealHeight,
    ]);
    return (react_1.default.createElement("svg", { id: chartId, width: config.canvasWidth, height: config.rangeSelectorRealHeight, style: { cursor: leftPan || rightPan ? "e-resize" : "" } },
        react_1.default.createElement("path", { stroke: colors.RSChartStroke, fill: "none", strokeWidth: "2px", d: pathData }),
        react_1.default.createElement("rect", { id: panId, x: RSXScaleFunction ? RSXScaleFunction(data.minMaxShownDate.min) : 0, y: 0, width: RSXScaleFunction
                ? RSXScaleFunction(data.minMaxShownDate.max) -
                    RSXScaleFunction(data.minMaxShownDate.min)
                : 0, height: config.rangeSelectorRealHeight, fill: colors.RSChartOverlay, style: { opacity: 0.3, cursor: "all-scroll" } }),
        react_1.default.createElement("rect", { x: RSXScaleFunction ? RSXScaleFunction(data.minMaxShownDate.min) : 0, y: config.rangeSelectorRealHeight / 4, height: config.rangeSelectorRealHeight / 2, width: sizer, fill: colors.RSChartOverlayResize, style: { cursor: "e-resize" }, id: leftPanId }),
        react_1.default.createElement("rect", { x: RSXScaleFunction
                ? RSXScaleFunction
                    ? RSXScaleFunction(data.minMaxShownDate.max) - sizer
                    : 0
                : 0, y: config.rangeSelectorRealHeight / 4, height: config.rangeSelectorRealHeight / 2, width: sizer, fill: colors.RSChartOverlayResize, style: { cursor: "e-resize" }, id: rightPanId })));
};
exports.default = RSChart;

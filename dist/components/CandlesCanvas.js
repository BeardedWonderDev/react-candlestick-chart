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
const ColorsContext_1 = require("../context/ColorsContext");
const sma_1 = require("../utils/sma");
const CandlesCanvas = ({ id, xScaleFunction, yScaleFunction, sma }) => {
    var _a, _b, _c;
    const config = (0, ConfigtDataContext_1.useConfigData)();
    const data = (0, DataContext_1.useData)();
    const context2D = (0, react_1.useRef)(null);
    const canvas = (0, react_1.useRef)(null);
    const scale = 3;
    const colors = (0, ColorsContext_1.useColors)();
    const [candleWidth, setCandleWidth] = (0, react_1.useState)(0);
    const [firstRender, setFirstRender] = (0, react_1.useState)(true);
    const calcCandleWidth = (minMaxShownDate, candleWidthDate) => {
        let candleWidth = xScaleFunction(minMaxShownDate.min + candleWidthDate) -
            xScaleFunction(minMaxShownDate.min);
        candleWidth = Number.isNaN(candleWidth) ? 0 : candleWidth;
        return candleWidth;
    };
    const createCandle = (candleWidth, candleData) => {
        if (Number.isNaN(candleWidth) || !candleWidth)
            return;
        let ctx = context2D.current;
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        //candle body
        let width = candleWidth;
        let height = candleData.open > candleData.close
            ? yScaleFunction(candleData.close) - yScaleFunction(candleData.open)
            : yScaleFunction(candleData.open) - yScaleFunction(candleData.close);
        let x = xScaleFunction(candleData.date) - candleWidth / 2;
        let y = candleData.open > candleData.close
            ? yScaleFunction(candleData.open)
            : yScaleFunction(candleData.close);
        const candle = new Path2D();
        candle.rect(x, y, width, height);
        //candle high
        candle.moveTo(xScaleFunction(candleData.date), yScaleFunction(candleData.high));
        candle.lineTo(xScaleFunction(candleData.date), y);
        //candle low
        candle.moveTo(xScaleFunction(candleData.date), yScaleFunction(candleData.low));
        candle.lineTo(xScaleFunction(candleData.date), y + height);
        let color = candleData.open > candleData.close
            ? colors.greenCandle
            : colors.redCandle;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.stroke(candle);
        ctx.fill(candle);
        //position / sl / tp
        if (candleData.position) {
            let position = new Path2D();
            if (candleData.position.positionType === "long") {
                //long position
                position.moveTo(xScaleFunction(candleData.date) - candleWidth / 2, yScaleFunction(candleData.position.positionValue));
                position.lineTo(xScaleFunction(candleData.date) + candleWidth / 2, yScaleFunction(candleData.position.positionValue));
                position.lineTo(xScaleFunction(candleData.date), yScaleFunction(candleData.position.positionValue) -
                    (candleWidth / 1.5 > 20 ? 20 : candleWidth / 1.5));
                ctx.fillStyle = colors.longPosition;
                ctx.strokeStyle = colors.longPosition;
            }
            else if (candleData.position.positionType === "short") {
                position.moveTo(xScaleFunction(candleData.date) - candleWidth / 2, yScaleFunction(candleData.position.positionValue));
                position.lineTo(xScaleFunction(candleData.date) + candleWidth / 2, yScaleFunction(candleData.position.positionValue));
                position.lineTo(xScaleFunction(candleData.date), yScaleFunction(candleData.position.positionValue) +
                    (candleWidth / 1.5 > 20 ? 20 : candleWidth / 1.5));
                ctx.fillStyle = colors.shortPosition;
                ctx.strokeStyle = colors.shortPosition;
            }
            ctx.stroke(position);
            ctx.fill(position);
            //sl
            if (candleData.position.sl) {
                let sl = new Path2D();
                sl.rect(xScaleFunction(candleData.date) - candleWidth / 1.2, yScaleFunction(candleData.position.sl), candleWidth * 1.6, 3);
                ctx.fillStyle = colors.sl;
                ctx.strokeStyle = colors.sl;
                ctx.stroke(sl);
                ctx.fill(sl);
            }
            //tp
            if (candleData.position.tp) {
                let tp = new Path2D();
                tp.rect(xScaleFunction(candleData.date) - candleWidth / 1.2, yScaleFunction(candleData.position.tp), candleWidth * 1.6, 3);
                ctx.fillStyle = colors.tp;
                ctx.strokeStyle = colors.tp;
                ctx.stroke(tp);
                ctx.fill(tp);
            }
        }
    };
    const drawSMA = (ctx) => {
        var _a, _b, _c;
        if (!sma.enable)
            return;
        if (!data.shownData.length)
            return;
        if (!xScaleFunction || !yScaleFunction)
            return;
        const period = (0, sma_1.deriveSMAPeriod)(data.shownData.length, sma.period);
        if (period < 2)
            return;
        const source = (_a = sma.source) !== null && _a !== void 0 ? _a : "close";
        const values = (0, sma_1.getSMAValues)(data.shownData, source);
        const smaValues = (0, sma_1.computeSMA)(values, period);
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < data.shownData.length; i++) {
            const v = smaValues[i];
            if (v === null || Number.isNaN(v)) {
                started = false;
                continue;
            }
            const x = xScaleFunction(data.shownData[i].date);
            const y = yScaleFunction(v);
            if (!started) {
                ctx.moveTo(x, y);
                started = true;
            }
            else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = (_b = sma.stroke) !== null && _b !== void 0 ? _b : colors.RSChartStroke;
        ctx.lineWidth = ((_c = sma.strokeWidth) !== null && _c !== void 0 ? _c : 2) / scale;
        ctx.stroke();
    };
    (0, react_1.useLayoutEffect)(() => {
        if (canvas.current) {
            context2D.current = canvas.current.getContext("2d");
        }
    }, [canvas.current]);
    (0, react_1.useEffect)(() => {
        if (firstRender && xScaleFunction && yScaleFunction) {
            let candleWidth = calcCandleWidth(data.minMaxShownDate, data.candleWidthDate);
            if (candleWidth > 0) {
                setCandleWidth(candleWidth);
                setFirstRender(false);
            }
        }
    }, [
        data.shownData,
        data.candleWidthDate,
        config.canvasWidth,
        config.canvasHeight,
        xScaleFunction,
        yScaleFunction,
    ]);
    (0, react_1.useEffect)(() => {
        if (firstRender)
            return;
        let candleWidth = calcCandleWidth(data.minMaxShownDate, data.candleWidthDate);
        setCandleWidth(candleWidth);
    }, [
        data.shownData,
        data.candleWidthDate,
        config.canvasWidth,
        config.canvasHeight,
        firstRender,
    ]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (context2D.current && candleWidth > 0 && config.canvasHeight) {
            (_a = context2D.current) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
            if (data.shownData.length && !Number.isNaN(candleWidth)) {
                for (let i = 0; i < data.shownData.length; i++)
                    createCandle(candleWidth, data.shownData[i]);
            }
            drawSMA(context2D.current);
        }
    }, [
        context2D.current,
        candleWidth,
        data.candleWidthDate,
        config.canvasWidth,
        config.canvasHeight,
        xScaleFunction,
        yScaleFunction,
        data.shownData,
        sma.enable,
        sma.source,
        (_a = sma.period) === null || _a === void 0 ? void 0 : _a.value,
        (_b = sma.period) === null || _b === void 0 ? void 0 : _b.min,
        (_c = sma.period) === null || _c === void 0 ? void 0 : _c.max,
        sma.stroke,
        sma.strokeWidth,
        colors.RSChartStroke,
    ]);
    return (react_1.default.createElement("canvas", { width: config.canvasWidth * scale, height: config.canvasHeight * scale, ref: canvas, id: id, style: {
            width: config.canvasWidth + "px",
            height: config.canvasHeight + "px",
            cursor: config.pan ? "all-scroll" : "",
        } }));
};
exports.default = CandlesCanvas;

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
exports.useColorsDispatch = exports.useColors = exports.ColorsProvider = void 0;
const react_1 = __importStar(require("react"));
const initData = {
    background: "#161b26",
    grid: "#222631",
    tick: "#b2b5be",
    selectorLine: "rgba(178,181,190,0.5)",
    selectorLabelBackground: "#2a2e39",
    selectorLabelText: "#b2b5be",
    greenCandle: "#089981",
    redCandle: "#e13443",
    longPosition: "#fff",
    shortPosition: "#fff",
    sl: "#F9DB04",
    tp: "#04F5F9",
    RSChartStroke: "#04F5F9",
    RSChartOverlay: "#000",
    RSChartOverlayResize: "#e13443",
    resetButtonColor: "#04F5F9",
};
const ColorsContext = (0, react_1.createContext)(initData);
const ColorsDispatchContext = (0, react_1.createContext)(() => { });
function colorsReducer(state, action) {
    if (action.type === "changeColors") {
        let newState = Object.assign({}, state);
        newState.background = action.colorPalette.background
            ? action.colorPalette.background
            : state.background;
        newState.grid = action.colorPalette.grid
            ? action.colorPalette.grid
            : state.grid;
        newState.tick = action.colorPalette.tick
            ? action.colorPalette.tick
            : state.tick;
        newState.selectorLine = action.colorPalette.selectorLine
            ? action.colorPalette.selectorLine
            : state.selectorLine;
        newState.selectorLabelBackground = action.colorPalette
            .selectorLabelBackground
            ? action.colorPalette.selectorLabelBackground
            : state.selectorLabelBackground;
        newState.selectorLabelText = action.colorPalette.selectorLabelText
            ? action.colorPalette.selectorLabelText
            : state.selectorLabelText;
        newState.greenCandle = action.colorPalette.greenCandle
            ? action.colorPalette.greenCandle
            : state.greenCandle;
        newState.redCandle = action.colorPalette.redCandle
            ? action.colorPalette.redCandle
            : state.redCandle;
        newState.longPosition = action.colorPalette.longPosition
            ? action.colorPalette.longPosition
            : state.longPosition;
        newState.shortPosition = action.colorPalette.shortPosition
            ? action.colorPalette.shortPosition
            : state.shortPosition;
        newState.sl = action.colorPalette.sl ? action.colorPalette.sl : state.sl;
        newState.tp = action.colorPalette.tp ? action.colorPalette.tp : state.tp;
        newState.RSChartStroke = action.colorPalette.RSChartStroke
            ? action.colorPalette.RSChartStroke
            : state.RSChartStroke;
        newState.RSChartOverlay = action.colorPalette.RSChartOverlay
            ? action.colorPalette.RSChartOverlay
            : state.RSChartOverlay;
        newState.RSChartOverlayResize = action.colorPalette.RSChartOverlayResize
            ? action.colorPalette.RSChartOverlayResize
            : state.RSChartOverlayResize;
        newState.resetButtonColor = action.colorPalette.resetButtonColor
            ? action.colorPalette.resetButtonColor
            : state.resetButtonColor;
        return newState;
    }
    else {
        return state;
    }
}
const ColorsProvider = ({ children }) => {
    const [data, dispatch] = (0, react_1.useReducer)(colorsReducer, initData);
    return (react_1.default.createElement(ColorsContext.Provider, { value: data },
        react_1.default.createElement(ColorsDispatchContext.Provider, { value: dispatch }, children)));
};
exports.ColorsProvider = ColorsProvider;
function useColors() {
    return (0, react_1.useContext)(ColorsContext);
}
exports.useColors = useColors;
function useColorsDispatch() {
    return (0, react_1.useContext)(ColorsDispatchContext);
}
exports.useColorsDispatch = useColorsDispatch;

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
exports.useConfigDispatch = exports.useConfigData = exports.ConfigDataProvider = void 0;
const react_1 = __importStar(require("react"));
const initData = {
    decimal: 0,
    characterFontWidth: 7.8,
    canvasWidth: 0,
    canvasHeight: 0,
    rangeSelectorRealHeight: 0,
    emptySpaceFromBottomPercent: 3 / 100,
    emptySpaceFromTopPercent: 4 / 100,
    emptySpaceFromBottomPercentRS: 2 / 100,
    emptySpaceFromTopPercentRS: 2 / 100,
    chartHeight: 0,
    pan: false,
    isMobile: false,
};
const ConfigDataContext = (0, react_1.createContext)(initData);
const ConfigDispatchContext = (0, react_1.createContext)(() => { });
function dataReducer(state, action) {
    if (action.type === "changeDiagramDimension") {
        let newState = Object.assign({}, state);
        newState.canvasHeight = action.canvasHeight;
        newState.canvasWidth = action.canvasWidth;
        newState.chartHeight = action.chartHeight;
        newState.rangeSelectorRealHeight = action.rangeSelectorRealHeight;
        return newState;
    }
    else if (action.type === "changeDecimal") {
        let newState = Object.assign({}, state);
        newState.decimal = action.decimal;
        return newState;
    }
    else if (action.type === "changePan") {
        let newState = Object.assign({}, state);
        newState.pan = action.pan;
        return newState;
    }
    else if (action.type === "changeIsMobile") {
        let newState = Object.assign({}, state);
        newState.isMobile = action.isMobile;
        return newState;
    }
    else {
        return state;
    }
}
const ConfigDataProvider = ({ children }) => {
    const [data, dispatch] = (0, react_1.useReducer)(dataReducer, initData);
    return (react_1.default.createElement(ConfigDataContext.Provider, { value: data },
        react_1.default.createElement(ConfigDispatchContext.Provider, { value: dispatch }, children)));
};
exports.ConfigDataProvider = ConfigDataProvider;
function useConfigData() {
    return (0, react_1.useContext)(ConfigDataContext);
}
exports.useConfigData = useConfigData;
function useConfigDispatch() {
    return (0, react_1.useContext)(ConfigDispatchContext);
}
exports.useConfigDispatch = useConfigDispatch;

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
exports.useDataViewerAndSelectorsDispatch = exports.useDataViewerAndSelectors = exports.DataViewerAndSelectorsProvider = void 0;
const react_1 = __importStar(require("react"));
const initData = {
    candleIndex: -1,
    showLines: false,
};
const DataViewerAndSelectorsContext = (0, react_1.createContext)(initData);
const DataViewerAndSelectorsDispatchContext = (0, react_1.createContext)(() => { });
function dataViewerAndSelectorsReducer(state, action) {
    if (action.type === "changeCandleIndex") {
        let newState = Object.assign({}, state);
        newState.candleIndex = action.candleIndex;
        return newState;
    }
    else if (action.type === "changeShowLines") {
        let newState = Object.assign({}, state);
        newState.showLines = action.showLines;
        return newState;
    }
    else {
        return state;
    }
}
const DataViewerAndSelectorsProvider = ({ children }) => {
    const [data, dispatch] = (0, react_1.useReducer)(dataViewerAndSelectorsReducer, initData);
    return (react_1.default.createElement(DataViewerAndSelectorsContext.Provider, { value: data },
        react_1.default.createElement(DataViewerAndSelectorsDispatchContext.Provider, { value: dispatch }, children)));
};
exports.DataViewerAndSelectorsProvider = DataViewerAndSelectorsProvider;
function useDataViewerAndSelectors() {
    return (0, react_1.useContext)(DataViewerAndSelectorsContext);
}
exports.useDataViewerAndSelectors = useDataViewerAndSelectors;
function useDataViewerAndSelectorsDispatch() {
    return (0, react_1.useContext)(DataViewerAndSelectorsDispatchContext);
}
exports.useDataViewerAndSelectorsDispatch = useDataViewerAndSelectorsDispatch;

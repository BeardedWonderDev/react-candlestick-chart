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
exports.useDataDispatch = exports.useData = exports.DataProvider = void 0;
const react_1 = __importStar(require("react"));
const helperFunctions_1 = require("../utils/helperFunctions");
const d3 = __importStar(require("d3"));
const initData = {
    initData: [],
    shownData: [],
    shownRange: {
        start: 0,
        end: 0,
    },
    minMaxInitDate: {
        min: 0,
        max: 0,
    },
    minMaxInitPrice: {
        min: 0,
        max: 0,
    },
    minMaxShownDate: {
        min: 0,
        max: 0,
    },
    minMaxShownPrice: {
        min: 0,
        max: 0,
    },
    zoomFactor: 1,
    incrementZoomFactor: 1.08,
    decrementZoomFactor: 0.9,
    candleWidthDate: 0,
    candleLockerWidthDate: 0,
};
const DataContext = (0, react_1.createContext)(initData);
const DataDispatchContext = (0, react_1.createContext)(() => { });
function dataReducer(state, action) {
    switch (action.type) {
        case "changeInitData": {
            if (action.initData.length === 0)
                return state;
            let newInitData = action.initData;
            let initDates = newInitData.map((x) => x.date);
            let normalizeInitDates = (0, helperFunctions_1.dateArrayNormalizer)(initDates).sort((a, b) => a - b);
            newInitData.forEach((x, i) => (x.date = normalizeInitDates[i]));
            let slPrices = newInitData
                .filter((x) => { var _a; return x.position && typeof ((_a = x.position) === null || _a === void 0 ? void 0 : _a.sl) !== undefined; })
                .map((x) => { var _a; return (_a = x.position) === null || _a === void 0 ? void 0 : _a.sl; });
            let tpPrices = newInitData
                .filter((x) => { var _a; return x.position && typeof ((_a = x.position) === null || _a === void 0 ? void 0 : _a.tp) !== undefined; })
                .map((x) => { var _a; return (_a = x.position) === null || _a === void 0 ? void 0 : _a.tp; });
            let highPrices = newInitData.map((x) => x.high);
            let lowPrices = newInitData.map((x) => x.low);
            let newMinMaxInitPrice = d3.extent([
                ...highPrices,
                ...lowPrices,
                ...slPrices,
                ...tpPrices,
            ]);
            let lastIndex = normalizeInitDates.length - 1;
            let [candleWidth, candleLockerWidth] = (0, helperFunctions_1.calculateCandleWidthDate)(normalizeInitDates);
            let newState = {
                initData: newInitData,
                shownData: newInitData,
                minMaxInitDate: {
                    min: (normalizeInitDates[0] - candleWidth / 2),
                    max: (normalizeInitDates[lastIndex] + candleWidth / 2),
                },
                minMaxShownDate: {
                    min: (normalizeInitDates[0] - candleWidth / 2),
                    max: (normalizeInitDates[lastIndex] + candleWidth / 2),
                },
                shownRange: {
                    start: (normalizeInitDates[0] - candleWidth / 2),
                    end: (normalizeInitDates[lastIndex] + candleWidth / 2),
                },
                minMaxInitPrice: {
                    min: newMinMaxInitPrice[0],
                    max: newMinMaxInitPrice[1],
                },
                minMaxShownPrice: {
                    min: newMinMaxInitPrice[0],
                    max: newMinMaxInitPrice[1],
                },
                zoomFactor: state.zoomFactor,
                incrementZoomFactor: state.incrementZoomFactor,
                decrementZoomFactor: state.decrementZoomFactor,
                candleWidthDate: candleWidth,
                candleLockerWidthDate: candleLockerWidth,
            };
            return newState;
        }
        case "changeShownRange": {
            let newShownRange = action.shownRange;
            newShownRange.start =
                newShownRange.start < state.minMaxInitDate.min
                    ? state.minMaxInitDate.min
                    : newShownRange.start;
            newShownRange.end =
                newShownRange.end > state.minMaxInitDate.max
                    ? state.minMaxInitDate.max
                    : newShownRange.end;
            let newZoomFactor = (state.minMaxInitDate.max - state.minMaxInitDate.min) /
                (newShownRange.end - newShownRange.start);
            let newShownData = state.initData.filter((x) => x.date < newShownRange.end + state.candleWidthDate / 2 &&
                x.date > newShownRange.start - state.candleWidthDate / 2);
            let slPrices = newShownData
                .filter((x) => { var _a; return x.position && typeof ((_a = x.position) === null || _a === void 0 ? void 0 : _a.sl) !== undefined; })
                .map((x) => { var _a; return (_a = x.position) === null || _a === void 0 ? void 0 : _a.sl; });
            let tpPrices = newShownData
                .filter((x) => { var _a; return x.position && typeof ((_a = x.position) === null || _a === void 0 ? void 0 : _a.tp) !== undefined; })
                .map((x) => { var _a; return (_a = x.position) === null || _a === void 0 ? void 0 : _a.tp; });
            let highPrices = newShownData.map((x) => x.high);
            let lowPrices = newShownData.map((x) => x.low);
            let allPrices = [
                ...highPrices,
                ...lowPrices,
                ...slPrices,
                ...tpPrices,
            ];
            let newMinMaxShownPrice = d3.extent(allPrices);
            newMinMaxShownPrice[0] = newMinMaxShownPrice[0]
                ? newMinMaxShownPrice[0]
                : 0;
            newMinMaxShownPrice[1] = newMinMaxShownPrice[0]
                ? newMinMaxShownPrice[1]
                : 0;
            let newState = Object.assign({}, state);
            newState.shownData = newShownData;
            newState.minMaxShownDate = {
                min: newShownRange.start,
                max: newShownRange.end,
            };
            newState.minMaxShownPrice = {
                min: newMinMaxShownPrice[0],
                max: newMinMaxShownPrice[1],
            };
            newState.shownRange = newShownRange;
            newState.zoomFactor = newZoomFactor;
            return newState;
        }
        default: {
            return state;
        }
    }
}
const DataProvider = ({ children }) => {
    const [data, dispatch] = (0, react_1.useReducer)(dataReducer, initData);
    return (react_1.default.createElement(DataContext.Provider, { value: data },
        react_1.default.createElement(DataDispatchContext.Provider, { value: dispatch }, children)));
};
exports.DataProvider = DataProvider;
function useData() {
    return (0, react_1.useContext)(DataContext);
}
exports.useData = useData;
function useDataDispatch() {
    return (0, react_1.useContext)(DataDispatchContext);
}
exports.useDataDispatch = useDataDispatch;

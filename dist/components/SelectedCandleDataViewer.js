"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DataContext_1 = require("../context/DataContext");
const DataViewerAndSelectorsContext_1 = require("../context/DataViewerAndSelectorsContext");
const ConfigtDataContext_1 = require("../context/ConfigtDataContext");
const ColorsContext_1 = require("../context/ColorsContext");
const SelectedCandleDataViewer = ({ dataViewerTexts, dataViewerColors, decimal }) => {
    var _a, _b;
    const data = (0, DataContext_1.useData)();
    const dataViewer = (0, DataViewerAndSelectorsContext_1.useDataViewerAndSelectors)();
    const colors = (0, ColorsContext_1.useColors)();
    const showCandleInfo = dataViewer.candleIndex !== -1;
    const config = (0, ConfigtDataContext_1.useConfigData)();
    const selectedData = showCandleInfo
        ? data.shownData[dataViewer.candleIndex]
        : null;
    const isUp = showCandleInfo &&
        ((_a = data.shownData[dataViewer.candleIndex]) === null || _a === void 0 ? void 0 : _a.open) >
            ((_b = data.shownData[dataViewer.candleIndex]) === null || _b === void 0 ? void 0 : _b.close);
    return (react_1.default.createElement(react_1.default.Fragment, null, showCandleInfo && !config.pan && dataViewer.showLines ? (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { style: {
                position: "absolute",
                left: "25px",
                top: "10px",
                fontFamily: "monospace",
                display: config.isMobile ? "block" : "flex",
                gap: "10px",
            } },
            react_1.default.createElement("div", { style: {
                    background: config.isMobile ? colors.background : "",
                    padding: config.isMobile ? "4px 0" : "0",
                } },
                react_1.default.createElement("span", { style: { color: dataViewerColors.openLabel } }, dataViewerTexts.open),
                react_1.default.createElement("span", { style: {
                        color: isUp
                            ? dataViewerColors.openDataUp
                            : dataViewerColors.openDataDown,
                    } },
                    " ", selectedData === null || selectedData === void 0 ? void 0 :
                    selectedData.open.toFixed(decimal),
                    " ")),
            react_1.default.createElement("div", { style: {
                    background: config.isMobile ? colors.background : "",
                    padding: config.isMobile ? "4px 0" : "0",
                } },
                react_1.default.createElement("span", { style: { color: dataViewerColors.highLabel } }, dataViewerTexts.high),
                react_1.default.createElement("span", { style: {
                        color: isUp
                            ? dataViewerColors.highDataUp
                            : dataViewerColors.highDataDown,
                    } },
                    " ", selectedData === null || selectedData === void 0 ? void 0 :
                    selectedData.high.toFixed(decimal),
                    " ")),
            react_1.default.createElement("div", { style: {
                    background: config.isMobile ? colors.background : "",
                    padding: config.isMobile ? "4px 0" : "0",
                } },
                react_1.default.createElement("span", { style: { color: dataViewerColors.lowLabel } }, dataViewerTexts.low),
                react_1.default.createElement("span", { style: {
                        color: isUp
                            ? dataViewerColors.lowDataUp
                            : dataViewerColors.lowDataDown,
                    } },
                    " ", selectedData === null || selectedData === void 0 ? void 0 :
                    selectedData.low.toFixed(decimal),
                    " ")),
            react_1.default.createElement("div", { style: {
                    background: config.isMobile ? colors.background : "",
                    padding: config.isMobile ? "4px 0" : "0",
                } },
                react_1.default.createElement("span", { style: { color: dataViewerColors.closeLabel } }, dataViewerTexts.close),
                react_1.default.createElement("span", { style: {
                        color: isUp
                            ? dataViewerColors.closeDataUp
                            : dataViewerColors.closeDataDown,
                    } },
                    " ", selectedData === null || selectedData === void 0 ? void 0 :
                    selectedData.close.toFixed(decimal),
                    " "))),
        selectedData && selectedData.position ? (react_1.default.createElement("div", { style: {
                position: "absolute",
                left: "25px",
                top: config.isMobile ? "105px" : "30px",
                fontFamily: "monospace",
                display: config.isMobile ? "block" : "flex",
                gap: "10px",
            } },
            react_1.default.createElement("div", { style: {
                    background: config.isMobile ? colors.background : "",
                    padding: config.isMobile ? "4px 0" : "0",
                } },
                react_1.default.createElement("span", { style: {
                        color: selectedData.position.positionType === "short"
                            ? dataViewerColors.shortPositionLabel
                            : dataViewerColors.longPositionLabel,
                    } },
                    " ",
                    selectedData.position.positionType === "short"
                        ? dataViewerTexts.shortPosition
                        : dataViewerTexts.longPosition),
                react_1.default.createElement("span", { style: {
                        color: selectedData.position.positionType === "short"
                            ? dataViewerColors.shortPositionData
                            : dataViewerColors.longPositionData,
                    } },
                    " ",
                    selectedData.position.positionValue.toFixed(decimal))),
            selectedData.position.sl ? (react_1.default.createElement("div", { style: {
                    background: config.isMobile ? colors.background : "",
                    padding: config.isMobile ? "4px 0" : "0",
                } },
                react_1.default.createElement("span", { style: {
                        color: dataViewerColors.stopLossLabel,
                    } },
                    " ",
                    dataViewerTexts.stopLoss),
                react_1.default.createElement("span", { style: {
                        color: dataViewerColors.stopLossData,
                    } },
                    " ",
                    selectedData.position.sl.toFixed(decimal)))) : (react_1.default.createElement(react_1.default.Fragment, null)),
            selectedData.position.tp ? (react_1.default.createElement("div", { style: {
                    background: config.isMobile ? colors.background : "",
                    padding: config.isMobile ? "4px 0" : "0",
                } },
                react_1.default.createElement("span", { style: {
                        color: dataViewerColors.takeProfitLabel,
                    } },
                    " ",
                    dataViewerTexts.takeProfit),
                react_1.default.createElement("span", { style: {
                        color: dataViewerColors.takeProfitData,
                    } },
                    " ",
                    selectedData.position.tp.toFixed(decimal)))) : (react_1.default.createElement(react_1.default.Fragment, null)))) : (react_1.default.createElement(react_1.default.Fragment, null)))) : (react_1.default.createElement(react_1.default.Fragment, null))));
};
exports.default = SelectedCandleDataViewer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCandleIndex = exports.getTouchPoint = exports.getCursorPoint = exports.calculateCandleWidthDate = exports.dataNormalizer = exports.dateArrayNormalizer = exports.stringDateNormalizer = void 0;
const stringDateNormalizer = (dateTime) => {
    let normalDateTime = dateTime.trim();
    let splitDateTime1 = normalDateTime.split(" ");
    let splitDateTime2 = normalDateTime.split("T");
    let hasTime1 = splitDateTime1.length === 2;
    let hasTime2 = splitDateTime2.length === 2;
    let newDate;
    let newTime = "";
    if (hasTime1) {
        newDate = splitDateTime1[0];
        newTime = splitDateTime1[1];
    }
    else if (hasTime2) {
        newDate = splitDateTime2[0];
        newTime = splitDateTime2[1];
    }
    else {
        newDate = normalDateTime;
    }
    //normalizeDate
    let splitDate = newDate.split("-");
    if (splitDate.length !== 3)
        throw new Error("Invalid Date");
    let year = parseInt(splitDate[0]);
    let month = parseInt(splitDate[1]);
    let day = parseInt(splitDate[2]);
    let rv = "";
    let rvDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    rv += rvDate;
    if (newTime !== "") {
        let splitTime = newTime.split(":");
        if (splitTime.length !== 2)
            throw new Error("Invalid Time");
        let hours = parseInt(splitTime[0]);
        let minutes = parseInt(splitTime[1]);
        let rvTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
        rv += "T" + rvTime;
    }
    return rv;
};
exports.stringDateNormalizer = stringDateNormalizer;
const dateArrayNormalizer = (data) => {
    try {
        if (data.length === 0)
            return [];
        let rv = [];
        data.forEach((date) => {
            if (typeof date === "string") {
                let nDate = (0, exports.stringDateNormalizer)(date);
                rv.push(new Date(nDate).getTime());
            }
            else
                rv.push(date);
        });
        return rv;
    }
    catch (error) {
        throw new Error("Data not suite for date array normalizer!");
    }
};
exports.dateArrayNormalizer = dateArrayNormalizer;
const dataNormalizer = (data) => {
    try {
        if (data.length === 0)
            return [];
        let rv = [];
        data.forEach((x) => {
            var _a, _b, _c, _d;
            if (typeof (x === null || x === void 0 ? void 0 : x.close) !== "number" ||
                (typeof (x === null || x === void 0 ? void 0 : x.date) !== "number" && typeof (x === null || x === void 0 ? void 0 : x.date) !== "string") ||
                typeof (x === null || x === void 0 ? void 0 : x.high) !== "number" ||
                typeof (x === null || x === void 0 ? void 0 : x.low) !== "number" ||
                typeof (x === null || x === void 0 ? void 0 : x.open) !== "number") {
                throw new Error("Data not suite for this chart!");
            }
            if (x.position &&
                (!x.position.positionType ||
                    !x.position.positionValue ||
                    (x.position.sl && typeof x.position.sl !== "number") ||
                    (x.position.tp && typeof x.position.tp !== "number") ||
                    typeof x.position.positionType !== "string" ||
                    (x.position.positionType !== "long" &&
                        x.position.positionType !== "short") ||
                    typeof x.position.positionValue !== "number")) {
                throw new Error("Data not suite for this chart!");
            }
            rv.push({
                close: x.close,
                date: x.date,
                high: x.high,
                low: x.low,
                open: x.open,
                position: (x === null || x === void 0 ? void 0 : x.position)
                    ? {
                        sl: (_a = x === null || x === void 0 ? void 0 : x.position) === null || _a === void 0 ? void 0 : _a.sl,
                        tp: (_b = x === null || x === void 0 ? void 0 : x.position) === null || _b === void 0 ? void 0 : _b.tp,
                        positionType: (_c = x === null || x === void 0 ? void 0 : x.position) === null || _c === void 0 ? void 0 : _c.positionType,
                        positionValue: (_d = x === null || x === void 0 ? void 0 : x.position) === null || _d === void 0 ? void 0 : _d.positionValue,
                    }
                    : undefined,
            });
        });
        return rv;
    }
    catch (error) {
        throw new Error("Data not suite for this chart!");
    }
};
exports.dataNormalizer = dataNormalizer;
const calculateCandleWidthDate = (times) => {
    let indexes = [0, 1];
    let min = times[1] - times[0];
    for (let i = 1; i < times.length; i++) {
        if (times[i + 1] - times[i] < min) {
            min = times[i + 1] - times[i];
            indexes = [i, i + 1];
        }
    }
    let width = times[indexes[1]] - times[indexes[0]];
    return [width - 0.3 * width, width];
};
exports.calculateCandleWidthDate = calculateCandleWidthDate;
const getCursorPoint = (id, evt) => {
    let canvas = document.querySelector(`#${id}`);
    let rect = canvas.getBoundingClientRect(), root = document.documentElement;
    // return relative mouse position
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY,
    };
};
exports.getCursorPoint = getCursorPoint;
const getTouchPoint = (id, evt) => {
    let canvas = document.querySelector(`#${id}`);
    let rect = canvas.getBoundingClientRect(), root = document.documentElement;
    // return relative mouse position
    let mouseX = evt.touches[0].clientX - rect.left - root.scrollLeft;
    let mouseY = evt.touches[0].clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY,
    };
};
exports.getTouchPoint = getTouchPoint;
// export const findCandleIndex = (inpArray: number[], key: number): number => {
//   let lowIndex = 0;
//   let highIndex = inpArray.length - 1;
//   let midIndex = Math.floor((highIndex + lowIndex) / 2);
//   while (true) {
//     if (key === inpArray[midIndex]) return midIndex;
//
//     if (lowIndex >= highIndex) {
//       return -1;
//     } else if (key > inpArray[midIndex]) {
//       lowIndex = midIndex + 1;
//       midIndex = Math.floor((highIndex + lowIndex) / 2);
//     } else if (key < inpArray[midIndex]) {
//       highIndex = midIndex - 1;
//       midIndex = Math.floor((highIndex + lowIndex) / 2);
//     }
//   }
// };
const findCandleIndex = (inpArray, candleLockerWidthDate, keyDate) => {
    var _a, _b, _c, _d, _e;
    let lowIndex = 0;
    let highIndex = inpArray.length - 1;
    let midIndex = Math.floor((highIndex + lowIndex) / 2);
    while (true) {
        if (keyDate === ((_a = inpArray[midIndex]) === null || _a === void 0 ? void 0 : _a.date) ||
            (keyDate <= ((_b = inpArray[midIndex]) === null || _b === void 0 ? void 0 : _b.date) + candleLockerWidthDate / 2 &&
                keyDate >= ((_c = inpArray[midIndex]) === null || _c === void 0 ? void 0 : _c.date) - candleLockerWidthDate / 2))
            return midIndex;
        if (lowIndex >= highIndex) {
            return -1;
        }
        else if (keyDate > ((_d = inpArray[midIndex]) === null || _d === void 0 ? void 0 : _d.date) + candleLockerWidthDate / 2) {
            lowIndex = midIndex + 1;
            midIndex = Math.floor((highIndex + lowIndex) / 2);
        }
        else if (keyDate < ((_e = inpArray[midIndex]) === null || _e === void 0 ? void 0 : _e.date) - candleLockerWidthDate / 2) {
            highIndex = midIndex - 1;
            midIndex = Math.floor((highIndex + lowIndex) / 2);
        }
    }
};
exports.findCandleIndex = findCandleIndex;

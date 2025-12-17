import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ConfigDataContextType } from "../types/ConfigDataContextType";
import { useConfigData } from "../context/ConfigtDataContext";
import { DataContextType } from "../types/DataContextType";
import { useData } from "../context/DataContext";
import dataType from "../types/DataType";
import { ColorsType } from "../types/ColorsType";
import { useColors } from "../context/ColorsContext";
import SMAType from "../types/SMAType";

const CandlesCanvas: React.FC<{
  id: string;
  xScaleFunction: any;
  yScaleFunction: any;
  sma: SMAType;
}> = ({ id, xScaleFunction, yScaleFunction, sma }) => {
  const config: ConfigDataContextType = useConfigData();
  const data: DataContextType = useData();
  const context2D = useRef<CanvasRenderingContext2D | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scale = 3;
  const colors: ColorsType = useColors();
  const [candleWidth, setCandleWidth] = useState<number>(0);
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const calcCandleWidth = (
    minMaxShownDate: { min: number; max: number },
    candleWidthDate: number,
  ) => {
    let candleWidth: number =
      xScaleFunction(minMaxShownDate.min + candleWidthDate) -
      xScaleFunction(minMaxShownDate.min);

    candleWidth = Number.isNaN(candleWidth) ? 0 : candleWidth;
    return candleWidth;
  };

  const createCandle = (candleWidth: number, candleData: dataType) => {
    if (Number.isNaN(candleWidth) || !candleWidth) return;
    let ctx = context2D.current as CanvasRenderingContext2D;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    //candle body
    let width = candleWidth;
    let height =
      candleData.open > candleData.close
        ? yScaleFunction(candleData.close) - yScaleFunction(candleData.open)
        : yScaleFunction(candleData.open) - yScaleFunction(candleData.close);
    let x = xScaleFunction(candleData.date) - candleWidth / 2;
    let y =
      candleData.open > candleData.close
        ? yScaleFunction(candleData.open)
        : yScaleFunction(candleData.close);

    const candle = new Path2D();
    candle.rect(x, y, width, height);

    //candle high
    candle.moveTo(
      xScaleFunction(candleData.date),
      yScaleFunction(candleData.high),
    );
    candle.lineTo(xScaleFunction(candleData.date), y);

    //candle low
    candle.moveTo(
      xScaleFunction(candleData.date),
      yScaleFunction(candleData.low),
    );
    candle.lineTo(xScaleFunction(candleData.date), y + height);

    let color =
      candleData.open > candleData.close
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
        position.moveTo(
          xScaleFunction(candleData.date) - candleWidth / 2,
          yScaleFunction(candleData.position.positionValue),
        );
        position.lineTo(
          xScaleFunction(candleData.date) + candleWidth / 2,
          yScaleFunction(candleData.position.positionValue),
        );
        position.lineTo(
          xScaleFunction(candleData.date),
          yScaleFunction(candleData.position.positionValue) -
            (candleWidth / 1.5 > 20 ? 20 : candleWidth / 1.5),
        );
        ctx.fillStyle = colors.longPosition;
        ctx.strokeStyle = colors.longPosition;
      } else if (candleData.position.positionType === "short") {
        position.moveTo(
          xScaleFunction(candleData.date) - candleWidth / 2,
          yScaleFunction(candleData.position.positionValue),
        );
        position.lineTo(
          xScaleFunction(candleData.date) + candleWidth / 2,
          yScaleFunction(candleData.position.positionValue),
        );
        position.lineTo(
          xScaleFunction(candleData.date),
          yScaleFunction(candleData.position.positionValue) +
            (candleWidth / 1.5 > 20 ? 20 : candleWidth / 1.5),
        );
        ctx.fillStyle = colors.shortPosition;
        ctx.strokeStyle = colors.shortPosition;
      }
      ctx.stroke(position);
      ctx.fill(position);

      //sl
      if (candleData.position.sl) {
        let sl = new Path2D();
        sl.rect(
          xScaleFunction(candleData.date) - candleWidth / 1.2,
          yScaleFunction(candleData.position.sl),
          candleWidth * 1.6,
          3,
        );
        ctx.fillStyle = colors.sl;
        ctx.strokeStyle = colors.sl;
        ctx.stroke(sl);
        ctx.fill(sl);
      }

      //tp
      if (candleData.position.tp) {
        let tp = new Path2D();
        tp.rect(
          xScaleFunction(candleData.date) - candleWidth / 1.2,
          yScaleFunction(candleData.position.tp),
          candleWidth * 1.6,
          3,
        );
        ctx.fillStyle = colors.tp;
        ctx.strokeStyle = colors.tp;
        ctx.stroke(tp);
        ctx.fill(tp);
      }
    }
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const getSMAValueSource = (candle: dataType, source: NonNullable<SMAType["source"]>) => {
    switch (source) {
      case "open":
        return candle.open;
      case "high":
        return candle.high;
      case "low":
        return candle.low;
      case "close":
      default:
        return candle.close;
    }
  };

  const deriveSMAPeriod = (visibleCount: number) => {
    const ratioInput = sma.period?.value;
    const ratio =
      typeof ratioInput === "number" && Number.isFinite(ratioInput) && ratioInput > 0
        ? ratioInput
        : 0.1;

    const minInput = sma.period?.min;
    const maxInput = sma.period?.max;

    const minPeriod =
      typeof minInput === "number" && Number.isFinite(minInput) && minInput >= 1
        ? Math.floor(minInput)
        : 5;

    const maxPeriod =
      typeof maxInput === "number" && Number.isFinite(maxInput) && maxInput >= 1
        ? Math.floor(maxInput)
        : 200;

    if (visibleCount <= 0) return 0;

    const unclamped = Math.round(visibleCount * ratio);
    const upperBound = Math.min(Math.max(maxPeriod, 1), visibleCount);
    const effectiveMin = Math.min(Math.max(minPeriod, 1), upperBound);
    return clamp(unclamped, effectiveMin, upperBound);
  };

  const computeSMA = (values: number[], period: number): Array<number | null> => {
    if (period <= 0) return values.map(() => null);
    if (period === 1) return values.map((v) => v);

    const result: Array<number | null> = new Array(values.length).fill(null);
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
      sum += values[i];
      if (i >= period) sum -= values[i - period];
      if (i >= period - 1) result[i] = sum / period;
    }
    return result;
  };

  const drawSMA = (ctx: CanvasRenderingContext2D) => {
    if (!sma.enable) return;
    if (!data.shownData.length) return;
    if (!xScaleFunction || !yScaleFunction) return;

    const period = deriveSMAPeriod(data.shownData.length);
    if (period < 2) return;

    const source = sma.source ?? "close";
    const values = data.shownData.map((c) => getSMAValueSource(c, source));
    const smaValues = computeSMA(values, period);

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
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.strokeStyle = sma.stroke ?? colors.RSChartStroke;
    ctx.lineWidth = (sma.strokeWidth ?? 2) / scale;
    ctx.stroke();
  };

  useLayoutEffect(() => {
    if (canvas.current) {
      context2D.current = canvas.current.getContext("2d");
    }
  }, [canvas.current]);

  useEffect(() => {
    if (firstRender && xScaleFunction && yScaleFunction) {
      let candleWidth: number = calcCandleWidth(
        data.minMaxShownDate,
        data.candleWidthDate,
      );

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
  useEffect(() => {
    if (firstRender) return;

    let candleWidth: number = calcCandleWidth(
      data.minMaxShownDate,
      data.candleWidthDate,
    );

    setCandleWidth(candleWidth);
  }, [
    data.shownData,
    data.candleWidthDate,
    config.canvasWidth,
    config.canvasHeight,
    firstRender,
  ]);

  useEffect(() => {
    if (context2D.current && candleWidth > 0 && config.canvasHeight) {
      context2D.current?.clearRect(
        0,
        0,
        config.canvasWidth as number,
        config.canvasHeight as number,
      );
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
    sma.period?.value,
    sma.period?.min,
    sma.period?.max,
    sma.stroke,
    sma.strokeWidth,
    colors.RSChartStroke,
  ]);

  return (
    <canvas
      width={(config.canvasWidth as number) * scale}
      height={(config.canvasHeight as number) * scale}
      ref={canvas}
      id={id}
      style={{
        width: config.canvasWidth + "px",
        height: config.canvasHeight + "px",
        cursor: config.pan ? "all-scroll" : "",
      }}
    ></canvas>
  );
};

export default CandlesCanvas;

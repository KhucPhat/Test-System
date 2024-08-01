import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const RealtimeCandlestickChart = () => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();
  const lineSeriesUpRef = useRef();
  const lineSeriesDownRef = useRef();
  let dataGenerator;
  const [dataUpdate, setDataUpdate] = useState<any>([]);

  // Sinh dữ liệu giả lập
  function samplePoint(i) {
    const randomFactor = 25 + Math.random() * 25;
    return (
      i *
        (0.5 +
          Math.sin(i) * 0.2 +
          Math.sin(i / 2) * 0.4 +
          Math.sin(i / randomFactor) * 0.8 +
          Math.sin(i / 50) * 0.5) +
      200 +
      i * 2
    );
  }

  function generateData(
    numberOfCandles = 500,
    updatesPerCandle = 5,
    startAt = 100
  ) {
    const initialData = [];
    const realtimeUpdates = [];
    const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0));
    let lastCandle;
    let previousValue = samplePoint(-1);

    for (let i = 0; i < numberOfCandles * updatesPerCandle; i++) {
      if (i % updatesPerCandle === 0) {
        date.setUTCDate(date.getUTCDate() + 1);
      }

      const time = date.getTime() / 1000;
      let value = samplePoint(i);
      const diff = (value - previousValue) * Math.random();
      value = previousValue + diff;
      previousValue = value;

      if (i % updatesPerCandle === 0) {
        lastCandle = {
          time,
          open: value,
          high: value,
          low: value,
          close: value,
        };
        if (i >= startAt) {
          realtimeUpdates.push(lastCandle);
        }
      } else {
        lastCandle = {
          ...lastCandle,
          close: value,
          low: Math.min(lastCandle.low, value),
          high: Math.max(lastCandle.high, value),
        };
        if (i >= startAt) {
          realtimeUpdates.push(lastCandle);
        } else if ((i + 1) % updatesPerCandle === 0) {
          initialData.push(lastCandle);
        }
      }
    }
    return { initialData, realtimeUpdates };
  }

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    });

    seriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Thêm line series cho sự tăng giảm
    lineSeriesUpRef.current = chartRef.current.addLineSeries({
      color: "#26a69a",
      lineWidth: 2,
    });

    lineSeriesDownRef.current = chartRef.current.addLineSeries({
      color: "#ef5350",
      lineWidth: 2,
    });

    // Thiết lập khoảng cách giữa các nến
    chartRef.current.timeScale().applyOptions({
      barSpacing: 20,
    });

    const { initialData, realtimeUpdates } = generateData(2500, 20, 1000);
    seriesRef.current.setData(initialData);

    const lineDataUp = initialData.map((point) => ({
      time: point.time,
      value: point.close,
    }));

    const lineDataDown = initialData.map((point) => ({
      time: point.time,
      value: point.close,
    }));

    lineSeriesUpRef.current.setData(lineDataUp);
    lineSeriesDownRef.current.setData(lineDataDown);

    dataGenerator = (function* () {
      for (const data of realtimeUpdates) {
        yield data;
      }
    })();

    const intervalID = setInterval(() => {
      const update = dataGenerator.next();
      if (update.done) {
        clearInterval(intervalID);
        return;
      }
      const newData = update.value;
      seriesRef.current.update(newData);

      const { time, open, close } = newData;
      if (close > open) {
        lineSeriesUpRef.current.update({ time, value: close });
      } else if (close < open) {
        lineSeriesDownRef.current.update({ time, value: close });
      }
    }, 1000);

    return () => {
      clearInterval(intervalID);
      chartRef.current.remove();
    };
  }, []);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }} />
  );
};

export default RealtimeCandlestickChart;

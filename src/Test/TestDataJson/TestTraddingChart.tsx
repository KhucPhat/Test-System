import React from 'react';
import { Candlestick } from 'react-chartjs-2';
import 'chartjs-chart-financial'; // import financial chart type

function CandlestickChart({ data }) {
  const chartData = {
    datasets: [{
      label: 'Candlestick Chart',
      data: data.map(item => ({
        t: new Date(item.date), // date
        o: item.open, // open
        h: item.high, // high
        l: item.low, // low
        c: item.close // close
      })),
      borderColor: 'gray',
      backgroundColor: (context) => {
        const value = context.dataset.data[context.dataIndex];
        return value.c > value.o ? 'rgba(255, 80, 0, 0.7)' : 'rgba(0, 150, 136, 0.7)';
      }
    }]
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price'
        }
      }
    }
  };

  return <Candlestick data={chartData} options={options} />;
}

export default CandlestickChart;

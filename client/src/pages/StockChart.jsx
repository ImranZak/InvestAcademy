import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ labels, data, title, stockDataLabel, graphType, yMin, yMax }) => {
  // Ensure yMin and yMax are numbers
  const min = parseFloat(yMin);
  const max = parseFloat(yMax);

  // Calculate a dynamic step size based on the range of values
  const range = Math.abs(max - min);
  const stepSize = range / 10 > 0 ? range / 10 : 1; // Fallback to 1 if the range is too small

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: stockDataLabel || title, // Use stockDataLabel if provided, otherwise fallback to title
        data: data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 2,
        fill: graphType === 'bar',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: Math.min(...data) - stepSize,
        suggestedMax: Math.max(...data) + stepSize,
        ticks: {
          stepSize: stepSize,
          callback: function (value) {
            return value.toFixed(0); // Format the label to remove decimal places
          },
        },
      },
    },
  };

  return graphType === 'bar' ? (
    <Bar data={chartData} options={options} />
  ) : (
    <Line data={chartData} options={options} />
  );
};

export default StockChart;
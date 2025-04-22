import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartContainerProps {
  title: string;
  type: 'line' | 'bar';
  data: any;
  options?: ChartOptions<'line' | 'bar'>;
  height?: number;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  type,
  data,
  options,
  height = 300,
  className = ''
}) => {
  const defaultOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        padding: 12,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(75, 85, 99, 0.2)',
        borderWidth: 1,
        displayColors: true,
        boxPadding: 4,
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x',
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          padding: 8,
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className={`card ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div style={{ height: `${height}px` }}>
        {type === 'line' ? (
          <Line data={data} options={mergedOptions} />
        ) : (
          <Bar data={data} options={mergedOptions} />
        )}
      </div>
    </div>
  );
};

export default ChartContainer;
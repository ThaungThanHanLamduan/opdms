// components/BodyTemperatureChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BodyTemperatureChart: React.FC = () => {
  const bodyTemperatureData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Body Temperature (°F)',
        data: [98.6, 98.8, 98.4, 99.1, 98.7, 98.9, 98.5],
        fill: false,
        borderColor: 'rgba(54,162,235,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line
        data={bodyTemperatureData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Body Temperature Over Time' },
          },
        }}
      />
    </div>
  );
};

export default BodyTemperatureChart;

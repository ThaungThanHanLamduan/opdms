import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const BloodPressureChart = () => {
  const data = {
    labels: [
      'January', 'February', 'March', 'April', 
      'May', 'June', 'July', 'August', 
      'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Systolic (mmHg)',
        data: [118, 120, 122, 125, 117, 119, 121, 123, 118, 116, 120, 124], 
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Diastolic (mmHg)',
        data: [76, 78, 80, 79, 74, 75, 77, 78, 76, 74, 75, 79],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Blood Pressure Readings (mmHg)',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 50, 
        max: 140, 
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BloodPressureChart;

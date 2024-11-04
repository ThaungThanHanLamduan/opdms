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
import { useGetTreatment } from '@/app/hooks/useTreatmentApi';

interface DiagnosisChartProps {
  patientId: number;
}

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const BloodPressureChart: React.FC<DiagnosisChartProps> = ({ patientId }) => {
  const { data } = useGetTreatment(patientId);
  const treatments = data?.data;

  const bloodPressureData = treatments
    ?.map((treatment: { appointmentDate: string; medicalTreatmentDetails: { bloodPressure: string } }) => {
      const [systolic, diastolic] = treatment.medicalTreatmentDetails.bloodPressure.split('/').map(Number);
      return {
        date: treatment.appointmentDate,
        systolic,
        diastolic,
      };
    })
    .sort((a: { date: Date; }, b: { date: Date; }) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const labels = bloodPressureData?.map((entry: { date: string; }) => entry.date) || [];
  const systolicData = bloodPressureData?.map((entry: { systolic: string; }) => entry.systolic) || [];
  const diastolicData = bloodPressureData?.map((entry: { diastolic: string; }) => entry.diastolic) || [];

  const dataChart = {
    labels: labels,
    datasets: [
      {
        label: 'Systolic (mmHg)',
        data: systolicData,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Diastolic (mmHg)',
        data: diastolicData,
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
        max: 180, // Adjust according to expected range
      },
    },
  };

  return <Line data={dataChart} options={options} />;
};

export default BloodPressureChart;

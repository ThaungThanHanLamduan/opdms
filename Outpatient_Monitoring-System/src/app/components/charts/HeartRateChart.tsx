// components/HeartRateChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetTreatment } from "@/app/hooks/useTreatmentApi";

interface DiagnosisChartProps {
  patientId : number
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HeartRateChart: React.FC<DiagnosisChartProps> = ({ patientId }) => {
  const { data } = useGetTreatment(patientId);
  const treatments = data?.data;

  const heartRateLevels = treatments
    ?.map(
      (treatment: {
        appointmentDate: string;
        medicalTreatmentDetails: { heartRate: number };
      }) => ({
        date: treatment.appointmentDate,
        heartRate: treatment.medicalTreatmentDetails.heartRate,
      })
    )
    .sort(
      (a: { date: Date }, b: { date: Date }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const labels =
    heartRateLevels?.map((entry: { date: string }) => entry.date) || [];
  const heartRateData =
    heartRateLevels?.map((entry: { heartRate: number }) => entry.heartRate) ||
    [];

  const heartRateLevelData = {
    labels: labels,
    datasets: [
      {
        label: "Heart Rate (bpm)",
        data: heartRateData,
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        tension: 0.0,
      },
    ],
  };

  return (
    <div>
      <Line
        data={heartRateLevelData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Heart Rate Over Time" },
          },
        }}
      />
    </div>
  );
};

export default HeartRateChart;

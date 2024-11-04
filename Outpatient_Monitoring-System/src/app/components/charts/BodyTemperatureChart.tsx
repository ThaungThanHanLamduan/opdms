// components/BodyTemperatureChart.tsx
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
  patientId: number;
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

const BodyTemperatureChart: React.FC<DiagnosisChartProps> = ({ patientId }) => {
  const { data } = useGetTreatment(patientId);
  const treatments = data?.data;

  const bodyTemperatureLevels = treatments
    ?.map(
      (treatment: {
        appointmentDate: string;
        medicalTreatmentDetails: { bodyTemperature: number };
      }) => ({
        date: treatment.appointmentDate,
        bodyTemperature: treatment.medicalTreatmentDetails.bodyTemperature,
      })
    )
    .sort(
      (a: { date: Date }, b: { date: Date }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const labels =
    bodyTemperatureLevels?.map((entry: { date: string }) => entry.date) || [];
  const bodyTemperatureData =
    bodyTemperatureLevels?.map(
      (entry: { bodyTemperature: number }) => entry.bodyTemperature
    ) || [];

  const bodyTemperatureLevelData = {
    labels,
    datasets: [
      {
        label: "Body Temperature (°F)",
        data: bodyTemperatureData,
        fill: false,
        borderColor: "rgba(54,162,235,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line
        data={bodyTemperatureLevelData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Body Temperature Over Time" },
          },
        }}
      />
    </div>
  );
};

export default BodyTemperatureChart;

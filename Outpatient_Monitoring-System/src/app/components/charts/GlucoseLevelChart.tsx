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

const GlucoseLevelChart: React.FC<DiagnosisChartProps> = ({ patientId }) => {
  const { data } = useGetTreatment(patientId);
  const treatments = data?.data;

  const glucoseLevels = treatments
    ?.map((treatment: { appointmentDate: string; medicalTreatmentDetails: { glucoseLevel: number } }) => ({
      date: treatment.appointmentDate,
      glucose: treatment.medicalTreatmentDetails.glucoseLevel,
    }))
    .sort((a: { date: Date; }, b: { date: Date; }) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const labels = glucoseLevels?.map((entry: { date: string; }) => entry.date) || [];
  const glucoseData = glucoseLevels?.map((entry: {glucose: string}) => entry.glucose) || [];

  const glucoseLevelData = {
    labels: labels,
    datasets: [
      {
        label: "Glucose Level (mg/dL)",
        data: glucoseData,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <Line
        data={glucoseLevelData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Glucose Level Over Time" },
          },
        }}
      />
    </div>
  );
};

export default GlucoseLevelChart;

"use client";
import React, { useState } from "react";
import BloodPressureChart from "./charts/BloodPressureChart";
import GlucoseLevelChart from "./charts/GlucoseLevelChart";
import HeartRateChart from "./charts/HeartRateChart";
import BodyTemperatureChart from "./charts/BodyTemperatureChart";

const DiagnosisChart: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState("Blood Pressure");

  const renderChart = () => {
    switch (selectedChart) {
      case "Blood Pressure":
        return <div className="px-4 py-2"><BloodPressureChart/></div>;
      case "Glucose Level":
        return  <div className="px-4 py-2"><GlucoseLevelChart/></div>;
      case "Heart Rate":
        return <div className="px-4 py-2"><HeartRateChart/></div>;
      case "Body Temperature":
        return <div className="px-4 py-2"><BodyTemperatureChart/></div>;
      default:
        return <div>Select a chart to view</div>;
    }
  };

  return (
    <div className="my-5 bg-white rounded-lg">
      {/* Button Group */}
      <div className="flex justify-between items-center px-10 pt-6 pb-3">
        <button
          className={`${
            selectedChart === "Blood Pressure"
              ? "text-primary"
              : "text-slate-600"
          } text-lg`}
          onClick={() => setSelectedChart("Blood Pressure")}
        >
          Blood Pressure
        </button>
        <button
          className={`${
            selectedChart === "Glucose Level"
              ? "text-primary"
              : "text-slate-600"
          } text-lg`}
          onClick={() => setSelectedChart("Glucose Level")}
        >
          Glucose Level
        </button>
        <button
          className={`${
            selectedChart === "Heart Rate" ? "text-primary" : "text-slate-600"
          } text-lg`}
          onClick={() => setSelectedChart("Heart Rate")}
        >
          Heart Rate
        </button>
        <button
          className={`${
            selectedChart === "Body Temperature"
              ? "text-primary"
              : "text-slate-600"
          } text-lg`}
          onClick={() => setSelectedChart("Body Temperature")}
        >
          Body Temperature
        </button>
      </div>
      <hr className="text-slate-600" />

      {/* Chart Display */}
      <div className="mt-6">{renderChart()}</div>
    </div>
  );
};

export default DiagnosisChart;

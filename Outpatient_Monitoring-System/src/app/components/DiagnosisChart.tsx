"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BloodPressureChart from "./charts/BloodPressureChart";
import GlucoseLevelChart from "./charts/GlucoseLevelChart";
import HeartRateChart from "./charts/HeartRateChart";
import BodyTemperatureChart from "./charts/BodyTemperatureChart";

interface DiagnosisChartProps {
  patientId: number;
}

const DiagnosisChart: React.FC<DiagnosisChartProps> = ({ patientId }) => {
  const [selectedChart, setSelectedChart] = useState("Blood Pressure");

  const renderChart = () => {
    switch (selectedChart) {
      case "Blood Pressure":
        return <BloodPressureChart patientId={patientId} />;
      case "Glucose Level":
        return <GlucoseLevelChart patientId={patientId} />;
      case "Heart Rate":
        return <HeartRateChart patientId={patientId} />;
      case "Body Temperature":
        return <BodyTemperatureChart patientId={patientId} />;
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
            selectedChart === "Blood Pressure" ? "text-primary" : "text-slate-600"
          } text-lg`}
          onClick={() => setSelectedChart("Blood Pressure")}
        >
          Blood Pressure
        </button>
        <button
          className={`${
            selectedChart === "Glucose Level" ? "text-primary" : "text-slate-600"
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
            selectedChart === "Body Temperature" ? "text-primary" : "text-slate-600"
          } text-lg`}
          onClick={() => setSelectedChart("Body Temperature")}
        >
          Body Temperature
        </button>
      </div>
      <hr className="text-slate-600" />

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedChart} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} 
          >
            {renderChart()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiagnosisChart;

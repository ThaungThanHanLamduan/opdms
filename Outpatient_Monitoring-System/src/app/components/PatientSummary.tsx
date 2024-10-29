import React from "react";
import OverviewPatient from "./OverviewPatient";
import PatientTypes from "./PatientTypes";

const PatientSummary: React.FC = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-6">
      <OverviewPatient/>
      <PatientTypes/>
    </div>
  );
};

export default PatientSummary;

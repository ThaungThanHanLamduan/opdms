/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PatientDiagnose } from "@/types/patientTypes";
import { useGetDiagnosisCount } from "../hooks/usePatientApi";

const DiagnoseCard: React.FC<PatientDiagnose> = ({ patientNum, diagnose }) => (
  <div className="flex flex-col justify-between items-center bg-white hover:bg-gray-50 rounded-2xl w-[150px] gap-1 py-2">
    <div className="flex flex-col justify-center items-center">
      <p className="text-black text-xl">{patientNum}</p>
      <p className="text-sm text-gray-400">Patients</p>
    </div>
    <div className="w-full border text-slate-50 opacity-30"></div>
    <p className="text-black font-semibold text-sm py-2">{diagnose}</p>
  </div>
);

const PatientTypes: React.FC = () => {
  const { data } = useGetDiagnosisCount();

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      {data?.data.map((diagnosis : any) => (
        <DiagnoseCard
          key={diagnosis?.diagnosisName}  
          patientNum={diagnosis?.count}
          diagnose={diagnosis?.diagnosisName}
        />
      ))}
    </div>
  );
};

export default PatientTypes;

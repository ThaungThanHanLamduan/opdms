/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PatientDiagnose } from "@/types/patientTypes";
import { useGetDiagnosisCount } from "../hooks/usePatientApi";
import { motion } from "framer-motion";

const DiagnoseCard: React.FC<PatientDiagnose> = ({ patientNum, diagnose }) => (
  <motion.div
    className="flex flex-col justify-between items-center bg-white hover:bg-gray-50 rounded-2xl w-[150px] gap-1 py-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex flex-col justify-center items-center">
      <p className="text-black text-xl">{patientNum}</p>
      <p className="text-sm text-gray-400">Patients</p>
    </div>
    <div className="w-full border text-slate-50 opacity-30"></div>
    <p className="text-black font-semibold text-sm py-2">{diagnose}</p>
  </motion.div>
);

const PatientTypes: React.FC = () => {
  const { data } = useGetDiagnosisCount();

  return (
    <motion.div
      className="flex justify-between items-center gap-4 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {data?.data.map((diagnosis: any) => (
        <DiagnoseCard
          key={diagnosis?.diagnosisName}
          patientNum={diagnosis?.count}
          diagnose={diagnosis?.diagnosisName}
        />
      ))}
    </motion.div>
  );
};

export default PatientTypes;

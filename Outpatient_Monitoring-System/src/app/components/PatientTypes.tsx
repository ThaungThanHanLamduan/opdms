"use client"
import { PatientDiagnose } from "@/types/patientTypes";

const DiagnoseCard: React.FC<PatientDiagnose> = ({ patientNum, diagnose }) => (
  <div className="flex flex-col justify-between items-center bg-white  hover:bg-gray-50 rounded-2xl w-[150px] gap-1 py-2">
    <div className=" flex flex-col justify-center items-center">
      <p className="text-black text-xl">{patientNum}</p>
      <p className=" text-sm text-gray-400">Patients</p>
    </div>
    <div className=" w-full border text-slate-50 opacity-30"></div>
    <p className=" text-black font-semibold text-sm py-2">{diagnose}</p>
  </div>
);

const PatientTypes: React.FC = () => {
    // const [diagnoses, setDiagnoses] = useState<PatientDiagnose[]>([]);

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      <DiagnoseCard patientNum={110} diagnose="Diabetes" />
      <DiagnoseCard patientNum={95} diagnose="Hypertension" />
      <DiagnoseCard patientNum={50} diagnose="High Blood Pressure" />
      <DiagnoseCard patientNum={50} diagnose="Obesity" />
      <DiagnoseCard patientNum={50} diagnose="CVD Risk" />
      <DiagnoseCard patientNum={50} diagnose="Kidney Disease" />
      {/* {diagnoses.map((diagnoseData, index) => (
        <DiagnoseCard
          key={index} 
          patientNum={diagnoseData.patientNum}
          diagnose={diagnoseData.diagnose}
        />
      ))} */}
    </div>
  );
};

export default PatientTypes;

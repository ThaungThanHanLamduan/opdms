"use client";
import DiagnosisChart from "@/app/components/DiagnosisChart";
import MedicalTreatementTable from "@/app/components/MedicalTreatementTable";
import MedicalTreatmentModal from "@/app/components/MedicalTreatmentModal";
import PatientProfile from "@/app/components/PatientProfile";
import PersonalInformation from "@/app/components/PersonalInformation";
import { PatientDetailProvider } from "@/app/contexts/PatientDetailContext";
import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";

interface PatientsPageProps {
  params: {
    id: string
  }
}

const Patients: React.FC<PatientsPageProps> = ({params}) => {
  const id = parseInt(params.id);  

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close the modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <PatientDetailProvider id={id}>
    <div className="bg-slate-200 overflow-y-scroll p-10 h-screen text-black flex flex-col gap-6">
      <h2 className="text-3xl">Patient Information</h2>
      <div className="flex w-full justify-between items-center gap-8">
        <PersonalInformation />
        <PatientProfile />
      </div>
      <div>
        <div className="flex gap-3 items-center">
          <h3 className="text-2xl">Medical Treatment</h3>
          <button
            className="px-3 py-1 rounded border border-primary text-primary flex gap-2 items-center"
            onClick={toggleModal}
          >
            <span>Add</span>
            <TiPlus />
          </button>
        </div>
      </div>
      <MedicalTreatementTable />
      <DiagnosisChart />
      <MedicalTreatmentModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
    </PatientDetailProvider>
  );
};

export default Patients;

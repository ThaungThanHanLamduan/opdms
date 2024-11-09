"use client";
import { motion } from "framer-motion";
import DiagnosisChart from "@/app/components/DiagnosisChart";
import MedicalTreatementTable from "@/app/components/MedicalTreatementTable";
import PatientProfile from "@/app/components/PatientProfile";
import PersonalInformation from "@/app/components/PersonalInformation";
import { PatientDetailProvider } from "@/app/contexts/PatientDetailContext";
import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import AddMedicalTreatmentModal from "@/app/components/AddMedicalTreatmentModal";

interface PatientsPageProps {
  params: {
    id: string;
  };
}

const Patients: React.FC<PatientsPageProps> = ({ params }) => {
  const id = parseInt(params.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close the modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <PatientDetailProvider id={id}>
      <motion.div
        className="bg-slate-200 overflow-y-scroll p-10 h-screen text-black flex flex-col gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Patient Information
        </motion.h2>
        <div
          className="flex w-full justify-between items-center gap-8"
        >
          <PersonalInformation />
          <PatientProfile />
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
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
        </motion.div>
        <MedicalTreatementTable />
        <DiagnosisChart patientId={id} />
        <AddMedicalTreatmentModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          patientId={id}
        />
      </motion.div>
    </PatientDetailProvider>
  );
};

export default Patients;

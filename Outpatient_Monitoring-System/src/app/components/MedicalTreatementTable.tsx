import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { BsCheck, BsX } from "react-icons/bs";
import { useGetTreatment } from "../hooks/useTreatmentApi";
import { Treatment } from "@/types/treatmentTypes";
import EditMedicalTreatmentModal from "./EditMedicalTreatmentModal";
import DeleteMedicalTreatmentModal from "./DeleteMedicalTreatmentModal";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <LuAlarmClock /> Pending
        </span>
      );
    case "TREATED":
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <BsCheck /> Treated
        </span>
      );
    case "UNTREATED":
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <BsX /> Untreated
        </span>
      );
    default:
      return null;
  }
};

interface TableProps {
  patientId: number;
}

const MedicalTreatmentTable: React.FC<TableProps> = ({ patientId }) => {
  const { data, refetch } = useGetTreatment(patientId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null
  );

  const medicalTreatments = data?.data || [];

  const openEditModal = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTreatment(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedTreatment(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Blood Pressure
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Glucose Level
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Heart Rate
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Weight(kg)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Height(cm)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Temp(F)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {medicalTreatments.map((treatment: Treatment) => (
            <motion.tr
              key={treatment.patientId}
              className="even:bg-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <td className="border border-gray-300 px-4 py-2">
                {treatment.appointmentDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.bloodPressure}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.glucoseLevel}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.heartRate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.weight}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.height}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.bodyTempF}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {getStatusBadge(treatment.treatedStatus)}
              </td>
              <td className="border px-4 py-4 flex items-center gap-3">
                <button
                  onClick={() => openEditModal(treatment)}
                  className="text-black"
                  aria-label="Edit Treatment"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => openDeleteModal(treatment)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete Treatment"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {selectedTreatment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <EditMedicalTreatmentModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            treatment={selectedTreatment}
            refetch={refetch}
          />
        </motion.div>
      )}
      {selectedTreatment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DeleteMedicalTreatmentModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            treatmentId={selectedTreatment.id!}
            refetch={refetch}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MedicalTreatmentTable;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDeleteTreatment } from "../hooks/useTreatmentApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatmentId: number;
  refetch: any;
}

const DeleteMedicalTreatmentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  treatmentId,
  refetch,
}) => {
  const deleteTreatmentMutation = useDeleteTreatment();

  const handleDelete = () => {
    deleteTreatmentMutation.mutate(treatmentId, {
      onSuccess: () => {
        refetch();
        onClose();
      },
    });
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center select-none backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete this medical treatment? This action
          cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-transform"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-transform"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMedicalTreatmentModal;

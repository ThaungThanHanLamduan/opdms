import { Treatment } from "@/types/treatmentTypes";
import React, { useState } from "react";
import { useCreateTreatment } from "../hooks/useTreatmentApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: number;
}

const MedicalTreatmentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  patientId,
}) => {
  const createTreatmentMutation = useCreateTreatment();

  const [treatmentStatus, setTreatmentStatus] = useState<string>("PENDING");

  const [formData, setFormData] = useState<Treatment>({
    appointmentDate: "",
    treatedStatus: "PENDING",
    medicalTreatmentDetails: {
      bloodPressure: "",
      glucoseLevel: 0,
      heartRate: 0,
      weight: 0,
      height: 0,
      bodyTemperature: 0,
    },
    patientId
  });

  const [showValidation, setShowValidation] = useState(false);

  const isFormValid =
    treatmentStatus !== "TREATED" ||
    Object.values(formData).every((value) => value !== "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.medicalTreatmentDetails) {
      setFormData((prev) => ({
        ...prev,
        medicalTreatmentDetails: {
          ...prev.medicalTreatmentDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setTreatmentStatus(newStatus);
    setFormData((prev) => ({ ...prev, treatedStatus: newStatus }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      createTreatmentMutation.mutate(formData, {
        onSuccess: () => {
          console.log("Treatment Data:", formData);
          setFormData({
            appointmentDate: "",
            treatedStatus: "PENDING",
            medicalTreatmentDetails: {
              bloodPressure: "N/A",
              glucoseLevel: 0,
              heartRate: 0,
              weight: 0,
              height: 0,
              bodyTemperature: 0,
            },
            patientId : 0,
          });
          onClose();
        },
        onError: () => {
          setShowValidation(true);
        },
      });
    } else {
      setShowValidation(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center select-none">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl mb-4">Add Medical Treatment</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label>Appointment</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === "TREATED" &&
                  !formData.appointmentDate
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Heart Rate</label>
              <input
                type="text"
                name="heartRate"
                value={formData.medicalTreatmentDetails.heartRate}
                onChange={handleChange}
                placeholder="Heart Rate"
                disabled={formData.treatedStatus === "PENDING" || formData.treatedStatus === "UNTREATED"}
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === "TREATED" &&
                  !formData.medicalTreatmentDetails.heartRate
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Blood Pressure</label>
              <input
                type="text"
                name="bloodPressure"
                value={formData.medicalTreatmentDetails.bloodPressure}
                onChange={handleChange}
                placeholder="Blood Pressure"
                disabled={formData.treatedStatus === "PENDING" || formData.treatedStatus === "UNTREATED"}
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === "TREATED" &&
                  !formData.medicalTreatmentDetails.bloodPressure
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Body Temperature (F)</label>
              <input
                type="text"
                name="bodyTemperature"
                value={formData.medicalTreatmentDetails.bodyTemperature}
                onChange={handleChange}
                placeholder="Body Temperature"
                disabled={formData.treatedStatus === "PENDING" || formData.treatedStatus === "UNTREATED"}
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === "TREATED" &&
                  !formData.medicalTreatmentDetails.bodyTemperature
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Glucose Level</label>
              <input
                type="text"
                name="glucoseLevel"
                value={formData.medicalTreatmentDetails.glucoseLevel}
                onChange={handleChange}
                placeholder="Glucose Level"
                disabled={formData.treatedStatus === "PENDING" || formData.treatedStatus === "UNTREATED"}
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === "TREATED" &&
                  !formData.medicalTreatmentDetails.glucoseLevel
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Height (cm)</label>
              <input
                type="text"
                name="height"
                value={formData.medicalTreatmentDetails.height}
                onChange={handleChange}
                placeholder="Height"
                disabled={formData.treatedStatus === "PENDING" || formData.treatedStatus === "UNTREATED"}
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === "TREATED" &&
                  !formData.medicalTreatmentDetails.height
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input
                type="text"
                name="weight"
                value={formData.medicalTreatmentDetails.weight}
                onChange={handleChange}
                placeholder="Weight"
                disabled={formData.treatedStatus === "PENDING" || formData.treatedStatus === "UNTREATED"}
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === "TREATED" &&
                  !formData.medicalTreatmentDetails.weight
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Treatment Status</label>
              <select
                value={treatmentStatus}
                onChange={handleStatusChange}
                className="border rounded p-2 w-full"
              >
                <option value="PENDING">Pending</option>
                <option value="TREATED">Treated</option>
                <option value="UNTREATED">Untreated</option>
              </select>
            </div>
          </div>

          {showValidation && treatmentStatus === "TREATED" && (
            <p className="text-red-500 mb-4">
              Please fill all fields for Treated status.
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                isFormValid
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-black cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalTreatmentModal;

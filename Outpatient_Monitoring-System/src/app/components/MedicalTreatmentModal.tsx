import { Treatment } from "@/types/treatmentTypes";
import React, { useState } from "react";
import { useCreateTreatment } from "../hooks/useTreatmentApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MedicalTreatmentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

  const createTreatmentMutation = useCreateTreatment();

  const [treatmentStatus, setTreatmentStatus] = useState<string>("Pending");
  
  const [formData, setFormData] = useState<Treatment>({
    appointment: "",
    heartRate: 0,
    bloodPressure: 0,
    bodyTemperature: 0,
    glucoseLevel: 0,
    height: 0,
    weight: 0,
  });
  
  const [showValidation, setShowValidation] = useState(false);

  const isFormValid =
    treatmentStatus !== "Treated" ||
    Object.values(formData).every((value) => value !== "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    createTreatmentMutation.mutate(formData,{
      onSuccess: () => {
        console.log(formData);
        onClose();
      },
      onError: () => {
        setShowValidation(true);
      }
    })
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl mb-4">Add Medical Treatment</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label>Appointment</label>
              <input
                type="date"
                name="appointment"
                value={formData.appointment}
                onChange={handleChange}
                className={`border rounded p-2 w-full ${
                  showValidation && treatmentStatus === "Treated" && !formData.appointment
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
                value={formData.heartRate}
                onChange={handleChange}
                placeholder="Heart Rate"
                className={`border rounded p-2 w-full ${
                  showValidation && treatmentStatus === "Treated" && !formData.heartRate
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
                value={formData.bloodPressure}
                onChange={handleChange}
                placeholder="Blood Pressure"
                className={`border rounded p-2 w-full ${
                  showValidation && treatmentStatus === "Treated" && !formData.bloodPressure
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Body Temperature (F)</label>
              <input
                type="text"
                name="temperature"
                value={formData.bodyTemperature}
                onChange={handleChange}
                placeholder="Temperature"
                className={`border rounded p-2 w-full ${
                  showValidation && treatmentStatus === "Treated" && !formData.bodyTemperature
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Glucose Level</label>
              <input
                type="text"
                name="glucose"
                value={formData.glucoseLevel}
                onChange={handleChange}
                placeholder="Glucose Level"
                className={`border rounded p-2 w-full ${
                  showValidation && treatmentStatus === "Treated" && !formData.glucoseLevel
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
                value={formData.height}
                onChange={handleChange}
                placeholder="Height"
                className={`border rounded p-2 w-full ${
                  showValidation && treatmentStatus === "Treated" && !formData.height
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
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight"
                className={`border rounded p-2 w-full ${
                  showValidation && treatmentStatus === "Treated" && !formData.weight
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            <div>
              <label>Treatment Status</label>
              <select
                value={treatmentStatus}
                onChange={(e) => {
                  setTreatmentStatus(e.target.value);
                  setShowValidation(false);
                }}
                className="border rounded p-2 w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Treated">Treated</option>
                <option value="Untreated">Untreated</option>
              </select>
            </div>
          </div>

          {showValidation && treatmentStatus === "Treated" && (
            <p className="text-red-500 mb-4">Please fill all fields for Treated status.</p>
          )}


          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                isFormValid ? "bg-primary text-white" : "bg-gray-300 text-black cursor-not-allowed"
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

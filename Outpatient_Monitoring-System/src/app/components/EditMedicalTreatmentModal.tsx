/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Treatment } from '@/types/treatmentTypes';
import { useUpdateTreatment } from '../hooks/useTreatmentApi';
import { usePatientDetail } from '../contexts/PatientDetailContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatment: any;
}

const EditMedicalTreatmentModal: React.FC<ModalProps> = ({ isOpen, onClose, treatment}) => {
  const {refetchTreatments} = usePatientDetail()
  const updateTreatmentMutation = useUpdateTreatment();
  const [treatmentStatus, setTreatmentStatus] = useState<string>('PENDING');
  const [formData, setFormData] = useState<Treatment>({
    id: treatment?.id,
    appointmentDate: treatment?.appointmentDate,
    treatedStatus: treatment?.treatedStatus,
    medicalTreatmentDetails: {
      bloodPressure: treatment?.medicalTreatmentDetails?.bloodPressure,
      glucoseLevel: treatment?.medicalTreatmentDetails?.glucoseLevel,
      heartRate: treatment?.medicalTreatmentDetails?.heartRate,
      weight: treatment?.medicalTreatmentDetails?.weight,
      height: treatment?.medicalTreatmentDetails?.height,
      bodyTempF: treatment?.medicalTreatmentDetails?.bodyTempF,
    },
    patientId: treatment?.patientId || 0,
  });

  const [showValidation, setShowValidation] = useState(false);

  const isFormValid =
    treatmentStatus !== 'TREATED' ||
    Object.values(formData.medicalTreatmentDetails).every((value) => value !== '');

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
      updateTreatmentMutation.mutate(formData, {
        onSuccess: () => {
          console.log('Treatment Data:', formData);
          refetchTreatments();
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center select-none backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl mb-4">Update Medical Treatment</h3>
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
                  treatmentStatus === 'TREATED' &&
                  !formData.appointmentDate
                    ? 'border-red-500'
                    : ''
                }`}
              />
            </div>
            <div>
              <label>Heart Rate</label>
              <input
                type="number"
                name="heartRate"
                min={65}
                max={90}
                value={formData.medicalTreatmentDetails.heartRate}
                onChange={handleChange}
                placeholder="Heart Rate"
                disabled={
                  formData.treatedStatus === 'PENDING' ||
                  formData.treatedStatus === 'UNTREATED'
                }
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === 'TREATED' &&
                  !formData.medicalTreatmentDetails.heartRate
                    ? 'border-red-500'
                    : ''
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
                disabled={
                  formData.treatedStatus === 'PENDING' ||
                  formData.treatedStatus === 'UNTREATED'
                }
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === 'TREATED' &&
                  !formData.medicalTreatmentDetails.bloodPressure
                    ? 'border-red-500'
                    : ''
                }`}
              />
            </div>
            <div>
              <label>Body Temperature (F)</label>
              <input
                type="number"
                name="bodyTempF"
                min={90}
                max={105}
                value={formData.medicalTreatmentDetails.bodyTempF}
                onChange={handleChange}
                placeholder="Body Temperature"
                disabled={
                  formData.treatedStatus === 'PENDING' ||
                  formData.treatedStatus === 'UNTREATED'
                }
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === 'TREATED' &&
                  !formData.medicalTreatmentDetails.bodyTempF
                    ? 'border-red-500'
                    : ''
                }`}
              />
            </div>
            <div>
              <label>Glucose Level</label>
              <input
                type="number"
                name="glucoseLevel"
                min={20}
                max={90}
                value={formData.medicalTreatmentDetails.glucoseLevel}
                onChange={handleChange}
                placeholder="Glucose Level"
                disabled={
                  formData.treatedStatus === 'PENDING' ||
                  formData.treatedStatus === 'UNTREATED'
                }
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === 'TREATED' &&
                  !formData.medicalTreatmentDetails.glucoseLevel
                    ? 'border-red-500'
                    : ''
                }`}
              />
            </div>
            <div>
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.medicalTreatmentDetails.height}
                onChange={handleChange}
                placeholder="Height"
                disabled={
                  formData.treatedStatus === 'PENDING' ||
                  formData.treatedStatus === 'UNTREATED'
                }
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === 'TREATED' &&
                  !formData.medicalTreatmentDetails.height
                    ? 'border-red-500'
                    : ''
                }`}
              />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.medicalTreatmentDetails.weight}
                onChange={handleChange}
                placeholder="Weight"
                disabled={
                  formData.treatedStatus === 'PENDING' ||
                  formData.treatedStatus === 'UNTREATED'
                }
                className={`border rounded p-2 w-full ${
                  showValidation &&
                  treatmentStatus === 'TREATED' &&
                  !formData.medicalTreatmentDetails.weight
                    ? 'border-red-500'
                    : ''
                }`}
              />
            </div>
          </div>
          <div>
            <label>Status</label>
            <select
              value={treatmentStatus}
              onChange={handleStatusChange}
              className="border rounded p-2 w-full mb-4"
            >
              <option value="PENDING">Pending</option>
              <option value="TREATED">Treated</option>
              <option value="UNTREATED">Untreated</option>
            </select>
          </div>
          {showValidation && (
            <p className="text-red-500">Please fill in all required fields.</p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMedicalTreatmentModal;

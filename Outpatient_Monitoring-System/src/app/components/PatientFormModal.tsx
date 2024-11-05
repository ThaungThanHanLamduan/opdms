"use client";
import React, { useState } from "react";
import { useCreatePatient } from "../hooks/usePatientApi";
import { PatientFormModalProps, Patient } from "@/types/patientTypes";
import Select, { SingleValue } from "react-select";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";

const PatientFormModal: React.FC<PatientFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const createPatientMutation = useCreatePatient();
  const { refetchPatients } = useOutpatientTable();

  const nationalityOptions = [
    { value: "", label: "Select Nationality" },
    { value: "American", label: "American" },
    { value: "Australian", label: "Australian" },
    { value: "British", label: "British" },
    { value: "Bruneian", label: "Bruneian" },
    { value: "Burmese", label: "Burmese" },
    { value: "Canadian", label: "Canadian" },
    { value: "Cambodian", label: "Cambodian" },
    { value: "Chinese", label: "Chinese" },
    { value: "French", label: "French" },
    { value: "Filipino", label: "Filipino" },
    { value: "German", label: "German" },
    { value: "Indian", label: "Indian" },
    { value: "Indonesian", label: "Indonesian" },
    { value: "Japanese", label: "Japanese" },
    { value: "Laotian", label: "Laotian" },
    { value: "Malaysian", label: "Malaysian" },
    { value: "Mexican", label: "Mexican" },
    { value: "Russian", label: "Russian" },
    { value: "Singaporean", label: "Singaporean" },
    { value: "Thai", label: "Thai" },
    { value: "Vietnamese", label: "Vietnamese" },
  ];

  const [formData, setFormData] = useState<Patient>({
    name: "",
    patientDetails: {
      dateOfBirth: "",
      contactNo: "",
      address: "",
      gender: 0,
      bloodType: "A",
      email: "",
      diagnosis: "",
      identification_no: "",
      nationality: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      if (name === "gender") {
        return {
          ...prevFormData,
          patientDetails: {
            ...prevFormData.patientDetails,
            gender: value === "Male" ? 1 : 0,
          },
        };
      } else if (name in prevFormData.patientDetails) {
        return {
          ...prevFormData,
          patientDetails: {
            ...prevFormData.patientDetails,
            [name]: value,
          },
        };
      }
      return { ...prevFormData, [name]: value };
    });
  };

  const handleNationalityChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      patientDetails: {
        ...prevData.patientDetails,
        nationality: newValue ? newValue.value : "",
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createPatientMutation.mutate(formData, {
      onSuccess: () => {
        console.log(formData);
        refetchPatients();
        setFormData({
          name: "",
          patientDetails: {
            dateOfBirth: "",
            contactNo: "",
            address: "",
            gender: 0,
            bloodType: "A",
            email: "",
            diagnosis: "",
            identification_no: "",
            nationality: "",
          },
        });
        onClose();
      },
      onError: (error) => {
        console.error("Error creating patient:", error);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center select-none backdrop-blur-sm transition-opacity duration-300 z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] max-w-full">
        <h2 className="text-2xl mb-6 text-black">
          Patient Personal Information
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-3 text-black"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="w-full border rounded px-3 py-2"
              value={formData.patientDetails.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              className="w-full border rounded px-3 py-2"
              value={formData.patientDetails.gender === 1 ? "Male" : "Female"}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Blood Type</label>
            <select
              name="bloodType"
              className="w-full border rounded px-3 py-2"
              value={formData.patientDetails.bloodType}
              onChange={handleChange}
              required
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Email"
              value={formData.patientDetails.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Identification Number
            </label>
            <input
              type="text"
              name="identification_no"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter ID Number"
              value={formData.patientDetails.identification_no}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nationality
            </label>

            <Select
              options={nationalityOptions}
              placeholder="Select Nationality"
              onChange={handleNationalityChange}
              value={nationalityOptions.find(
                (option) => option.value === formData.patientDetails.nationality
              )}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              type="text"
              name="contactNo"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Contact"
              value={formData.patientDetails.contactNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Address"
              value={formData.patientDetails.address}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Patient's Diagnosis"
              value={formData.patientDetails.diagnosis}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientFormModal;

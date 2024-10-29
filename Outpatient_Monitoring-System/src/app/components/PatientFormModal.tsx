"use client";
import { PatientFormModalProps, Patient } from "@/types/patientTypes";
import React, { useState } from "react";

const PatientFormModal: React.FC<PatientFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Patient>({
    id: 0,
    name: "",
    dob: "",
    gender: "Male",
    contact: "",
    bloodType: "A",
    email: "",
    address: "",
    diagnosis: "",
    treated: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] max-w-full">
        <h2 className="text-2xl mb-6 text-black">Patient Personal Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 text-black">
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
  <label className="block text-sm font-medium mb-1" htmlFor="dob">
    Date of Birth
  </label>
  <input
    type="date"
    id="dob"
    name="dob"
    className="w-full border rounded px-3 py-2"
    value={formData.dob}
    onChange={handleChange}
    required
  />
</div>


          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              className="w-full border rounded px-3 py-2"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Blood Type</label>
            <select
              name="bloodType"
              className="w-full border rounded px-3 py-2"
              value={formData.bloodType}
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
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Address"
              value={formData.address}
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
              value={formData.diagnosis}
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

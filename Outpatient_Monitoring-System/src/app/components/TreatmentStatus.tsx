"use client";
import React, { useState } from "react";
import { BsCheck, BsX } from "react-icons/bs";

interface TreatmentStatusProps {
  patientStatus: boolean;
}

const TreatmentStatus: React.FC<TreatmentStatusProps> = ({ patientStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(patientStatus);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (selectedStatus: boolean) => {
    setStatus(selectedStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[120px]">
      {/* Button displaying current status */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-center gap-3 w-full px-4 py-2 rounded-lg border ${
          status ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {status ? <BsCheck color="green" size="20px" /> : <BsX color="red" size="20px" />}
        <span
          className={`text-sm font-medium ${
            status ? "text-green-600" : "text-red-600"
          }`}
        >
          {status ? "Treated" : "Untreated"}
        </span>
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          <div className="flex flex-col p-2 gap-2">
            <p
              onClick={() => handleSelect(true)}
              className="text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
            >
              Treated
            </p>
            <p
              onClick={() => handleSelect(false)}
              className="text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
            >
              Untreated
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentStatus;

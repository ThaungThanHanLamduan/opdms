"use client";
import React, { useEffect, useState } from "react";
import { BsCheck, BsX } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { useGetTreatmentStatus, useUpdateTreatmentStatus } from "../hooks/usePatientApi";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";

interface TreatmentStatusProps {
  patientID: number;
  isOpen?: boolean;  // Optional for controlled mode
  onToggle?: () => void; // Optional for controlled mode
}

const TreatmentStatus: React.FC<TreatmentStatusProps> = ({ patientID, isOpen: controlledIsOpen, onToggle }) => {
  const { data, refetch } = useGetTreatmentStatus(patientID);
  const { treatmentRefetch, refetchPatients } = useOutpatientTable();
  const updateTreatmentStatusMutation = useUpdateTreatmentStatus();
  const patientStatus = data?.data?.status || "PENDING";

  // Internal state for uncontrolled mode
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<string>(patientStatus);

  // Determine if the component is in controlled mode or uncontrolled mode
  const isControlled = controlledIsOpen !== undefined && onToggle !== undefined;

  useEffect(() => {
    setStatus(patientStatus);
  }, [patientStatus]);

  const handleSelect = (selectedStatus: string) => {
    updateTreatmentStatusMutation.mutate(
      {
        patientId: patientID,
        treatedStatus: selectedStatus,
      },
      {
        onSuccess: () => {
          setStatus(selectedStatus);
          refetch();
          treatmentRefetch();
          refetchPatients();
          if (!isControlled) {
            setIsOpen(false);
          } else {
            onToggle(); // Close dropdown in controlled mode
          }
        },
        onError: () => {
          if (!isControlled) {
            setIsOpen(false);
          }
        },
      }
    );
  };

  const toggleDropdown = () => {
    if (isControlled) {
      onToggle(); // Call external toggle function
    } else {
      setIsOpen((prev) => !prev); // Use internal state
    }
  };

  const generateStatus = (status: string) => {
    switch (status) {
      case "TREATED":
        return { buttonClass: "bg-green-100", buttonIcon: <BsCheck color="green" size="20px" />, buttonText: "text-green-600" };
      case "UNTREATED":
        return { buttonClass: "bg-red-100", buttonIcon: <BsX color="red" size="20px" />, buttonText: "text-red-600" };
      case "PENDING":
      default:
        return { buttonClass: "bg-orange-100", buttonIcon: <CgSandClock color="orange" size="16px" />, buttonText: "text-orange-600" };
    }
  };

  return (
    <div className="relative w-[120px]">
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-between w-full px-5 py-2 rounded-lg border ${generateStatus(status).buttonClass}`}
      >
        <span>{generateStatus(status).buttonIcon}</span>
        <span className={`text-sm font-medium ${generateStatus(status).buttonText}`}>
          {status.toLowerCase()}
        </span>
      </button>

      {/* Dropdown options */}
      {(isControlled ? controlledIsOpen : isOpen) && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          <div className="flex flex-col p-2 gap-2">
            <p onClick={() => handleSelect("TREATED")} className="text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Treated
            </p>
            <p onClick={() => handleSelect("UNTREATED")} className="text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Untreated
            </p>
            <p onClick={() => handleSelect("PENDING")} className="text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Pending
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentStatus;

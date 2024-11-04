"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import TreatmentStatus from "./TreatmentStatus";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";

const TableBody: React.FC = () => {
  const { tableRef, patients } = useOutpatientTable();

  const [openPatientID, setOpenPatientID] = useState<number | null>(null);

  const toggleDropdown = (patientID: number) => {
    setOpenPatientID((prevID) => (prevID === patientID ? null : patientID));
  };

  return (
    <div ref={tableRef}>
      <table className="w-full text-left border-collapse text-black my-4">
        <thead>
          <tr className="border-b">
            {[
              "Patient ID",
              "Name",
              "Phone Number",
              "Email",
              "Diagnosis",
              "Details",
              "Treatment",
            ].map((header) => (
              <th key={header} className="py-2 px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(patients) &&
            patients.slice(0, 10).map((patient) => (
              <tr className="border-b" key={patient.id}>
                <td className="py-2 px-4">{patient.id}</td>
                <td className="py-2 px-4">{patient.name}</td>
                <td className="py-2 px-4">
                  {patient.patientDetails.contactNo}
                </td>
                <td className="py-2 px-4">{patient.patientDetails.email}</td>
                <td className="py-2 px-4">
                  {patient.patientDetails.diagnosis}
                </td>
                <td className="py-2 pl-8">
                  <Link
                    href={`/patients/${patient.id}`}
                    aria-label={`View details of ${patient.name}`}
                  >
                    <FaEye className="text-primary hover:text-primaryhover" />
                  </Link>
                </td>
                <td className="py-2 pl-3">
                  <TreatmentStatus
                    patientID={patient.id}
                    isOpen={openPatientID === patient.id}
                    onToggle={() => toggleDropdown(patient.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBody;

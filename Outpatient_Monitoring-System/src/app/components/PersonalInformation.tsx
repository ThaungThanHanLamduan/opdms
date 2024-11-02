import React from "react";
import { usePatientDetail } from "../contexts/PatientDetailContext";

const PersonalInformation: React.FC = () => {
  const { patient } = usePatientDetail();

  const personalInfoFields = [
    { label: "Patient ID", value: patient.id },
    { label: "Name", value: patient.name },
    { label: "Gender", value: patient.gender == 0 ? "Male" : "Female" },
    { label: "Blood Type", value: patient.bloodType },
    { label: "Date of Birth", value: patient.dateOfBirth },
    { label: "Nationality", value: patient.nationality },
    { label: "Contact", value: patient.contactNo },
  ];

  return (
    <div className="rounded-lg p-4 w-2/3 bg-white">
      <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
      <hr className="border-t border-slate-300 w-full my-4" />

      <div className="grid grid-cols-6 gap-x-3 gap-y-2">
        {personalInfoFields.map(({ label, value }) => (
          <React.Fragment key={label}>
            <span className="font-medium col-span-1 text-sm">{label}</span>
            <span className="text-center col-span-1">:</span>
            <span className="col-span-1 text-sm">{value || "N/A"}</span>
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-x-3 mt-2">
        <span className="font-medium col-span-1 text-sm">Email</span>
        <span className="text-center col-span-1">:</span>
        <span className="col-span-4 text-sm">{patient.email || "N/A"}</span>
      </div>
      <div className="grid grid-cols-6 gap-x-3 mt-2">
        <span className="font-medium col-span-1 text-sm">Address</span>
        <span className="text-center col-span-1">:</span>
        <span className="col-span-4 text-sm">{patient.address || "N/A"}</span>
      </div>
    </div>
  );
};

export default PersonalInformation;

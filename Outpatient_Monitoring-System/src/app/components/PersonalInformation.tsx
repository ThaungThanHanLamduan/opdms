import { Patient } from "@/types/patientTypes";
import React from "react";

const patient: Patient = {
  id: 10234,
  name: "Jane Cooper",
  dob: "10/02/1999",
  contact: "(225) 555-0118",
  address: "456 Oak Avenue, Rivertown",
  gender: "Female",
  bloodType: "O",
  email: "jane@gmail.com",
};

const personalInfoFields = [
  { label: "Patient ID", value: patient.id },
  { label: "Name", value: patient.name },
  { label: "Gender", value: patient.gender },
  { label: "Blood Type", value: patient.bloodType },
  { label: "Date of Birth", value: patient.dob },
  { label: "Email", value: patient.email },
  { label: "Contact", value: patient.contact },
];

const PersonalInformation: React.FC = () => (
  <div className="rounded-lg p-4 w-2/3 bg-white">
    <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
    <hr className="border-t border-slate-300 w-full my-2" />
    <div className="grid grid-cols-2 gap-x-16 gap-y-4 my-2">
      {personalInfoFields.map(({ label, value }) => (
        <div key={label} className="flex justify-between">
          <span className="font-medium">{label}</span>
          <span>:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-start gap-10 mt-4 mb-2">
      <span className="font-medium">Address</span>
      <span>:</span>
      <span>{patient.address}</span>
    </div>
  </div>
);

export default PersonalInformation;

"use client";
import React from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import TreatmentStatus from "./TreatmentStatus";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";
import { Patient } from "@/types/patientTypes";

const patients: Patient[] = [
  {
    id: 10234,
    name: "Jane Cooper",
    contact: "(225) 555-0118",
    email: "jane@gmail.com",
    diagnosis: "Diabetes",
    treated: true,
    dob: "1982-10-10",
    gender: "Female",
    bloodType: "A+",
    address: "123 Elm Street, Springfield",
  },
  {
    id: 10235,
    name: "Floyd Miles",
    contact: "(205) 555-0100",
    email: "floyd@gmail.com",
    diagnosis: "Hypertension",
    treated: false,
    dob: "1975-07-15",
    gender: "Male",
    bloodType: "B+",
    address: "456 Oak Avenue, Metropolis",
  },
  {
    id: 10236,
    name: "Ronald Richards",
    contact: "(312) 555-0123",
    email: "ronald@gmail.com",
    diagnosis: "Asthma",
    treated: true,
    dob: "1990-11-22",
    gender: "Male",
    bloodType: "O+",
    address: "789 Pine Road, Gotham",
  },
  {
    id: 10237,
    name: "Esther Howard",
    contact: "(213) 555-0199",
    email: "esther@gmail.com",
    diagnosis: "Depression",
    treated: false,
    dob: "1988-03-30",
    gender: "Female",
    bloodType: "AB-",
    address: "22 Main Street, Star City",
  },
  {
    id: 10238,
    name: "Cameron Williamson",
    contact: "(415) 555-0191",
    email: "cameron@gmail.com",
    diagnosis: "Anxiety",
    treated: true,
    dob: "1992-09-18",
    gender: "Male",
    bloodType: "O-",
    address: "67 Ocean Avenue, Coast Town",
  },
  {
    id: 10239,
    name: "Eleanor Pena",
    contact: "(312) 555-0188",
    email: "eleanor@gmail.com",
    diagnosis: "Migraine",
    treated: true,
    dob: "1985-12-04",
    gender: "Female",
    bloodType: "A-",
    address: "13 Cedar Street, Hill Valley",
  },
  {
    id: 10240,
    name: "Marvin McKinney",
    contact: "(512) 555-0166",
    email: "marvin@gmail.com",
    diagnosis: "Arthritis",
    treated: false,
    dob: "1967-05-09",
    gender: "Male",
    bloodType: "B-",
    address: "99 Maple Street, Riverdale",
  },
  {
    id: 10241,
    name: "Savannah Nguyen",
    contact: "(404) 555-0115",
    email: "savannah@gmail.com",
    diagnosis: "Allergy",
    treated: true,
    dob: "2001-01-12",
    gender: "Female",
    bloodType: "A+",
    address: "81 Birch Road, Smallville",
  },
  {
    id: 10242,
    name: "Jacob Jones",
    contact: "(718) 555-0145",
    email: "jacob@gmail.com",
    diagnosis: "Obesity",
    treated: false,
    dob: "1980-08-27",
    gender: "Male",
    bloodType: "O+",
    address: "21 Willow Lane, Derry",
  },
  {
    id: 10243,
    name: "Courtney Henry",
    contact: "(616) 555-0177",
    email: "courtney@gmail.com",
    diagnosis: "COVID-19",
    treated: true,
    dob: "1979-04-20",
    gender: "Female",
    bloodType: "B+",
    address: "55 Blossom Street, Woodbury",
  },
  {
    id: 10244,
    name: "Arlene McCoy",
    contact: "(707) 555-0194",
    email: "arlene@gmail.com",
    diagnosis: "Heart Disease",
    treated: false,
    dob: "1955-06-02",
    gender: "Female",
    bloodType: "AB+",
    address: "23 Bridge Street, Kingsport",
  },
  {
    id: 10245,
    name: "Darlene Robertson",
    contact: "(503) 555-0192",
    email: "darlene@gmail.com",
    diagnosis: "Stroke",
    treated: false,
    dob: "1962-02-10",
    gender: "Female",
    bloodType: "A-",
    address: "77 Forest Drive, Arkham",
  },
];


const TableBody: React.FC = () => {
  const { tableRef } = useOutpatientTable();

  return (
    <div ref={tableRef}>
      <table className="w-full text-left border-collapse text-black my-4">
        <thead>
          <tr className="border-b">
            {["Patient ID", "Name", "Phone Number", "Email", "Diagnosis", "Details", "Treatment"].map((header) => (
              <th key={header} className="py-2 px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr className="border-b" key={patient.id}>
              <td className="py-2 px-4">{patient.id}</td>
              <td className="py-2 px-4">{patient.name}</td>
              <td className="py-2 px-4">{patient.contact}</td>
              <td className="py-2 px-4">{patient.email}</td>
              <td className="py-2 px-4">{patient.diagnosis}</td>
              <td className="py-2 pl-8">
                <Link href={`/patients/${patient.id}`} aria-label={`View details of ${patient.name}`}>
                  <FaEye className="text-primary hover:text-primaryhover" />
                </Link>
              </td>
              <td className="py-2 pl-3">
                <TreatmentStatus />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBody;

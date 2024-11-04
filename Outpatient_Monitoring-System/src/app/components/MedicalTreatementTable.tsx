import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { BsCheck, BsX } from "react-icons/bs";
import { useGetTreatment } from "../hooks/useTreatmentApi";
import { Treatment } from "@/types/treatmentTypes";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <LuAlarmClock /> Pending
        </span>
      );
    case "TREATED":
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <BsCheck /> Treated
        </span>
      );
    case "UNTREATED":
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <BsX /> Untreated
        </span>
      );
    default:
      return null;
  }
};

interface TableProps {
  patientId : number
}

const MedicalTreatmentTable: React.FC<TableProps> = ({patientId}) => {

  const {data} = useGetTreatment(patientId);
  console.log(data);

  const medicalTreatments = data?.data || [];
  

  return (
    <div className="">
      
      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Blood Pressure
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Glucose Level
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Heart Rate
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Weight(kg)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Height(cm)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Temp(F)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {medicalTreatments.map((treatment : Treatment) => (
            <tr key={treatment.patientId} className="even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {treatment.appointmentDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.bloodPressure}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.glucoseLevel}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.heartRate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.height}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.height}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.medicalTreatmentDetails.bodyTemperature}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {getStatusBadge(treatment.treatedStatus)}
              </td>
              <td className="border  px-4 py-4 flex items-center gap-3">
                <button className="text-black">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalTreatmentTable;

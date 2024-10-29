import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { BsCheck, BsX } from "react-icons/bs";

const treatments = [
  {
    date: "15/03/2025",
    bp: "---",
    glucose: "---",
    heartRate: "---",
    weight: "---",
    height: "---",
    temp: "---",
    status: "Pending",
  },
  {
    date: "15/02/2025",
    bp: "115/85",
    glucose: 120,
    heartRate: 75,
    weight: 54,
    height: 163,
    temp: 85,
    status: "Treated",
  },
  {
    date: "15/01/2024",
    bp: "---",
    glucose: "---",
    heartRate: "---",
    weight: "---",
    height: "---",
    temp: "---",
    status: "Untreated",
  },
  {
    date: "15/12/2024",
    bp: "117/78",
    glucose: 118,
    heartRate: 68,
    weight: 53,
    height: 163,
    temp: 91,
    status: "Treated",
  },
  {
    date: "15/11/2024",
    bp: "120/80",
    glucose: 95,
    heartRate: 65,
    weight: 53,
    height: 163,
    temp: 98,
    status: "Treated",
  },
  {
    date: "15/10/2024",
    bp: "125/80",
    glucose: 87.5,
    heartRate: 72,
    weight: 53,
    height: 163,
    temp: 95,
    status: "Treated",
  },
  {
    date: "15/09/2024",
    bp: "120/79",
    glucose: 83.2,
    heartRate: 66,
    weight: 52,
    height: 163,
    temp: 91,
    status: "Treated",
  },
  {
    date: "15/08/2024",
    bp: "105/75",
    glucose: 79.6,
    heartRate: 72,
    weight: 52,
    height: 163,
    temp: 88,
    status: "Treated",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending":
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <LuAlarmClock /> Pending
        </span>
      );
    case "Treated":
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <BsCheck /> Treated
        </span>
      );
    case "Untreated":
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg flex items-center gap-2">
          <BsX /> Untreated
        </span>
      );
    default:
      return null;
  }
};

const MedicalTreatmentTable: React.FC = () => {
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
          {treatments.map((treatment, index) => (
            <tr key={index} className="even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {treatment.date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.bp}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.glucose}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.heartRate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.weight}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.height}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {treatment.temp}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {getStatusBadge(treatment.status)}
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

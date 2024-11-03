"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PatientProfilePic from "@/public/images/patient.png";
import { MdVerified } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { CgSandClock } from "react-icons/cg";
import { usePatientDetail } from "../contexts/PatientDetailContext";
import TreatmentStatus from "./TreatmentStatus";
import { useGetTreatmentStatus } from "../hooks/usePatientApi";

const PatientProfile: React.FC = () => {
  const { patient } = usePatientDetail();
  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (patient.id) {
      setId(patient.id);
    }
  }, [patient.id]);

  // Only fetch when id is a valid number
  const { data } = useGetTreatmentStatus(id as number);
  const patientStatus = data?.data.status || "PENDING";
  const appointmentDate = data?.data.appointmentDate;

  const { statusIcon, statusBorder, statusTextColor, statusMessage } = generateStatus(patientStatus);

  return (
    <div className="bg-white px-6 py-[38px] rounded-lg flex flex-col items-center gap-4 w-1/3">
      <div className="flex items-center justify-between px-6 gap-6 w-full">
        <Image
          className="w-[80px] p-2 bg-primary rounded-full"
          src={PatientProfilePic}
          alt="Patient Profile"
        />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">{patient.name}</p>
          {patient.id && <TreatmentStatus patientID={patient.id} />}
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <p className="text-lg">Treatment</p>
        <p>:</p>
        <p className="text-lg">{patient.patientDetails.diagnosis}</p>
      </div>
    
      <div className={`${statusBorder} border flex w-full justify-between items-center gap-6 px-3 py-2 rounded`}>
        {statusIcon}
        <div className="flex flex-col justify-center items-start px-8">
          <p className={`${statusTextColor} text-sm`}>{statusMessage}</p>
          {appointmentDate && <p className={`${statusTextColor}`}>{appointmentDate}</p>}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

// Status generator function outside the component
const generateStatus = (status: string) => {
  switch (status) {
    case "TREATED":
      return {
        statusIcon: <MdVerified color="green" size="40" />,
        statusBorder: "border-green-700",
        statusTextColor: "text-green-700",
        statusMessage: "Had a treatment on",
      };
    case "UNTREATED":
      return {
        statusIcon: <RxCrossCircled color="red" size="40" />,
        statusBorder: "border-red-500",
        statusTextColor: "text-red-500",
        statusMessage: "Missed the treatment on",
      };
    case "PENDING":
      return {
        statusIcon: <CgSandClock color="orange" size="40" />,
        statusBorder: "border-orange-500",
        statusTextColor: "text-orange-500",
        statusMessage: "Pending treatment on",
      };
    default:
      return {
        statusIcon: <CgSandClock color="orange" size="40" />,
        statusBorder: "border-orange-500",
        statusTextColor: "text-orange-500",
        statusMessage: "Pending treatment on",
      };
  }
};

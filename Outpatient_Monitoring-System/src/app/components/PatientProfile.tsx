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
import { motion } from "framer-motion";

const PatientProfile: React.FC = () => {
  const { patient } = usePatientDetail();
  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (patient.id) {
      setId(patient.id);
    }
  }, [patient.id]);

  const { data } = useGetTreatmentStatus(id as number);
  const patientStatus = data?.data.status || "PENDING";
  const appointmentDate = data?.data.appointmentDate;

  const { statusIcon, statusBorder, statusTextColor, statusMessage } = generateStatus(patientStatus);

  return (
    <motion.div
      className="bg-white px-6 py-[38px] rounded-lg flex flex-col items-center gap-4 w-1/3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
    >
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
        <p className="text-lg">{patient.patientDetails?.diagnosis}</p>
      </div>
    
      <motion.div
        className={`${statusBorder} border flex w-full justify-between items-center gap-6 px-3 py-2 rounded`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {statusIcon}
        <div className="flex flex-col justify-center items-start px-8">
          <p className={`${statusTextColor} text-sm`}>{statusMessage}</p>
          {appointmentDate && <p className={`${statusTextColor}`}>{appointmentDate}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PatientProfile;

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

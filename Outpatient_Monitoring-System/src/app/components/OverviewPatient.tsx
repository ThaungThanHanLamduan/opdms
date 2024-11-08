/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { StatCardProps } from "@/types/patientTypes";
import React from "react";
import { BsFillPersonCheckFill, BsFillPersonXFill } from "react-icons/bs";
import { FaUserClock, FaUserGroup } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value }) => (
  <div
    className="flex gap-3 items-center px-6 py-4"
  >
    <Icon className="border rounded-full p-2 bg-primary text-white" size={50} />
    <div className="flex flex-col justify-between items-start gap-1">
      <p className="text-gray-400">{title}</p>
      <p className="text-black text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const OverviewPatient = () => {
  const { treatmentCount } = useOutpatientTable();

  const getIconByTreatedStatus = (treatedStatus: string) => {
    switch (treatedStatus) {
      case "TREATED":
        return BsFillPersonCheckFill;
      case "UNTREATED":
        return BsFillPersonXFill;
      case "TOTAL":
        return FaUserGroup;
      case "PENDING":
        return FaUserClock;
      default:
        return FaUserGroup;
    }
  };

  const capitalize = (text: string) =>
    text.charAt(0) + text.slice(1).toLowerCase();

  const statusOrder = ["TOTAL", "PENDING", "TREATED", "UNTREATED"];

  const sortedTreatmentCount = treatmentCount
    ?.slice()
    .sort((a: any, b: any) => {
      return (
        statusOrder.indexOf(a.treatedStatus) -
        statusOrder.indexOf(b.treatedStatus)
      );
    });

  return (
    <motion.div
      className="w-full rounded-full bg-white flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sortedTreatmentCount?.map((treatment: any, index: number) => (
        <motion.div
          key={treatment?.treatedStatus}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <StatCard
            icon={getIconByTreatedStatus(treatment?.treatedStatus)}
            title={capitalize(treatment?.treatedStatus) + " Patients"}
            value={treatment?.count}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OverviewPatient;

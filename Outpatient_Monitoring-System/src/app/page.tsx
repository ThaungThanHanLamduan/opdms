"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OutpatientTable from "./components/OutpatientTable";
import PatientSummary from "./components/PatientSummary";
// import { getToken } from "@/service/authService";

export default function Dashboard() {
  // const authToken = getToken();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="bg-slate-200 overflow-y-scroll px-10 h-screen flex justify-center items-center">
        <motion.h2
          className="text-3xl text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.h2>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-slate-200 overflow-y-scroll px-10 h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-semibold my-8 text-black"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Dashboard
      </motion.h1>
      <PatientSummary />
      <OutpatientTable />
    </motion.div>
  );
}

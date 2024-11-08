"use client";

import { useState, useEffect } from "react";
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
        <h2 className="text-3xl text-black">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 overflow-y-scroll px-10 h-screen">
      <h1 className="text-3xl font-semibold my-8 text-black">Dashboard</h1>
      <PatientSummary />
      <OutpatientTable />
    </div>
  );
}

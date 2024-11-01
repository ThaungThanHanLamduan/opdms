"use client";
import { DropdownPatient, OutpatientTableTypes } from "@/types/patientTypes";
import React, { createContext, useContext, useRef, useState } from "react";
import { useGetAllPatients } from "../hooks/usePatientApi";

const OutpatientTableContext = createContext<OutpatientTableTypes | undefined>(
  undefined
);

export const OutpatientTableProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  // database
  const { data } = useGetAllPatients();

  const patients = data?.data || []; 

  

  // table header
  // Print Data
  const handlePrint = () => {
    if (tableRef.current) {
      const originalContent = document.body.innerHTML;
      const printContent = tableRef.current.innerHTML;

      
      document.body.innerHTML = printContent;
      document.body.style.backgroundColor = "white";

      window.print();

      document.body.innerHTML = originalContent;
    }
  };
  

  // Add Patient Button
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Dropdown Bar

  const stats: DropdownPatient[] = [
    { title: "Total Outpatients" },
    { title: "Treated Outpatients" },
    { title: "Untreated Outpatients" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(stats[0].title); 

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (title: string) => {
    setSelectedTitle(title);
    setIsOpen(false); 
  };


  // table body
  const tableRef = useRef<HTMLDivElement>(null);

  // table footer
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Current Page:", page);
  };
  return (
    <OutpatientTableContext.Provider
      value={{
        patients,
        tableRef,
        handlePrint,
        currentPage,
        setCurrentPage,
        totalPages,
        handlePageChange,
        openModal,
        closeModal,
        isModalOpen,
        isOpen,
        selectedTitle,
        toggleDropdown,
        handleSelect,
        stats
      }}
    >
      {children}
    </OutpatientTableContext.Provider>
  );
};

export const useOutpatientTable = () => {
  const context = useContext(OutpatientTableContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
};

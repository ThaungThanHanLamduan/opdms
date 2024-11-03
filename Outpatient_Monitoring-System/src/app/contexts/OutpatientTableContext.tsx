"use client";
import {
  DropdownPatient,
  OutpatientTableTypes,
  Patient,
} from "@/types/patientTypes";
import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useGetAllPatients,
  useGetTreatmentCount,
} from "../hooks/usePatientApi";

const OutpatientTableContext = createContext<OutpatientTableTypes | undefined>(
  undefined
);

export const OutpatientTableProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Fetch data from API
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Dropdown Bar
  const stats: DropdownPatient[] = [
    { title: "Total Outpatients", value: "" },
    { title: "Treated Outpatients", value: "TREATED" },
    { title: "Untreated Outpatients", value: "UNTREATED" },
    { title: "Pending Outpatients", value: "PENDING" },
  ];

  const [treatedStatus, setTreatedStatus] = useState("");

  const { data, refetch: refetchPatients } = useGetAllPatients(
    isNaN(Number(searchTerm)) ? searchTerm : undefined,
    !isNaN(Number(searchTerm)) ? Number(searchTerm) : undefined,
    treatedStatus
  );

  const patients = data?.data?.content;

  const { data: treatment, refetch: treatmentRefetch } = useGetTreatmentCount();
  const treatmentCount = treatment?.data;

  // Memoized filtered patients based on search term
  const filteredPatients = useMemo(() => {
    return patients?.filter((patient: Patient) => {
      const term = searchTerm.toLowerCase();
      return (
        patient.name.toLowerCase().includes(term) ||
        patient.id?.toString().includes(term)
      );
    });
  }, [patients, searchTerm]);

  // Table print functionality
  const tableRef = useRef<HTMLDivElement>(null);
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

  // Handle search input and refetch data
  const handleSearch = () => {
    refetchPatients();
  };

  // Modal state and handlers for adding patients
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(stats[0].title);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (title: string, value: string) => {
    setSelectedTitle(title);
    setTreatedStatus(value);
    setIsOpen(false);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <OutpatientTableContext.Provider
      value={{
        patients,
        filteredPatients,
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
        stats,
        searchTerm,
        setSearchTerm,
        handleSearch,
        refetchPatients,
        treatmentCount,
        treatmentRefetch,
      }}
    >
      {children}
    </OutpatientTableContext.Provider>
  );
};

export const useOutpatientTable = () => {
  const context = useContext(OutpatientTableContext);
  if (context === undefined) {
    throw new Error(
      "useOutpatientTable must be used within an OutpatientTableProvider"
    );
  }
  return context;
};

"use client";
import {
  DropdownPatient,
  OutpatientTableTypes,
  Patient,
} from "@/types/patientTypes";
import React, {
  createContext,
  useContext,
  useEffect,
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
  const [treatedStatus, setTreatedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Dropdown Bar
  const stats: DropdownPatient[] = [
    { title: "Total Outpatients", value: "" },
    { title: "Treated Outpatients", value: "TREATED" },
    { title: "Untreated Outpatients", value: "UNTREATED" },
    { title: "Pending Outpatients", value: "PENDING" },
  ];

  const { data, refetch: refetchPatients } = useGetAllPatients(
    isNaN(Number(searchTerm)) ? searchTerm : undefined,
    !isNaN(Number(searchTerm)) ? Number(searchTerm) : undefined,
    treatedStatus,
    currentPage
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data?.data?.numberOfElements || 0);
    }
  }, [data]);

  const patients = data?.data?.content;
  const totalPatients = data?.data?.numberOfElements || 0;
  const itemsPerPage = data?.data?.size || 1;

  useEffect(() => {
    setTotalItems(totalPatients);
  }, [totalPatients]);

  useEffect(() => {
    refetchPatients();
  }, [currentPage, refetchPatients]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
    setCurrentPage(0);
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
        handlePageChange: (page: number) => setCurrentPage(page),
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

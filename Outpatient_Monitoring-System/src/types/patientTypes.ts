/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosResponse } from "axios";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";

export type StatCardProps = {
  icon: React.ElementType;
  title: string;
  value: string | number;
};

export type PatientDiagnose = {
  patientNum: number;
  diagnose: string | number;
};

export type DropdownPatient = {
  title: string;
  value: string
};

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export type OutpatientTableTypes = {
  patients: any;
  filteredPatients: () => void;
  tableRef: React.RefObject<HTMLDivElement>;
  handlePrint: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  handlePageChange: (page: number) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
  selectedTitle: string;
  toggleDropdown: () => void;
  handleSelect: (title: string , value: string) => void;
  stats: DropdownPatient[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  refetchPatients: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<AxiosResponse<any, any> | undefined, unknown>>;
  treatmentCount : any,
  treatmentRefetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<AxiosResponse<any, any> | undefined, unknown>>;
};

export type PatientFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: Patient) => void;
};

export type Patient = {
  id?: number;
  name: string;
  patientDetails: {
    dateOfBirth: string;
    contactNo: string;
    address: string;
    gender: number;
    bloodType?: string;
    email?: string;
    diagnosis?: string;
    identification_no?: string;
    nationality?: string;
    medicalTreatments?: boolean;
  };
};

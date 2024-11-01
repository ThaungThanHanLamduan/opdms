/* eslint-disable @typescript-eslint/no-explicit-any */
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
};

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export type OutpatientTableTypes = {
  patients: any;
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
  toggleDropdown: () => void
  handleSelect: (title : string) => void;
  stats :  DropdownPatient[]
};

export type PatientFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: Patient) => void;
};

// export type Patient = {
//   id: number;
//   name: string;
//   dob: string;
//   gender: string;
//   contact: string;
//   bloodType: string;
//   email: string;
//   address: string;
//   diagnosis?: string;
//   treated?: boolean;
// };

export type Patient = {
  name: string;
  dateOfBirth: string;
  contactNo: string;
  address: string;
  gender: number;
  bloodType?: string;
  email: string;
  diagnosis?: string;
  identification_no: string;
  nationality: string;
  medicalTreatments?: boolean;
};

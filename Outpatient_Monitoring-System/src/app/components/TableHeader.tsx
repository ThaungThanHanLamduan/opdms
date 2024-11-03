"use client";

import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import Dropdownbar from "./Dropdownbar";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";
import PatientFormModal from "./PatientFormModal";

// HeaderButton component with optional onClick, icon, label, and rounded props
const HeaderButton: React.FC<{
  onClick?: () => void;
  icon?: React.ReactNode;
  label: string;
  rounded?: boolean;
}> = ({ onClick, icon, label, rounded = false }) => (
  <button
    onClick={onClick}
    className={`bg-primary hover:bg-primaryhover active:bg-primaryactive text-white flex items-center gap-2 px-4 py-1 ${
      rounded ? "rounded-full px-3" : "rounded"
    }`}
  >
    {icon && <span>{icon}</span>}
    <span>{label}</span>
  </button>
);

const TableHeader = () => {
  const {
    handlePrint,
    openModal,
    closeModal,
    isModalOpen,
    selectedTitle,
    searchTerm,
    setSearchTerm,
    handleSearch,
  } = useOutpatientTable();

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-xl text-black">{selectedTitle}</h4>
        <div className="flex gap-4 items-center">
          <HeaderButton
            onClick={handlePrint}
            icon={<MdOutlineFileDownload size="20px" />}
            label="Export"
          />
          <HeaderButton
            onClick={openModal}
            icon={<FaPlus />}
            label="Add Patient"
            rounded
          />
          <div className="relative">
            <input
              type="text"
              className="w-[200px] border px-4 py-1 rounded text-gray-600"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FiSearch
              onClick={handleSearch}
              className="absolute top-2 right-2 text-slate-400"
              size="15px"
            />
          </div>
          <Dropdownbar />
        </div>
      </div>
      <PatientFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={() => {
          closeModal(); // Only close modal on submit
        }}
      />
    </>
  );
};

export default TableHeader;

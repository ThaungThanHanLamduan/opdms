"use client";

import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import Dropdownbar from "./Dropdownbar";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";
import PatientFormModal from "./PatientFormModal";
import { motion } from "framer-motion";

const HeaderButton: React.FC<{
  onClick?: () => void;
  icon?: React.ReactNode;
  label: string;
  rounded?: boolean;
}> = ({ onClick, icon, label, rounded = false }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`bg-primary hover:bg-primaryhover active:bg-primaryactive text-white flex items-center gap-2 px-4 py-1 ${
      rounded ? "rounded-full px-3" : "rounded"
    }`}
  >
    {icon && <span>{icon}</span>}
    <span>{label}</span>
  </motion.button>
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
              className="absolute top-2 right-2 text-slate-400 cursor-pointer"
              size="15px"
            />
          </div>
          <Dropdownbar />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isModalOpen ? 1 : 0, y: isModalOpen ? 0 : -50 }}
        transition={{ duration: 0.3 }}
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <PatientFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={() => {
            closeModal(); 
          }}
        />
      </motion.div>
    </>
  );
};

export default TableHeader;

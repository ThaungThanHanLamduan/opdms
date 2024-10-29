"use client";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";

const TablePagination: React.FC = () => {
  const {
    totalPages,
    currentPage,
    handlePageChange: onPageChange,
  } = useOutpatientTable();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full bg-primary ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-200"
        }`}
      >
        <IoIosArrowBack />
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded border  ${
            page === currentPage
              ? "bg-primary text-white"
              : "hover:bg-gray-200 text-gray-500"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full bg-primary ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-primaryhover"
        }`}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default TablePagination;

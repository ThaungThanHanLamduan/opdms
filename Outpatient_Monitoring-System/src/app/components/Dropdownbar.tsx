"use client";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";

const Dropdownbar: React.FC = () => {

  const {isOpen, selectedTitle, toggleDropdown, handleSelect, stats} = useOutpatientTable();

  return (
    <div className="relative w-[190px]">
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full bg-white px-4 py-2 rounded-lg border"
      >
        <span className="text-sm text-slate-500">{selectedTitle}</span>
        <FaChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              onClick={() => handleSelect(stat.title)} 
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <p className="text-sm text-gray-400">{stat.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdownbar;

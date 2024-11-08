"use client";
import React from "react";
import TablePagination from "./TablePagination";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const OutpatientTable = () => {
  return (
    <div className="flex flex-col justify-between bg-white px-6 py-4 my-5 rounded-xl h-[700px]">
      <div>
        <TableHeader />
        <TableBody />
      </div>
      <TablePagination />
    </div>
  );
};

export default OutpatientTable;

"use client";
import React from "react";
import TablePagination from "./TablePagination";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const OutpatientTable = () => {
  return (
    <div className="flex flex-col bg-white px-6 py-4 my-5 rounded-xl">
      <TableHeader />
      <TableBody />
      <TablePagination />
    </div>
  );
};

export default OutpatientTable;

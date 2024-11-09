"use client";
import Paginate from "react-paginate";
import { useOutpatientTable } from "../contexts/OutpatientTableContext";

const TablePagination: React.FC = () => {
  const { currentPage, setCurrentPage, totalPages } = useOutpatientTable();

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Paginate
        breakLabel="..."
        nextLabel={currentPage === totalPages ? null : ">"}
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        previousLabel={currentPage === 1 ? null : "<"}
        renderOnZeroPageCount={null}
        containerClassName="flex list-none justify-center p-4"
        pageLinkClassName="px-3 py-1 border rounded bg-primary text-white transition-colors duration-200"
        previousLinkClassName={
          currentPage === 1
            ? ""
            : "mr-2 py-1 px-2 rounded-full bg-primary text-white transition-colors duration-200"
        }
        nextLinkClassName={
          currentPage === totalPages
            ? ""
            : "px-2 py-1 ml-2 rounded-full bg-primary text-white transition-colors duration-200"
        }
        breakLinkClassName="px-3 py-1 border rounded bg-primary transition-colors duration-200"
        activeLinkClassName="px-3 py-1 border rounded bg-primary text-white"
      />
    </div>
  );
};

export default TablePagination;

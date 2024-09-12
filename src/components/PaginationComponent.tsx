import React from "react";
import { cn } from "@/lib/utils";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);
      if (currentPage < 5) {
        endPage = 5;
      }
      if (currentPage > totalPages - 4) {
        startPage = totalPages - 4;
      }
      if (startPage > 2) pages.push("...");
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn("rounded-lg bg-slate-100 text-black px-2 py-1", [
          currentPage === 1 && "cursor-not-allowed opacity-50",
        ])}
      >
        Prev
      </button>
      <div className="flex gap-2">
        {generatePageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index}>...</span>
          ) : (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`rounded-lg text-black px-2 py-1 ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-slate-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className={cn("rounded-lg bg-slate-100 text-black px-2 py-1", [
          currentPage >= totalPages && "cursor-not-allowed opacity-50",
        ])}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;

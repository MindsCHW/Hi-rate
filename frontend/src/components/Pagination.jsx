import React from 'react';
import { cn } from '../utils/cn';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-4 py-6 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MdArrowBack className="text-lg" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-1 text-gray-400">
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                currentPage === page
                  ? "border border-primary text-primary"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <MdArrowForward className="text-lg" />
      </button>
    </div>
  );
};

export default Pagination;

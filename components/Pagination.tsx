'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Always show the first two and last two pages
    const firstPages = [1, 2];
    const lastPages = [totalPages - 1, totalPages];

    // Show three pages around the current page
    const middlePages = [];
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 2 && i < totalPages - 1) {
        middlePages.push(i);
      }
    }

    // Combine and remove duplicates
    const combinedPages = Array.from(new Set([...firstPages, ...middlePages, ...lastPages]));

    combinedPages.forEach((page, index) => {
      if (index > 0 && page - combinedPages[index - 1] > 1) {
        pages.push('ellipsis');
      }
      pages.push(page);
    });

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-sky-600 text-white hover:bg-sky-700'
        }`}
        aria-label="Previous Page"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1 text-sm text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
              currentPage === page
                ? 'bg-sky-800 text-white'
                : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-sky-600 text-white hover:bg-sky-700'
        }`}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
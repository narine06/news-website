'use client';
interface PaginationProps {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalResults, onPageChange }: PaginationProps) {
  const pageSize = 10;
  const totalPages = Math.ceil(totalResults / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
      >
        Previous
      </button>
      <span className="p-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
import React from "react";

interface PaginationFooterProps {
  current: number;
  total: number;
  onPageChange?: (page: number) => void;
}

export default function PaginationFooter({ current, total, onPageChange }: PaginationFooterProps) {
  // Helper to generate page numbers with ellipsis
  const getPages = () => {
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 4) pages.push("...");
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        if (i !== 1 && i !== total) pages.push(i);
      }
      if (current < total - 3) pages.push("...");
      pages.push(total);
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center border-t border-gray-100 dark:border-gray-800 pt-8 pb-12 mt-8">
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Previous button */}
        <div>
          <button
            className="cursor-pointer disabled:cursor-not-allowed flex items-center gap-2 px-2 py-1  disabled:opacity-50"
            onClick={() => onPageChange && onPageChange(current - 1)}
            disabled={current === 1}
          >
            <span className="text-lg">&larr;</span> Previous
          </button>
        </div>
        {/* Page numbers */}
        <ul className="flex items-center gap-2 select-none">
          {getPages().map((page, idx) =>
            typeof page === "number" ? (
              <li key={page}>
                <button
                  className={`cursor-pointer disabled:cursor-not-allowed w-8 h-8 flex items-center justify-center rounded-xl transition text-base font-medium
                    ${current === page
                      ? "bg-purple-50 text-purple-700 transition-all duration-300"
                      : "hover:bg-gray-500 hover:dark:bg-white hover:dark:text-blue-500 transition-all duration-300 dark:text-black dark:text-white"}
                  `}
                  onClick={() => onPageChange && onPageChange(page)}
                  aria-current={current === page ? "page" : undefined}
                >
                  {page}
                </button>
              </li>
            ) : (
              <li key={"ellipsis-" + idx} className="w-8 h-8 flex items-center justify-center ">...</li>
            )
          )}
        </ul>
        {/* Next button */}
        <div>
          <button
            className="cursor-pointer disabled:cursor-not-allowed flex items-center gap-2 px-2 pt-1  disabled:opacity-50"
            onClick={() => onPageChange && onPageChange(current + 1)}
            disabled={current === total}
          >
            Next <span className="text-lg">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center space-y-4 w-full">
        {/* Previous button */}
        <button
          className="cursor-pointer disabled:cursor-not-allowed flex items-center gap-2 px-2 py-1  disabled:opacity-50"
          onClick={() => onPageChange && onPageChange(current - 1)}
          disabled={current === 1}
        >
          <span className="text-lg">&larr;</span> Previous
        </button>
        
        {/* Page numbers */}
        <ul className="flex items-center gap-2 select-none">
          {getPages().map((page, idx) =>
            typeof page === "number" ? (
              <li key={page}>
                <button
                  className={`cursor-pointer disabled:cursor-not-allowed w-8 h-8 flex items-center justify-center rounded-xl transition text-base font-medium
                    ${current === page
                      ? "bg-purple-50 text-purple-700 transition-all duration-300"
                      : "hover:bg-gray-500 hover:dark:bg-white hover:dark:text-black transition-all duration-300 "}
                  `}
                  onClick={() => onPageChange && onPageChange(page)}
                  aria-current={current === page ? "page" : undefined}
                >
                  {page}
                </button>
              </li>
            ) : (
              <li key={"ellipsis-" + idx} className="w-8 h-8 flex items-center justify-center ">...</li>
            )
          )}
        </ul>
        
        {/* Next button */}
        <button
          className="cursor-pointer disabled:cursor-not-allowed flex items-center gap-2 px-2 pt-1  disabled:opacity-50"
          onClick={() => onPageChange && onPageChange(current + 1)}
          disabled={current === total}
        >
          Next <span className="text-lg">&rarr;</span>
        </button>
      </div>
    </nav>
  );
} 
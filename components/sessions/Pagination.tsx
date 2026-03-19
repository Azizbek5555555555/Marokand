"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
}: Props) {
  // Build page numbers to show: always show 1, last, and neighbors of current
  const getPages = () => {
    const pages: (number | "...")[] = [];
    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 2) pages.push(1, "...");
    else pages.push(1);

    pages.push(...range);

    if (range[range.length - 1] < totalPages - 1) pages.push("...", totalPages);
    else if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();
  const from = (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {/* Page buttons */}
      <div className="flex items-center gap-2">
        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`
                w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200
                ${currentPage === p
                  ? "bg-[#F47B20] text-white shadow-md shadow-orange-200"
                  : "text-gray-500 hover:bg-orange-50 hover:text-[#F47B20]"
                }
              `}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Showing results */}
      <p className="text-gray-400 text-sm">
        Showing results {from}-{to} of {total.toLocaleString()}
      </p>
    </div>
  );
}
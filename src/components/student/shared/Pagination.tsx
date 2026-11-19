import { ChevronLeft, ChevronRight } from "lucide-react";

// Page numbers to show, with "..." gaps: 1 ... 4 5 6 ... 10
function getPageItems(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);

  return sorted.flatMap((page, index) => (index > 0 && page - sorted[index - 1] > 1 ? ["..." as const, page] : [page]));
}

export function Pagination({
  page,
  pageSize,
  total,
  totalPages,
  noun,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  /** Singular, e.g. "job" -> "Showing 1 to 10 of 24 jobs" */
  noun: string;
  onPageChange: (page: number) => void;
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const buttonClass = "flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
      <span>
        Showing {from} to {to} of {total} {noun}
        {total === 1 ? "" : "s"}
      </span>
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={`${buttonClass} border-slate-200 bg-white text-slate-600 hover:border-cyan-200`}
          >
            <ChevronLeft size={16} />
          </button>
          {getPageItems(page, totalPages).map((item, index) =>
            item === "..." ? (
              <span key={`gap-${index}`} className="px-1 text-slate-400">...</span>
            ) : (
              <button
                key={item}
                type="button"
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className={`${buttonClass} ${item === page ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200"}`}
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className={`${buttonClass} border-slate-200 bg-white text-slate-600 hover:border-cyan-200`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

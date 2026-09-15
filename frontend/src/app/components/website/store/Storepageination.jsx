"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StorePagination({ pages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!pages || pages <= 1) return null;

  const currentPage = Number(searchParams.get("page")) || 1;

  const pageNumbers = Array.from(
    { length: pages },
    (_, index) => index + 1
  );

  function handlePage(page) {
    if (page < 1 || page > pages) return;
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page);

    router.push(`/store?${params.toString()}`, {
      scroll: true,
    });
  }

  return (
    <div className="mt-8 sm:mt-12 flex flex-col items-center gap-5">
      {/* Numbered Page Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {/* Previous button */}
        <button
          onClick={() => handlePage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePage(page)}
            className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-all ${
              page === currentPage
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => handlePage(currentPage + 1)}
          disabled={currentPage >= pages}
          aria-label="Next page"
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Load More button if more pages exist */}
      {currentPage < pages && (
        <button
          onClick={() => handlePage(currentPage + 1)}
          className="w-full sm:w-auto rounded-full border border-stone-300 bg-white px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-stone-800 shadow-xs transition hover:border-stone-900 hover:bg-stone-900 hover:text-white active:scale-95"
        >
          Load More Products
        </button>
      )}
    </div>
  );
}
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function StorePagination({ pages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pageNumbers = Array.from(
    { length: pages },
    (_, index) => index + 1
  );

  function handlePage(page) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page);

    router.push(`/store?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePage(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === pages}
        className="rounded-full border border-stone-300 px-7 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Load More Products
      </button>
    </div>
  );
}
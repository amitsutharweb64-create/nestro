"use client";

import { SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { useStoreFilters } from "./StoreFilterContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function StoreToolbar({ totalProducts = null }) {
  const {
    openMobileFilters,
    activeFilters,
    activeFiltersCount,
    removeFilter,
    clearAllFilters,
  } = useStoreFilters();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSort = searchParams.get("sort") || "featured";

  const handleSortChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "featured") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    params.delete("page");
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="space-y-3 border-b border-stone-200/80 pb-4">
      {/* Top row: Filter trigger button (mobile) + Count & Sort (desktop & mobile) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Mobile Filter Button & Desktop Count */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          {/* Mobile Filter Trigger Button */}
          <button
            type="button"
            onClick={openMobileFilters}
            className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 shadow-xs transition hover:border-amber-600 hover:bg-amber-50/50 hover:text-amber-900 active:scale-95 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-amber-700" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-700 px-1.5 text-[11px] font-bold text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Product Count Display */}
          <p className="text-xs sm:text-sm text-stone-600">
            {typeof totalProducts === "number" ? (
              <>
                <span className="font-bold text-stone-900">{totalProducts}</span>{" "}
                products found
              </>
            ) : (
              <span className="font-medium text-stone-700">Catalog Collection</span>
            )}
          </p>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center justify-end gap-2">
          <label htmlFor="store-sort" className="sr-only">
            Sort by
          </label>
          <div className="relative w-full sm:w-auto">
            <select
              id="store-sort"
              value={currentSort}
              onChange={handleSortChange}
              className="w-full sm:w-auto cursor-pointer appearance-none rounded-xl border border-stone-300 bg-white py-2 pl-3.5 pr-8 text-xs sm:text-sm font-medium text-stone-700 outline-none transition hover:border-stone-400 focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-stone-400">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Pills (Removable) */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mr-1 hidden sm:inline">
            Active:
          </span>

          {activeFilters.map((filter, index) => (
            <span
              key={`${filter.key}-${filter.value}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-xs font-medium text-amber-900 animate-fadeIn"
            >
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={() => removeFilter(filter)}
                aria-label={`Remove filter ${filter.label}`}
                className="rounded-full p-0.5 text-amber-700 hover:bg-amber-200/60 hover:text-amber-950 transition"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          {activeFilters.length > 1 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-medium text-stone-500 hover:text-amber-800 transition underline underline-offset-2 ml-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

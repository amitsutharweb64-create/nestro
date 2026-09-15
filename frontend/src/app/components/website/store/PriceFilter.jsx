"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function PriceFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const minParam = searchParams.get("min_price") || "";
  const maxParam = searchParams.get("max_price") || "";

  const [minPrice, setMinPrice] = useState(minParam);
  const [maxPrice, setMaxPrice] = useState(maxParam);

  useEffect(() => {
    setMinPrice(minParam);
    setMaxPrice(maxParam);
  }, [minParam, maxParam]);

  function handlePriceFilter(e) {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice !== "" && Number(minPrice) >= 0) {
      params.set("min_price", minPrice.toString());
    } else {
      params.delete("min_price");
    }

    if (maxPrice !== "" && Number(maxPrice) > 0) {
      params.set("max_price", maxPrice.toString());
    } else {
      params.delete("max_price");
    }

    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  function clearPriceFilter() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("min_price");
    params.delete("max_price");
    params.delete("page");

    setMinPrice("");
    setMaxPrice("");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  const hasPriceFilter = Boolean(minParam || maxParam);

  return (
    <div className="border-t border-stone-200 pt-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          Price Range
        </h3>
        {hasPriceFilter && (
          <button
            type="button"
            onClick={clearPriceFilter}
            className="text-xs text-amber-700 hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      <form onSubmit={handlePriceFilter} className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-xs text-stone-400">
              ₹
            </span>
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              className="h-10 w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-6 pr-2 text-xs sm:text-sm text-stone-800 outline-none transition focus:border-amber-700 focus:bg-white focus:ring-1 focus:ring-amber-700"
            />
          </div>

          <span className="text-stone-400 font-medium">–</span>

          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-xs text-stone-400">
              ₹
            </span>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="h-10 w-full rounded-xl border border-stone-300 bg-stone-50/50 pl-6 pr-2 text-xs sm:text-sm text-stone-800 outline-none transition focus:border-amber-700 focus:bg-white focus:ring-1 focus:ring-amber-700"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-amber-700 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-800 active:scale-[0.98]"
          >
            Apply Price
          </button>

          {hasPriceFilter && (
            <button
              type="button"
              onClick={clearPriceFilter}
              className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-100"
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
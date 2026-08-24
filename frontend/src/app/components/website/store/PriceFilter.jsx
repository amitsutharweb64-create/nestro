"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PriceFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("min_price")) || 0
  );

  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("max_price")) || 10000
  );

  function handlePriceFilter() {
    const params = new URLSearchParams(searchParams.toString());

    params.set("min_price", minPrice.toString());
    params.set("max_price", maxPrice.toString());

    router.push(`/store?${params.toString()}`, {
      scroll: false,
    });
  }   
  function clearPriceFilter() {
  const params = new URLSearchParams(searchParams.toString());

  params.delete("min_price");
  params.delete("max_price");

  setMinPrice(0);
  setMaxPrice(0);

  router.push(`/store?${params.toString()}`, {
    scroll: false,
  });
}

  return (
    <div className="mt-5 border-t border-stone-200 pt-5">
      <h3 className="mb-5 text-base font-semibold text-stone-900">
        Price Range
      </h3>

      <div className="flex items-center gap-3">
        <input
          type="number"
          value={minPrice}
          onChange={(event) =>
            setMinPrice(Number(event.target.value))
          }
          placeholder="Min ₹"
          className="h-11 w-full rounded-lg border border-stone-300 px-3 text-sm outline-none transition focus:border-amber-700"
        />

        <span className="text-stone-400">–</span>

        <input
          type="number"
          value={maxPrice}
          onChange={(event) =>
            setMaxPrice(Number(event.target.value))
          }
          placeholder="Max ₹"
          className="h-11 w-full rounded-lg border border-stone-300 px-3 text-sm outline-none transition focus:border-amber-700"
        />
      </div>   

   <div className="mt-4 flex gap-3">
  <button
    type="button"
    onClick={handlePriceFilter}
    className="w-full rounded-lg bg-amber-700 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800"
  >
    Apply Price
  </button>

  <button
    type="button"
    onClick={clearPriceFilter}
    className="w-full rounded-lg border border-stone-300 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
  >
    Clear Filters
  </button>
</div>   

    </div>
  );
}
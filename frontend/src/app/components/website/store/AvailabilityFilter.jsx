"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-2 text-sm select-none group">
      <span className="flex items-center gap-3 text-stone-700 transition group-hover:text-stone-900">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-stone-300 text-amber-700 focus:ring-amber-600 cursor-pointer accent-amber-700"
        />
        <span className={checked ? "font-medium text-amber-900" : ""}>{label}</span>
      </span>
    </label>
  );
}

export default function AvailabilityFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedStock = searchParams.get("stock") || "";

  const handleStockChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    const currentStock = params.get("stock");

    if (currentStock === value) {
      params.delete("stock");
    } else {
      params.set("stock", value);
    }

    params.delete("page");

    const queryString = params.toString();

    router.push(
      queryString ? `${pathname}?${queryString}` : pathname,
      {
        scroll: false,
      }
    );
  };

  return (
    <div className="border-t border-stone-200 pt-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
        Availability
      </h3>

      <div className="space-y-0.5 mt-2">
        <FilterCheckbox
          label="In Stock"
          checked={selectedStock === "true"}
          onChange={() => handleStockChange("true")}
        />

        <FilterCheckbox
          label="Out of Stock"
          checked={selectedStock === "false"}
          onChange={() => handleStockChange("false")}
        />
      </div>
    </div>
  );
}
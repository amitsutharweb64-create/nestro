import { X } from "lucide-react";

const activeFilters = ["Living Room", "Solid Wood"];

export default function StoreToolbar() {
  return (
    <div className="flex flex-col gap-4 border-b border-stone-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm text-stone-600">
          <span className="font-semibold text-stone-900">128</span> products
          found
        </p>
        {activeFilters.map((filter) => (
          <span
            key={filter}
            className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800"
          >
            {filter}
            <X className="h-3 w-3 cursor-pointer" />
          </span>
        ))}
      </div>

      <select
        defaultValue="featured"
        className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 outline-none focus:border-amber-600"
      >
        <option value="featured">Sort: Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
}

"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import AvailabilityFilter from "./AvailabilityFilter";
import PriceFilter from "./PriceFilter";

const colors = [
  { name: "Walnut Brown", hex: "#7a5230" },
  { name: "Ivory", hex: "#f2ede4" },
  { name: "Charcoal", hex: "#3a3a3a" },
  { name: "Sage Green", hex: "#8a9a7b" },
  { name: "Terracotta", hex: "#c2683f" },
  { name: "Navy", hex: "#2f3e56" },
];

function FilterCheckbox({
  label,
  count,
  checked = false,
  onChange = () => {},
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5 text-sm">
      <span className="flex items-center gap-2.5 text-stone-700">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-stone-300 text-amber-700 focus:ring-amber-600"
        />

        {label}
      </span>

      {typeof count === "number" && (
        <span className="text-xs text-stone-400">{count}</span>
      )}
    </label>
  );
}

export default function StoreFilters({
  categories = [],
  roomTypes = [],
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState(150000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const categoryQuery =
    searchParams.get("category") ||
    searchParams.get("Category") ||
    "";

  const selectedCategories = categoryQuery
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  const roomQuery =
    searchParams.get("room") ||
    searchParams.get("Room") ||
    "";

  const selectedRooms = roomQuery
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  const toggle = (setList, value) => {
    setList((currentList) =>
      currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value]
    );
  };

  const handleQueryChange = (queryKey, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (queryKey === "category") {
      params.delete("Category");
    }

    if (queryKey === "room") {
      params.delete("Room");
    }

    const currentValues =
      params
        .get(queryKey)
        ?.split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean) || [];

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    if (updatedValues.length > 0) {
      params.set(queryKey, updatedValues.join(","));
    } else {
      params.delete(queryKey);
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
    <aside className="w-full shrink-0 lg:w-64">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-900">
        Filters
      </h2>

      {/* Room Type */}
      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-medium text-stone-900">
          Room Type
        </h3>

        <div className="mt-2">
          {roomTypes.map((room) => {
            const active = selectedRooms.includes(room.slug);

            return (
              <FilterCheckbox
                key={room.slug}
                label={room.name}
                checked={active}
                onChange={() =>
                  handleQueryChange("room", room.slug)
                }
              />
            );
          })}
        </div>
      </div>

      {/* Price Range */}
     <PriceFilter/>

      {/* Categories */}
      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-medium text-stone-900">
          Categories
        </h3>

        <div className="mt-2">
          {categories.map((item) => {
            const active = selectedCategories.includes(item.slug);

            return (
              <FilterCheckbox
                key={item.slug}
                label={item.name}
                checked={active}
                onChange={() =>
                  handleQueryChange("category", item.slug)
                }
              />
            );
          })}
        </div>
      </div>

      {/* Color */}
      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-medium text-stone-900">
          Color
        </h3>

        <div className="mt-3 flex flex-wrap gap-2.5">
          {colors.map((color) => {
            const active = selectedColors.includes(color.name);

            return (
              <button
                key={color.name}
                type="button"
                aria-label={color.name}
                title={color.name}
                onClick={() =>
                  toggle(setSelectedColors, color.name)
                }
                className={`h-7 w-7 rounded-full ring-offset-2 transition-transform hover:scale-110 ${
                  active
                    ? "ring-2 ring-amber-700"
                    : "ring-1 ring-stone-300"
                }`}
                style={{
                  backgroundColor: color.hex,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <AvailabilityFilter />

      {/* Rating */}
      <div className="mt-5 border-t border-stone-200 pt-5 pb-2">
        <h3 className="text-sm font-medium text-stone-900">
          Rating
        </h3>

        <div className="mt-2">
          <FilterCheckbox
            label="★★★★★ & up"
            checked={selectedRatings.includes("5")}
            onChange={() =>
              toggle(setSelectedRatings, "5")
            }
          />

          <FilterCheckbox
            label="★★★★☆ & up"
            checked={selectedRatings.includes("4")}
            onChange={() =>
              toggle(setSelectedRatings, "4")
            }
          />
        </div>
      </div>
    </aside>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { X, RotateCcw, SlidersHorizontal, Check } from "lucide-react";
import AvailabilityFilter from "./AvailabilityFilter";
import PriceFilter from "./PriceFilter";
import { useStoreFilters } from "./StoreFilterContext";

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

      {typeof count === "number" && (
        <span className="text-xs text-stone-400 font-mono">{count}</span>
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

  const {
    isMobileFilterOpen,
    closeMobileFilters,
    activeFiltersCount,
    clearAllFilters,
  } = useStoreFilters();

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

  const filterContent = (
    <>
      {/* Room Type */}
      <div className="border-t border-stone-200 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
            Room Type
          </h3>
          {selectedRooms.length > 0 && (
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              {selectedRooms.length}
            </span>
          )}
        </div>

        <div className="space-y-0.5 mt-2">
          {roomTypes.map((room) => {
            const active = selectedRooms.includes(room.slug?.toLowerCase());

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
      <PriceFilter />

      {/* Categories */}
      <div className="border-t border-stone-200 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
            Categories
          </h3>
          {selectedCategories.length > 0 && (
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </div>

        <div className="space-y-0.5 mt-2 max-h-60 overflow-y-auto pr-1">
          {categories.map((item) => {
            const active = selectedCategories.includes(item.slug?.toLowerCase());

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
      <div className="border-t border-stone-200 pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-3">
          Color
        </h3>

        <div className="flex flex-wrap gap-2.5">
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
                className={`group relative flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 transition-all hover:scale-105 ${
                  active
                    ? "ring-2 ring-amber-700 shadow-sm"
                    : "ring-1 ring-stone-300 hover:ring-stone-400"
                }`}
                style={{
                  backgroundColor: color.hex,
                }}
              >
                {active && (
                  <Check
                    className={`h-4 w-4 ${
                      color.hex === "#f2ede4"
                        ? "text-stone-900"
                        : "text-white"
                    }`}
                    strokeWidth={2.5}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <AvailabilityFilter />

      {/* Rating */}
      <div className="border-t border-stone-200 pt-5 pb-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
          Rating
        </h3>

        <div className="space-y-0.5 mt-2">
          <FilterCheckbox
            label="★★★★★ (5 Stars)"
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
    </>
  );

  return (
    <>
      {/* 1. Desktop Sidebar (Visible only on lg and up) */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-stone-700" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                Filters
              </h2>
            </div>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-medium text-amber-700 hover:text-amber-800 transition flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>

          <div className="space-y-4 max-h-[calc(100vh-170px)] overflow-y-auto pr-1">
            {filterContent}
          </div>
        </div>
      </aside>

      {/* 2. Mobile Drawer (Slide-over Modal on mobile/tablet) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileFilterOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={closeMobileFilters}
        />

        {/* Slide-over panel */}
        <div
          className={`fixed inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 bg-stone-50">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="h-5 w-5 text-amber-800" />
              <h2 className="text-base font-bold uppercase tracking-wide text-stone-900">
                Filters
              </h2>
              {activeFiltersCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-700 px-1.5 text-xs font-semibold text-white">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={closeMobileFilters}
              aria-label="Close filters"
              className="rounded-full p-2 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {filterContent}
          </div>

          {/* Drawer Footer Actions */}
          <div className="border-t border-stone-200 bg-stone-50 p-4 flex gap-3">
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="w-1/3 rounded-xl border border-stone-300 bg-white py-3 text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={closeMobileFilters}
              className="flex-1 rounded-xl bg-amber-700 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-amber-800 active:scale-[0.98]"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

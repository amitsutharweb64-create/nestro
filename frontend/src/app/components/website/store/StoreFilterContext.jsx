"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const StoreFilterContext = createContext(null);

export function StoreFilterProvider({ children, categories = [], roomTypes = [] }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Prevent background scrolling when mobile filter drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFilterOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileFilterOpen(false);
  }, [pathname]);

  const openMobileFilters = () => setIsMobileFilterOpen(true);
  const closeMobileFilters = () => setIsMobileFilterOpen(false);

  // Compute active filters
  const activeFilters = useMemo(() => {
    const filters = [];

    // Category
    const categoryQuery = searchParams.get("category") || searchParams.get("Category") || "";
    if (categoryQuery) {
      categoryQuery.split(",").map((c) => c.trim()).filter(Boolean).forEach((slug) => {
        const found = categories.find((cat) => cat.slug?.toLowerCase() === slug.toLowerCase());
        filters.push({
          key: "category",
          value: slug,
          label: found?.name || slug,
          type: "category",
        });
      });
    }

    // Room
    const roomQuery = searchParams.get("room") || searchParams.get("Room") || "";
    if (roomQuery) {
      roomQuery.split(",").map((r) => r.trim()).filter(Boolean).forEach((slug) => {
        const found = roomTypes.find((room) => room.slug?.toLowerCase() === slug.toLowerCase());
        filters.push({
          key: "room",
          value: slug,
          label: found?.name || slug,
          type: "room",
        });
      });
    }

    // Stock
    const stockQuery = searchParams.get("stock");
    if (stockQuery === "true") {
      filters.push({
        key: "stock",
        value: "true",
        label: "In Stock",
        type: "stock",
      });
    } else if (stockQuery === "false") {
      filters.push({
        key: "stock",
        value: "false",
        label: "Out of Stock",
        type: "stock",
      });
    }

    // Price
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");
    if (minPrice || maxPrice) {
      filters.push({
        key: "price",
        value: `${minPrice || 0}-${maxPrice || ""}`,
        label: `₹${Number(minPrice || 0).toLocaleString()} – ₹${Number(maxPrice || 0).toLocaleString()}`,
        type: "price",
      });
    }

    return filters;
  }, [searchParams, categories, roomTypes]);

  // Helper to remove a single filter item
  const removeFilter = (filter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter.key === "category") {
      params.delete("Category");
      const current = (params.get("category") || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const updated = current.filter((s) => s !== filter.value.toLowerCase());
      if (updated.length > 0) {
        params.set("category", updated.join(","));
      } else {
        params.delete("category");
      }
    } else if (filter.key === "room") {
      params.delete("Room");
      const current = (params.get("room") || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const updated = current.filter((s) => s !== filter.value.toLowerCase());
      if (updated.length > 0) {
        params.set("room", updated.join(","));
      } else {
        params.delete("room");
      }
    } else if (filter.key === "stock") {
      params.delete("stock");
    } else if (filter.key === "price") {
      params.delete("min_price");
      params.delete("max_price");
    }

    params.delete("page");
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  // Helper to clear all filters
  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("Category");
    params.delete("room");
    params.delete("Room");
    params.delete("stock");
    params.delete("min_price");
    params.delete("max_price");
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  return (
    <StoreFilterContext.Provider
      value={{
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        openMobileFilters,
        closeMobileFilters,
        activeFilters,
        activeFiltersCount: activeFilters.length,
        removeFilter,
        clearAllFilters,
      }}
    >
      {children}
    </StoreFilterContext.Provider>
  );
}

export function useStoreFilters() {
  const context = useContext(StoreFilterContext);
  if (!context) {
    return {
      isMobileFilterOpen: false,
      setIsMobileFilterOpen: () => {},
      openMobileFilters: () => {},
      closeMobileFilters: () => {},
      activeFilters: [],
      activeFiltersCount: 0,
      removeFilter: () => {},
      clearAllFilters: () => {},
    };
  }
  return context;
}

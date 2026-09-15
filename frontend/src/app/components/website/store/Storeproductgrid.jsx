"use client";

import ProductCard from "@/components/website/store/Productcard";
import { PackageSearch, RotateCcw } from "lucide-react";
import { useStoreFilters } from "./StoreFilterContext";

export default function StoreProductGrid({ products }) {
  const { clearAllFilters, activeFiltersCount } = useStoreFilters();

  if (!products || products.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-800 mb-4">
          <PackageSearch className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-stone-900">
          No Products Found
        </h3>
        <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-stone-500">
          We couldn't find any products matching your selected criteria. Try adjusting your filters or search terms.
        </p>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-amber-800"
          >
            <RotateCcw className="h-4 w-4" />
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          href={`/product/${product.slug}`}
          image={product.thumbnail}
          category={product.category?.name}
          name={product.title}
          price={product.salePrice}
          originalPrice={product.price}
          badge={product.discount ? `${product.discount}% OFF` : ""}
        />
      ))}
    </div>
  );
}

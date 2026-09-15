"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ImageOff } from "lucide-react";
import CartBtn from "@/components/website/ui/CartBtn";

const badgeStyles = {
  SALE: "bg-amber-700 text-white",
  HOT: "bg-rose-600 text-white",
  NEW: "bg-emerald-700 text-white",
  BESTSELLER: "bg-stone-900 text-white",
};

export default function ProductCard({
  product,
  href,
  image,
  category,
  name,
  rating = 5,
  price,
  originalPrice,
  badge,
}) {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Normalize product data
  const finalHref = href || (product?.slug ? `/product/${product.slug}` : "/store");
  const finalImage = image || product?.thumbnail || product?.images?.[0] || "";
  const finalName = name || product?.title || "Product";
  const finalCategory = category || product?.category?.name || "";
  
  const rawPrice = price ?? product?.salePrice ?? product?.price;
  const rawOriginalPrice = originalPrice ?? (product?.salePrice && product?.price && product.salePrice < product.price ? product.price : null);

  const formattedPrice = typeof rawPrice === "number" ? `₹${rawPrice.toLocaleString("en-IN")}` : rawPrice;
  const formattedOriginalPrice = typeof rawOriginalPrice === "number" ? `₹${rawOriginalPrice.toLocaleString("en-IN")}` : rawOriginalPrice;

  const finalBadge = badge || (product?.discount ? `${product.discount}% OFF` : (product?.bestSeller ? "BESTSELLER" : product?.newArrival ? "NEW" : ""));

  const productForCart = product || {
    _id: product?._id || Math.random().toString(),
    title: finalName,
    slug: product?.slug || "",
    salePrice: typeof rawPrice === "number" ? rawPrice : Number(String(rawPrice || 0).replace(/[^0-9.-]+/g, "")),
    price: typeof rawOriginalPrice === "number" ? rawOriginalPrice : Number(String(rawOriginalPrice || rawPrice || 0).replace(/[^0-9.-]+/g, "")),
    thumbnail: finalImage,
  };

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:border-amber-300 hover:shadow-md">
      <Link href={finalHref} className="block">
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          {!imgError && finalImage ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-stone-200" />
              )}
              <img
                src={finalImage}
                alt={finalName}
                onLoad={() => setLoaded(true)}
                onError={() => setImgError(true)}
                className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-stone-100 p-4 text-stone-400">
              <ImageOff className="h-8 w-8" strokeWidth={1.5} />
              <span className="px-2 text-center text-xs line-clamp-1">{finalName}</span>
            </div>
          )}

          {finalBadge && (
            <span
              className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide shadow-xs ${
                badgeStyles[finalBadge] || (finalBadge.includes("%") ? "bg-amber-700 text-white" : "bg-stone-900 text-white")
              }`}
            >
              {finalBadge}
            </span>
          )}

          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block">
            <span className="block rounded-full bg-white/95 py-2 text-center text-xs font-medium text-stone-900 shadow-sm backdrop-blur-xs">
              View Product
            </span>
          </div>
        </div>

        <div className="border-t border-stone-100 p-3 sm:p-4 pb-2">
          {finalCategory && (
            <p className="text-[11px] font-medium uppercase tracking-wider text-amber-700 truncate">
              {finalCategory}
            </p>
          )}
          <h3 className="mt-1 text-xs sm:text-sm font-medium text-stone-900 line-clamp-1">
            {finalName}
          </h3>

          <div className="mt-1.5 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                  i < rating
                    ? "fill-amber-500 text-amber-500"
                    : "fill-stone-200 text-stone-200"
                }`}
              />
            ))}
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-bold text-stone-900">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && formattedOriginalPrice !== formattedPrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-3 sm:p-4 pt-1">
        <CartBtn product={productForCart} />
      </div>
    </div>
  );
}
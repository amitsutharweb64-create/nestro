"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ImageOff } from "lucide-react";
import CartBtn from "@/components/website/ui/CartBtn";

function getBadgeStyle(badge) {
  if (!badge) return "";

  if (badge.startsWith("−") || badge.startsWith("-") || badge.includes("%")) {
    return "bg-amber-700 text-white";
  }

  if (badge === "NEW") return "bg-emerald-700 text-white";
  if (badge === "BESTSELLER") return "bg-stone-900 text-white";
  if (badge === "SALE") return "bg-amber-700 text-white";
  if (badge === "HOT") return "bg-rose-600 text-white";

  return "bg-stone-900 text-white";
}

export default function ProductCard({
  href = "/product",
  image,
  category,
  name,
  rating = 5,
  reviewCount,
  price,
  originalPrice,
  badge,
  product,
  onAddToCart,
}) {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:border-amber-300 hover:shadow-md">
      <Link href={href} className="block">
        {/* Product Image Box */}
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          {!imgError ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-stone-200" />
              )}

              <img
                src={image}
                alt={name || "Product image"}
                onLoad={() => setLoaded(true)}
                onError={() => setImgError(true)}
                className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-stone-100 p-2 text-stone-400">
              <ImageOff className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.5} />
              <span className="text-center text-[10px] sm:text-xs line-clamp-1">{name}</span>
            </div>
          )}

          {/* Badge */}
          {badge && (
            <span
              className={`absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider shadow-xs ${getBadgeStyle(
                badge
              )}`}
            >
              {badge}
            </span>
          )}

          {/* Hover overlay on desktop */}
          <div className="absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
            <span className="block rounded-full bg-white/95 py-2 text-center text-xs font-medium text-stone-900 shadow-sm backdrop-blur-xs">
              View Details
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-2.5 sm:p-3.5 pb-2">
          {category && (
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-800 truncate">
              {category}
            </p>
          )}

          <h3 className="mt-1 text-xs sm:text-sm font-medium text-stone-900 line-clamp-1 sm:line-clamp-2 leading-snug">
            {name}
          </h3>

          {/* Rating Stars */}
          <div className="mt-1.5 flex items-center gap-0.5 sm:gap-1">
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

            {reviewCount && (
              <span className="ml-1 text-[10px] sm:text-xs text-stone-400">
                ({reviewCount})
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-2 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-bold text-stone-900">
              {typeof price === "number" ? `₹${price.toLocaleString()}` : price}
            </span>

            {originalPrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                {typeof originalPrice === "number" ? `₹${originalPrice.toLocaleString()}` : originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Cart Button */}
      <div className="p-2.5 pt-0 sm:p-3.5 sm:pt-0">
        <CartBtn product={product} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}

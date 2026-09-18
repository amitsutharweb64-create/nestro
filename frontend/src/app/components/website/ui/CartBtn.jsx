"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

export default function CartBtn({ product, onAddToCart }) {
  const dispatcher = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  function carthandler() {
    dispatcher(
      addToCart({
        _id: product._id,
        name: product.title || product.name,
        slug: product.slug,
        salePrice: product.salePrice,
        originalPrice: product.originalPrice || product.price,
        thumbnail: product.thumbnail,
        qty: 1,
      })
    );

    setIsAdding(true);
    onAddToCart?.(product);

    setTimeout(() => {
      setIsAdding(false);
    }, 900);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    carthandler();
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2 px-2 sm:py-2.5 sm:px-4 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 disabled:cursor-not-allowed ${
        isAdding
          ? "bg-emerald-700 text-white"
          : "bg-stone-900 text-white hover:bg-amber-700 shadow-xs"
      }`}
    >
      {isAdding ? (
        <>
          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" strokeWidth={2.5} />
          <span className="truncate">Added</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" strokeWidth={2} />
          <span className="truncate">Add to Cart</span>
        </>
      )}
    </button>
  );
}
"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
  
export default function CartBtn({ product, onAddToCart }) {       
    
    const dispatcher = useDispatch();   
      
    function carthandler(){
      dispatcher(
   addToCart({
    _id: product._id,
    name: product.title,
    slug: product.slug,
    salePrice: product.salePrice,
    originalPrice: product.price,
    thumbnail: product.thumbnail,
    qty: 1,
  })
);
    }

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    carthandler();
    onAddToCart?.(product);

    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <ShoppingCart className="h-4 w-4" />

      {isAdding ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}

'use client'

import React from "react";
import {
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Tag,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "@/redux/features/cartSlice";
import Link from "next/link";


export default function Cart() {    
        

    const cart = useSelector((store)=> store.cart)  ;
    const dispatcher=useDispatch()
    const originalTotal = Number(cart.original_total ?? 0);
    const finalTotal = Number(cart.final_total ?? 0);
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button className="flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors text-sm mb-3">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-semibold text-stone-900">
            Your Cart{" "}
            <span className="text-stone-400 text-xl font-normal">
              {cart.items.length || 0}
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart?.items.map((item) => {
              const salePrice = Number(item.salePrice ?? item.price ?? 0);
              const originalPrice = Number(item.originalPrice ?? item.price ?? salePrice);

              return (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 hover:shadow-sm transition-shadow"
              >
                {/* Image */}
                <img
                  src={`${item.thumbnail}`}
                  alt={item.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-xl bg-stone-100"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-stone-900 mt-2">
                      {item.name}
                    </h3>
                 

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-bold text-stone-900">
                        ₹{salePrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-stone-400 line-through">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Quantity + Remove (UI only, no handlers) */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                    <button onClick={()=>{
                      dispatcher(removeFromCart(item._id))
                    }} className="text-stone-400 hover:text-red-500 transition-colors p-1">
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                      <button onClick={()=>dispatcher(decreaseQty(item._id))} className="p-2 hover:bg-stone-100 text-stone-600 transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-sm font-medium text-stone-900 min-w-[2rem] text-center">
                        {item.qty}
                      </span>
                      <button   onClick={()=>dispatcher(increaseQty(item._id))}
                       className="p-2 hover:bg-stone-100 text-stone-600 transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-5">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-5">
                <label className="text-sm text-stone-500 mb-2 flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Try NESTRO10"
                    className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700"
                  />
                  <button className="bg-stone-900 hover:bg-stone-800 text-white text-sm px-4 rounded-lg transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>₹{originalTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>You Saved</span>
                  <span>
                    - ₹{(originalTotal - finalTotal).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between items-center">
                <span className="text-base font-semibold text-stone-900">
                  Total
                </span>
                <span className="text-xl font-bold text-amber-700">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <Link href = "/checkout" className="w-full flex justify-center  bg-amber-700 hover:bg-amber-800 text-white font-medium py-3.5 rounded-xl mt-6 transition-colors">
                Proceed to Checkout
              </Link>

              <div className="flex flex-col gap-2 mt-5 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-700" />
                  Free shipping on orders above ₹30,000
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Secure checkout with 256-bit encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

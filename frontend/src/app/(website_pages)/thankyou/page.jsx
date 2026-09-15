"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ThankYouPage({ params }) {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-8 text-center">

        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-3xl text-green-600">✓</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Thank You!
        </h1>

        <p className="text-gray-500 mt-2">
          Your order has been placed successfully.
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <p className="font-semibold text-gray-900 mt-1 break-all">
              {orderId}
            </p>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-5">
          We will process your order shortly.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
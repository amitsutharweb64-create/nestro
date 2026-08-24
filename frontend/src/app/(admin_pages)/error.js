"use client";

import { useEffect } from "react";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 shadow-sm text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="text-3xl font-bold text-[#0d1b2a]">
          Something Went Wrong
        </h1>

        <p className="mt-3 text-gray-500">
          An unexpected error occurred while loading this page.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-white font-medium transition hover:bg-teal-700"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium transition hover:border-teal-600 hover:text-teal-600"
          >
            <Home size={18} />       
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
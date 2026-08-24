import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-teal-50 text-teal-600">
          <SearchX size={48} strokeWidth={1.8} />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">
          Error 404
        </p>

        <h1 className="text-4xl font-bold text-[#0d1b2a] sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-500">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/admin"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-teal-700 sm:w-auto"
          >
            <Home size={18} />
            Go to Dashboard
          </Link>

          <Link
            href="/admin/category"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:border-teal-600 hover:text-teal-600 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Back to Category
          </Link>
        </div>
      </div>
    </div>
  );
}
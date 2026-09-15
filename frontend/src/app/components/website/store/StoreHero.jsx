import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StoreHero() {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-6 pt-4 sm:pt-6 lg:px-10 lg:pt-8">
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm"
        style={{
          background:
            "linear-gradient(120deg, #241a14 0%, #3b2a1e 55%, #4a3626 100%)",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-6 p-5 sm:p-8 lg:grid-cols-2 lg:gap-8 lg:p-10">
          {/* Left: text */}
          <div className="text-left">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-500">
              New Collection — SS 2026
            </p>
            <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-white">
              Modern Living
              <br />
              <span className="font-serif italic text-amber-300">
                Collection
              </span>
            </h1>
            <p className="mt-2.5 sm:mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-stone-300 sm:text-stone-400">
              Timeless furniture crafted for elegant spaces. Designed with
              intention, built to endure.
            </p>

            <a
              href="#store-products"
              className="mt-5 sm:mt-7 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-amber-700 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition-all hover:bg-amber-600 active:scale-95 shadow-sm"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>

          {/* Right: image */}
          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=80"
              alt="Modern living room interior"
              className="h-44 sm:h-64 lg:h-80 w-full object-cover shadow-inner transition-transform duration-700 hover:scale-102"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
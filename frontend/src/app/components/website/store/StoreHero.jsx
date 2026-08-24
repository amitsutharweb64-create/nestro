import { ArrowRight } from "lucide-react";

export default function StoreHero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-10">
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background:
            "linear-gradient(120deg, #241a14 0%, #3b2a1e 55%, #4a3626 100%)",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:gap-8 lg:p-10">
          {/* Left: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              New Collection — SS 2026
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Modern Living
              <br />
              <span className="font-serif italic text-amber-300">
                Collection
              </span>
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              Timeless furniture crafted for elegant spaces. Designed with
              intention, built to endure.
            </p>

            <button className="mt-7 flex items-center gap-2 rounded-full bg-amber-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-600">
              Explore Collection
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          {/* Right: image */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=80"
              alt="Modern living room interior"
              className="h-56 w-full object-cover sm:h-72 lg:h-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
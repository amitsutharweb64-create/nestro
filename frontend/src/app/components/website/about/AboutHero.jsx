import Link from "next/link";
import { ArrowRight, Sparkles, Award, ShieldCheck } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-stone-50 py-16 sm:py-24 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 px-3.5 py-1 text-xs font-semibold text-amber-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-700" />
              <span>About Nestro Living</span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl sm:leading-tight">
              Crafting timeless spaces with{" "}
              <span className="font-serif italic text-amber-700 font-normal">
                artisan soul & modern elegance
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-stone-600 max-w-2xl">
              At Nestro, we believe furniture is more than functional decor — it is the soul of your living space. Born from a heritage of handcrafted excellence, every piece blends generational woodworking traditions with clean, contemporary aesthetics.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/store"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 shadow-xs transition hover:bg-stone-50 hover:text-stone-900"
              >
                Get in Touch
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 border-t border-stone-200/80 pt-8">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-stone-900">100%</p>
                <p className="mt-1 text-xs text-stone-500 font-medium">Solid Sustainably Sourced Wood</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-stone-900">18+ Yrs</p>
                <p className="mt-1 text-xs text-stone-500 font-medium">Master Artisans & Heritage</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-bold text-stone-900">12k+</p>
                <p className="mt-1 text-xs text-stone-500 font-medium">Happy Homes Furnished</p>
              </div>
            </div>
          </div>

          {/* Right Image Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-4/5 overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                  alt="Nestro modern living space"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-lg border border-stone-100 hidden sm:flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Handmade Excellence</p>
                  <p className="text-xs text-stone-500">Premium Wood & Craft</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

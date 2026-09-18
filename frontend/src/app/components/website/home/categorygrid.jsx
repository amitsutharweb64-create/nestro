import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function CategoryGrid({ categories = [] }) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl border-b border-stone-100 px-3 py-9 sm:px-6 sm:py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Layers className="h-3.5 w-3.5" />
            <span>Curated Collections</span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-stone-900 sm:text-3xl">
            Shop by Category
          </h2>
        </div>
        <Link
          href="/store"
          className="hidden items-center gap-1 text-sm font-medium text-stone-700 transition-colors hover:text-amber-700 sm:inline-flex"
        >
          <span>All Categories</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scrollbar-none pb-2 sm:mt-8 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:pb-0 sm:snap-none lg:grid-cols-6 xl:grid-cols-7">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/store?category=${category.slug}`}
            className="group flex w-25 shrink-0 snap-start flex-col items-center gap-2.5 rounded-2xl p-1.5 text-center transition duration-300 hover:bg-stone-50 sm:w-auto sm:shrink sm:gap-3 sm:p-3"
          >
            <div className="h-19 w-19 overflow-hidden rounded-full bg-stone-100 ring-2 ring-stone-200 transition-all duration-300 group-hover:ring-amber-500 group-hover:shadow-md sm:h-24 sm:w-24">
              <img
                src={category.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80"}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-amber-800 transition-colors line-clamp-1">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
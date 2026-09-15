import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function CategoryGrid({ categories = [] }) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-10 border-b border-stone-100">
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

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/store?category=${category.slug}`}
            className="group flex flex-col items-center gap-3 rounded-2xl p-3 text-center transition duration-300 hover:bg-stone-50"
          >
            <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full ring-2 ring-stone-200 bg-stone-100 transition-all duration-300 group-hover:ring-amber-500 group-hover:shadow-md">
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
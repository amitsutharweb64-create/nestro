import Link from "next/link";


export default function CategoryGrid({ categories = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
        Browse
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-stone-900 sm:text-3xl">
        Shop by Category
      </h2>

      <div className="mt-8 grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-7">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/store?category=${category.slug}`}
            className="group flex flex-col items-center gap-3 text-center"
          >
            <div className="h-20 w-20 overflow-hidden rounded-full ring-1 ring-stone-200 transition-all duration-300 group-hover:ring-amber-400 sm:h-24 sm:w-24">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-stone-900">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
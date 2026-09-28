import Link from "next/link";
import ProductCard from "./productcard";
import { ArrowRight, Sparkles } from "lucide-react";

export default function NewArrivals({ products = [] }) {
  if (!products || products.length === 0) {
    return null;
  }

  const newProducts = products.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Just in</span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-stone-900 sm:text-3xl">
            New arrivals
          </h2>
        </div>
        <Link
          href="/store?new_arrival=true"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-stone-700 transition-colors hover:text-amber-700"
        >
          <span>View all</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
        {newProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            href={`/product/${product.slug}`}
            image={product.thumbnail}
            category={product.category?.name}
            name={product.title}
            price={product.salePrice}
            originalPrice={product.price}
            badge={product.discount ? `${product.discount}% OFF` : "NEW"}
          />
        ))}
      </div>
    </section>
  );
}
import Link from "next/link";
import ProductCard from "./productcard";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BestSellers({ products = [] }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Handpicked for you</span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-stone-900 sm:text-3xl">
            Best Sellers
          </h2>
        </div>
        <Link
          href="/store?best_seller=true"
          className="hidden items-center gap-1 text-sm font-medium text-stone-700 transition-colors hover:text-amber-700 sm:inline-flex"
        >
          <span>View all</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            href={`/product/${product.slug}`}
            image={product.thumbnail}
            category={product.category?.name}
            name={product.title}
            price={product.salePrice}
            originalPrice={product.price}
            badge={product.discount ? `${product.discount}% OFF` : "BESTSELLER"}
          />
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/store?best_seller=true"
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 underline underline-offset-4"
        >
          View all best sellers
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
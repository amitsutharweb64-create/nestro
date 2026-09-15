import Link from "next/link";
import ProductCard from "./productcard";
import { Sparkles, ArrowRight, Tag } from "lucide-react";

export default function NewArrivals({ products = [] }) {
  if (!products || products.length === 0) {
    return null;
  }

  const featuredProduct = products[0];
  const gridProducts = products.slice(1, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>New Arrivals</span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-stone-900 sm:text-3xl">
            Just Landed
          </h2>
        </div>
        <Link
          href="/store?new_arrival=true"
          className="hidden items-center gap-1 text-sm font-medium text-stone-700 transition-colors hover:text-amber-700 sm:inline-flex"
        >
          <span>View all</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Featured large card */}
        {featuredProduct && (
          <Link
            href={`/product/${featuredProduct.slug}`}
            className="group relative col-span-1 min-h-[340px] overflow-hidden rounded-2xl bg-stone-900 shadow-md lg:col-span-1 flex flex-col justify-end"
          >
            <img
              src={featuredProduct.thumbnail || "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=700&q=80"}
              alt={featuredProduct.title}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/40 to-transparent" />
            
            <div className="relative z-10 p-6 sm:p-8">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-xs">
                Featured Arrival
              </span>
              <h3 className="mt-3 text-xl sm:text-2xl font-semibold leading-tight text-white line-clamp-1">
                {featuredProduct.title}
              </h3>
              {featuredProduct.shortDescription && (
                <p className="mt-1.5 text-xs sm:text-sm text-stone-300 line-clamp-2">
                  {featuredProduct.shortDescription}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-bold text-white">
                    ₹{featuredProduct.salePrice?.toLocaleString("en-IN") || featuredProduct.price?.toLocaleString("en-IN")}
                  </span>
                  {featuredProduct.salePrice < featuredProduct.price && (
                    <span className="text-xs text-stone-400 line-through">
                      ₹{featuredProduct.price?.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Small product cards + promo */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-2">
          {gridProducts.map((product) => (
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

          {/* Offer card */}
          <div className="col-span-2 flex flex-col justify-between rounded-2xl bg-amber-50/90 border border-amber-200/80 p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-700 text-white shadow-xs">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Special Launch Offer
                </span>
                <h4 className="mt-0.5 text-base sm:text-lg font-semibold text-stone-900">
                  Get 15% Off Your First Furniture Order
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  Use coupon code <span className="font-semibold text-amber-900 bg-amber-200/60 px-1.5 py-0.5 rounded">NESTRO15</span> at checkout
                </p>
              </div>
            </div>
            <Link
              href="/store"
              className="mt-4 sm:mt-0 inline-flex items-center justify-center shrink-0 rounded-xl bg-stone-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-stone-800"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
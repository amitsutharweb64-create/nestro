import Link from "next/link";
import ProductCard from "./productcard";

const products = [
  {
    href: "/product/linen-wardrobe",
    image:
      "https://images.unsplash.com/photo-1748679979601-dc9ec43d900d?auto=format&fit=crop&w=500&q=80",
    category: "Bedroom",
    name: "Linen Wardrobe",
    rating: 5,
    price: "₹1,18,000",
  },
  {
    href: "/product/walnut-tv-console",
    image:
      "https://images.unsplash.com/photo-1593071045469-a45708d54b3d?auto=format&fit=crop&w=500&q=80",
    category: "Media",
    name: "Walnut TV Console",
    rating: 4,
    price: "₹67,000",
  },
];

export default function NewArrivals() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            New arrivals
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900 sm:text-3xl">
            Just Landed
          </h2>
        </div>
        <Link
          href="/store"
          className="hidden text-sm font-medium text-stone-700 underline underline-offset-4 transition-colors hover:text-amber-700 sm:block"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Featured large card */}
        <Link
          href="/product/scandinavian-dining-set"
          className="group relative col-span-1 overflow-hidden rounded-2xl bg-stone-900 lg:col-span-1"
        >
          <img
            src="https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=700&q=80"
            alt="Scandinavian Dining Set"
            className="h-72 w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="rounded-full bg-amber-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              Featured
            </span>
            <h3 className="mt-3 text-xl font-semibold leading-tight text-white">
              Scandinavian Dining Set
            </h3>
            <p className="mt-1 text-sm text-stone-300">
              Ash wood + linen chairs. Set of 4.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-semibold text-white">
                ₹1,24,000
              </span>
              <span className="text-xs font-medium text-amber-300 underline underline-offset-4">
                View in Store
              </span>
            </div>
          </div>
        </Link>

        {/* Small product cards */}
        <div className="grid grid-cols-2 gap-6 lg:col-span-2">
          {products.map((product) => (
            <ProductCard key={product.href} {...product} />
          ))}

          {/* Offer card */}
          <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-amber-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                Offer
              </span>
              <h4 className="mt-1 text-lg font-semibold text-stone-900">
                First order 15% off
              </h4>
              <p className="text-sm text-stone-600">
                Use code Nestro15 at checkout
              </p>
            </div>
            <Link
              href="/store"
              className="mt-4 inline-block shrink-0 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 sm:mt-0"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
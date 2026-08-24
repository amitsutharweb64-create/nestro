import Link from "next/link";
import ProductCard from "./productcard";



export default function BestSellers({products = []}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Handpicked for you
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900 sm:text-3xl">
            Best Sellers
          </h2>
        </div>
        <Link
          href="/store"
          className="hidden text-sm font-medium text-stone-700 underline underline-offset-4 transition-colors hover:text-amber-700 sm:block"
        >
          View all
        </Link>
      </div>
           
             <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            href={`/product/${product.slug}`}
            image={product.thumbnail}
            category={product.category?.name}
            name={product.title}
            price={`₹${product.salePrice.toLocaleString("en-IN")}`}
            originalPrice={
              product.salePrice < product.price
                ? `₹${product.price.toLocaleString("en-IN")}`
                : undefined
            }
            badge="BESTSELLER"
          />
        ))}
      </div>
    
      <Link
        href="/store"
        className="mt-6 block text-center text-sm font-medium text-stone-700 underline underline-offset-4 sm:hidden"
      >
        View all
      </Link>
    </section>
  );
}
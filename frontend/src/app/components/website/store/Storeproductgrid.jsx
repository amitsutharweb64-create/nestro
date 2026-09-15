import ProductCard from "@/components/website/store/Productcard";

export default function StoreProductGrid({ products }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          href={`/product/${product.slug}`}
          image={product.thumbnail}
          category={product.category?.name}
          name={product.title}
          price={product.salePrice}
          originalPrice={product.price}
          badge={product.discount + "% OFF"}
        />
      ))}
    </div>
  );
}

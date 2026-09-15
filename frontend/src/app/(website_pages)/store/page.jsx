import { fetchProducts } from "@/api/api";
import StoreProductGrid from "@/components/website/store/Storeproductgrid";
import StorePagination from "@/components/website/store/Storepageination";
import StoreOfferBanner from "@/components/website/store/Storeofferbanner";

export default async function Page({ searchParams }) {
  const query = await searchParams;

  const category = query.category || null;
  const room = query.room || null;
  const stock = query.stock || null;
  const min_price = query.min_price || null;
  const max_price = query.max_price || null;
  const page = query.page || 1;

  const response = await fetchProducts({
    category,
    room,
    stock,
    min_price,
    max_price,
    page,
  });

  const products = response?.data || [];
  const pages = response?.pages || 1;

  return (
    <div className="w-full">
      <StoreProductGrid products={products} />
      <StoreOfferBanner />
      <StorePagination pages={pages} />
    </div>
  );
}

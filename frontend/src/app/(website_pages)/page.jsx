import BestSellers from "../components/website/home/bestseller";
import CategoryGrid from "../components/website/home/categorygrid";
import HeroCarousel from "../components/website/home/heroslider";
import NewsletterBanner from "../components/website/home/newsleter";
import NewArrivals from "../components/website/home/newarrivals";
import OurCraft from "../components/website/home/ourcraft";
import ShopByRoom from "../components/website/home/shopbyroom";
import Testimonials from "../components/website/home/testmodel";
import TrustBadges from "../components/website/home/trustbages";
import { fetchCategory, fetchProducts, fetchRooms } from "@/api/api";

export const revalidate = 60;

export const metadata = {
  title: "Nestro — Handcrafted Solid Wood Furniture & Modern Living",
  description:
    "Discover handcrafted solid wood furniture, bespoke living room sofas, dining tables, and bedroom collections at Nestro.",
};

export default async function HomePage() {
  const [categoriesRes, roomsRes, bestSellersRes, newArrivalsRes, allProductsRes] =
    await Promise.all([
      fetchCategory({ status: true, limit: 7 }),
      fetchRooms({ status: true, limit: 5 }),
      fetchProducts({
        best_seller: true,
        status: true,
        stock: true,
        limit: 4,
      }),
      fetchProducts({
        new_arrival: true,
        status: true,
        stock: true,
        limit: 5,
      }),
      fetchProducts({
        status: true,
        stock: true,
        limit: 8,
      }),
    ]);

  const categories = categoriesRes?.data || [];
  const rooms = roomsRes?.data || [];

  // Fallback to active products if specific flags are not yet set on products in database
  const allProducts = allProductsRes?.data || [];
  const bestSellers =
    bestSellersRes?.data && bestSellersRes.data.length > 0
      ? bestSellersRes.data
      : allProducts.slice(0, 4);

  const newArrivals =
    newArrivalsRes?.data && newArrivalsRes.data.length > 0
      ? newArrivalsRes.data
      : allProducts.slice(0, 5);

  return (
    <main className="min-h-screen bg-white">
      <HeroCarousel />
      <CategoryGrid categories={categories} />
      <BestSellers products={bestSellers} />
      <ShopByRoom rooms={rooms} />
      <NewArrivals products={newArrivals} />
      <OurCraft />
      <Testimonials />
      <TrustBadges />
      <NewsletterBanner />
    </main>
  );
}

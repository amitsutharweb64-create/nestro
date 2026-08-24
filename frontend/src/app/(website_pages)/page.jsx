import BestSellers from "../components/website/home/bestseller";
import CategoryGrid from "../components/website/home/categorygrid";
import HeroCarousel from "../components/website/home/heroslider";
import NewsletterBanner from "../components/website/home/newsleter";
import NewArrivals from "../components/website/home/newarrivals";
import OurCraft from "../components/website/home/ourcraft";
import ShopByRoom from "../components/website/home/shopbyroom";
import Testimonials from "../components/website/home/testmodel";
import TrustBadges from "../components/website/home/trustbages";
import { fetchCategory,fetchProducts,fetchRooms } from "@/api/api";  

export const revalidate = 60;

export default async function  HomePage() { 
   const [categories, rooms, bestSellers, newArrivals] = await Promise.all([
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
  ]);

  return (
    <main className="bg-white">
     <HeroCarousel />
      <CategoryGrid categories={categories?.data || []} />
      <BestSellers products={bestSellers?.data || []} />
      <ShopByRoom rooms={rooms?.data || []} />
      <NewArrivals products={newArrivals?.data || []} />
      <OurCraft />
      <Testimonials />
      <TrustBadges />
      <NewsletterBanner  />
    </main>
  );
}

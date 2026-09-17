import StoreFilters from "@/components/website/store/Storefilters";
import StoreHero from "@/components/website/store/StoreHero";
import StoreToolbar from "@/components/website/store/StoreToolbar";
import { StoreFilterProvider } from "@/components/website/store/StoreFilterContext";
import { fetchCategory, fetchRooms } from "@/api/api";
import { Suspense } from "react";

export default async function Layout({ children }) {
  const [categoryResponse, roomResponse] = await Promise.all([
    fetchCategory({ status: true, limit: 1000 }),
    fetchRooms(),
  ]);

  const categories = categoryResponse?.success
    ? categoryResponse.data
    : [];
  const roomTypes = roomResponse?.success
    ? roomResponse.data.filter((room) => room.status)
    : [];

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <StoreFilterProvider categories={categories} roomTypes={roomTypes}>
      <StoreHero />
      <section
        id="store-products"
        className="mx-auto max-w-7xl px-3 sm:px-6 py-6 sm:py-10 lg:px-10 lg:py-12"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          {/* Filters: Desktop sidebar + Mobile drawer modal */}
          <StoreFilters
            categories={categories}
            roomTypes={roomTypes}
          />

          {/* Main Product Catalog Area */}
          <div className="min-w-0 flex-1">
            <StoreToolbar />
            {children}
          </div>
        </div>
      </section>
      </StoreFilterProvider>
    </Suspense>
  );
}

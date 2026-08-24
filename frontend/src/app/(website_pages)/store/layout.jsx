import StoreFilters from "@/components/website/store/Storefilters";
import StoreHero from "@/components/website/store/StoreHero";
import StoreOfferBanner from "@/components/website/store/Storeofferbanner";
import StorePagination from "@/components/website/store/Storepageination";
import StoreToolbar from "@/components/website/store/StoreToolbar";
import { fetchCategory, fetchRooms } from "@/api/api";

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
    <>
      <StoreHero />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          <StoreFilters
            categories={categories}
            roomTypes={roomTypes}
          />

          <div className="flex-1">
            <StoreToolbar />
            {children}
         
          </div>
        </div>
      </section>
    </>
  );
}

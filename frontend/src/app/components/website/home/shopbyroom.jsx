import Link from "next/link";
import { LayoutGrid, ArrowRight } from "lucide-react";

export default function ShopByRoom({ rooms = [] }) {
  if (!rooms || rooms.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Curated by Space</span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-stone-900 sm:text-3xl">
            Shop by Room
          </h2>
        </div>
        <Link
          href="/store"
          className="hidden items-center gap-1 text-sm font-medium text-stone-700 transition-colors hover:text-amber-700 sm:inline-flex"
        >
          <span>All Rooms</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {rooms.map((room, i) => (
          <Link
            key={room._id}
            href={`/store?room=${room.slug}`}
            className={`group relative overflow-hidden rounded-2xl bg-stone-900 shadow-sm transition duration-300 hover:shadow-lg ${
              i === 0 ? "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 min-h-[280px]" : "h-48 sm:h-56"
            }`}
          >
            <img
              src={room.image || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"}
              alt={room.name}
              className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  {room.name}
                </h3>
                <span className="text-[11px] text-amber-300 font-medium">Explore Room</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition group-hover:bg-amber-600">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";


export default function ShopByRoom({ rooms = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
        Curated by space
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-stone-900 sm:text-3xl">
        Shop by Room
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {rooms.map((room, i) => (
          <Link
            key={room._id}
            href={`/store?room=${room.slug}`}
            className={`group relative overflow-hidden rounded-2xl ${
              i === 0 ? "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2" : ""
            }`}
          >
            <img
              src={room.image}
              alt={room.name}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                i === 0 ? "h-64 sm:h-full" : "h-40"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-sm font-semibold text-white sm:text-base">
                {room.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

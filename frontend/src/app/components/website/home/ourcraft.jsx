const stats = [
  { value: "12,000+", label: "Homes furnished" },
  { value: "18 yrs", label: "Of craftsmanship" },
  { value: "4.8/5", label: "Average rating" },
];

export default function OurCraft() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div
        className="grid grid-cols-1 items-center gap-10 rounded-3xl p-8 lg:grid-cols-2 lg:p-12"
        style={{
          background:
            "linear-gradient(120deg, #241a14 0%, #3b2a1e 55%, #4a3626 100%)",
        }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Our Craft
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Built by artisans who{" "}
            <span className="font-serif italic text-amber-300">
              still use their hands
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-300">
            Every Nestro piece passes through a small workshop in Jodhpur
            before it reaches your home — solid joinery, hand-finished
            grains, and fabrics tested for years of daily life, not just a
            showroom photo.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-stone-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1593071045469-a45708d54b3d?auto=format&fit=crop&w=800&q=80"
            alt="Nestro craftsmanship"
            className="h-72 w-full object-cover sm:h-96"
          />
        </div>
      </div>
    </section>
  );
}
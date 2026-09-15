export default function ContactHero() {
  return (
    <section className="border-b border-stone-100 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
          Get in touch
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-stone-900 sm:text-4xl">
          We&apos;d love to{" "}
          <span className="font-serif italic text-amber-700">
            hear from you
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-stone-600">
          Questions about an order, a custom piece, or just want design
          advice? Our team typically replies within 24 hours.
        </p>
      </div>
    </section>
  );
}

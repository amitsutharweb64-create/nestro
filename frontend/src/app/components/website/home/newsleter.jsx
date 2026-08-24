export default function NewsletterBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-4 pt-10 lg:px-10">
      <div
        className="flex flex-col items-start justify-between gap-6 rounded-3xl px-6 py-8 sm:px-10 sm:py-9 lg:flex-row lg:items-center"
        style={{ backgroundColor: "#1c1410" }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Stay in the loop
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Design tips &amp; new arrivals
          </h3>
          <p className="mt-1.5 text-sm text-stone-400">
            Join 8,000 subscribers who get exclusive first looks.
          </p>
        </div>

        <div className="w-full max-w-md shrink-0">
          <form className="flex items-stretch gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-full border border-stone-700 bg-[#2a221c] px-5 py-3 text-sm text-white placeholder-stone-500 outline-none focus:border-amber-600"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-amber-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-600"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-right text-xs text-stone-500">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
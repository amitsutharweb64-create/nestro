export default function StoreOfferBanner() {
  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-stone-900 px-6 py-6 text-center sm:flex-row sm:text-left">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
          Limited Time Offer
        </p>
        <h3 className="mt-1 text-lg font-semibold text-white">
          Free White Glove Delivery on orders above ₹75,000
        </h3>
      </div>
      <button className="shrink-0 rounded-full bg-amber-700 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-600">
        Shop Now
      </button>
    </div>
  );
}
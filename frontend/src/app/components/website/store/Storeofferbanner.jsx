export default function StoreOfferBanner() {
  return (
    <div className="mt-8 sm:mt-12 flex flex-col items-center justify-between gap-4 rounded-xl sm:rounded-2xl bg-stone-900 p-5 sm:p-7 text-center sm:text-left shadow-sm">
      <div className="space-y-1">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
          Limited Time Offer
        </p>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug">
          Free White Glove Delivery on orders above ₹75,000
        </h3>
      </div>
      <button
        type="button"
        className="w-full sm:w-auto shrink-0 rounded-full bg-amber-700 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-amber-600 active:scale-95"
      >
        Shop Now
      </button>
    </div>
  );
}
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "PR",
    name: "Priya Rao",
    city: "Mumbai",
    quote:
      "The Ember Velvet sofa is absolutely stunning. Delivery was flawless and the quality is beyond what I expected.",
  },
  {
    initials: "AS",
    name: "Arjun Sharma",
    city: "Bangalore",
    quote:
      "Nestro transformed our living room. Every piece feels like it belongs — timeless and beautifully crafted.",
  },
  {
    initials: "NK",
    name: "Neha Kapoor",
    city: "Delhi",
    quote:
      "Premium quality at a fair price. The travertine side table is a conversation starter every time.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
        What our customers say
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-stone-900 sm:text-3xl">
        Loved by 12,000+ homes
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl border border-stone-200 p-6"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-500 text-amber-500"
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-700">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-xs font-semibold text-amber-800">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900">
                  {t.name}
                </p>
                <p className="text-xs text-stone-500">{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
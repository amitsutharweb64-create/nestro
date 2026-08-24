"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    eyebrow: "Summer Collection 2026",
    titleStart: "Where Comfort",
    titleItalic: "Meets Craft",
    description:
      "Scandinavian-inspired furniture for modern living. Curated pieces that endure seasons.",
    primaryCta: "Shop Collection",
    secondaryCta: "View Lookbook",
    image:
      "https://images.unsplash.com/photo-1758448511322-8bfc73daf606?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "Bedroom Edit",
    titleStart: "Rest,",
    titleItalic: "Reimagined",
    description:
      "Soft textures and calm tones for a bedroom that feels like a retreat.",
    primaryCta: "Shop Bedroom",
    secondaryCta: "View Lookbook",
    image:
      "https://images.unsplash.com/photo-1748679979601-dc9ec43d900d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "New Arrivals",
    titleStart: "Gather Around",
    titleItalic: "Good Wood",
    description:
      "Solid-wood dining sets built for long dinners and longer conversations.",
    primaryCta: "Shop Dining",
    secondaryCta: "View Lookbook",
    image:
      "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index) => {
    setActive((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo(active + 1), 6000);
    return () => clearInterval(timer);
  }, [active, goTo]);

  const slide = slides[active];

  return (
    <section className="relative mx-auto mt-6 max-w-7xl overflow-hidden rounded-3xl px-0 sm:px-6 lg:px-10">
      <div className="relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[400px]">
        {/* Background image */}
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.titleStart}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/40 to-transparent" />

        {/* Content */}
        <div className="relative flex h-full max-w-xl flex-col justify-center gap-4 px-8 sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            {slide.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {slide.titleStart}{" "}
            <span className="font-serif italic text-amber-300">
              {slide.titleItalic}
            </span>
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-stone-200 sm:text-base">
            {slide.description}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <button className="rounded-full bg-amber-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-600">
              {slide.primaryCta}
            </button>
            <button className="text-sm font-medium text-white underline underline-offset-4 transition-colors hover:text-amber-300">
              {slide.secondaryCta}
            </button>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => goTo(active - 1)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/50 text-white backdrop-blur-sm transition-colors hover:bg-stone-900/70"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => goTo(active + 1)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/50 text-white backdrop-blur-sm transition-colors hover:bg-stone-900/70"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-8 flex items-center gap-2 sm:left-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-6 bg-amber-500" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
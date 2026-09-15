"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const defaultSlides = [
  {
    eyebrow: "Summer Collection 2026",
    titleStart: "Where Comfort",
    titleItalic: "Meets Craft",
    description:
      "Scandinavian-inspired solid wood furniture for modern living. Curated pieces built to endure generations.",
    primaryCta: "Shop Collection",
    primaryHref: "/store",
    secondaryCta: "Our Story",
    secondaryHref: "/about",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Artisan Bedroom Edit",
    titleStart: "Rest,",
    titleItalic: "Reimagined",
    description:
      "Organic textures, warm walnut woods, and calm tones for a bedroom that feels like a tranquil sanctuary.",
    primaryCta: "Shop Bedroom",
    primaryHref: "/store?room=bedroom",
    secondaryCta: "View All Products",
    secondaryHref: "/store",
    image:
      "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Dining & Living Space",
    titleStart: "Gather Around",
    titleItalic: "Solid Wood",
    description:
      "Handcrafted dining tables and plush seating built for long dinners and unforgettable conversations.",
    primaryCta: "Explore Living",
    primaryHref: "/store?category=sofas",
    secondaryCta: "Get in Touch",
    secondaryHref: "/contact",
    image:
      "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function HeroCarousel({ slides = defaultSlides }) {
  const [active, setActive] = useState(0);

  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;

  const goTo = useCallback(
    (index) => {
      setActive((index + activeSlides.length) % activeSlides.length);
    },
    [activeSlides.length]
  );

  useEffect(() => {
    const timer = setInterval(() => goTo(active + 1), 6500);
    return () => clearInterval(timer);
  }, [active, goTo]);

  const slide = activeSlides[active] || activeSlides[0];

  return (
    <section className="relative mx-auto mt-4 sm:mt-6 max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="relative h-[480px] sm:h-[460px] md:h-[500px] w-full overflow-hidden rounded-3xl bg-stone-900 shadow-xl">
        {/* Background image */}
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.titleStart}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full max-w-xl flex-col justify-center gap-4 px-6 sm:px-12 md:px-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400">
            {slide.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white">
            {slide.titleStart}{" "}
            <span className="font-serif italic font-normal text-amber-300">
              {slide.titleItalic}
            </span>
          </h1>
          <p className="max-w-md text-xs sm:text-sm md:text-base leading-relaxed text-stone-200">
            {slide.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              href={slide.primaryHref || "/store"}
              className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-6 py-3 text-xs sm:text-sm font-medium text-white transition hover:bg-amber-800 shadow-md"
            >
              <span>{slide.primaryCta || "Shop Collection"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={slide.secondaryHref || "/about"}
              className="text-xs sm:text-sm font-medium text-white underline underline-offset-4 transition hover:text-amber-300"
            >
              {slide.secondaryCta || "Learn More"}
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => goTo(active - 1)}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/60 text-white backdrop-blur-md transition hover:bg-amber-700 z-20 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => goTo(active + 1)}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/60 text-white backdrop-blur-md transition hover:bg-amber-700 z-20 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-6 sm:left-12 z-20 flex items-center gap-2">
          {activeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === active ? "w-7 bg-amber-500" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
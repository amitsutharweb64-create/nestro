import { Leaf, Hammer, HeartHandshake, ShieldCheck, Sparkles, Compass } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Eco-Conscious Materials",
    description:
      "We exclusively use sustainably harvested timber, natural organic oils, and non-toxic finishes to ensure your home and the planet thrive together.",
  },
  {
    icon: Hammer,
    title: "Master Craftsmanship",
    description:
      "Handcrafted by generational artisans in Jodhpur. Every joint, curve, and seam is carefully inspected for longevity and structural perfection.",
  },
  {
    icon: HeartHandshake,
    title: "Honest & Direct Pricing",
    description:
      "By eliminating intermediaries and showroom markups, we deliver heirloom-quality furniture at transparent, factory-direct prices.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last Generations",
    description:
      "We design against the culture of disposable furniture. Each piece is engineered with solid hardwoods to withstand decades of daily life.",
  },
  {
    icon: Sparkles,
    title: "Bespoke Customization",
    description:
      "Need specific dimensions or unique upholstery? Our design studio collaborates with you to customize pieces tailored to your room.",
  },
  {
    icon: Compass,
    title: "Mindful Design Philosophy",
    description:
      "Harmonizing minimalist Scandinavian simplicity with warm, earthy textures that bring tranquility and warmth into your home.",
  },
];

export default function OurValues() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            What Drives Us
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Our Core Principles &{" "}
            <span className="font-serif italic text-amber-700">Values</span>
          </h2>
          <p className="mt-3 text-sm text-stone-600 sm:text-base leading-relaxed">
            Every table, chair, and sofa we build reflects our dedication to uncompromising quality, honest ethics, and timeless beauty.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-stone-200 bg-stone-50/50 p-6 sm:p-8 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 text-amber-800 transition group-hover:bg-amber-700 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-stone-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-stone-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Story Banner */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-stone-900 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="p-8 sm:p-12 lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                The Workshop Story
              </span>
              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl text-white">
                From a single workbench to thousands of happy homes
              </h3>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone-300">
                Nestro began with a simple belief: high-end solid wood furniture should not come with unreasonable markups or compromised ethics. We partner directly with artisan guilds, ensuring fair wages, safe working environments, and the preservation of age-old craft techniques.
              </p>
            </div>
            <div className="lg:col-span-5 h-64 lg:h-full">
              <img
                src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80"
                alt="Woodworking workshop"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

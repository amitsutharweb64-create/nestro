import { Truck, RotateCcw, Wrench, ShieldCheck } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On all orders above ₹50,000",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Hassle-free return policy",
  },
  {
    icon: Wrench,
    title: "Expert Assembly",
    description: "Professional setup at home",
  },
  {
    icon: ShieldCheck,
    title: "5-Year Warranty",
    description: "On all furniture items",
  },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4 lg:px-10">
        {badges.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">{title}</p>
              <p className="text-xs text-stone-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
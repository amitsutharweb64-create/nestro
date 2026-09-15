import Link from "next/link";
import { ArrowRight } from "lucide-react";

const teamMembers = [
  {
    name: "Aarav Sharma",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Passionate about combining Scandinavian ergonomics with Indian woodworking heritage.",
  },
  {
    name: "Pooja Mehta",
    role: "Head of Interior Design",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Spearheading spatial harmony, textile selections, and custom residential projects.",
  },
  {
    name: "Rameshwar Suthar",
    role: "Master Craftsman & Joinery Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Over 25 years of master carpentry and artisanal hand-finish techniques in Jodhpur.",
  },
  {
    name: "Ananya Roy",
    role: "Sustainable Materials Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Ensuring 100% FSC-certified timber supply chains and zero-emission natural finishes.",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-stone-50 py-16 sm:py-24 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            People Behind Nestro
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Meet the Visionaries &{" "}
            <span className="font-serif italic text-amber-700">Artisans</span>
          </h2>
          <p className="mt-3 text-sm text-stone-600 sm:text-base leading-relaxed">
            Our diverse team brings together visionary architects, interior designers, and veteran carpenters dedicated to creating furniture you'll cherish forever.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-xs transition duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="aspect-4/5 overflow-hidden bg-stone-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-stone-900">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-amber-700 mt-0.5">
                  {member.role}
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-stone-500">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 rounded-2xl bg-amber-50 border border-amber-200/70 p-8 sm:p-10 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-stone-900">
            Ready to transform your home with Nestro?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Browse our curated collections or talk with our interior specialists to create custom pieces.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-6 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-amber-800"
            >
              Shop All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-stone-300 bg-white px-6 py-2.5 text-sm font-medium text-stone-700 shadow-xs transition hover:bg-stone-50"
            >
              Contact Our Designers
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

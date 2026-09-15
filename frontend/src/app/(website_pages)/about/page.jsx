import AboutHero from "@/components/website/about/AboutHero";
import OurValues from "@/components/website/about/OurValues";
import TeamSection from "@/components/website/about/TeamSection";

export const metadata = {
  title: "About Us — Nestro",
  description:
    "Learn about Nestro, our passion for handcrafted solid wood furniture, sustainable materials, and modern living aesthetics.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* About Hero Section */}
      <AboutHero />

      {/* Core Values & Craftsmanship Story */}
      <OurValues />

      {/* Team & Visionaries Section */}
      <TeamSection />
    </main>
  );
}

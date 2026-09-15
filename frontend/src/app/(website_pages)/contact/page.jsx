import ContactHero from "@/components/website/contact/ContactHero";
import ContactForm from "@/components/website/contact/ContactForm";
import ContactInfo from "@/components/website/contact/Contactinfo";
import ContactMap from "@/components/website/contact/ContactMap";

export const metadata = {
  title: "Contact Us — Nestro",
  description: "Get in touch with Nestro for furniture orders, custom designs, and inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Contact Hero */}
      <ContactHero />

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Information + Map */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <ContactInfo />
            <ContactMap />
          </div>

        </div>
      </section>
    </main>
  );
}

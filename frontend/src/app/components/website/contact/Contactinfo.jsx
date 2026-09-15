import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit our showroom",
    lines: ["12 Malviya Nagar Road", "Jaipur, Rajasthan 302017"],
  },
  {
    icon: Phone,
    title: "Call us",
    lines: ["+91 98765 43210", "Mon–Sat, 10am–7pm"],
  },
  {
    icon: Mail,
    title: "Email us",
    lines: ["hello@nestro.com", "support@nestro.com"],
  },
  {
    icon: Clock,
    title: "Showroom hours",
    lines: ["Mon–Sat: 10am – 7pm", "Sunday: 11am – 5pm"],
  },
];

export default function ContactInfo() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-stone-900">
        Contact details
      </h2>
      <div className="mt-6 space-y-6">
        {contactDetails.map(({ icon: Icon, title, lines }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">{title}</p>
              {lines.map((line) => (
                <p key={line} className="text-sm text-stone-600">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

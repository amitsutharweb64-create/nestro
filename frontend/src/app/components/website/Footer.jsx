import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Showrooms", href: "/showrooms" },
    { label: "Careers", href: "/careers" },
  ],
  Support: [
    { label: "Track Order", href: "/track-order" },
    { label: "Returns & Exchange", href: "/returns" },
    { label: "Assembly Help", href: "/assembly-help" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Houzz", href: "https://houzz.com" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-stone-900 text-stone-300">
      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="text-xl font-bold uppercase tracking-wide text-white"
          >
            Nestro<span className="text-amber-500">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
            Curated furniture for thoughtful homes. Crafted with intention,
            made to endure.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Company
          </h4>
          <ul className="mt-4 space-y-3">
            {footerLinks.Company.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-stone-400 transition-colors hover:text-amber-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Support
          </h4>
          <ul className="mt-4 space-y-3">
            {footerLinks.Support.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-stone-400 transition-colors hover:text-amber-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Follow Us
          </h4>
          <ul className="mt-4 space-y-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-400 transition-colors hover:text-amber-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-700/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-stone-500 sm:flex-row lg:px-10">
          <p>© 2026 Nestro. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-amber-500">
              Privacy
            </Link>
            <span className="text-stone-700">·</span>
            <Link href="/terms" className="transition-colors hover:text-amber-500">
              Terms
            </Link>
            <span className="text-stone-700">·</span>
            <Link href="/sitemap" className="transition-colors hover:text-amber-500">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
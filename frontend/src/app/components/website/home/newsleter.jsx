"use client";

import { useState } from "react";
import { Mail, Check, Send } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-6 pt-10 lg:px-10">
      <div
        className="flex flex-col items-start justify-between gap-6 rounded-3xl p-6 sm:p-10 lg:flex-row lg:items-center shadow-lg"
        style={{ backgroundColor: "#1c1410" }}
      >
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-500">
            <Mail className="h-3.5 w-3.5" />
            <span>Stay in the loop</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold text-white sm:text-3xl">
            Design tips & exclusive arrivals
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-400 max-w-lg">
            Join 8,000+ homeowners & designers who receive first access to limited edition artisan furniture.
          </p>
        </div>

        <div className="w-full max-w-md shrink-0">
          {isSubscribed ? (
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 p-4 text-emerald-300">
              <Check className="h-5 w-5 text-emerald-400" />
              <p className="text-xs sm:text-sm font-medium">Thank you for subscribing! Check your inbox soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-full border border-stone-700 bg-[#2a221c] px-5 py-3 text-xs sm:text-sm text-white placeholder-stone-500 outline-none focus:border-amber-600 transition"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 shrink-0 rounded-full bg-amber-700 px-6 py-3 text-xs sm:text-sm font-medium text-white transition hover:bg-amber-600 shadow-md cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
          <p className="mt-2 text-left sm:text-right text-[11px] text-stone-500">
            No spam, ever. Unsubscribe anytime with 1-click.
          </p>
        </div>
      </div>
    </section>
  );
}
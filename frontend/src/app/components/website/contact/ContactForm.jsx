"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { client } from "@/utils/helper";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.subject) {
      setErrorMsg("Please select a subject for your message.");
      return;
    }

    try {
      setLoading(true);

      const response = await client.post("/contact/create", formData);

      if (response.data.success) {
        setSuccessMsg(response.data.message || "Message sent successfully! We will get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Contact Form Submission Error:", error);
      setErrorMsg(
        error.response?.data?.message ||
          "Failed to send message. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-900">
        Send us a message
      </h2>

      {successMsg && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              Full name <span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              Email address <span className="text-rose-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              Subject <span className="text-rose-500">*</span>
            </label>
            <select
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600 cursor-pointer"
            >
              <option value="" disabled>
                Choose a topic
              </option>
              <option value="order">Order enquiry</option>
              <option value="custom">Custom furniture</option>
              <option value="returns">Returns &amp; exchange</option>
              <option value="other">Something else</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-stone-700"
          >
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us a bit about what you need..."
            required
            className="w-full resize-none rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-amber-700 px-8 py-3 text-sm font-medium text-white shadow-xs transition-all hover:bg-amber-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{loading ? "Sending Message..." : "Send Message"}</span>
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

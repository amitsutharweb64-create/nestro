"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Pencil, User, Check, X, Loader2 } from "lucide-react";
import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function ProfileContact({ user }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
  });

  const [currentData, setCurrentData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
  });

  const handleEditClick = () => {
    setFormData({
      name: currentData.name,
      mobile: currentData.mobile,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: currentData.name,
      mobile: currentData.mobile,
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedMobile = formData.mobile.trim();

    if (!trimmedName) {
      toast.error("Name is required");
      return;
    }

    if (trimmedMobile && !/^[0-9+\-\s()]{7,15}$/.test(trimmedMobile)) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    try {
      setLoading(true);
      const response = await client.put("/user/update-profile", {
        name: trimmedName,
        mobile: trimmedMobile,
      });

      if (response.data?.success) {
        toast.success(response.data.message || "Profile updated successfully");
        setCurrentData({
          name: trimmedName,
          mobile: trimmedMobile,
        });
        setIsEditing(false);
        router.refresh();
      } else {
        toast.error(response.data?.message || "Failed to update profile");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-7 rounded-3xl border border-stone-200/80 bg-white p-7 shadow-sm shadow-stone-200/60 transition-all sm:p-8">
      {!isEditing ? (
        /* ===== VIEW MODE ===== */
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg tracking-tight text-stone-900">
                Contact details
              </h2>
              <p className="mt-0.5 text-xs text-stone-500">
                Manage your personal contact information
              </p>
            </div>

            <button
              type="button"
              onClick={handleEditClick}
              className="group inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/60 px-3.5 py-1.5 text-sm font-medium text-amber-800 transition-all hover:border-amber-300 hover:bg-amber-100/70 active:scale-95"
            >
              <Pencil className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
              Edit
            </button>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group flex items-start gap-3.5 rounded-2xl border border-stone-200 p-4 transition-colors hover:border-amber-200 hover:bg-amber-50/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-100">
                <Mail className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-stone-500">Email Address</dt>
                <dd className="mt-0.5 truncate font-medium text-stone-900">
                  {user?.email}
                </dd>
              </div>
            </div>

            <div className="group flex items-start gap-3.5 rounded-2xl border border-stone-200 p-4 transition-colors hover:border-amber-200 hover:bg-amber-50/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-100">
                <Phone className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-stone-500">Mobile Number</dt>
                <dd className="mt-0.5 font-medium text-stone-900">
                  {currentData.mobile || (
                    <span className="text-stone-400 italic">Not added</span>
                  )}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      ) : (
        /* ===== EDIT MODE (INLINE FORM) ===== */
        <div>
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="font-serif text-lg tracking-tight text-stone-900">
                Edit Profile Details
              </h2>
              <p className="mt-0.5 text-xs text-stone-500">
                Update your name and contact phone number
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              title="Cancel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              {/* Mobile Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Mobile Number
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    placeholder="e.g. +91 9876543210"
                    className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Email Field (Read Only) */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Email Address
                </label>
                <span className="text-[11px] text-stone-400">
                  (Cannot be modified)
                </span>
              </div>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-3.5 text-sm text-stone-500"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-900 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

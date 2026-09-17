"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Loader2,
  Home,
  Star,
  X,
  Check,
  User,
  Phone,
  Hash,
} from "lucide-react";
import { client } from "@/utils/helper";
import { toast } from "sonner";

const EMPTY_FORM = {
  fullName: "",
  mobile: "",
  pincode: "",
  addressLine: "",
  city: "",
  state: "",
  country: "India",
  isDefault: false,
};

export default function ProfileAddresses({ user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [addLoading, setAddLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    const { fullName, mobile, pincode, addressLine, city, state } = formData;

    if (!fullName.trim() || !mobile.trim() || !pincode.trim() || !addressLine.trim() || !city.trim() || !state.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setAddLoading(true);
      const res = await client.post("/user/add-address", formData);

      if (res.data?.success) {
        toast.success("Address added successfully");
        setAddresses(res.data.addresses || []);
        setFormData(EMPTY_FORM);
        setShowForm(false);
        router.refresh();
      } else {
        toast.error(res.data?.message || "Failed to add address");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      setDeletingId(addressId);
      const res = await client.delete(`/user/delete-address/${addressId}`);

      if (res.data?.success) {
        toast.success("Address removed");
        setAddresses(res.data.addresses || []);
        router.refresh();
      } else {
        toast.error(res.data?.message || "Failed to delete address");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mt-7 rounded-3xl border border-stone-200/80 bg-white shadow-sm shadow-stone-200/60 transition-all">

      {/* ===== Header (always visible) ===== */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between px-7 py-6 sm:px-8"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <MapPin className="h-5 w-5" />
          </span>
          <div className="text-left">
            <p className="font-serif text-lg tracking-tight text-stone-900">
              Addresses
            </p>
            <p className="mt-0.5 text-xs text-stone-500">
              {addresses.length > 0
                ? `${addresses.length} saved address${addresses.length > 1 ? "es" : ""}`
                : "No saved addresses yet"}
            </p>
          </div>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {/* ===== Expanded content ===== */}
      {isOpen && (
        <div className="border-t border-stone-100 px-7 pb-7 pt-5 sm:px-8">

          {/* Address cards */}
          {addresses.length > 0 && (
            <ul className="space-y-3 mb-5">
              {addresses.map((addr) => (
                <li
                  key={addr._id}
                  className={`relative rounded-2xl border p-4 transition ${
                    addr.isDefault
                      ? "border-amber-300 bg-amber-50/40"
                      : "border-stone-200 hover:border-amber-200 hover:bg-amber-50/20"
                  }`}
                >
                  {/* Default badge */}
                  {addr.isDefault && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                      Default
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <Home className="h-4 w-4" />
                    </span>

                    <div className="min-w-0 flex-1 pr-10">
                      <p className="font-medium text-stone-900">{addr.fullName}</p>
                      <p className="mt-0.5 text-sm text-stone-600">
                        {addr.addressLine}, {addr.city}, {addr.state} – {addr.pincode}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500">{addr.mobile}</p>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDelete(addr._id)}
                      disabled={deletingId === addr._id}
                      className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full text-stone-300 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                      title="Remove address"
                    >
                      {deletingId === addr._id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Empty state when no addresses & form not shown */}
          {addresses.length === 0 && !showForm && (
            <div className="flex flex-col items-center gap-3 py-8 text-stone-400">
              <MapPin className="h-10 w-10 text-stone-200" />
              <p className="text-sm">No saved addresses yet.</p>
            </div>
          )}

          {/* Add address button */}
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 px-4 py-2.5 text-sm font-medium text-amber-700 transition hover:border-amber-400 hover:bg-amber-100/60 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Add new address
            </button>
          )}

          {/* ===== Add address form ===== */}
          {showForm && (
            <div className="mt-2 rounded-2xl border border-stone-200 bg-stone-50/60 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-base tracking-tight text-stone-900">
                  New address
                </h3>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setFormData(EMPTY_FORM); }}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-200 hover:text-stone-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                        <User className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                        <Phone className="h-4 w-4" />
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>

                  {/* Address Line */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        name="addressLine"
                        required
                        value={formData.addressLine}
                        onChange={handleChange}
                        placeholder="House no., Street, Area"
                        className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full rounded-xl border border-stone-300 bg-white py-2.5 px-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="w-full rounded-xl border border-stone-300 bg-white py-2.5 px-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                        <Hash className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="e.g. 400001"
                        className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>

                  {/* Country (readonly) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      disabled
                      value="India"
                      className="w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-100 py-2.5 px-3.5 text-sm text-stone-500"
                    />
                  </div>
                </div>

                {/* Set as default */}
                <label className="inline-flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="h-4 w-4 accent-amber-600 rounded"
                  />
                  <span className="text-sm text-stone-600">Set as default address</span>
                </label>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setFormData(EMPTY_FORM); }}
                    disabled={addLoading}
                    className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-900 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800 active:scale-95 disabled:opacity-50"
                  >
                    {addLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Save address
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      )}
    </section>
  );
}

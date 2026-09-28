"use client";

import { useEffect, useState } from "react";
import { Check, Hash, Loader2, MapPin, Phone, User } from "lucide-react";
import { client } from "@/utils/helper";

function AddressCard({ address, selectedAddress,
  onAddressChange }) {
  return (
    <label className="relative block border border-stone-300 rounded-md p-4 cursor-pointer has-[:checked]:border-amber-700 has-[:checked]:bg-amber-50/40 transition-colors">
      <input
        type="radio"
        name="shippingAddress"
        value={address._id}
        checked={selectedAddress?._id === address._id}
        onChange={() => onAddressChange(address)}
        className="absolute top-4 right-4 text-amber-700 focus:ring-amber-700"
      />

      <div className="flex items-center gap-2 mb-1 pr-6">
        <span className="text-stone-900 font-medium">
          {address.fullName}
        </span>

        {address.isDefault && (
          <span className="bg-stone-900 text-stone-50 text-xs px-2 py-0.5 rounded-sm">
            Default
          </span>
        )}
      </div>

      <p className="text-sm text-stone-600 leading-relaxed">
        {address.addressLine}
        <br />
        {address.city}, {address.state} - {address.pincode}
        <br />
        {address.country}
        <br />
        {address.mobile}
      </p>
    </label>
  );
}

export default function ShippingForm({ selectedAddress, onAddressChange }) {
  const [user, setUser] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await client.get("/user/get-me");

        console.log("User:", response.data.user);

        setUser(response.data.user);
        const defaultAddress = response.data.user?.addresses?.find(
          (address) => address.isDefault
        ) || response.data.user?.addresses?.[0];

        if (defaultAddress) {
          onAddressChange(defaultAddress);
        }
      } catch (error) {
        console.log("User not logged in:", error);
        setUser(null);
      }
    };

    getUser();
  }, [onAddressChange]);

  const addresses = user?.addresses || [];

  const updateAddressField = (event) => {
    const { name, value, type, checked } = event.target;
    setAddressForm((currentAddress) => ({
      ...currentAddress,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addAddress = async (event) => {
    event.preventDefault();
    setIsSavingAddress(true);
    setAddressError("");

    try {
      const response = await client.post("/user/add-address", addressForm);
      const updatedAddresses = response.data.addresses || [];
      const newAddress = updatedAddresses[updatedAddresses.length - 1];

      setUser((currentUser) => ({
        ...currentUser,
        addresses: updatedAddresses,
      }));

      if (newAddress) {
        onAddressChange(newAddress);
      }

      setAddressForm({
        fullName: "",
        mobile: "",
        pincode: "",
        addressLine: "",
        city: "",
        state: "",
        country: "India",
        isDefault: false,
      });
      setShowAddressForm(false);
    } catch (error) {
      setAddressError(
        error.response?.data?.message || "Address could not be saved. Please try again."
      );
    } finally {
      setIsSavingAddress(false);
    }
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl text-stone-900">
          Select address
        </h2>

        <button
          type="button"
          onClick={() => {
            setAddressError("");
            setShowAddressForm((isOpen) => !isOpen);
          }}
          className="text-sm text-amber-700 underline underline-offset-2 hover:text-amber-800"
        >
          {showAddressForm ? "Cancel" : "+ Add new address"}
        </button>
      </div>

      {showAddressForm && (
        <form
          onSubmit={addAddress}
          className="mb-5 rounded-2xl border border-stone-200 bg-stone-50/60 p-5"
        >
          <h3 className="mb-4 font-serif text-base tracking-tight text-stone-900">
            New address
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  name="fullName"
                  value={addressForm.fullName}
                  onChange={updateAddressField}
                  placeholder="Full name"
                  required
                  className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Mobile <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={addressForm.mobile}
                  onChange={updateAddressField}
                  placeholder="+91 9876543210"
                  required
                  className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  name="addressLine"
                  value={addressForm.addressLine}
                  onChange={updateAddressField}
                  placeholder="House no., Street, Area"
                  required
                  className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={addressForm.city}
                onChange={updateAddressField}
                placeholder="City"
                required
                className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={addressForm.state}
                onChange={updateAddressField}
                placeholder="State"
                required
                className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Pincode <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  name="pincode"
                  value={addressForm.pincode}
                  onChange={updateAddressField}
                  placeholder="e.g. 400001"
                  required
                  className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={addressForm.country}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-100 px-3.5 py-2.5 text-sm text-stone-500"
              />
            </div>
          </div>

          <label className="mt-4 inline-flex cursor-pointer items-center gap-2.5">
            <input name="isDefault" type="checkbox" checked={addressForm.isDefault} onChange={updateAddressField} />
            <span className="text-sm text-stone-600">Set as default address</span>
          </label>

          {addressError && <p className="mt-3 text-sm text-red-600">{addressError}</p>}

          <div className="mt-4 flex justify-end">
            <button type="submit" disabled={isSavingAddress} className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50">
              {isSavingAddress ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
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
      )}

      {addresses.length === 0 ? (
        <div className="border border-stone-300 rounded-md p-4">
          <p className="text-sm text-stone-500">
            No address found. Please add a new address.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              selectedAddress={selectedAddress}
              onAddressChange={onAddressChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}

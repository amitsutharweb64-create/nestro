"use client";

import { useEffect, useState } from "react";
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
          className="mb-5 rounded-md border border-stone-300 p-4"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input name="fullName" value={addressForm.fullName} onChange={updateAddressField} placeholder="Full name" required className="rounded border border-stone-300 px-3 py-2 text-sm" />
            <input name="mobile" value={addressForm.mobile} onChange={updateAddressField} placeholder="Mobile number" required className="rounded border border-stone-300 px-3 py-2 text-sm" />
            <input name="pincode" value={addressForm.pincode} onChange={updateAddressField} placeholder="Pincode" required className="rounded border border-stone-300 px-3 py-2 text-sm" />
            <input name="city" value={addressForm.city} onChange={updateAddressField} placeholder="City" required className="rounded border border-stone-300 px-3 py-2 text-sm" />
            <input name="state" value={addressForm.state} onChange={updateAddressField} placeholder="State" required className="rounded border border-stone-300 px-3 py-2 text-sm" />
            <input name="country" value={addressForm.country} onChange={updateAddressField} placeholder="Country" className="rounded border border-stone-300 px-3 py-2 text-sm" />
            <textarea name="addressLine" value={addressForm.addressLine} onChange={updateAddressField} placeholder="House / street address" required className="min-h-20 rounded border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
          </div>

          <label className="mt-3 flex items-center gap-2 text-sm text-stone-700">
            <input name="isDefault" type="checkbox" checked={addressForm.isDefault} onChange={updateAddressField} />
            Make this my default address
          </label>

          {addressError && <p className="mt-3 text-sm text-red-600">{addressError}</p>}

          <button type="submit" disabled={isSavingAddress} className="mt-4 rounded-sm bg-stone-900 px-4 py-2 text-sm text-stone-50 disabled:cursor-not-allowed disabled:opacity-60">
            {isSavingAddress ? "Saving..." : "Save address"}
          </button>
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

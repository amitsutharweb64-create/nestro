
"use client";

const methods = [
  {
    id: "upi",
    label: "UPI",
    hint: "Pay via Google Pay, PhonePe, Paytm",
  },
  {
    id: "card",
    label: "Credit / Debit card",
    hint: "Visa, Mastercard, RuPay",
  },
  {
    id: "cod",
    label: "Cash on delivery",
    hint: "Pay when your order arrives",
  },
];

export default function PaymentMethod({
  paymentMode,
  setPaymentMode,
}) {
  return (
    <section>
      <h2 className="font-serif text-xl text-stone-900 mb-1">
        Payment
      </h2>

      <p className="text-sm text-stone-500 mb-5">
        Choose how you'd like to pay.
      </p>

      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className="flex items-start gap-3 border border-stone-300 rounded-sm p-4 cursor-pointer has-[:checked]:border-amber-700 has-[:checked]:bg-amber-50/40 transition-colors"
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={paymentMode === method.id}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="mt-1 text-amber-700 focus:ring-amber-700"
            />

            <span>
              <span className="block text-sm text-stone-900">
                {method.label}
              </span>

              <span className="block text-sm text-stone-500">
                {method.hint}
              </span>
            </span>
          </label>
        ))}
      </div>

      {/* Card */}
      {paymentMode === "card" && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="sm:col-span-2">
            <label
              htmlFor="cardNumber"
              className="block text-sm text-stone-700 mb-1.5"
            >
              Card number
            </label>

            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div>
            <label
              htmlFor="expiry"
              className="block text-sm text-stone-700 mb-1.5"
            >
              Expiry
            </label>

            <input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div>
            <label
              htmlFor="cvv"
              className="block text-sm text-stone-700 mb-1.5"
            >
              CVV
            </label>

            <input
              id="cvv"
              type="password"
              placeholder="123"
              maxLength={3}
              className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

        </div>
      )}

      {/* UPI */}
      {paymentMode === "upi" && (
        <div className="mt-5 rounded-sm border border-stone-200 bg-stone-50 p-4">
          <p className="text-sm text-stone-700">
            You will be redirected to the UPI payment page after placing the
            order.
          </p>
        </div>
      )}

      {/* COD */}
      {paymentMode === "cod" && (
        <div className="mt-5 rounded-sm border border-stone-200 bg-stone-50 p-4">
          <p className="text-sm text-stone-700">
            You can pay in cash when your order is delivered.
          </p>
        </div>
      )}
    </section>
  );
}


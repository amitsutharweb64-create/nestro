"use client";

import { useSelector } from "react-redux";

function formatINR(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function OrderSummary() {
  const cart = useSelector((state) => state.cart);
  const items = cart.items || [];
  const subtotal = Number(cart.final_total || 0);

  return (
    <aside className="bg-stone-50 border border-stone-200 rounded-md p-6 lg:sticky lg:top-8">
      <h2 className="font-serif text-xl text-stone-900 mb-5">Your order</h2>
      <ul className="space-y-4 mb-6">
        {items.map((item) => (
            <li key={item._id} className="flex gap-3">
            <div className="relative w-16 h-16 shrink-0 rounded-sm overflow-hidden bg-stone-200">
              <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
              <span className="absolute -top-2 -right-2 bg-stone-900 text-stone-50 text-xs w-5 h-5 rounded-full flex items-center justify-center">{item.qty}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-stone-900 truncate">{item.name}</p>
              <p className="text-sm text-stone-500">Quantity: {item.qty}</p>
            </div>
            <p className="text-sm text-stone-900 whitespace-nowrap">
              {formatINR(Number(item.salePrice ?? item.price ?? 0) * item.qty)}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mb-6">
        <input type="text" placeholder="Promo code" className="flex-1 rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700" />
        <button type="button" className="px-4 py-2 text-sm rounded-sm border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors">Apply</button>
      </div>
      <dl className="space-y-2 text-sm border-t border-stone-200 pt-4">
        <div className="flex justify-between text-stone-600"><dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
        <div className="flex justify-between text-stone-600"><dt>Delivery</dt><dd>Free</dd></div>
        <div className="flex justify-between text-stone-900 text-base pt-2 border-t border-stone-200"><dt>Total</dt><dd>{formatINR(subtotal)}</dd></div>
      </dl>
    </aside>
  );
}

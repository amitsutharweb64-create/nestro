"use client";

import { useState } from "react";
import {
  Package,
  ChevronDown,
  ChevronUp,
  Loader2,
  ShoppingBag,
  MapPin,
  CreditCard,
  Clock,
} from "lucide-react";
import { client } from "@/utils/helper";

const STATUS_STYLES = {
  placed:      { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500",   label: "Placed" },
  confirmed:   { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500", label: "Confirmed" },
  processing:  { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500", label: "Processing" },
  shipped:     { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500", label: "Shipped" },
  delivered:   { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500",  label: "Delivered" },
  cancelled:   { bg: "bg-red-50",    text: "text-red-700",    dot: "bg-red-500",    label: "Cancelled" },
};

const PAYMENT_STATUS_STYLES = {
  pending:   { bg: "bg-yellow-50", text: "text-yellow-700", label: "Pending" },
  paid:      { bg: "bg-green-50",  text: "text-green-700",  label: "Paid" },
  failed:    { bg: "bg-red-50",    text: "text-red-700",    label: "Failed" },
  refunded:  { bg: "bg-stone-100", text: "text-stone-600",  label: "Refunded" },
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ProfileOrders() {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    if (!isOpen && !fetched) {
      // First open — fetch orders
      setLoading(true);
      setError("");
      try {
        const res = await client.get("/order/my-orders");
        if (res.data?.success) {
          setOrders(res.data.data || []);
          setFetched(true);
        } else {
          setError("Could not load orders. Please try again.");
        }
      } catch {
        setError("Could not load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    setIsOpen((prev) => !prev);
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
            <Package className="h-5 w-5" />
          </span>
          <div className="text-left">
            <p className="font-serif text-lg tracking-tight text-stone-900">
              My orders
            </p>
            <p className="mt-0.5 text-xs text-stone-500">
              Track and review your past purchases
            </p>
          </div>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>

      {/* ===== Expanded content ===== */}
      {isOpen && (
        <div className="border-t border-stone-100 px-7 pb-7 pt-5 sm:px-8">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-2 py-10 text-stone-500">
              <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
              <span className="text-sm">Loading your orders…</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="py-8 text-center text-sm text-red-500">{error}</p>
          )}

          {/* Empty state */}
          {!loading && !error && orders.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-12 text-stone-400">
              <ShoppingBag className="h-12 w-12 text-stone-200" />
              <p className="text-sm">No orders placed yet.</p>
            </div>
          )}

          {/* Orders list */}
          {!loading && !error && orders.length > 0 && (
            <ul className="space-y-4">
              {orders.map((order) => {
                const orderStyle  = STATUS_STYLES[order.orderStatus]  || STATUS_STYLES.placed;
                const payStyle    = PAYMENT_STATUS_STYLES[order.paymentStatus] || PAYMENT_STATUS_STYLES.pending;

                return (
                  <li
                    key={order._id}
                    className="rounded-2xl border border-stone-200 p-5 transition hover:border-amber-200 hover:bg-amber-50/20"
                  >
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">
                          Order ID
                        </p>
                        <p className="mt-0.5 font-mono text-xs text-stone-700 break-all">
                          {order._id}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {/* Order status badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${orderStyle.bg} ${orderStyle.text}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${orderStyle.dot}`} />
                          {orderStyle.label}
                        </span>

                        {/* Payment status badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${payStyle.bg} ${payStyle.text}`}
                        >
                          <CreditCard className="h-3 w-3" />
                          {payStyle.label}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    {order.items && order.items.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            {item.product_id?.thumbnail ? (
                              <img
                                src={item.product_id.thumbnail}
                                alt={item.product_id?.title || "Product"}
                                className="h-10 w-10 rounded-lg object-cover border border-stone-200"
                              />
                            ) : (
                              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
                                <Package className="h-4 w-4 text-stone-400" />
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-stone-800">
                                {item.product_id?.title || "Product"}
                              </p>
                              <p className="text-xs text-stone-500">
                                Qty: {item.qty} &nbsp;·&nbsp; ₹{item.total?.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Footer info */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(order.createdAt)}
                      </span>

                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {order.shippingAddress?.city}, {order.shippingAddress?.state}
                      </span>

                      <span className="font-semibold text-stone-900">
                        Total: ₹{order.totalAmount?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

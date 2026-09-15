"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  Eye,
  ShoppingCart,
  Star,
  Clock,
  ChevronRight,
  Download,
  Filter,
  MoreVertical,
  CreditCard,
  Truck,
  ArrowUp,
  ArrowDown,
  DollarSign,
  ArrowUpRight,
  Plus,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [period, setPeriod] = useState("today");

  // Stats Data
  const stats = [
    {
      title: "Total Revenue",
      value: "₹4,82,950",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      trend: "up",
    },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      trend: "up",
    },
    {
      title: "Total Customers",
      value: "5,643",
      change: "+23.1%",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      trend: "up",
    },
    {
      title: "Live Products",
      value: "847",
      change: "+4.1%",
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      trend: "up",
    },
  ];

  // Recent Orders
  const recentOrders = [
    {
      id: "#ORD-8942",
      customer: "Sarah Johnson",
      email: "sarah@gmail.com",
      amount: "₹24,500",
      status: "Delivered",
      date: "2 hours ago",
      items: 3,
      payment: "UPI",
    },
    {
      id: "#ORD-8941",
      customer: "Michael Chen",
      email: "m.chen@outlook.com",
      amount: "₹18,950",
      status: "Processing",
      date: "4 hours ago",
      items: 2,
      payment: "Card",
    },
    {
      id: "#ORD-8940",
      customer: "Emily Davis",
      email: "emily.d@gmail.com",
      amount: "₹43,200",
      status: "Shipped",
      date: "6 hours ago",
      items: 5,
      payment: "COD",
    },
    {
      id: "#ORD-8939",
      customer: "James Wilson",
      email: "jwilson@gmail.com",
      amount: "₹16,780",
      status: "Pending",
      date: "8 hours ago",
      items: 1,
      payment: "UPI",
    },
    {
      id: "#ORD-8938",
      customer: "Maria Garcia",
      email: "maria.g@yahoo.com",
      amount: "₹52,300",
      status: "Delivered",
      date: "12 hours ago",
      items: 4,
      payment: "Card",
    },
  ];

  const getOrderStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Pending":
      default:
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-2xs">
            {["today", "week", "month"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition ${
                  period === p
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <Link
            href="/admin/product/add"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition shadow-xs shadow-teal-200 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-11 h-11 ${stat.bg} ${stat.border} border rounded-xl flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {stat.change}
                {stat.trend === "up" ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Recent Orders & Quick Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Recent Orders
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Latest customer purchases across all categories
              </p>
            </div>
            <Link
              href="/admin/order"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/70 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/60 transition cursor-pointer"
                  >
                    <td className="px-5 py-3.5 font-bold text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-gray-800">
                        {order.customer}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {order.email}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getOrderStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-gray-400 font-medium">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Shortcuts & Activity (1 Col) */}
        <div className="space-y-4">
          {/* Shortcuts Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/admin/product/add"
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal-50/50 hover:border-teal-200 transition group text-left"
              >
                <Package className="w-5 h-5 text-gray-600 group-hover:text-teal-600 mb-2 transition" />
                <p className="text-xs font-bold text-gray-800">Add Product</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  New furniture item
                </p>
              </Link>

              <Link
                href="/admin/category/add"
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal-50/50 hover:border-teal-200 transition group text-left"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-teal-600 mb-2 transition" />
                <p className="text-xs font-bold text-gray-800">New Category</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Organize store
                </p>
              </Link>

              <Link
                href="/admin/inquiries"
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal-50/50 hover:border-teal-200 transition group text-left"
              >
                <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-teal-600 mb-2 transition" />
                <p className="text-xs font-bold text-gray-800">Inquiries</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Customer queries
                </p>
              </Link>

              <Link
                href="/admin/order"
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal-50/50 hover:border-teal-200 transition group text-left"
              >
                <Truck className="w-5 h-5 text-gray-600 group-hover:text-teal-600 mb-2 transition" />
                <p className="text-xs font-bold text-gray-800">All Orders</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Shipping & delivery
                </p>
              </Link>
            </div>
          </div>

          {/* Store Info Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0d1b2a] to-[#1b2a47] text-white shadow-xs">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Nestro Store
            </div>
            <h3 className="text-sm font-bold text-white leading-snug">
              Live Catalog & Customer Support
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Your store is operational with live database sync and active inquiries routing.
            </p>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-teal-400 hover:text-teal-300 transition"
            >
              Visit Customer Website
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

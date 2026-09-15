"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Tag,
  ShoppingBag,
  BedDouble,
  Palette,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Gauge,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Category", href: "/admin/category", icon: Tag },
  { label: "Room Type", href: "/admin/room-type", icon: ShoppingBag },
  { label: "Products", href: "/admin/product", icon: BedDouble },
  { label: "Orders", href: "/admin/order", icon: Palette },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 left-0 z-30 bg-[#0d1b2a] h-screen shrink-0 text-white transition-all duration-300 border-r border-white/5 flex flex-col ${
        collapsed ? "w-[88px]" : "w-64"
      }`}
    >
      {/* Header / Brand */}
      <div className="flex items-center justify-between h-16 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0 shadow-lg shadow-teal-900/40 cursor-pointer hover:opacity-90 transition"
            title="Toggle Sidebar"
          >
            <Gauge className="w-5 h-5 text-white" />
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white tracking-wide">
                Nestro Admin
              </p>
              <p className="text-[10px] text-teal-400 font-medium">
                Control Center
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Section Title */}
      {!collapsed && (
        <p className="px-5 pt-5 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Main Menu
        </p>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 pb-4 pt-2 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);

          return (
            <Link
              href={href}
              key={href}
              title={collapsed ? label : undefined}
              className={[
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                collapsed ? "justify-center" : "",
                active
                  ? "bg-teal-500/15 text-teal-400 font-semibold border border-teal-500/30 shadow-xs shadow-teal-950"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-400 rounded-r-full shadow-sm shadow-teal-400"></span>
              )}

              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  active
                    ? "bg-teal-500/20 text-teal-300"
                    : "bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {!collapsed && (
                <span className="text-sm truncate font-medium">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-white/5 bg-[#0b1724]">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                A
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">
                  Admin
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  Super Admin
                </p>
              </div>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition"
            title="View Store"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

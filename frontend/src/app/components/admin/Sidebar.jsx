"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Tag,
  ShoppingBag,
  BedDouble,
  Palette,
  Settings,
  ChevronLeft,
  ChevronRight,
  Gauge,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Category", href: "/admin/category", icon: Tag },
  { label: "Roomtype", href: "/admin/room-type", icon: ShoppingBag },
  { label: "product", href: "/admin/product", icon: BedDouble },
  { label: "Order", href: "/admin/order", icon: Palette },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`sticky top-0 left-0 z-30 bg-[#0d1b2a]
  text-white transition-all duration-300 border-r border-white/5
  ${collapsed ? "w-[88px]" : "w-64"}`}
    >
      <div className="flex items-center justify-between h-16 px-3 py-3 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0 shadow-lg shadow-teal-900/50">
          <Gauge
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        </div>

        {!collapsed && (
          <div className="flex-1 min-w-0 ml-3">
            <p className="text-sm font-bold text-white leading-tight">
              AdminPanel
            </p>
            <p className="text-[10px] text-teal-400 font-medium">
              Pro Dashboard
            </p>
          </div>
        )}

        {!collapsed && (
          <button
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className=" lg:flex shrink-0 w-8 h-8 items-center justify-center rounded-lg hover:bg-white/10 transition ml-1"
          >
            <ChevronLeft className=" w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      <p className="px-4 pt-5 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
        Main Menu
      </p>

      <nav className="flex-1 px-2 space-y-0.5 pb-4 pt-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              href={href}
              key={href}
              className={[
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                collapsed ? "justify-center" : "",
                active
                  ? "bg-gradient-to-r from-teal-500/20 to-teal-600/10 text-teal-400 border border-teal-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-teal-400 rounded-r-full"></span>
              )}

              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all bg-teal-500/20">
                <Icon className="w-5 h-5" />
              </div>
              {!collapsed && (
                <span className="text-sm font-medium truncate"> {label} </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* footer */}

      <div className="absolute bottom-0 left-0 w-full p-3 border-t bordrt-white/5 ">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-[10px] text-slate-500">Super admin</p>
            </div>
          )}

          <button className="p-2 rounded-lg hover:bg-white/10 hover:text-red-400">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

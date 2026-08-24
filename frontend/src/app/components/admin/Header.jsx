'use client';

import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              Welcome Back 👋
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-gray-100">

            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold">
                A
              </span>
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900">
                Admin
              </p>
              <p className="text-xs text-gray-500">
                Super Admin
              </p>
            </div>

            <ChevronDown className="hidden md:block w-4 h-4 text-gray-500" />

          </button>

        </div>
      </div>
    </header>
  );
}
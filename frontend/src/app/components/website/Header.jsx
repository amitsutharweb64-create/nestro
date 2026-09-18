"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  X,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { lsToCart, emptyCart } from "@/redux/features/cartSlice";

import { client } from "@/utils/helper";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/store" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Checkout", href: "/checkout" },
];

export default function Header({ profile = null }) {
  const dispatcher = useDispatch();

  const cart = useSelector((store) => store.cart);

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(profile);

  // Get logged-in user and synchronize cart
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await client.get("/user/get-me");

        if (response.data?.success && response.data?.user) {
          setUser(response.data.user);
          dispatcher(lsToCart());
        } else {
          setUser(null);
          // dispatcher(emptyCart());
        }
      } catch (error) {
        setUser(null);
        // dispatcher(emptyCart());
      }
    };

    getUser();
  }, [pathname, dispatcher]);

  // Close mobile menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-stone-200/70"
      style={{
        backgroundColor: "rgba(250, 250, 249, 0.97)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold uppercase tracking-wide text-stone-900"
        >
          Nestro<span className="text-amber-700">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-amber-50 text-amber-800"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-5 md:flex">

          {/* Search */}
          <button
            aria-label="Search"
            className="text-stone-700 transition-colors hover:text-amber-700"
          >
            <Search
              className="h-5 w-5"
              strokeWidth={1.75}
            />
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-stone-700 transition-colors hover:text-amber-700"
          >
            <ShoppingBag
              className="h-5 w-5"
              strokeWidth={1.75}
            />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 text-[10px] font-medium text-white">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* User / Profile */}
          {user ? (
            <Link
              href="/profile"
              aria-label="Profile"
              className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 transition-colors hover:bg-amber-100"
            >
              <User
                className="h-4 w-4"
                strokeWidth={1.75}
              />

              <span className="max-w-[100px] truncate text-sm font-medium">
                {user.name || "Profile"}
              </span>
            </Link>
          ) : (
            <Link
              href="/sign_in"
              aria-label="Sign In"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-800 transition-colors hover:bg-amber-100"
            >
              <User
                className="h-4 w-4"
                strokeWidth={1.75}
              />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <button
            aria-label="Search"
            className="text-stone-700"
          >
            <Search
              className="h-5 w-5"
              strokeWidth={1.75}
            />
          </button>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-stone-700"
          >
            <ShoppingBag
              className="h-5 w-5"
              strokeWidth={1.75}
            />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 text-[10px] font-medium text-white">
              {cart?.items?.length || 0}
            </span>
          </Link>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="text-stone-800"
          >
            {isOpen ? (
              <X
                className="h-6 w-6"
                strokeWidth={1.5}
              />
            ) : (
              <Menu
                className="h-6 w-6"
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isOpen
            ? "max-h-96 border-t border-stone-200 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 bg-white px-5 py-4">

          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-amber-50 text-amber-800"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Mobile User */}
          {user ? (
            <Link
              href="/profile"
              className="mt-2 flex items-center gap-3 border-t border-stone-200 px-4 pt-4 text-sm font-medium text-amber-800"
            >
              <User
                className="h-5 w-5"
                strokeWidth={1.75}
              />

              <span>
                {user.name || "Profile"}
              </span>
            </Link>
          ) : (
            <Link
              href="/sign_in"
              className="mt-2 flex items-center gap-3 border-t border-stone-200 px-4 pt-4 text-sm font-medium text-stone-700"
            >
              <User
                className="h-5 w-5"
                strokeWidth={1.75}
              />

              <span>Sign In</span>
            </Link>
          )}

        </nav>
      </div>
    </header>
  );
}

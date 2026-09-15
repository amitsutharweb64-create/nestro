
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { client } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [updateItems, setUpdateItems] = useState([]);

  const router = useRouter();

  // Get cart from localStorage safely
  useEffect(() => {
    try {
      const localcart = JSON.parse(localStorage.getItem("cart"));

      const items = localcart?.items || [];

      const formattedItems = items.map((item) => ({
        productId: item._id,
        qty: item.qty,
      }));

      setUpdateItems(formattedItems);

      console.log(formattedItems, "items");
    } catch (error) {
      console.error("Local cart error:", error);
      setUpdateItems([]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Login Data:", payload);

    try {
      setLoading(true);
      setMessage("");

      // Login API
      const response = await client.post("user/login", payload);

      console.log("Login Response:", response.data);

      if (response.data.success) {
        try {
          // Sync cart after login
          const cart_response = await client.post("cart/sync", {
            items: JSON.stringify(updateItems),
          });

          console.log("Cart Sync Response:", cart_response.data);

          if (cart_response.data.success) {
            const items = cart_response.data?.cart?.items || [];

            let original_total = 0;
            let final_total = 0;

            const latest_cart = items.map((item) => {
              const {
                _id,
                title,
                slug,
                price,
                salePrice,
                thumbnail,
              } = item.productId;

              // Calculate totals
              original_total += Number(item.qty * price);
              final_total += Number(item.qty * salePrice);

              // Prepare local cart item
              return {
                _id,
                thumbnail,
                slug,
                salePrice,
                qty: item.qty,
                originalPrice: price,
                name: title,
              };
            });

            // Save updated cart in localStorage
            localStorage.setItem(
              "cart",
              JSON.stringify({
                items: latest_cart,
                original_total,
                final_total,
              })
            );

            console.log("Latest Cart:", {
              items: latest_cart,
              original_total,
              final_total,
            });
          } else {
            console.log("Cart Sync Failed:", cart_response.data);
          }
        } catch (error) {
          console.error("Cart API Error:", error);
        }

        // Login successful → Home page
        router.push("/");
      } else {
        setMessage(
          response.data.message || "Invalid email or password"
        );
      }
    } catch (error) {
      console.error("Login Error:", error);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white text-2xl font-bold">
            N
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to your Nestro account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-100 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot_password"
                  className="text-xs font-medium text-gray-600 hover:text-black hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full h-12 pl-11 pr-12 border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-600">
                {message}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/sign_up"
                className="font-semibold text-black hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 Nestro. All rights reserved.
        </p>
      </div>
    </div>
  );
}


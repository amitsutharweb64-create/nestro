"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { client } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState(""); 
  const  router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Signup Data:", payload);

    try {
      setLoading(true);
      setMessage("");
      
    const response = await client.post("/user/register", payload);


    if(response.data.success){
    router.push(`/verify_otp?email=${response.data.email}`)
    }

      setMessage(
        response.data.message || "Account created successfully!"
      );

      // Form reset
      form.reset();

      // Agar OTP page par redirect karna ho:
      // window.location.href = "/verify_otp";

    } catch (error) {
      if (error.response?.status !== 409) {
        console.error("Signup Error:", error);
      }

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
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your Nestro account
          </p>

        </div>


        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>

              <div className="relative">

                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-100 transition"
                />

              </div>

            </div>


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
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-100 transition"
                />

              </div>

            </div>


            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

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
                  minLength={6}
                  className="w-full h-12 pl-11 pr-12 border border-gray-200 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Password must be at least 6 characters.
              </p>

            </div>


            {/* Message */}
            {message && (
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-600">
                {message}
              </div>
            )}


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>


          {/* Login */}
          <div className="mt-6 text-center">

            <p className="text-sm text-gray-500">
              Already have an account?{" "}

              <Link
                href="/sign_in"
                className="font-semibold text-black hover:underline"
              >
                Sign In
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

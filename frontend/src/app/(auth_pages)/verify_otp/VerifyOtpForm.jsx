"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/utils/helper";

export default function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const email = searchParams.get("email") || "";

  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const digit = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);

    setError("");
    setSuccess("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const newOtp = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setError("");
    setSuccess("");

    const nextIndex = Math.min(pastedData.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await client.post(
        "user/verify_otp",
        {
          email,
          otp: otpValue,
        },
        {
          validateStatus: () => true,
        }
      );

      const data = response.data;

      if (!data.success) {
        setError(
          data.message ||
            "Invalid or expired OTP. Please request a new one."
        );
        return;
      }

      setSuccess(
        data.message || "OTP verified successfully!"
      );

      router.replace("/sign_in");

    } catch (error) {
      if (error.response?.status !== 400) {
        console.error("OTP Error:", error);
      }

      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");

    try {
      setResendLoading(true);

      const response = await client.post(
        "user/register",
        { email }
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(
          data.message || "Unable to resend OTP"
        );
      }

      setSuccess(
        data.message ||
          "New OTP has been sent to your email."
      );

      setOtp(["", "", "", "", "", ""]);

      inputRefs.current[0]?.focus();

    } catch (error) {
      if (error.response?.status !== 409) {
        console.error("Resend OTP Error:", error);
      }

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to resend OTP."
      );

    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Back */}
        <Link
          href="/sign_up"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
        >
          <ArrowLeft size={17} />
          Back to Sign Up
        </Link>

        {/* Header */}
        <div className="text-center mb-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
            <Mail size={24} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Verify your email
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We have sent a 6-digit OTP to
          </p>

          {email && (
            <p className="mt-1 text-sm font-semibold text-gray-900 break-all">
              {email}
            </p>
          )}

        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7">

          <form onSubmit={handleSubmit}>

            {/* OTP Inputs */}
            <div
              className="flex justify-center gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleChange(
                      index,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(index, e)
                  }
                  className="h-12 w-11 sm:h-14 sm:w-12 rounded-xl border border-gray-200 bg-gray-50 text-center text-xl font-semibold text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-100"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 text-center">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mt-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600 text-center">
                {success}
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 h-12 w-full rounded-xl bg-black text-white font-semibold transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

          </form>

          {/* Resend */}
          <div className="mt-6 text-center">

            <p className="text-sm text-gray-500">
              Didn&apos;t receive the OTP?
            </p>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="mt-2 text-sm font-semibold text-black hover:underline disabled:opacity-50 disabled:no-underline"
            >
              {resendLoading
                ? "Sending..."
                : "Resend OTP"}
            </button>

          </div>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          OTP is valid for a limited time.
        </p>

      </div>

    </main>
  );
}
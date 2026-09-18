"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/redux/features/cartSlice";
import { client } from "@/utils/helper";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatcher = useDispatch();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await client.post("/user/logout").catch(() => {});

      // Clear cookie on frontend
      document.cookie = "token=; path=/; max-age=0;";

      // Clear cart and local storage
      dispatcher(emptyCart());
      try {
        localStorage.removeItem("cart");
      } catch (e) {
        console.error(e);
      }

      router.push("/sign_in");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      document.cookie = "token=; path=/; max-age=0;";
      router.push("/sign_in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-800/80 px-4 py-2 text-sm font-medium text-stone-200 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

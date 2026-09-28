import { redirect } from "next/navigation";
import { getme } from "@/api/api";
import ProfileOrders from "@/components/website/profile/ProfileOrders";

export const metadata = {
  title: "Track Order — Nestro",
  description: "View the status and details of your Nestro orders.",
};

export default async function TrackOrderPage() {
  const response = await getme();

  if (!response?.success || !response?.user) {
    redirect("/sign_in");
  }

  return (
    <main className="min-h-[calc(100vh-160px)] bg-stone-50">
      <div className="mx-auto max-w-4xl px-6 py-14 lg:px-10">
        <h1 className="font-serif text-3xl text-stone-900">Track your order</h1>
        <p className="mt-2 text-sm text-stone-600">
          View your order status and purchase details.
        </p>
        <ProfileOrders />
      </div>
    </main>
  );
}
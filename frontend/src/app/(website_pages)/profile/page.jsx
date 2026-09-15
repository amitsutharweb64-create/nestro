import { redirect } from "next/navigation";
import { getme } from "@/api/api";
import Link from "next/link";
import { Package, MapPin, LogOut, Pencil } from "lucide-react";

export default async function ProfilePage() {
  const response = await getme();

  if (!response.success || !response.user) {
    redirect("/sign-in");
  }

  const { user } = response;

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="mx-auto min-h-[calc(100vh-160px)] max-w-3xl px-6 py-12 lg:px-10">
      <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
              My account
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900">
              {user.name}
            </h1>
            {user.createdAt && (
              <p className="mt-1 text-sm text-stone-500">
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-100 text-2xl font-semibold text-amber-800">
            {initial}
          </div>
        </div>

        <dl className="mt-8 divide-y divide-stone-200 rounded-xl border border-stone-200">
          <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm text-stone-500">Email</dt>
            <dd className="font-medium text-stone-900">{user.email}</dd>
          </div>
          <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm text-stone-500">Mobile</dt>
            <dd className="font-medium text-stone-900">
              {user.mobile || "Not added"}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/profile/edit"
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            <Pencil className="h-4 w-4" />
            Edit profile
          </Link>
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            <Package className="h-4 w-4" />
            My orders
          </Link>
          <Link
            href="/addresses"
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            <MapPin className="h-4 w-4" />
            Addresses
          </Link>
          <Link
            href="/logout"
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </section>
    </main>
  );
}
import { redirect } from "next/navigation";
import { getme } from "@/api/api";
import { Calendar } from "lucide-react";
import LogoutButton from "@/components/website/profile/LogoutButton.jsx";
import ProfileContact from "@/components/website/profile/ProfileContact.jsx";
import ProfileOrders from "@/components/website/profile/ProfileOrders.jsx";
import ProfileAddresses from "@/components/website/profile/ProfileAddresses.jsx";

function formatMemberSince(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export default async function ProfilePage() {
  const response = await getme();

  if (!response?.success || !response?.user) {
    redirect("/sign_in");
  }

  const { user } = response;

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";
  const memberSince = formatMemberSince(user.createdAt);

  return (
    <main className="min-h-[calc(100vh-160px)] bg-stone-50" suppressHydrationWarning>
      <div className="mx-auto max-w-4xl px-6 py-14 lg:px-10">

        {/* ===== Header banner ===== */}
        <section className="relative overflow-hidden rounded-3xl bg-[#211a15] px-8 py-12 text-stone-100 shadow-xl shadow-stone-300/40 sm:px-10">
          <div className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-amber-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[#c2703d]/10 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-[2px] shadow-lg shadow-amber-900/30">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#211a15] font-serif text-2xl font-semibold text-amber-400">
                  {initial}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-500">
                  My account
                </p>
                <h1 className="mt-1.5 font-serif text-[28px] leading-tight text-stone-50 sm:text-3xl">
                  {user.name}
                </h1>
                {memberSince && (
                  <p
                    className="mt-2 flex items-center gap-1.5 text-sm text-stone-400"
                    suppressHydrationWarning
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Member since {memberSince}
                  </p>
                )}
              </div>
            </div>

            <LogoutButton />
          </div>
        </section>

        {/* ===== Contact details with Inline Edit ===== */}
        <ProfileContact user={user} />

        {/* ===== My Orders (inline expandable) ===== */}
        <ProfileOrders />

        {/* ===== Addresses (inline expandable) ===== */}
        <ProfileAddresses user={user} />

      </div>
    </main>
  );
}
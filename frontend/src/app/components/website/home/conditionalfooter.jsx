"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hideFooter =
    pathname === "/sign" ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/chekout");

  if (hideFooter) {
    return null;
  }

  return <Footer />;
}

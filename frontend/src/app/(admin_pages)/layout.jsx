import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Panel | Nestro",
  description: "Nestro Luxury Furniture Admin Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 min-h-screen">  
        <div className="w-full flex min-h-screen bg-slate-50"> 
          <Toaster position="top-center" richColors />
          <Sidebar /> 

          <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50"> 
            <Header />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {children} 
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

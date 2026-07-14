import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { TopAppBar } from "@/components/layout/top-app-bar";
import { Footer } from "@/components/layout/footer";
import { ToastContainer } from "@/components/ui/toast-container";
import { TelemetryProvider } from "@/lib/telemetry-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel Edge - Real-Time IoT Dashboard",
  description: "Real-time environmental telemetry monitoring for Sentinel Edge devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased dark`}
    >
      <body className="min-h-screen flex font-body-md text-on-surface bg-[#0F1115]">
        <TelemetryProvider>
          <Sidebar />
          <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
            <TopAppBar />
            <div className="flex-1 flex flex-col w-full">
              {children}
            </div>
            <Footer />
            <ToastContainer />
          </div>
        </TelemetryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata, generatePersonStructuredData } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const structuredData = generatePersonStructuredData();

  return (
    <html lang="en" className={`${inter.variable} dark antialiased h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="theme-color" content="#080c14" />
      </head>
      <body className="min-h-full flex flex-col bg-[#080c14] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

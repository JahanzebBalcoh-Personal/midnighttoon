import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins, Cinzel } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-ui" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-title" });

export const metadata: Metadata = {
  title: "MidnightToon",
  description: "Adult Romance Webtoon Subscription Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${cinzel.variable} antialiased bg-background text-text-primary min-h-screen flex flex-col font-body overflow-x-hidden`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-16">
              {children}
          </main>
          <footer className="bg-card border-t border-white/10 mt-12 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-secondary font-ui">
                  <p>&copy; 2026 MidnightToon. All rights reserved. 18+ Only.</p>
              </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

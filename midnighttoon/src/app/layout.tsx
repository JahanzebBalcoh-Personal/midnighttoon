import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins, Cinzel } from "next/font/google";
import "./globals.css";

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
        <nav className="fixed top-0 w-full z-40 transition-all duration-300 shadow-lg bg-black/95 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a href="/" className="flex items-center cursor-pointer">
                        <i className="fa-solid fa-moon text-accent text-2xl mr-2"></i>
                        <span className="font-title text-xl tracking-wider text-white">MidnightToon</span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-8 font-ui text-sm font-medium">
                        <a href="/" className="text-white hover:text-accent transition">Home</a>
                        <a href="#" className="text-text-secondary hover:text-accent transition">Browse</a>
                        <a href="#" className="text-gold flex items-center hover:text-white transition"><i className="fa-solid fa-crown mr-1 text-xs"></i> Premium</a>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <div className="relative">
                            <input type="text" placeholder="Search comics..." className="bg-card border border-white/10 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:border-accent text-white w-48 transition-all focus:w-64" />
                            <i className="fa-solid fa-search absolute left-4 top-2.5 text-text-secondary text-sm"></i>
                        </div>
                        <button className="text-white font-ui text-sm hover:text-accent transition">Log In</button>
                        <button className="bg-accent text-white font-ui text-sm px-4 py-1.5 rounded-full hover:bg-opacity-80 transition shadow-[0_0_10px_rgba(255,77,141,0.4)]">Subscribe</button>
                    </div>
                </div>
            </div>
        </nav>

        <main className="flex-grow pt-16">
            {children}
        </main>

        <footer className="bg-card border-t border-white/10 mt-12 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-secondary font-ui">
                <p>&copy; 2026 MidnightToon. All rights reserved. 18+ Only.</p>
            </div>
        </footer>
      </body>
    </html>
  );
}

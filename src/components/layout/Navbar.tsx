"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-black/95 shadow-lg py-2" : "bg-transparent py-4"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">
                    <Link href="/" className="flex items-center cursor-pointer">
                        <i className="fa-solid fa-moon text-accent text-2xl mr-2"></i>
                        <span className="font-heading text-xl tracking-wider text-white">MidnightToon</span>
                    </Link>
                    
                    <div className="hidden md:flex items-center space-x-8 font-ui text-sm font-medium">
                        <Link href="/" className="text-white hover:text-accent transition">Home</Link>
                        <Link href="/browse" className="text-text-secondary hover:text-accent transition">Browse</Link>
                        <Link href="/subscribe" className="text-gold flex items-center hover:text-white transition">
                            <i className="fa-solid fa-crown mr-1 text-xs"></i> Premium
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                const query = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
                                if (query) window.location.href = `/browse?q=${encodeURIComponent(query)}`;
                            }}
                            className="relative"
                        >
                            <input 
                                name="search"
                                type="text" 
                                placeholder="Search comics..." 
                                className="bg-card/50 border border-white/10 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:border-accent text-white w-40 transition-all focus:w-56 backdrop-blur-sm" 
                            />
                            <i className="fa-solid fa-search absolute left-4 top-2.5 text-text-secondary text-sm"></i>
                        </form>
                        
                        {session ? (
                            <div className="flex items-center gap-4">
                                <Link href="/library" className="text-text-secondary hover:text-white transition">
                                    <i className="fa-regular fa-bookmark text-lg"></i>
                                </Link>
                                <div className="group relative">
                                    <button className="w-9 h-9 rounded-full bg-gradient-to-tr from-secondary to-accent p-[2px]">
                                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                                            {session.user?.image ? (
                                                <img src={session.user.image} className="w-full h-full object-cover" />
                                            ) : (
                                                session.user?.name?.charAt(0).toUpperCase() || "U"
                                            )}
                                        </div>
                                    </button>
                                    <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                                        <div className="bg-card border border-white/10 rounded-xl p-2 w-48 shadow-2xl">
                                            <div className="p-3 border-b border-white/5 mb-2">
                                                <p className="text-white text-sm font-bold truncate">{session.user?.name}</p>
                                                <p className="text-text-secondary text-[10px] truncate">{session.user?.email}</p>
                                            </div>
                                            <Link href="/admin" className="block p-2 text-xs text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition">Admin Dashboard</Link>
                                            <Link href="/profile" className="block p-2 text-xs text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition">Settings</Link>
                                            <button onClick={() => signOut()} className="w-full text-left p-2 text-xs text-error hover:bg-error/10 rounded-lg transition mt-2">Sign Out</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-white font-ui text-sm hover:text-accent transition">Log In</Link>
                                <Link href="/register" className="bg-accent text-white font-ui text-sm px-4 py-1.5 rounded-full hover:bg-opacity-80 transition shadow-[0_0_10px_rgba(255,77,141,0.4)]">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

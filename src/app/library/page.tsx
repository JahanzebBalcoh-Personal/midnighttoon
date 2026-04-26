"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SafeImage from "@/components/ui/SafeImage";

export default function LibraryPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("bookmarks");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            fetchLibrary();
        }
    }, [status]);

    const fetchLibrary = async () => {
        try {
            const res = await fetch("/api/user/library");
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error("Failed to fetch library", error);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Profile Section */}
                <div className="bg-card rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden mb-12">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-secondary to-accent p-1 shadow-[0_0_20px_rgba(255,77,141,0.3)]">
                            <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
                                {session?.user?.image ? (
                                    <SafeImage src={session.user.image} className="w-full h-full object-cover" />
                                ) : (
                                    session?.user?.name?.charAt(0).toUpperCase()
                                )}
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-heading font-bold text-white mb-1">{session?.user?.name}</h1>
                            <p className="text-text-secondary text-sm mb-4">{session?.user?.email}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="bg-background/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-2xl">
                                    <p className="text-text-secondary text-[10px] uppercase font-bold tracking-wider">Plan</p>
                                    <p className="text-gold font-bold">{data?.stats?.plan || "Free User"}</p>
                                </div>
                                <div className="bg-background/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-2xl">
                                    <p className="text-text-secondary text-[10px] uppercase font-bold tracking-wider">Balance</p>
                                    <p className="text-accent font-bold flex items-center">
                                        <i className="fa-solid fa-coins mr-1.5 text-xs"></i>
                                        {data?.stats?.coins || 0} Coins
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link href="/subscribe" className="bg-gradient-to-r from-secondary to-accent text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition shadow-lg">
                            Get More Coins
                        </Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-white/10 mb-8">
                    <button 
                        onClick={() => setActiveTab("bookmarks")}
                        className={`pb-4 text-sm font-bold tracking-wide transition relative ${activeTab === "bookmarks" ? "text-accent" : "text-text-secondary hover:text-white"}`}
                    >
                        BOOKMARKS
                        {activeTab === "bookmarks" && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></div>}
                    </button>
                    <button 
                        onClick={() => setActiveTab("history")}
                        className={`pb-4 text-sm font-bold tracking-wide transition relative ${activeTab === "history" ? "text-accent" : "text-text-secondary hover:text-white"}`}
                    >
                        RECENTLY READ
                        {activeTab === "history" && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></div>}
                    </button>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {activeTab === "bookmarks" && (
                        data?.bookmarks?.length > 0 ? (
                            data.bookmarks.map((item: any) => (
                                <Link href={`/comic/${item.comic.id}`} key={item.id} className="group">
                                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover:border-accent/50 transition">
                                        <SafeImage src={item.comic.coverImage} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded">
                                            {item.comic.status}
                                        </div>
                                    </div>
                                    <h3 className="text-white text-sm font-bold truncate group-hover:text-accent transition">{item.comic.title}</h3>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-card/30 rounded-3xl border border-dashed border-white/10">
                                <i className="fa-regular fa-bookmark text-4xl text-text-secondary mb-4 opacity-30"></i>
                                <p className="text-text-secondary">You haven't bookmarked any comics yet.</p>
                                <Link href="/browse" className="text-accent mt-4 inline-block text-sm hover:underline">Browse Stories</Link>
                            </div>
                        )
                    )}

                    {activeTab === "history" && (
                        data?.history?.length > 0 ? (
                            data.history.map((item: any) => (
                                <Link href={`/read/${item.episode.id}`} key={item.id} className="group">
                                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover:border-accent/50 transition">
                                        <SafeImage src={item.comic.coverImage} className="w-full h-full object-cover opacity-60 transition duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                                                CONTINUE
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-white text-sm font-bold truncate">{item.comic.title}</h3>
                                    <p className="text-text-secondary text-[10px] mt-1 uppercase">Episode {item.episode.episodeNumber}</p>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-card/30 rounded-3xl border border-dashed border-white/10">
                                <i className="fa-solid fa-clock-rotate-left text-4xl text-text-secondary mb-4 opacity-30"></i>
                                <p className="text-text-secondary">No reading history found.</p>
                                <Link href="/" className="text-accent mt-4 inline-block text-sm hover:underline">Start Reading</Link>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

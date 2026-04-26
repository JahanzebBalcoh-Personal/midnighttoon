"use client";

import { useState } from "react";
import AddComicModal from "@/components/admin/AddComicModal";
import AddEpisodeModal from "@/components/admin/AddEpisodeModal";

export default function AdminDashboardContent({ stats, recentComics }: { stats: any, recentComics: any[] }) {
    const [isComicModalOpen, setIsComicModalOpen] = useState(false);
    const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState(false);
    const [selectedComic, setSelectedComic] = useState<{id: string, title: string} | null>(null);

    const openEpisodeModal = (id: string, title: string) => {
        setSelectedComic({ id, title });
        setIsEpisodeModalOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pt-24 font-ui min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-white"><i className="fa-solid fa-lock text-accent mr-3"></i>Admin Dashboard</h1>
                <div className="bg-card px-4 py-2 rounded-lg border border-white/10 text-sm text-text-secondary">System Administrator</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p className="text-text-secondary text-sm mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p className="text-text-secondary text-sm mb-1">Total Comics</p>
                    <p className="text-3xl font-bold text-secondary">{stats.totalComics}</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p className="text-text-secondary text-sm mb-1">Active Artists</p>
                    <p className="text-3xl font-bold text-success">{stats.totalArtists}</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p className="text-text-secondary text-sm mb-1">Status</p>
                    <p className="text-3xl font-bold text-gold">Ready</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-card rounded-2xl border border-white/5 p-6 mb-8">
                        <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Quick Actions</h3>
                        <ul className="space-y-3">
                            <li><button onClick={() => setIsComicModalOpen(true)} className="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text-secondary transition"><i className="fa-solid fa-upload mr-3 text-accent"></i> Upload New Comic</button></li>
                            <li><button onClick={() => window.location.href='/admin/payments'} className="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text-secondary transition"><i className="fa-solid fa-money-bill-transfer mr-3 text-gold"></i> Manage Payments</button></li>
                            <li><button className="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text-secondary transition"><i className="fa-solid fa-users mr-3 text-success"></i> Manage Users</button></li>
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-card rounded-2xl border border-white/5 p-6">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                            <h3 className="text-white font-bold">Recent Comics</h3>
                            <button className="text-accent text-xs hover:text-white">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-text-secondary">
                                <thead>
                                    <tr className="text-white border-b border-white/5">
                                        <th className="pb-3">Title</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Episodes</th>
                                        <th className="pb-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentComics.map(comic => (
                                        <tr key={comic.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                            <td className="py-3 flex items-center gap-3">
                                                <img src={comic.coverImage} className="w-8 h-8 object-cover rounded shadow-sm" />
                                                <span className="text-white truncate max-w-[150px] font-medium">{comic.title}</span>
                                            </td>
                                            <td className="py-3"><span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-success/10 text-success">{comic.status}</span></td>
                                            <td className="py-3">{comic._count.episodes}</td>
                                            <td className="py-3 text-right">
                                                <button 
                                                    onClick={() => openEpisodeModal(comic.id, comic.title)}
                                                    className="bg-accent/10 hover:bg-accent text-accent hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition"
                                                >
                                                    ADD EPISODE
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <AddComicModal isOpen={isComicModalOpen} onClose={() => setIsComicModalOpen(false)} />
            {selectedComic && (
                <AddEpisodeModal 
                    isOpen={isEpisodeModalOpen} 
                    onClose={() => setIsEpisodeModalOpen(false)} 
                    comicId={selectedComic.id}
                    comicTitle={selectedComic.title}
                />
            )}
        </div>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEpisodeModal({ isOpen, onClose, comicId, comicTitle }: { isOpen: boolean, onClose: () => void, comicId: string, comicTitle: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        episodeNumber: "",
        title: "",
        thumbnail: "",
        pagesUrls: "",
        coinCost: "0",
        isFree: true
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/episodes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    comicId
                })
            });

            if (res.ok) {
                alert("Episode published successfully!");
                onClose();
                router.refresh();
            } else {
                const err = await res.json();
                alert("Error: " + err.error);
            }
        } catch (error) {
            console.error("Error publishing episode:", error);
            alert("Failed to publish episode.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-gradient-to-r from-primary to-secondary p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-white font-heading font-bold text-xl">Add New Episode</h2>
                        <p className="text-white/70 text-xs">{comicTitle}</p>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Episode Number</label>
                        <input 
                            required
                            type="number" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" 
                            placeholder="e.g. 1" 
                            value={formData.episodeNumber}
                            onChange={(e) => setFormData({...formData, episodeNumber: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Episode Title</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" 
                            placeholder="e.g. The Beginning" 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Thumbnail URL (Optional)</label>
                        <input 
                            type="text" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" 
                            placeholder="https://..." 
                            value={formData.thumbnail}
                            onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Pages URLs (One per line)</label>
                        <textarea 
                            required
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent h-40 resize-none" 
                            placeholder="https://image1.jpg&#10;https://image2.jpg..."
                            value={formData.pagesUrls}
                            onChange={(e) => setFormData({...formData, pagesUrls: e.target.value})}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Coin Cost</label>
                        <input 
                            type="number" 
                            disabled={formData.isFree}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent disabled:opacity-30" 
                            placeholder="0" 
                            value={formData.coinCost}
                            onChange={(e) => setFormData({...formData, coinCost: e.target.value})}
                        />
                    </div>

                    <div className="flex items-center gap-4 py-4">
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="isFree" 
                                className="w-4 h-4 accent-success" 
                                checked={formData.isFree}
                                onChange={(e) => setFormData({...formData, isFree: e.target.checked, coinCost: e.target.checked ? "0" : formData.coinCost})}
                            />
                            <label htmlFor="isFree" className="text-sm text-white">Free Episode</label>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-white/5">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-white/10 text-text-secondary hover:bg-white/5 transition">Cancel</button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Publishing..." : "Publish Episode"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

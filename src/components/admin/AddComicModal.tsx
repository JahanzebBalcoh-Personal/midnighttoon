"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddComicModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        authorId: "Admin",
        coverImage: "",
        bannerImage: "",
        synopsis: "",
        genres: "",
        status: "Ongoing",
        isFeatured: false,
        isExclusive: false
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/comics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    genres: formData.genres.split(",").map(g => g.trim()).filter(g => g !== ""),
                    tags: [] // Default empty tags
                })
            });

            if (res.ok) {
                alert("Comic published successfully!");
                onClose();
                router.refresh();
            } else {
                const err = await res.json();
                alert("Error: " + err.error);
            }
        } catch (error) {
            console.error("Error publishing comic:", error);
            alert("Failed to publish comic.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-gradient-to-r from-secondary to-accent p-6 flex justify-between items-center">
                    <h2 className="text-white font-heading font-bold text-xl">Upload New Comic</h2>
                    <button onClick={onClose} className="text-white/80 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="md:col-span-2">
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Comic Title</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" 
                            placeholder="Enter title..." 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Cover Image URL</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" 
                            placeholder="https://..." 
                            value={formData.coverImage}
                            onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Banner Image URL</label>
                        <input 
                            type="text" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" 
                            placeholder="https://..." 
                            value={formData.bannerImage}
                            onChange={(e) => setFormData({...formData, bannerImage: e.target.value})}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Synopsis</label>
                        <textarea 
                            required
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent h-32 resize-none" 
                            placeholder="Describe the story..."
                            value={formData.synopsis}
                            onChange={(e) => setFormData({...formData, synopsis: e.target.value})}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Genres (Comma separated)</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" 
                            placeholder="Romance, Drama..." 
                            value={formData.genres}
                            onChange={(e) => setFormData({...formData, genres: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-2">Status</label>
                        <select 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Hiatus">Hiatus</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-4 py-4 md:col-span-2 border-t border-white/5 mt-4">
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="featured" 
                                className="w-4 h-4 accent-accent" 
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                            />
                            <label htmlFor="featured" className="text-sm text-white">Featured</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="exclusive" 
                                className="w-4 h-4 accent-secondary" 
                                checked={formData.isExclusive}
                                onChange={(e) => setFormData({...formData, isExclusive: e.target.checked})}
                            />
                            <label htmlFor="exclusive" className="text-sm text-white">Premium Exclusive</label>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-white/10 text-text-secondary hover:bg-white/5 transition">Cancel</button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-gradient-to-r from-secondary to-accent text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Publishing..." : "Publish Comic"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

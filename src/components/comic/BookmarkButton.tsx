"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BookmarkButton({ comicId, isInitialBookmarked }: { comicId: string, isInitialBookmarked: boolean }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [bookmarked, setBookmarked] = useState(isInitialBookmarked);
    const [loading, setLoading] = useState(false);

    const toggleBookmark = async () => {
        if (!session) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/user/bookmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comicId })
            });

            if (res.ok) {
                const data = await res.json();
                setBookmarked(data.bookmarked);
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={toggleBookmark}
            disabled={loading}
            className={`w-full mt-2 py-3 rounded-xl transition flex items-center justify-center font-ui ${
                bookmarked 
                ? "bg-accent text-white shadow-[0_0_15px_rgba(255,77,141,0.3)]" 
                : "bg-card border border-white/20 text-white hover:bg-white/5"
            }`}
        >
            <i className={`${bookmarked ? "fa-solid" : "fa-regular"} fa-bookmark mr-2`}></i>
            {bookmarked ? "Bookmarked" : "Add to Library"}
        </button>
    );
}

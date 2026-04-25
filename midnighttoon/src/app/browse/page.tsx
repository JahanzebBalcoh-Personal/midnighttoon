import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Browse() {
    const comics = await prisma.comic.findMany({ orderBy: { totalViews: "desc" } });
    const genres = ["Romance", "Drama", "Fantasy Romance", "School Life", "Office Romance", "Forbidden Love", "Supernatural Romance", "Thriller"];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
            <h1 className="text-3xl font-heading font-bold text-white mb-8 border-l-4 border-accent pl-3">Browse Comics</h1>
            
            <div className="flex flex-wrap gap-4 mb-8 bg-card p-4 rounded-xl border border-white/5">
                <select className="bg-background border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
                    <option>All Genres</option>
                    {genres.map(g => <option key={g}>{g}</option>)}
                </select>
                <select className="bg-background border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
                    <option>Status: All</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                </select>
                <select className="bg-background border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
                    <option>Sort By: Popular</option>
                    <option>Newest</option>
                </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {comics.map(comic => (
                    <Link href={`/comic/${comic.id}`} key={comic.id} className="comic-card bg-card rounded-xl overflow-hidden cursor-pointer relative group w-full">
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img src={comic.coverImage} alt={comic.title} className="comic-cover w-full h-full object-cover transition duration-300" />
                            {comic.isExclusive && <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded shadow"><i className="fa-solid fa-gem mr-1"></i>Exclusive</div>}
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                                <i className="fa-solid fa-eye mr-1 text-[10px]"></i> {(comic.totalViews / 1000).toFixed(0)}K
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="text-white font-ui font-semibold text-sm truncate">{comic.title}</h3>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-text-secondary text-xs">{comic.status}</span>
                                <span className="text-text-secondary text-[10px]"><i className="fa-solid fa-heart mr-1"></i>{(comic.totalLikes / 1000).toFixed(0)}K</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

import prisma from "@/lib/prisma";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface SearchParams {
    q?: string;
    genre?: string;
    status?: string;
    sort?: string;
}

export default async function Browse({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;
    const q = params.q || "";
    const genre = params.genre || "";
    const status = params.status || "";
    const sort = params.sort || "popular";

    const genres = ["Romance", "Drama", "Fantasy", "School Life", "Office", "Forbidden Love", "Supernatural", "Thriller"];

    const where: any = {};
    
    if (q) {
        where.OR = [
            { title: { contains: q, mode: 'insensitive' } },
            { synopsis: { contains: q, mode: 'insensitive' } }
        ];
    }
    
    if (genre && genre !== "All Genres") {
        where.genres = { has: genre };
    }
    
    if (status && status !== "Status: All") {
        where.status = status;
    }

    const comics = await prisma.comic.findMany({
        where,
        orderBy: sort === "newest" ? { createdAt: "desc" } : { totalViews: "desc" },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-heading font-bold text-white border-l-4 border-accent pl-3">
                    {q ? `Results for "${q}"` : "Browse Comics"}
                </h1>
                <p className="text-text-secondary text-sm">{comics.length} stories found</p>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-8 bg-card p-4 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                <form action="/browse" method="GET" className="flex flex-wrap gap-3 w-full">
                    {q && <input type="hidden" name="q" value={q} />}
                    
                    <select 
                        name="genre" 
                        defaultValue={genre}
                        className="bg-background border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent cursor-pointer transition"
                        onChange={(e) => e.target.form?.submit()}
                    >
                        <option>All Genres</option>
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>

                    <select 
                        name="status" 
                        defaultValue={status}
                        className="bg-background border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent cursor-pointer transition"
                        onChange={(e) => e.target.form?.submit()}
                    >
                        <option>Status: All</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <select 
                        name="sort" 
                        defaultValue={sort}
                        className="bg-background border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent cursor-pointer transition"
                        onChange={(e) => e.target.form?.submit()}
                    >
                        <option value="popular">Sort By: Popular</option>
                        <option value="newest">Newest</option>
                    </select>

                    {(genre || status || q) && (
                        <Link href="/browse" className="ml-auto text-xs text-accent hover:text-white transition flex items-center gap-1 bg-accent/10 px-3 rounded-lg">
                            <i className="fa-solid fa-rotate-left"></i> Clear All
                        </Link>
                    )}
                </form>
            </div>

            {comics.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {comics.map((comic: any) => (
                        <Link href={`/comic/${comic.id}`} key={comic.id} className="comic-card bg-card rounded-2xl overflow-hidden cursor-pointer relative group w-full border border-white/5 hover:border-accent/30 transition shadow-lg">
                            <div className="relative aspect-[2/3] overflow-hidden">
                                <SafeImage src={comic.coverImage} alt={comic.title} className="comic-cover w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                {comic.isExclusive && (
                                    <div className="absolute top-2 left-2 bg-gradient-to-r from-secondary to-accent text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg">
                                        <i className="fa-solid fa-gem mr-1"></i>EXCLUSIVE
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center border border-white/10">
                                    <i className="fa-solid fa-eye mr-1 text-[8px]"></i> {(comic.totalViews / 1000).toFixed(0)}K
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-[10px] line-clamp-2">{comic.synopsis}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-white font-ui font-bold text-sm truncate group-hover:text-accent transition">{comic.title}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${comic.status === 'Ongoing' ? 'text-success' : 'text-accent'}`}>{comic.status}</span>
                                    <span className="text-text-secondary text-[10px] font-medium"><i className="fa-solid fa-heart mr-1 text-accent"></i>{(comic.totalLikes / 1000).toFixed(0)}K</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-32 text-center">
                    <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner">
                        <i className="fa-solid fa-magnifying-glass text-3xl text-text-secondary opacity-30"></i>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">No results found</h2>
                    <p className="text-text-secondary text-sm max-w-xs mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
                </div>
            )}
        </div>
    );
}

import prisma from "@/lib/prisma";
import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";

export const dynamic = "force-dynamic";

export default async function Home() {
    const featured = await prisma.comic.findFirst({ where: { isFeatured: true }, orderBy: { totalViews: "desc" } });
    const trending = await prisma.comic.findMany({ orderBy: { totalViews: "desc" }, take: 10 });
    const exclusives = await prisma.comic.findMany({ where: { isExclusive: true } });

    return (
        <div>
            {/* Hero Banner */}
            {featured && (
                <div className="relative w-full h-[60vh] min-h-[400px] flex items-center bg-cover bg-center" style={{backgroundImage: `url('${featured.bannerImage}')`}}>
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="flex gap-2">
                                {featured.genres.slice(0, 3).map((g: any) => (
                                    <span key={g} className="bg-secondary/20 text-accent border border-accent/30 text-xs px-2 py-1 rounded-full">{g}</span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">{featured.title}</h1>
                            <p className="text-text-secondary font-ui text-sm md:text-base line-clamp-3 max-w-md">{featured.synopsis}</p>
                            <div className="flex items-center gap-4 pt-4">
                                <Link href={`/comic/${featured.id}`} className="bg-gradient-to-r from-secondary to-accent text-white font-ui font-bold py-3 px-8 rounded-full hover:opacity-90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,77,141,0.4)]">
                                    Read Now <i className="fa-solid fa-arrow-right ml-2"></i>
                                </Link>
                                <button className="bg-card/50 border border-white/20 text-white p-3 rounded-full hover:bg-white/10 transition backdrop-blur-sm">
                                    <i className="fa-regular fa-bookmark"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Genre Pills */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {["Romance", "Drama", "Fantasy", "School Life", "Office", "Forbidden Love", "Supernatural", "Thriller"].map((g: string) => (
                        <button key={g} className="bg-card border border-white/10 text-text-secondary hover:text-white hover:border-accent hover:bg-accent/10 px-4 py-2 rounded-full text-sm font-ui transition">{g}</button>
                    ))}
                </div>
            </div>

            {/* Trending Section */}
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-2xl font-heading font-bold text-white border-l-4 border-accent pl-3">Trending Now</h2>
                    <Link href="/browse" className="text-accent text-sm font-ui hover:text-white transition">See All <i className="fa-solid fa-chevron-right text-xs"></i></Link>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-6 snap-x">
                    {trending.map((comic: any) => (
                        <Link href={`/comic/${comic.id}`} key={comic.id} className="comic-card bg-card rounded-xl overflow-hidden cursor-pointer relative group flex-shrink-0 w-40 sm:w-48 md:w-56 snap-start">
                            <div className="relative aspect-[2/3] overflow-hidden">
                                <SafeImage src={comic.coverImage} alt={comic.title} className="comic-cover w-full h-full object-cover transition duration-300" />
                                {comic.isExclusive && <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded shadow"><i className="fa-solid fa-gem mr-1"></i>Exclusive</div>}
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                                    <i className="fa-solid fa-eye mr-1 text-[10px]"></i> {(comic.totalViews / 1000).toFixed(0)}K
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                                    <p className="text-xs text-text-secondary mb-2 line-clamp-3">{comic.synopsis}</p>
                                    <span className="bg-secondary text-white text-sm font-semibold py-1.5 rounded-full text-center hover:bg-accent transition">Read Now</span>
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="text-white font-ui font-semibold text-sm truncate">{comic.title}</h3>
                                <p className="text-text-secondary text-xs truncate mt-1">{comic.status}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Exclusives */}
            {exclusives.length > 0 && (
                <div className="py-12 bg-gradient-to-b from-transparent via-primary/30 to-transparent">
                    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-heading font-bold text-white border-l-4 border-accent pl-3 mb-4">Premium Exclusives <i className="fa-solid fa-gem text-accent text-lg ml-2"></i></h2>
                        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-6 snap-x">
                            {exclusives.map((comic: any) => (
                                <Link href={`/comic/${comic.id}`} key={comic.id} className="comic-card bg-card rounded-xl overflow-hidden cursor-pointer relative group flex-shrink-0 w-40 sm:w-48 md:w-56 snap-start">
                                    <div className="relative aspect-[2/3] overflow-hidden">
                                        <SafeImage src={comic.coverImage} alt={comic.title} className="comic-cover w-full h-full object-cover transition duration-300" />
                                        <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded shadow"><i className="fa-solid fa-gem mr-1"></i>Exclusive</div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-white font-ui font-semibold text-sm truncate">{comic.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Banner */}
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="bg-card border border-secondary/50 p-8 rounded-3xl relative overflow-hidden shadow-[0_0_30px_rgba(108,11,169,0.2)]">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Unlock Every Dark Desire</h2>
                        <p className="text-text-secondary mb-8 font-ui max-w-lg mx-auto">Get unlimited access to all exclusive stories, completely ad-free. Read anytime, anywhere.</p>
                        <Link href="/subscribe" className="inline-block bg-gradient-to-r from-secondary to-accent text-white font-ui font-bold py-3 px-10 rounded-full hover:opacity-90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,77,141,0.5)] animate-glow">
                            Subscribe for $4.99/mo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

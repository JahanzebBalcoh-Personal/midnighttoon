import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ComicDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const comic = await prisma.comic.findUnique({
        where: { id },
        include: { episodes: { orderBy: { episodeNumber: "asc" } } },
    });

    if (!comic) return <div className="text-center py-20 text-white text-xl">Comic not found</div>;

    return (
        <div className="w-full min-h-screen">
            <div className="relative w-full h-64 md:h-96 bg-cover bg-center" style={{backgroundImage: `url('${comic.bannerImage}')`}}>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                <Link href="/" className="absolute top-6 left-6 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition z-10">
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
            </div>
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 flex flex-col md:flex-row gap-8 pb-12">
                <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
                    <img src={comic.coverImage} alt="Cover" className="w-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-2 border-white/10" />
                    {comic.episodes.length > 0 && (
                        <Link href={`/read/${comic.id}/${comic.episodes[0].id}`} className="block w-full mt-4 bg-gradient-to-r from-secondary to-accent text-white font-ui font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(255,77,141,0.4)] hover:opacity-90 transition text-center">
                            <i className="fa-solid fa-book-open mr-2"></i> Read First Ep
                        </Link>
                    )}
                    <button className="w-full mt-2 bg-card border border-white/20 text-white font-ui py-3 rounded-xl hover:bg-white/5 transition">
                        <i className="fa-regular fa-bookmark mr-2"></i> Add to Library
                    </button>
                </div>
                
                <div className="flex-grow pt-4 md:pt-32">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {comic.genres.map(g => (
                            <span key={g} className="bg-card text-text-secondary border border-white/10 text-xs px-2 py-1 rounded">{g}</span>
                        ))}
                        <span className="bg-error/20 text-error border border-error/30 text-xs font-bold px-2 py-1 rounded">{comic.ageRating}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">{comic.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-6 mb-6 text-sm border-y border-white/10 py-3">
                        <div className="text-white"><i className="fa-solid fa-eye text-text-secondary mr-1"></i> {(comic.totalViews / 1000).toFixed(0)}K</div>
                        <div className="text-white"><i className="fa-solid fa-heart text-accent mr-1"></i> {(comic.totalLikes / 1000).toFixed(0)}K</div>
                        <div className="text-white"><i className="fa-solid fa-list text-text-secondary mr-1"></i> {comic.episodes.length} Eps</div>
                        <div className="text-white"><span className={`px-2 py-0.5 rounded text-xs ${comic.status === 'Ongoing' ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'}`}>{comic.status}</span></div>
                    </div>
                    
                    <p className="text-text-secondary font-ui leading-relaxed mb-8">{comic.synopsis}</p>
                    
                    <div className="mt-8">
                        <h3 className="text-xl font-heading font-bold text-white mb-4">Episodes</h3>
                        <div className="bg-card/50 rounded-2xl border border-white/5 overflow-hidden">
                            {comic.episodes.map(ep => (
                                <Link href={`/read/${comic.id}/${ep.id}`} key={ep.id} className="flex items-center gap-4 p-3 hover:bg-white/5 transition cursor-pointer border-b border-white/5">
                                    <div className="relative w-24 aspect-video bg-card rounded overflow-hidden flex-shrink-0">
                                        <img src={comic.coverImage} className="w-full h-full object-cover opacity-50" />
                                        <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-xl text-white/50 bg-black/40">
                                            {ep.episodeNumber}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-white font-ui font-medium">{ep.title}</h4>
                                        <p className="text-text-secondary text-xs mt-1"><i className="fa-solid fa-heart mr-1"></i>{(ep.likes / 1000).toFixed(1)}K</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {ep.isFree ? 
                                            <span className="text-accent text-xs font-bold border border-accent/50 px-2 py-1 rounded-full">Free</span> : 
                                            <span className="bg-card border border-gold/30 text-gold text-xs font-bold px-3 py-1.5 rounded-full flex items-center">
                                                <i className="fa-solid fa-lock mr-1"></i> {ep.coinCost}
                                            </span>
                                        }
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

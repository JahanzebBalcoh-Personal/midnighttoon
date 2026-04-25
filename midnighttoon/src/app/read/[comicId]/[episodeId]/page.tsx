import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Reader({ params }: { params: Promise<{ comicId: string, episodeId: string }> }) {
    const { comicId, episodeId } = await params;

    const episode = await prisma.episode.findUnique({
        where: { id: episodeId },
        include: { comic: true }
    });

    if (!episode) {
        return <div className="text-center py-20 text-white">Episode not found</div>;
    }

    // In a real app, we'd check if the user has unlocked this episode or has a subscription
    // For now, let's just simulate the check for the "locked" UI
    const isLocked = !episode.isFree; 

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
            {/* Top Nav Overlay */}
            <div className="fixed top-0 w-full max-w-[800px] left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-black/90 to-transparent p-4 flex justify-between items-center z-20">
                <Link href={`/comic/${comicId}`} className="text-white w-10 h-10 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-md">
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
                <div className="text-center">
                    <div className="text-white text-xs font-ui opacity-70">{episode.comic.title}</div>
                    <div className="text-white font-ui font-medium text-sm md:text-base">Ep. {episode.episodeNumber} - {episode.title}</div>
                </div>
                <button className="text-white w-10 h-10 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-md">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>

            {/* Content Container */}
            <div className="w-full max-w-[800px] mx-auto relative bg-black min-h-screen pt-16">
                {isLocked ? (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="bg-card p-8 rounded-2xl max-w-sm w-full mx-4 text-center border border-gold/30 shadow-2xl">
                            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-gold text-2xl">
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <h3 className="text-white font-heading text-xl mb-2">Locked Episode</h3>
                            <p className="text-text-secondary text-sm mb-6">Unlock this episode to continue reading.</p>
                            <button className="w-full bg-gold text-black font-bold py-3 rounded-full hover:bg-yellow-400 transition mb-3 flex justify-center items-center">
                                <i className="fa-solid fa-unlock mr-2"></i> Unlock for {episode.coinCost} Coins
                            </button>
                            <p className="text-xs text-text-secondary">You have: <span className="text-gold font-bold">150 Coins</span></p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {episode.pagesUrls.map((img, idx) => (
                            <img key={idx} src={img} alt={`Page ${idx+1}`} className="w-full h-auto block" loading="lazy" />
                        ))}
                        
                        <div className="py-20 text-center bg-black">
                            <p className="font-heading text-xl text-white mb-2">To be continued...</p>
                            <div className="flex justify-center gap-4 mt-6">
                                <button className="w-12 h-12 rounded-full bg-card border border-white/10 text-white flex items-center justify-center hover:bg-accent/20 hover:text-accent hover:border-accent transition">
                                    <i className="fa-solid fa-heart text-xl"></i>
                                </button>
                                <button className="w-12 h-12 rounded-full bg-card border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition">
                                    <i className="fa-solid fa-share text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Nav Overlay */}
            <div className="fixed bottom-0 w-full max-w-[800px] left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pb-safe flex justify-between items-center z-20">
                <button className="text-white px-4 py-2 bg-card/80 border border-white/10 rounded-full text-sm flex items-center backdrop-blur-md">
                    <i className="fa-solid fa-chevron-left mr-2"></i> Prev
                </button>
                <button className="text-white px-6 py-2 bg-secondary/80 border border-secondary rounded-full text-sm flex items-center backdrop-blur-md hover:bg-secondary transition">
                    <i className="fa-regular fa-comment mr-2"></i> {(episode.likes / 100).toFixed(1)}k
                </button>
                <button className="text-white px-4 py-2 bg-card/80 border border-white/10 rounded-full text-sm flex items-center backdrop-blur-md">
                    Next <i className="fa-solid fa-chevron-right ml-2"></i>
                </button>
            </div>
        </div>
    );
}

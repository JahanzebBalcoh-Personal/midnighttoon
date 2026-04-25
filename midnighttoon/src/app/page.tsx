export default function Home() {
  return (
    <div>
        <div className="relative w-full h-[60vh] min-h-[400px] flex items-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')"}}>
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 space-y-4 animate-fade-in">
                    <div className="flex gap-2">
                        <span className="bg-secondary/20 text-accent border border-accent/30 text-xs px-2 py-1 rounded-full">Romance</span>
                        <span className="bg-secondary/20 text-accent border border-accent/30 text-xs px-2 py-1 rounded-full">Drama</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight shadow-sm">Midnight Contract</h1>
                    <p className="text-text-secondary font-ui text-sm md:text-base line-clamp-3 max-w-md">Zara, a struggling graphic designer, signs a one-year contract with the cold and mysterious CEO of a top fashion company. The contract has one secret clause she never expected.</p>
                    <div className="flex items-center gap-4 pt-4">
                        <button className="bg-gradient-to-r from-secondary to-accent text-white font-ui font-bold py-3 px-8 rounded-full hover:opacity-90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,77,141,0.4)]">
                            Read Now <i className="fa-solid fa-arrow-right ml-2"></i>
                        </button>
                        <button className="bg-card/50 border border-white/20 text-white p-3 rounded-full hover:bg-white/10 transition backdrop-blur-sm">
                            <i className="fa-regular fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["Romance", "Drama", "Fantasy", "School Life", "Office", "Forbidden Love"].map(g => (
                    <button key={g} className="bg-card border border-white/10 text-text-secondary hover:text-white hover:border-accent hover:bg-accent/10 px-4 py-2 rounded-full text-sm font-ui transition">{g}</button>
                ))}
            </div>
        </div>

        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-heading font-bold text-white border-l-4 border-accent pl-3 mb-4">Trending Now</h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-6 snap-x">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="comic-card bg-card rounded-xl overflow-hidden cursor-pointer relative group flex-shrink-0 w-40 sm:w-48 md:w-56 snap-start">
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img src={`https://images.unsplash.com/photo-1517409261073-49033331b268?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} className="comic-cover w-full h-full object-cover transition duration-300" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                                <i className="fa-solid fa-star text-gold mr-1 text-[10px]"></i> 4.9
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="text-white font-ui font-semibold text-sm truncate">Vampire's Kiss</h3>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-text-secondary text-xs truncate">Crimson Rose</p>
                                <span className="text-text-secondary text-[10px]"><i className="fa-solid fa-eye mr-1"></i>850K</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="bg-card border border-secondary/50 p-8 rounded-3xl relative overflow-hidden shadow-[0_0_30px_rgba(108,11,169,0.2)]">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Unlock Every Dark Desire</h2>
                    <p className="text-text-secondary mb-8 font-ui max-w-lg mx-auto">Get unlimited access to all exclusive stories, completely ad-free. Read anytime, anywhere.</p>
                    <button className="bg-gradient-to-r from-secondary to-accent text-white font-ui font-bold py-3 px-10 rounded-full hover:opacity-90 transition shadow-[0_0_20px_rgba(255,77,141,0.5)] animate-glow">
                        Subscribe for $4.99/mo
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

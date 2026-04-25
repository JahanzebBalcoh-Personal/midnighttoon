export default function Browse() {
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
                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                    <div key={i} className="comic-card bg-card rounded-xl overflow-hidden cursor-pointer relative group flex-shrink-0 w-full">
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img src={`https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} className="comic-cover w-full h-full object-cover transition duration-300" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                                <i className="fa-solid fa-star text-gold mr-1 text-[10px]"></i> 4.7
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="text-white font-ui font-semibold text-sm truncate">Forbidden Professor</h3>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-text-secondary text-xs truncate">A.J. Hartley</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

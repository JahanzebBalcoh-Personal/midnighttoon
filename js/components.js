// UI Components Generator

const Components = {
    ComicCard: (comic) => `
        <div class="comic-card bg-card rounded-xl overflow-hidden cursor-pointer relative group flex-shrink-0 w-40 sm:w-48 md:w-56" onclick="router.navigate('/comic/${comic.id}')">
            <div class="relative aspect-[2/3] overflow-hidden">
                <img src="${comic.cover_image}" alt="${comic.title}" class="comic-cover w-full h-full object-cover transition duration-300">
                ${comic.is_exclusive ? `<div class="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded shadow"><i class="fa-solid fa-gem mr-1"></i>Exclusive</div>` : ''}
                <div class="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                    <i class="fa-solid fa-star text-gold mr-1 text-[10px]"></i> ${comic.rating}
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    <p class="text-xs text-text_secondary mb-2 line-clamp-3">${comic.synopsis}</p>
                    <button class="bg-secondary text-white text-sm font-semibold py-1.5 rounded-full hover:bg-accent transition">Read Now</button>
                </div>
            </div>
            <div class="p-3">
                <h3 class="text-white font-ui font-semibold text-sm truncate">${comic.title}</h3>
                <div class="flex items-center justify-between mt-1">
                    <p class="text-text_secondary text-xs truncate">${comic.author}</p>
                    <span class="text-text_secondary text-[10px]"><i class="fa-solid fa-eye mr-1"></i>${comic.total_views}</span>
                </div>
            </div>
        </div>
    `,

    HeroBanner: (comic) => `
        <div class="relative w-full h-[60vh] min-h-[400px] flex items-center parallax-bg" style="background-image: url('${comic.banner_image}'); background-position: top center;">
            <div class="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-8">
                <div class="w-full md:w-1/2 space-y-4 fade-in">
                    <div class="flex gap-2">
                        ${comic.genres.map(g => `<span class="bg-secondary/20 text-accent border border-accent/30 text-xs px-2 py-1 rounded-full">${g}</span>`).join('')}
                    </div>
                    <h1 class="text-4xl md:text-6xl font-heading font-bold text-white leading-tight shadow-sm">${comic.title}</h1>
                    <p class="text-text_secondary font-ui text-sm md:text-base line-clamp-3 max-w-md">${comic.synopsis}</p>
                    <div class="flex items-center gap-4 pt-4">
                        <button onclick="router.navigate('/comic/${comic.id}')" class="bg-gradient-to-r from-secondary to-accent text-white font-ui font-bold py-3 px-8 rounded-full hover:opacity-90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,77,141,0.4)]">
                            Read Now <i class="fa-solid fa-arrow-right ml-2"></i>
                        </button>
                        <button class="bg-card/50 border border-white/20 text-white p-3 rounded-full hover:bg-white/10 transition backdrop-blur-sm">
                            <i class="fa-regular fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,

    HorizontalScrollRow: (title, comics) => `
        <div class="py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex justify-between items-end">
                <h2 class="text-2xl font-heading font-bold text-white border-l-4 border-accent pl-3">${title}</h2>
                <a href="#" onclick="router.navigate('/browse')" class="text-accent text-sm font-ui hover:text-white transition">See All <i class="fa-solid fa-chevron-right text-xs"></i></a>
            </div>
            <div class="flex overflow-x-auto hide-scrollbar pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto gap-4 snap-x">
                ${comics.map(c => `
                    <div class="snap-start">
                        ${Components.ComicCard(c)}
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    EpisodeListRow: (episode, comicId) => {
        const unlocked = isEpisodeUnlocked(episode.id, episode.is_free);
        return `
        <div class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition cursor-pointer border-b border-white/5 ${!unlocked ? 'opacity-80' : ''}" onclick="router.navigate('/read/${comicId}/${episode.id}')">
            <div class="relative w-24 aspect-video bg-card rounded overflow-hidden flex-shrink-0">
                <img src="${DB.comics.find(c=>c.id === comicId).cover_image}" class="w-full h-full object-cover opacity-50" />
                <div class="absolute inset-0 flex items-center justify-center font-heading font-bold text-xl text-white/50 bg-black/40">
                    Ep ${episode.episode_number}
                </div>
            </div>
            <div class="flex-grow">
                <h4 class="text-white font-ui font-medium ${!unlocked ? 'text-text_secondary' : ''}">${episode.title}</h4>
                <p class="text-text_secondary text-xs mt-1">${episode.release_date} • <i class="fa-solid fa-heart mr-1"></i>${episode.likes}</p>
            </div>
            <div class="flex-shrink-0">
                ${episode.is_free ? 
                    `<span class="text-accent text-xs font-bold border border-accent/50 px-2 py-1 rounded-full">Free</span>` : 
                    (unlocked ? 
                        `<span class="text-success text-xs font-bold"><i class="fa-solid fa-check-circle mr-1"></i>Unlocked</span>` : 
                        `<button class="bg-card border border-gold/30 text-gold text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gold/10 transition flex items-center">
                            <i class="fa-solid fa-lock mr-1"></i> ${episode.coin_cost}
                        </button>`
                    )
                }
            </div>
        </div>
    `;}
};

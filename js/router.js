// SPA Router & Views

const views = {
    home: () => {
        const featured = getFeaturedComics()[0];
        const trending = getTrendingComics();
        const newReleases = getNewReleases();
        const exclusives = getExclusiveComics();

        return `
            ${Components.HeroBanner(featured)}
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="flex flex-wrap justify-center gap-3 mb-8">
                    ${DB.genres.map(g => `<button class="bg-card border border-white/10 text-text_secondary hover:text-white hover:border-accent hover:bg-accent/10 px-4 py-2 rounded-full text-sm font-ui transition">${g}</button>`).join('')}
                </div>
            </div>

            ${Components.HorizontalScrollRow("Trending Now", trending)}
            ${Components.HorizontalScrollRow("New Releases", newReleases)}
            
            <div class="py-12 bg-gradient-to-b from-transparent via-primary/30 to-transparent">
                ${Components.HorizontalScrollRow("Premium Exclusives <i class='fa-solid fa-gem text-accent text-lg ml-2'></i>", exclusives)}
            </div>

            <div class="max-w-4xl mx-auto px-4 py-16 text-center">
                <div class="bg-card border border-secondary/50 p-8 rounded-3xl relative overflow-hidden shadow-[0_0_30px_rgba(108,11,169,0.2)]">
                    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] opacity-10 bg-cover bg-center"></div>
                    <div class="relative z-10">
                        <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Unlock Every Dark Desire</h2>
                        <p class="text-text_secondary mb-8 font-ui max-w-lg mx-auto">Get unlimited access to all exclusive stories, completely ad-free. Read anytime, anywhere.</p>
                        <button onclick="router.navigate('/subscribe')" class="bg-gradient-to-r from-secondary to-accent text-white font-ui font-bold py-3 px-10 rounded-full hover:opacity-90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,77,141,0.5)] animate-glow">
                            Subscribe for $4.99/mo
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    browse: () => {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                <h1 class="text-3xl font-heading font-bold text-white mb-8 border-l-4 border-accent pl-3">Browse Comics</h1>
                
                <!-- Filters Mockup -->
                <div class="flex flex-wrap gap-4 mb-8 bg-card p-4 rounded-xl border border-white/5">
                    <select class="bg-background border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
                        <option>All Genres</option>
                        ${DB.genres.map(g => `<option>${g}</option>`).join('')}
                    </select>
                    <select class="bg-background border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
                        <option>Status: All</option>
                        <option>Ongoing</option>
                        <option>Completed</option>
                    </select>
                    <select class="bg-background border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent">
                        <option>Sort By: Popular</option>
                        <option>Newest</option>
                    </select>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    ${DB.comics.map(c => Components.ComicCard(c)).join('')}
                </div>
            </div>
        `;
    },

    comicDetail: (id) => {
        const comic = getComicById(id);
        const episodes = getEpisodesByComicId(id);
        if (!comic) return `<div class="text-center py-20 text-white">Comic not found</div>`;

        return `
            <div class="w-full">
                <!-- Banner -->
                <div class="relative w-full h-64 md:h-96" style="background-image: url('${comic.banner_image}'); background-size: cover; background-position: center;">
                    <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                    <button onclick="router.navigate('/')" class="absolute top-6 left-6 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition z-10">
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
                
                <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 flex flex-col md:flex-row gap-8 pb-12">
                    <!-- Left Col: Cover -->
                    <div class="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
                        <img src="${comic.cover_image}" alt="Cover" class="w-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-2 border-white/10">
                        <button class="w-full mt-4 bg-gradient-to-r from-secondary to-accent text-white font-ui font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(255,77,141,0.4)] hover:opacity-90 transition">
                            <i class="fa-solid fa-book-open mr-2"></i> Read First Ep
                        </button>
                        <button class="w-full mt-2 bg-card border border-white/20 text-white font-ui py-3 rounded-xl hover:bg-white/5 transition">
                            <i class="fa-regular fa-bookmark mr-2"></i> Add to Library
                        </button>
                    </div>
                    
                    <!-- Right Col: Info -->
                    <div class="flex-grow pt-4 md:pt-32">
                        <div class="flex flex-wrap gap-2 mb-3">
                            ${comic.genres.map(g => `<span class="bg-card text-text_secondary border border-white/10 text-xs px-2 py-1 rounded">${g}</span>`).join('')}
                            <span class="bg-error/20 text-error border border-error/30 text-xs font-bold px-2 py-1 rounded">${comic.age_rating}</span>
                        </div>
                        <h1 class="text-3xl md:text-5xl font-heading font-bold text-white mb-2">${comic.title}</h1>
                        <p class="text-text_secondary font-ui mb-4 text-sm">By <span class="text-white font-medium">${comic.author}</span></p>
                        
                        <div class="flex items-center gap-6 mb-6 text-sm border-y border-white/10 py-3">
                            <div class="text-white"><i class="fa-solid fa-star text-gold mr-1"></i> ${comic.rating} <span class="text-text_secondary text-xs">(12k)</span></div>
                            <div class="text-white"><i class="fa-solid fa-eye text-text_secondary mr-1"></i> ${comic.total_views}</div>
                            <div class="text-white"><i class="fa-solid fa-heart text-accent mr-1"></i> ${comic.total_likes}</div>
                            <div class="text-white"><i class="fa-solid fa-list text-text_secondary mr-1"></i> ${comic.episodes_count} Eps</div>
                        </div>
                        
                        <p class="text-text_secondary font-ui leading-relaxed mb-8">${comic.synopsis}</p>
                        
                        <!-- Episodes -->
                        <div class="mt-8">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-xl font-heading font-bold text-white">Episodes</h3>
                                <button class="text-text_secondary text-sm hover:text-white"><i class="fa-solid fa-arrow-down-a-z mr-1"></i> Sort</button>
                            </div>
                            <div class="bg-card/50 rounded-2xl border border-white/5 overflow-hidden">
                                ${episodes.length > 0 ? episodes.map(ep => Components.EpisodeListRow(ep, id)).join('') : '<p class="p-6 text-center text-text_secondary">No episodes yet.</p>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    reader: (comicId, episodeId) => {
        const comic = getComicById(comicId);
        const episode = getEpisodesByComicId(comicId).find(e => e.id === episodeId);
        
        if (!comic || !episode) return `<div class="text-center py-20 text-white">Episode not found</div>`;

        // Check if locked
        const unlocked = isEpisodeUnlocked(episode.id, episode.is_free);

        return `
            <div class="fixed inset-0 z-50 bg-black overflow-y-auto webtoon-reader">
                <!-- Top Nav Overlay -->
                <div id="reader-nav" class="fixed top-0 w-full max-w-[800px] bg-gradient-to-b from-black/90 to-transparent p-4 flex justify-between items-center z-20 transition-opacity duration-300">
                    <button onclick="router.navigate('/comic/${comicId}')" class="text-white w-10 h-10 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-md">
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <div class="text-center">
                        <div class="text-white text-xs font-ui opacity-70">${comic.title}</div>
                        <div class="text-white font-ui font-medium">Ep. ${episode.episode_number} - ${episode.title}</div>
                    </div>
                    <button class="text-white w-10 h-10 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-md">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>

                <!-- Progress Bar -->
                <div class="fixed top-0 left-0 w-full h-1 z-30 max-w-[800px] mx-auto">
                    <div class="h-full bg-accent w-1/3"></div>
                </div>

                <!-- Content -->
                <div class="w-full relative" onclick="document.getElementById('reader-nav').classList.toggle('opacity-0'); document.getElementById('reader-bottom').classList.toggle('opacity-0');">
                    ${!unlocked ? `
                        <div class="absolute inset-0 locked-episode-overlay z-10 flex items-center justify-center">
                            <div class="bg-card p-8 rounded-2xl max-w-sm w-full mx-4 text-center border border-gold/30 shadow-2xl">
                                <div class="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-gold text-2xl">
                                    <i class="fa-solid fa-lock"></i>
                                </div>
                                <h3 class="text-white font-heading text-xl mb-2">Locked Episode</h3>
                                <p class="text-text_secondary text-sm mb-6">Unlock this episode to continue reading ${comic.title}.</p>
                                <button class="w-full bg-gold text-black font-bold py-3 rounded-full hover:bg-yellow-400 transition mb-3 flex justify-center items-center">
                                    <i class="fa-solid fa-unlock mr-2"></i> Unlock for ${episode.coin_cost} Coins
                                </button>
                                <p class="text-xs text-text_secondary">You have: <span class="text-gold font-bold">${DB.user.coins_balance} Coins</span></p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${DB.reader_images.map(img => `<img src="${img}" alt="Comic Page" class="w-full h-auto" loading="lazy">`).join('')}
                    <div class="py-20 text-center">
                        <p class="font-heading text-xl text-white mb-2">To be continued...</p>
                        <div class="flex justify-center gap-4 mt-6">
                            <button class="w-12 h-12 rounded-full bg-card border border-white/10 text-white flex items-center justify-center hover:bg-accent/20 hover:text-accent hover:border-accent transition">
                                <i class="fa-solid fa-heart text-xl"></i>
                            </button>
                            <button class="w-12 h-12 rounded-full bg-card border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition">
                                <i class="fa-solid fa-share text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Bottom Nav Overlay -->
                <div id="reader-bottom" class="fixed bottom-0 w-full max-w-[800px] bg-gradient-to-t from-black via-black/90 to-transparent p-4 pb-safe flex justify-between items-center z-20 transition-opacity duration-300">
                    <button class="text-white px-4 py-2 bg-card/80 border border-white/10 rounded-full text-sm flex items-center backdrop-blur-md">
                        <i class="fa-solid fa-chevron-left mr-2"></i> Prev
                    </button>
                    <button class="text-white px-6 py-2 bg-secondary/80 border border-secondary rounded-full text-sm flex items-center backdrop-blur-md hover:bg-secondary transition">
                        <i class="fa-regular fa-comment mr-2"></i> 4.2k
                    </button>
                    <button class="text-white px-4 py-2 bg-card/80 border border-white/10 rounded-full text-sm flex items-center backdrop-blur-md">
                        Next <i class="fa-solid fa-chevron-right ml-2"></i>
                    </button>
                </div>
            </div>
        `;
    },

    subscribe: () => `
        <div class="max-w-6xl mx-auto px-4 py-16 pt-24">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Choose Your <span class="text-gradient">Midnight</span></h1>
                <p class="text-text_secondary font-ui max-w-xl mx-auto">Unlock ad-free reading, premium exclusive comics, and monthly bonus coins. Cancel anytime.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <!-- Free Plan -->
                <div class="bg-card border border-white/10 rounded-3xl p-8 flex flex-col">
                    <h3 class="text-xl font-ui text-white mb-2">Free</h3>
                    <div class="text-4xl font-bold text-white mb-6">$0<span class="text-base text-text_secondary font-normal">/forever</span></div>
                    <ul class="space-y-4 text-sm text-text_secondary mb-8 flex-grow">
                        <li class="flex"><i class="fa-solid fa-check text-success mt-1 mr-3"></i> First 3 episodes free</li>
                        <li class="flex"><i class="fa-solid fa-check text-success mt-1 mr-3"></i> Basic reading experience</li>
                        <li class="flex opacity-50"><i class="fa-solid fa-xmark mt-1 mr-3"></i> Ads displayed</li>
                    </ul>
                    <button class="w-full py-3 rounded-xl border border-white/20 text-white font-ui hover:bg-white/5 transition">Current Plan</button>
                </div>

                <!-- Basic Plan -->
                <div class="bg-primary border border-secondary relative rounded-3xl p-8 flex flex-col transform md:-translate-y-4 shadow-[0_10px_40px_rgba(108,11,169,0.3)]">
                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
                    <h3 class="text-xl font-ui text-white mb-2 mt-2">Basic</h3>
                    <div class="text-4xl font-bold text-white mb-6">$4.99<span class="text-base text-text_secondary font-normal">/month</span></div>
                    <ul class="space-y-4 text-sm text-white/90 mb-8 flex-grow">
                        <li class="flex"><i class="fa-solid fa-check text-success mt-1 mr-3"></i> All standard episodes unlocked</li>
                        <li class="flex"><i class="fa-solid fa-check text-success mt-1 mr-3"></i> No ads</li>
                        <li class="flex"><i class="fa-solid fa-check text-success mt-1 mr-3"></i> Early access to new episodes</li>
                        <li class="flex font-bold text-gold"><i class="fa-solid fa-coins mt-1 mr-3"></i> 50 bonus coins/month</li>
                    </ul>
                    <button class="w-full py-3 rounded-xl bg-secondary text-white font-bold font-ui hover:bg-opacity-90 transition">Subscribe Now</button>
                </div>

                <!-- Premium Plan -->
                <div class="bg-card border border-accent/50 relative rounded-3xl p-8 flex flex-col">
                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">BEST VALUE</div>
                    <h3 class="text-xl font-ui text-white mb-2 mt-2">Premium</h3>
                    <div class="text-4xl font-bold text-white mb-6">$9.99<span class="text-base text-text_secondary font-normal">/month</span></div>
                    <ul class="space-y-4 text-sm text-text_secondary mb-8 flex-grow">
                        <li class="flex"><i class="fa-solid fa-check text-success mt-1 mr-3"></i> Everything in Basic</li>
                        <li class="flex text-white font-medium"><i class="fa-solid fa-gem text-accent mt-1 mr-3"></i> Exclusive Premium-only comics</li>
                        <li class="flex"><i class="fa-solid fa-check text-success mt-1 mr-3"></i> Download for offline reading</li>
                        <li class="flex font-bold text-gold"><i class="fa-solid fa-coins mt-1 mr-3"></i> 150 bonus coins/month</li>
                    </ul>
                    <button class="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-bold font-ui hover:opacity-90 transition shadow-[0_0_15px_rgba(255,77,141,0.3)]">Go Premium</button>
                </div>
            </div>
        </div>
    `,

    admin: () => `
        <div class="max-w-7xl mx-auto px-4 py-8 pt-24 font-ui">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-heading font-bold text-white"><i class="fa-solid fa-lock text-accent mr-3"></i>Admin Dashboard</h1>
                <div class="bg-card px-4 py-2 rounded-lg border border-white/10 text-sm text-text_secondary">Welcome, Admin User</div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p class="text-text_secondary text-sm mb-1">Total Users</p>
                    <p class="text-3xl font-bold text-white">45,231</p>
                    <p class="text-success text-xs mt-2"><i class="fa-solid fa-arrow-up mr-1"></i> +12% this week</p>
                </div>
                <div class="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p class="text-text_secondary text-sm mb-1">Active Subscribers</p>
                    <p class="text-3xl font-bold text-secondary">12,845</p>
                    <p class="text-success text-xs mt-2"><i class="fa-solid fa-arrow-up mr-1"></i> +5% this week</p>
                </div>
                <div class="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p class="text-text_secondary text-sm mb-1">Monthly Revenue</p>
                    <p class="text-3xl font-bold text-success">$84,520</p>
                    <p class="text-success text-xs mt-2"><i class="fa-solid fa-arrow-up mr-1"></i> +18% this week</p>
                </div>
                <div class="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p class="text-text_secondary text-sm mb-1">Total Coins Sold</p>
                    <p class="text-3xl font-bold text-gold">1.2M</p>
                    <p class="text-error text-xs mt-2"><i class="fa-solid fa-arrow-down mr-1"></i> -2% this week</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Quick Actions -->
                <div class="md:col-span-1">
                    <div class="bg-card rounded-2xl border border-white/5 p-6 mb-8">
                        <h3 class="text-white font-bold mb-4 border-b border-white/10 pb-2">Quick Actions</h3>
                        <ul class="space-y-3">
                            <li><button class="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text_secondary transition"><i class="fa-solid fa-upload mr-3 text-accent"></i> Upload New Comic</button></li>
                            <li><button class="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text_secondary transition"><i class="fa-solid fa-file-image mr-3 text-secondary"></i> Add Episode Pages</button></li>
                            <li><button class="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text_secondary transition"><i class="fa-solid fa-users mr-3 text-success"></i> Manage Users</button></li>
                            <li><button class="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text_secondary transition"><i class="fa-solid fa-comments mr-3 text-gold"></i> Moderate Comments</button></li>
                        </ul>
                    </div>
                </div>

                <!-- Recent Comics -->
                <div class="md:col-span-2">
                    <div class="bg-card rounded-2xl border border-white/5 p-6">
                        <div class="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                            <h3 class="text-white font-bold">Comics Management</h3>
                            <button class="text-accent text-xs hover:text-white">View All</button>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-sm text-text_secondary">
                                <thead>
                                    <tr class="text-white border-b border-white/5">
                                        <th class="pb-3 font-medium">Title</th>
                                        <th class="pb-3 font-medium">Status</th>
                                        <th class="pb-3 font-medium">Episodes</th>
                                        <th class="pb-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${DB.comics.map(c => `
                                        <tr class="border-b border-white/5 hover:bg-white/5">
                                            <td class="py-3 flex items-center gap-3">
                                                <img src="${c.cover_image}" class="w-10 h-10 object-cover rounded">
                                                <span class="text-white truncate max-w-[150px]">${c.title}</span>
                                            </td>
                                            <td class="py-3"><span class="bg-success/20 text-success px-2 py-1 rounded text-xs">${c.status}</span></td>
                                            <td class="py-3">${c.episodes_count}</td>
                                            <td class="py-3">
                                                <button class="text-text_secondary hover:text-accent mr-2"><i class="fa-solid fa-pen"></i></button>
                                                <button class="text-text_secondary hover:text-error"><i class="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

const router = {
    routes: {
        '/': views.home,
        '/browse': views.browse,
        '/subscribe': views.subscribe,
        '/admin': views.admin,
    },
    
    navigate: (path) => {
        // Simple routing logic
        window.scrollTo(0,0);
        const app = document.getElementById('app-content');
        
        // Hide mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if(mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }

        // Handle dynamic routes
        if (path.startsWith('/comic/')) {
            const id = path.split('/')[2];
            app.innerHTML = views.comicDetail(id);
        } else if (path.startsWith('/read/')) {
            const parts = path.split('/');
            const comicId = parts[2];
            const epId = parts[3];
            app.innerHTML = views.reader(comicId, epId);
        } else {
            const render = router.routes[path] || views.home;
            app.innerHTML = render();
        }
        
        // Update URL state
        history.pushState(null, '', '#' + path);
    },
    
    init: () => {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const path = window.location.hash.replace('#', '') || '/';
            router.navigate(path, false);
        });
        
        // Initial load
        const path = window.location.hash.replace('#', '') || '/';
        router.navigate(path);
    }
};

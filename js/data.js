// Mock Database
const DB = {
    user: {
        id: "u123",
        username: "midnight_reader",
        email: "reader@example.com",
        coins_balance: 150,
        subscription_plan: "Free", // Free, Basic, Premium
        is_adult_verified: false,
        bookmarked: ["c1", "c3"],
        unlocked_episodes: []
    },
    
    genres: ["Romance", "Drama", "Fantasy Romance", "School Life", "Office Romance", "Forbidden Love", "Supernatural Romance", "Thriller"],
    
    comics: [
        {
            id: "c1",
            title: "Midnight Contract",
            author: "Luna Eclipse",
            cover_image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            banner_image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "Zara, a struggling graphic designer, signs a one-year contract with the cold and mysterious CEO of a top fashion company. The contract has one secret clause she never expected. As midnight meetings turn into something deeper, the lines between business and desire begin to blur. What happens when the contract expires?",
            genres: ["Romance", "Drama", "Office Romance"],
            status: "Ongoing",
            age_rating: "18+",
            is_featured: true,
            is_exclusive: false,
            total_views: "1.2M",
            total_likes: "450K",
            rating: 4.8,
            episodes_count: 5
        },
        {
            id: "c2",
            title: "Vampire's Kiss",
            author: "Crimson Rose",
            cover_image: "https://images.unsplash.com/photo-1517409261073-49033331b268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            banner_image: "https://images.unsplash.com/photo-1517409261073-49033331b268?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "A dangerous obsession begins when Elena accidentally awakens an ancient vampire lord who mistakes her for his lost love from centuries ago.",
            genres: ["Fantasy Romance", "Supernatural Romance", "Thriller"],
            status: "Ongoing",
            age_rating: "18+",
            is_featured: false,
            is_exclusive: true,
            total_views: "850K",
            total_likes: "210K",
            rating: 4.9,
            episodes_count: 12
        },
        {
            id: "c3",
            title: "Forbidden Professor",
            author: "A.J. Hartley",
            cover_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            banner_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "She was just supposed to be his teaching assistant. But late night grading sessions turn into a dangerous game of forbidden desire.",
            genres: ["Romance", "School Life", "Forbidden Love"],
            status: "Completed",
            age_rating: "18+",
            is_featured: true,
            is_exclusive: false,
            total_views: "2.1M",
            total_likes: "890K",
            rating: 4.7,
            episodes_count: 45
        },
        {
            id: "c4",
            title: "Royal Betrayal",
            author: "QueenBee",
            cover_image: "https://images.unsplash.com/photo-1533157961145-8cb585c7f8f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            banner_image: "https://images.unsplash.com/photo-1533157961145-8cb585c7f8f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "Married off to a cruel prince, the new princess finds solace in the arms of his personal bodyguard.",
            genres: ["Drama", "Forbidden Love", "Romance"],
            status: "Ongoing",
            age_rating: "18+",
            is_featured: false,
            is_exclusive: false,
            total_views: "500K",
            total_likes: "120K",
            rating: 4.5,
            episodes_count: 8
        },
        {
            id: "c5",
            title: "Neon Nights",
            author: "CyberDreamer",
            cover_image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            banner_image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "In a cyberpunk city, an underworld hacker falls for the detective trying to hunt her down.",
            genres: ["Thriller", "Romance", "Drama"],
            status: "Ongoing",
            age_rating: "18+",
            is_featured: false,
            is_exclusive: true,
            total_views: "340K",
            total_likes: "90K",
            rating: 4.6,
            episodes_count: 15
        }
    ],
    
    episodes: {
        "c1": [
            { id: "e1", episode_number: 1, title: "Prologue - The Offer", is_free: true, coin_cost: 0, release_date: "2026-04-01", views: "100K", likes: "10K" },
            { id: "e2", episode_number: 2, title: "The First Meeting", is_free: true, coin_cost: 0, release_date: "2026-04-08", views: "95K", likes: "9K" },
            { id: "e3", episode_number: 3, title: "The Contract", is_free: true, coin_cost: 0, release_date: "2026-04-15", views: "90K", likes: "8.5K" },
            { id: "e4", episode_number: 4, title: "Midnight Rules", is_free: false, coin_cost: 15, release_date: "2026-04-22", views: "45K", likes: "5K" },
            { id: "e5", episode_number: 5, title: "The Secret Floor", is_free: false, coin_cost: 15, release_date: "2026-04-29", views: "40K", likes: "4.8K" }
        ],
        "c2": [
            { id: "e1", episode_number: 1, title: "Awakening", is_free: true, coin_cost: 0, release_date: "2026-03-01", views: "80K", likes: "8K" },
            { id: "e2", episode_number: 2, title: "Blood Bound", is_free: false, coin_cost: 20, release_date: "2026-03-08", views: "30K", likes: "3K" }
        ]
    },

    reader_images: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
};

// Simulated DB operations
function getFeaturedComics() { return DB.comics.filter(c => c.is_featured); }
function getTrendingComics() { return [...DB.comics].sort((a, b) => parseFloat(b.total_views) - parseFloat(a.total_views)).slice(0, 10); }
function getNewReleases() { return [...DB.comics].reverse().slice(0, 5); }
function getExclusiveComics() { return DB.comics.filter(c => c.is_exclusive); }
function getComicById(id) { return DB.comics.find(c => c.id === id); }
function getEpisodesByComicId(id) { return DB.episodes[id] || []; }
function unlockEpisode(episodeId, cost) {
    if (DB.user.coins_balance >= cost) {
        DB.user.coins_balance -= cost;
        DB.user.unlocked_episodes.push(episodeId);
        return true;
    }
    return false;
}
function isEpisodeUnlocked(episodeId, is_free) {
    if (is_free) return true;
    if (DB.user.subscription_plan === "Basic" || DB.user.subscription_plan === "Premium") return true;
    return DB.user.unlocked_episodes.includes(episodeId);
}

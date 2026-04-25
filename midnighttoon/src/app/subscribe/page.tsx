"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Subscribe() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);

    const handlePurchase = async (type: "coins" | "subscription", planId?: string, coinsAmount?: number) => {
        if (!session) {
            router.push("/login");
            return;
        }

        setLoading(planId || coinsAmount?.toString() || "loading");

        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, planId, coinsAmount }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Payment error: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">Choose Your <span className="text-accent">Midnight</span> Plan</h1>
                <p className="text-text-secondary font-ui max-w-2xl mx-auto">Get exclusive access to premium adult webtoons, early releases, and unlimited reading.</p>
            </div>

            {/* Subscription Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {/* Free Plan */}
                <div className="bg-card border border-white/5 p-8 rounded-3xl flex flex-col hover:border-white/20 transition group">
                    <h3 className="text-xl font-bold text-white mb-2">Free Reader</h3>
                    <div className="text-4xl font-bold text-white mb-6">$0<span className="text-sm text-text-secondary font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 flex-grow text-sm text-text-secondary">
                        <li><i className="fa-solid fa-check text-success mr-2"></i> Access to all free chapters</li>
                        <li><i className="fa-solid fa-check text-success mr-2"></i> Daily free pass</li>
                        <li className="opacity-50"><i className="fa-solid fa-xmark text-error mr-2"></i> Ad-free experience</li>
                        <li className="opacity-50"><i className="fa-solid fa-xmark text-error mr-2"></i> Exclusive premium stories</li>
                    </ul>
                    <button disabled className="w-full py-3 rounded-xl border border-white/10 text-white font-bold opacity-50 cursor-not-allowed">Current Plan</button>
                </div>

                {/* Basic Plan */}
                <div className="bg-card border-2 border-secondary p-8 rounded-3xl flex flex-col relative transform md:scale-105 shadow-[0_0_30px_rgba(108,11,169,0.3)]">
                    <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
                    <h3 className="text-xl font-bold text-white mb-2">Midnight Basic</h3>
                    <div className="text-4xl font-bold text-white mb-6">$4.99<span className="text-sm text-text-secondary font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 flex-grow text-sm text-white/80">
                        <li><i className="fa-solid fa-check text-secondary mr-2"></i> Completely Ad-Free</li>
                        <li><i className="fa-solid fa-check text-secondary mr-2"></i> 50 Free Coins monthly</li>
                        <li><i className="fa-solid fa-check text-secondary mr-2"></i> Access to ongoing exclusives</li>
                        <li><i className="fa-solid fa-check text-secondary mr-2"></i> Early release access</li>
                    </ul>
                    <button 
                        onClick={() => handlePurchase("subscription", "Basic")}
                        disabled={loading !== null}
                        className="w-full bg-secondary text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition shadow-lg flex justify-center items-center"
                    >
                        {loading === "Basic" ? <i className="fa-solid fa-spinner fa-spin"></i> : "Subscribe Now"}
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-card border border-gold/30 p-8 rounded-3xl flex flex-col hover:border-gold/50 transition">
                    <h3 className="text-xl font-bold text-gold mb-2">Midnight Premium</h3>
                    <div className="text-4xl font-bold text-white mb-6">$9.99<span className="text-sm text-text-secondary font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 flex-grow text-sm text-text-secondary">
                        <li className="text-white/90"><i className="fa-solid fa-check text-gold mr-2"></i> Unlimited Reading (All Chapters)</li>
                        <li className="text-white/90"><i className="fa-solid fa-check text-gold mr-2"></i> 200 Bonus Coins monthly</li>
                        <li className="text-white/90"><i className="fa-solid fa-check text-gold mr-2"></i> Download for offline reading</li>
                        <li className="text-white/90"><i className="fa-solid fa-check text-gold mr-2"></i> Exclusive Discord role</li>
                    </ul>
                    <button 
                        onClick={() => handlePurchase("subscription", "Premium")}
                        disabled={loading !== null}
                        className="w-full bg-gold text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition shadow-lg flex justify-center items-center"
                    >
                        {loading === "Premium" ? <i className="fa-solid fa-spinner fa-spin"></i> : "Get Premium"}
                    </button>
                </div>
            </div>

            {/* Coin Shop */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-heading font-bold text-white mb-2">Coin Shop</h2>
                <p className="text-text-secondary text-sm">Need more coins? Top up anytime to unlock chapters.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {[
                    { amount: 50, price: 4.99, bonus: 0 },
                    { amount: 120, price: 9.99, bonus: 20 },
                    { amount: 250, price: 19.99, bonus: 50 },
                    { amount: 700, price: 49.99, bonus: 150 },
                ].map(pack => (
                    <div key={pack.amount} className="bg-card border border-white/5 p-6 rounded-2xl text-center hover:border-accent/30 transition group">
                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold group-hover:scale-110 transition">
                            <i className="fa-solid fa-coins text-xl"></i>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{pack.amount} Coins</div>
                        {pack.bonus > 0 && <div className="text-[10px] text-success font-bold mb-4">+{pack.bonus} BONUS</div>}
                        <div className="text-lg text-text-secondary mb-6">${pack.price}</div>
                        <button 
                            onClick={() => handlePurchase("coins", undefined, pack.amount)}
                            disabled={loading !== null}
                            className="w-full bg-background border border-white/10 text-white font-bold py-2 rounded-lg hover:border-accent hover:text-accent transition flex justify-center items-center"
                        >
                            {loading === pack.amount.toString() ? <i className="fa-solid fa-spinner fa-spin"></i> : "Buy"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

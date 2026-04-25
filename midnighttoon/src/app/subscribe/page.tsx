export default function Subscribe() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16 pt-24 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Choose Your <span className="text-gradient">Midnight</span></h1>
                <p className="text-text-secondary font-ui max-w-xl mx-auto">Unlock ad-free reading, premium exclusive comics, and monthly bonus coins. Cancel anytime.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="bg-card border border-white/10 rounded-3xl p-8 flex flex-col">
                    <h3 className="text-xl font-ui text-white mb-2">Free</h3>
                    <div className="text-4xl font-bold text-white mb-6">$0<span className="text-base text-text-secondary font-normal">/forever</span></div>
                    <ul className="space-y-4 text-sm text-text-secondary mb-8 flex-grow">
                        <li className="flex"><i className="fa-solid fa-check text-success mt-1 mr-3"></i> First 3 episodes free</li>
                        <li className="flex"><i className="fa-solid fa-check text-success mt-1 mr-3"></i> Basic reading experience</li>
                        <li className="flex opacity-50"><i className="fa-solid fa-xmark mt-1 mr-3"></i> Ads displayed</li>
                    </ul>
                    <button className="w-full py-3 rounded-xl border border-white/20 text-white font-ui hover:bg-white/5 transition">Current Plan</button>
                </div>

                {/* Basic Plan */}
                <div className="bg-primary border border-secondary relative rounded-3xl p-8 flex flex-col transform md:-translate-y-4 shadow-[0_10px_40px_rgba(108,11,169,0.3)]">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
                    <h3 className="text-xl font-ui text-white mb-2 mt-2">Basic</h3>
                    <div className="text-4xl font-bold text-white mb-6">$4.99<span className="text-base text-text-secondary font-normal">/month</span></div>
                    <ul className="space-y-4 text-sm text-white/90 mb-8 flex-grow">
                        <li className="flex"><i className="fa-solid fa-check text-success mt-1 mr-3"></i> All standard episodes unlocked</li>
                        <li className="flex"><i className="fa-solid fa-check text-success mt-1 mr-3"></i> No ads</li>
                        <li className="flex"><i className="fa-solid fa-check text-success mt-1 mr-3"></i> Early access to new episodes</li>
                        <li className="flex font-bold text-gold"><i className="fa-solid fa-coins mt-1 mr-3"></i> 50 bonus coins/month</li>
                    </ul>
                    <button className="w-full py-3 rounded-xl bg-secondary text-white font-bold font-ui hover:bg-opacity-90 transition">Subscribe Now</button>
                </div>

                {/* Premium Plan */}
                <div className="bg-card border border-accent/50 relative rounded-3xl p-8 flex flex-col">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">BEST VALUE</div>
                    <h3 className="text-xl font-ui text-white mb-2 mt-2">Premium</h3>
                    <div className="text-4xl font-bold text-white mb-6">$9.99<span className="text-base text-text-secondary font-normal">/month</span></div>
                    <ul className="space-y-4 text-sm text-text-secondary mb-8 flex-grow">
                        <li className="flex"><i className="fa-solid fa-check text-success mt-1 mr-3"></i> Everything in Basic</li>
                        <li className="flex text-white font-medium"><i className="fa-solid fa-gem text-accent mt-1 mr-3"></i> Exclusive Premium-only comics</li>
                        <li className="flex"><i className="fa-solid fa-check text-success mt-1 mr-3"></i> Download for offline reading</li>
                        <li className="flex font-bold text-gold"><i className="fa-solid fa-coins mt-1 mr-3"></i> 150 bonus coins/month</li>
                    </ul>
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-bold font-ui hover:opacity-90 transition shadow-[0_0_15px_rgba(255,77,141,0.3)]">Go Premium</button>
                </div>
            </div>
        </div>
    );
}

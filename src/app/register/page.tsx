import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-md w-full bg-card p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary"></div>
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Create Account</h1>
                    <p className="text-text-secondary font-ui text-sm">Join the world of premium webtoons</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-1 ml-1">Username</label>
                        <input 
                            type="text" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" 
                            placeholder="midnight_reader"
                        />
                    </div>
                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-1 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" 
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-1 ml-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" 
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 py-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-background accent-accent" id="terms" />
                        <label htmlFor="terms" className="text-xs text-text-secondary">I agree to the <Link href="#" className="text-accent underline">Terms & Conditions</Link></label>
                    </div>

                    <button className="w-full bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 rounded-xl hover:opacity-90 transition transform hover:scale-[1.02] shadow-[0_0_15px_rgba(255,77,141,0.3)]">
                        Create My Account
                    </button>
                </form>

                <p className="mt-8 text-center text-text-secondary text-sm">
                    Already have an account? <Link href="/login" className="text-accent font-bold hover:underline">Login Here</Link>
                </p>
            </div>
        </div>
    );
}

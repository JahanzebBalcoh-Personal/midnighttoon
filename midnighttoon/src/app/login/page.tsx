import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-md w-full bg-card p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary"></div>
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-text-secondary font-ui text-sm">Enter your details to continue your stories</p>
                </div>

                <form className="space-y-4">
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
                    
                    <div className="flex justify-end">
                        <Link href="#" className="text-xs text-accent hover:text-white transition">Forgot Password?</Link>
                    </div>

                    <button className="w-full bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 rounded-xl hover:opacity-90 transition transform hover:scale-[1.02] shadow-[0_0_15px_rgba(255,77,141,0.3)]">
                        Login to MidnightToon
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <span className="text-text-secondary text-xs">OR CONTINUE WITH</span>
                    <div className="h-px bg-white/10 flex-grow"></div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 bg-background border border-white/10 p-3 rounded-xl hover:bg-white/5 transition text-white text-sm">
                        <i className="fa-brands fa-google text-secondary"></i> Google
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-background border border-white/10 p-3 rounded-xl hover:bg-white/5 transition text-white text-sm">
                        <i className="fa-brands fa-facebook text-blue-500"></i> Facebook
                    </button>
                </div>

                <p className="mt-8 text-center text-text-secondary text-sm">
                    Don't have an account? <Link href="/register" className="text-accent font-bold hover:underline">Register Now</Link>
                </p>
            </div>
        </div>
    );
}

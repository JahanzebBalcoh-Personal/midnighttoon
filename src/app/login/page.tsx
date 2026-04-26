"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-md w-full bg-card p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary"></div>
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-text-secondary font-ui text-sm">Enter your details to continue your stories</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-xl">{error}</div>}
                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-1 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" 
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-1 ml-1">Password</label>
                        <input 
                            type="password" 
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" 
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <Link href="#" className="text-xs text-accent hover:text-white transition">Forgot Password?</Link>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full disabled:opacity-50 bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 rounded-xl hover:opacity-90 transition transform hover:scale-[1.02] shadow-[0_0_15px_rgba(255,77,141,0.3)]">
                        {loading ? "Logging in..." : "Login to MidnightToon"}
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <span className="text-text-secondary text-xs font-bold uppercase tracking-wider">OR CONTINUE WITH</span>
                    <div className="h-px bg-white/10 flex-grow"></div>
                </div>

                <div className="mt-6">
                    <button 
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 bg-background border border-white/10 p-3.5 rounded-xl hover:bg-white/5 transition text-white text-sm font-medium"
                    >
                        <i className="fa-brands fa-google text-secondary text-lg"></i> Continue with Google
                    </button>
                </div>

                <p className="mt-8 text-center text-text-secondary text-sm">
                    Don't have an account? <Link href="/register" className="text-accent font-bold hover:underline">Register Now</Link>
                </p>
            </div>
        </div>
    );
}

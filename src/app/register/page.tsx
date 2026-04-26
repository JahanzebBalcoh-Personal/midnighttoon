"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
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
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                // Log in immediately after registration
                const signInRes = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (signInRes?.error) {
                    setError("Failed to sign in automatically. Please log in.");
                } else {
                    router.push("/");
                    router.refresh();
                }
            } else {
                const data = await res.json();
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-md w-full bg-card p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary"></div>
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Create Account</h1>
                    <p className="text-text-secondary font-ui text-sm">Join the world of premium webtoons</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-xl">{error}</div>}
                    <div>
                        <label className="block text-text-secondary text-xs font-bold uppercase mb-1 ml-1">Username</label>
                        <input 
                            type="text" 
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" 
                            placeholder="midnight_reader"
                        />
                    </div>
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
                    
                    <div className="flex items-center gap-2 py-2">
                        <input type="checkbox" required className="w-4 h-4 rounded border-white/10 bg-background accent-accent" id="terms" />
                        <label htmlFor="terms" className="text-xs text-text-secondary">I agree to the <Link href="#" className="text-accent underline">Terms & Conditions</Link></label>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full disabled:opacity-50 bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 rounded-xl hover:opacity-90 transition transform hover:scale-[1.02] shadow-[0_0_15px_rgba(255,77,141,0.3)]">
                        {loading ? "Creating..." : "Create My Account"}
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <span className="text-text-secondary text-xs font-bold uppercase tracking-wider">OR CONTINUE WITH</span>
                    <div className="h-px bg-white/10 flex-grow"></div>
                </div>

                <div className="mt-6">
                    <button 
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 bg-background border border-white/10 p-3.5 rounded-xl hover:bg-white/5 transition text-white text-sm font-medium"
                    >
                        <i className="fa-brands fa-google text-secondary text-lg"></i> Continue with Google
                    </button>
                </div>

                <p className="mt-8 text-center text-text-secondary text-sm">
                    Already have an account? <Link href="/login" className="text-accent font-bold hover:underline">Login Here</Link>
                </p>
            </div>
        </div>
    );
}

import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-md w-full bg-card p-10 rounded-3xl border border-success/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-success"></div>
                
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 text-success text-4xl animate-bounce">
                    <i className="fa-solid fa-check"></i>
                </div>

                <h1 className="text-3xl font-heading font-bold text-white mb-2">Payment Successful!</h1>
                <p className="text-text-secondary font-ui mb-8">Thank you for your purchase. Your Midnight Coins have been added to your account.</p>

                <div className="space-y-4">
                    <Link href="/" className="block w-full bg-gradient-to-r from-success to-emerald-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition transform hover:scale-[1.02]">
                        Start Reading
                    </Link>
                    <Link href="/profile" className="block w-full border border-white/10 text-text-secondary py-3 rounded-xl hover:bg-white/5 transition">
                        View My Account
                    </Link>
                </div>

                <p className="mt-8 text-[10px] text-text-secondary uppercase tracking-widest">Transaction Secured by Stripe</p>
            </div>
        </div>
    );
}

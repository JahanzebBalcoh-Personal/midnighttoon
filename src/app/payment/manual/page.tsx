"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ManualPayment() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    coins: "",
    method: "Easypaisa",
    proofUrl: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payments/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Payment request submitted! Admin will verify and add coins soon.");
        router.push("/profile");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 min-h-screen">
      <div className="bg-card border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-heading font-bold text-white mb-6">Manual Payment Submission</h1>
        
        <div className="bg-secondary/10 border border-secondary/30 p-4 rounded-xl mb-8">
          <p className="text-accent font-bold mb-2">Instructions:</p>
          <ol className="text-sm text-text-secondary list-decimal ml-4 space-y-2">
            <li>Send the amount to our <strong>Easypaisa/JazzCash</strong> number: <strong>03XXXXXXXXX</strong></li>
            <li>Take a screenshot of the confirmation message.</li>
            <li>Upload the screenshot to <a href="https://imgbb.com" target="_blank" className="text-accent underline">imgbb.com</a> and paste the <strong>Direct Link</strong> below.</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Payment Method</label>
            <select 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              value={formData.method}
              onChange={(e) => setFormData({...formData, method: e.target.value})}
            >
              <option value="Easypaisa">Easypaisa</option>
              <option value="JazzCash">JazzCash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Amount Paid (PKR)</label>
            <input 
              type="number"
              placeholder="e.g. 500"
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              required
              value={formData.amount}
              onChange={(e) => {
                  const val = e.target.value;
                  setFormData({...formData, amount: val, coins: (parseInt(val) || 0).toString() });
              }}
            />
            <p className="text-[10px] text-accent mt-1">1 PKR = 1 Coin</p>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Screenshot Link (from imgbb.com)</label>
            <input 
              type="url"
              placeholder="https://i.ibb.co/..."
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none"
              required
              value={formData.proofUrl}
              onChange={(e) => setFormData({...formData, proofUrl: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-secondary to-accent text-white font-bold py-4 rounded-xl hover:opacity-90 transition flex justify-center items-center"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : "Submit Payment Proof"}
          </button>
        </form>
      </div>
    </div>
  );
}

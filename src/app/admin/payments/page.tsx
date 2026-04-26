"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPayments() {
  const { data: session } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (requestId: string, status: "APPROVED" | "REJECTED") => {
    if (!confirm(`Are you sure you want to ${status} this request?`)) return;

    try {
      const res = await fetch("/api/admin/payments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      });

      if (res.ok) {
        alert(`Request ${status.toLowerCase()} successfully!`);
        fetchRequests();
      } else {
        alert("Action failed.");
      }
    } catch (error) {
      alert("Error processing request.");
    }
  };

  if (loading) return <div className="text-center py-20 text-white">Loading requests...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-3xl font-heading font-bold text-white mb-8">Manual Payment Requests</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-card rounded-2xl overflow-hidden shadow-xl">
          <thead>
            <tr className="bg-white/5 text-text-secondary text-sm">
              <th className="p-4">User</th>
              <th className="p-4">Amount (PKR)</th>
              <th className="p-4">Coins</th>
              <th className="p-4">Method</th>
              <th className="p-4">Proof</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white divide-y divide-white/5">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-white/5 transition">
                <td className="p-4">
                  <div className="text-sm font-bold">{req.user.username}</div>
                  <div className="text-[10px] text-text-secondary">{req.user.email}</div>
                </td>
                <td className="p-4">{req.amount}</td>
                <td className="p-4">{req.coins}</td>
                <td className="p-4">{req.method}</td>
                <td className="p-4">
                  <a href={req.proofUrl} target="_blank" className="text-accent underline text-xs">View Screenshot</a>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    req.status === "PENDING" ? "bg-yellow-500/20 text-yellow-500" :
                    req.status === "APPROVED" ? "bg-success/20 text-success" : "bg-error/20 text-error"
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="p-4">
                  {req.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAction(req.id, "APPROVED")}
                        className="bg-success text-white px-3 py-1 rounded text-xs hover:opacity-80 transition"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(req.id, "REJECTED")}
                        className="bg-error text-white px-3 py-1 rounded text-xs hover:opacity-80 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-center text-text-secondary italic">No payment requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

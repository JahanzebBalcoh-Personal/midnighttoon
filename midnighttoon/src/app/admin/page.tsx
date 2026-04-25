export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pt-24 font-ui min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-white"><i className="fa-solid fa-lock text-accent mr-3"></i>Admin Dashboard</h1>
                <div className="bg-card px-4 py-2 rounded-lg border border-white/10 text-sm text-text-secondary">Welcome, Admin User</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p className="text-text-secondary text-sm mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-white">45,231</p>
                    <p className="text-success text-xs mt-2"><i className="fa-solid fa-arrow-up mr-1"></i> +12% this week</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p className="text-text-secondary text-sm mb-1">Active Subscribers</p>
                    <p className="text-3xl font-bold text-secondary">12,845</p>
                    <p className="text-success text-xs mt-2"><i className="fa-solid fa-arrow-up mr-1"></i> +5% this week</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p className="text-text-secondary text-sm mb-1">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-success">$84,520</p>
                    <p className="text-success text-xs mt-2"><i className="fa-solid fa-arrow-up mr-1"></i> +18% this week</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
                    <p className="text-text-secondary text-sm mb-1">Total Coins Sold</p>
                    <p className="text-3xl font-bold text-gold">1.2M</p>
                    <p className="text-error text-xs mt-2"><i className="fa-solid fa-arrow-down mr-1"></i> -2% this week</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-card rounded-2xl border border-white/5 p-6 mb-8">
                        <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Quick Actions</h3>
                        <ul className="space-y-3">
                            <li><button className="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text-secondary transition"><i className="fa-solid fa-upload mr-3 text-accent"></i> Upload New Comic</button></li>
                            <li><button className="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text-secondary transition"><i className="fa-solid fa-file-image mr-3 text-secondary"></i> Add Episode Pages</button></li>
                            <li><button className="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text-secondary transition"><i className="fa-solid fa-users mr-3 text-success"></i> Manage Users</button></li>
                            <li><button className="w-full text-left bg-background hover:bg-white/5 border border-white/5 p-3 rounded-xl text-sm text-text-secondary transition"><i className="fa-solid fa-comments mr-3 text-gold"></i> Moderate Comments</button></li>
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-card rounded-2xl border border-white/5 p-6">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                            <h3 className="text-white font-bold">Comics Management</h3>
                            <button className="text-accent text-xs hover:text-white">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-text-secondary">
                                <thead>
                                    <tr className="text-white border-b border-white/5">
                                        <th className="pb-3 font-medium">Title</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Episodes</th>
                                        <th className="pb-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-3 flex items-center gap-3">
                                            <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-10 h-10 object-cover rounded" />
                                            <span className="text-white truncate max-w-[150px]">Midnight Contract</span>
                                        </td>
                                        <td className="py-3"><span className="bg-success/20 text-success px-2 py-1 rounded text-xs">Ongoing</span></td>
                                        <td className="py-3">5</td>
                                        <td className="py-3">
                                            <button className="text-text-secondary hover:text-accent mr-2"><i className="fa-solid fa-pen"></i></button>
                                            <button className="text-text-secondary hover:text-error"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

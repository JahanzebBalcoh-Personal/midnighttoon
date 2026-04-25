import prisma from "@/lib/prisma";
import AdminDashboardContent from "@/components/admin/AdminDashboardContent";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const totalComics = await prisma.comic.count();
    const totalUsers = await prisma.user.count();
    const totalArtists = await prisma.artist.count();
    
    const recentComics = await prisma.comic.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { episodes: true } } }
    });

    const stats = {
        totalComics,
        totalUsers,
        totalArtists
    };

    return <AdminDashboardContent stats={stats} recentComics={recentComics} />;
}

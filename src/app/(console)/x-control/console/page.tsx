import { getAdminDashboardStats, getAdminRecentSignups, getAdminMonthlySignups } from "@/lib/queries";
import ConsoleClient from "./ConsoleClient";
import { formatRupiah } from "@/lib/utils";

export default async function ConsoleOverviewPage() {
  const [stats, recentSignups, monthlySignups] = await Promise.all([
    getAdminDashboardStats(),
    getAdminRecentSignups(5),
    getAdminMonthlySignups(),
  ]);

  // Format stats for ConsoleClient (typed, no `any`)
  const formattedStats = [
    { label: "Total Pengguna", value: stats.totalUsers.toLocaleString("id-ID"), icon: "group" },
    { label: "Toko Terdaftar", value: stats.totalStores.toLocaleString("id-ID"), icon: "storefront" },
    { label: "Total Kunjungan", value: stats.totalPageViews.toLocaleString("id-ID"), icon: "visibility" },
    { label: "GMV (Omzet)", value: formatRupiah(Number(stats.totalGMV)), icon: "payments" },
  ];

  // Serialize dates for client component
  const serializedSignups = recentSignups.map((u) => ({
    id: u.id,
    name: u.name,
    storeName: u.storeName ?? "Belum buat toko",
    productCount: u.productCount,
    createdAt: u.createdAt.toISOString(),
  }));

  // Serialize monthly chart data
  const chartData = monthlySignups.map((m) => ({
    label: m.monthLabel,
    count: m.count,
  }));

  return (
    <ConsoleClient
      stats={formattedStats}
      totalUsers={stats.totalUsers}
      recentSignups={serializedSignups}
      chartData={chartData}
    />
  );
}

import { getAdminFinancialOverview, getAdminDashboardStats } from "@/lib/queries";
import KeuanganClient from "./KeuanganClient";
import { formatRupiah } from "@/lib/utils";

export default async function KeuanganPage() {
  const [financial, stats] = await Promise.all([
    getAdminFinancialOverview(),
    getAdminDashboardStats(),
  ]);

  // Serialize for client
  const monthlyRevenue = financial.monthlyRevenue.map((m) => ({
    label: m.monthLabel,
    revenue: Number(m.revenue),
    orderCount: m.orderCount,
  }));

  const recentOrders = financial.recentOrders.map((o) => ({
    invoiceId: o.invoiceId,
    customerName: o.customerName,
    totalAmount: Number(o.totalAmount),
    status: o.status,
    createdAt: o.createdAt.toISOString(),
    storeName: o.storeName ?? "—",
  }));

  const statusBreakdown = financial.statusBreakdown.map((s) => ({
    status: s.status,
    count: s.count,
    total: Number(s.total),
  }));

  const totalGMV = Number(stats.totalGMV);
  const totalOrders = stats.totalOrders;

  return (
    <KeuanganClient
      monthlyRevenue={monthlyRevenue}
      recentOrders={recentOrders}
      statusBreakdown={statusBreakdown}
      totalGMV={totalGMV}
      totalOrders={totalOrders}
    />
  );
}

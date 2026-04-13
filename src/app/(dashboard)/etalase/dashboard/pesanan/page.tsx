import { requireSession } from "@/lib/session";
import { getStoreByUserId, getOrdersByStoreId, getDashboardStats } from "@/lib/queries";
import { redirect } from "next/navigation";
import PesananClient from "./PesananClient";

export default async function PesananPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const [orders, stats] = await Promise.all([
    getOrdersByStoreId(store.id),
    getDashboardStats(store.id),
  ]);

  const serializedOrders = orders.map((o) => ({
    id: o.id,
    invoiceId: o.invoiceId,
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    totalAmount: o.totalAmount,
    status: o.status,
    createdAt: o.createdAt.toISOString(),
    itemsSummary: o.items.map((i) => `${i.productNameSnapshot} x${i.quantity}`).join(", ") || "—",
  }));

  return (
    <PesananClient
      orders={serializedOrders}
      totalOrders={stats.totalOrders}
    />
  );
}

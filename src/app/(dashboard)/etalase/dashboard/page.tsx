import DashboardOverview from "./DashboardClient";
import { requireSession } from "@/lib/session";
import {
  getStoreByUserId,
  getDashboardStats,
  getRecentOrders,
  getProductsByStoreId,
  getLinksByStoreId,
} from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const [stats, recentOrders, products, links] = await Promise.all([
    getDashboardStats(store.id),
    getRecentOrders(store.id, 4),
    getProductsByStoreId(store.id),
    getLinksByStoreId(store.id),
  ]);

  // Serialize orders for client
  const serializedOrders = recentOrders.map((o) => ({
    id: o.id,
    invoiceId: o.invoiceId,
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    totalAmount: o.totalAmount,
    status: o.status,
    createdAt: o.createdAt.toISOString(),
    itemsSummary: o.items.map((i) => i.productNameSnapshot).join(", ") || "—",
  }));

  // Top 5 products (simple sort by sortOrder/id as placeholder for real analytics)
  const topProducts = products.slice(0, 5).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
  }));

  // Top links
  const topLinks = links.slice(0, 4).map((l) => ({
    id: l.id,
    title: l.title,
    iconName: l.iconName ?? "link",
  }));

  return (
    <DashboardOverview
      storeSlug={store.slug}
      stats={stats}
      recentOrders={serializedOrders}
      topProducts={topProducts}
      topLinks={topLinks}
    />
  );
}

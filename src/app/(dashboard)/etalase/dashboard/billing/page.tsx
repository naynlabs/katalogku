import { db } from "@/lib/db";
import { getAdminPlans, getAdminBanks, getStoreByUserId } from "@/lib/queries";
import { requireSession } from "@/lib/session";
import { eq, desc } from "drizzle-orm";
import BillingClient from "./BillingClient";
import { subscriptionInvoices, subscriptions } from "@/lib/db/schema";

export default async function BillingPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  
  if (!store) {
    return <div>Toko tidak ditemukan. Silakan buat toko terlebih dahulu.</div>;
  }

  // Ambil semua paket dan rekening platform
  const [plans, banks] = await Promise.all([
    getAdminPlans(),
    getAdminBanks(),
  ]);

  // Cari langganan yang sedang aktif
  const activeSub = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.storeId, store.id),
    with: { plan: true },
    orderBy: [desc(subscriptions.createdAt)],
  });

  // Cari invoice tagihan yang belum selesai
  const pendingInvoice = await db.query.subscriptionInvoices.findFirst({
    where: (i, { eq, and, or }) => and(
       eq(i.storeId, store.id),
       or(eq(i.status, "PENDING"), eq(i.status, "WAITING_CONFIRMATION"))
    ),
    with: { plan: true },
    orderBy: [desc(subscriptionInvoices.createdAt)],
  });

  const serializedPlans = plans.map(p => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    billingCycle: p.billingCycle,
    limitsJson: p.limitsJson as Record<string, number | boolean> | null,
  }));

  const serializedBanks = banks.filter(b => b.isActive).map(b => ({
    id: b.id,
    bankName: b.bankName,
    accountNumber: b.accountNumber,
    accountName: b.accountName,
    logoUrl: b.logoUrl,
  }));

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Langganan PRO</h1>
        <p className="text-on-surface-variant font-medium mt-1">Upgrade fitur toko Anda untuk maksimalkan penjualan.</p>
      </div>

      <BillingClient 
        plans={serializedPlans} 
        banks={serializedBanks} 
        currentPlanName={activeSub?.plan?.name ?? "FREE"}
        pendingInvoice={pendingInvoice ? {
          invoiceId: pendingInvoice.invoiceId,
          amount: Number(pendingInvoice.amount),
          status: pendingInvoice.status,
          planName: pendingInvoice.plan.name
        } : null}
      />
    </div>
  );
}

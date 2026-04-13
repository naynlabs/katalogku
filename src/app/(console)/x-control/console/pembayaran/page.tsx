import { getAdminBanks } from "@/lib/queries";
import PembayaranClient from "./PembayaranClient";
import { db } from "@/lib/db";
import { subscriptionInvoices } from "@/lib/db/schema";
import { inArray, desc } from "drizzle-orm";

export default async function PembayaranPage() {
  const banks = await getAdminBanks();

  const pendingInvoicesData = await db.query.subscriptionInvoices.findMany({
    where: inArray(subscriptionInvoices.status, ["WAITING_CONFIRMATION", "PENDING"]),
    with: {
      store: true,
      plan: true,
    },
    orderBy: [desc(subscriptionInvoices.createdAt)],
  });

  const serializedBanks = banks.map((b) => ({
    id: b.id,
    bankName: b.bankName,
    accountNumber: b.accountNumber,
    accountName: b.accountName,
    logoUrl: b.logoUrl,
    isActive: b.isActive,
    createdAt: b.createdAt.toISOString(),
  }));

  const serializedInvoices = pendingInvoicesData.map((i) => ({
    id: i.id,
    invoiceId: i.invoiceId,
    amount: Number(i.amount),
    paymentProofUrl: i.paymentProofUrl,
    status: i.status,
    createdAt: i.createdAt.toISOString(),
    storeName: i.store.storeName,
    planName: i.plan.name,
  }));

  return <PembayaranClient banks={serializedBanks} invoices={serializedInvoices} />;
}


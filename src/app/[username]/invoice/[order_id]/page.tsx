import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { stores, orders, orderItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import InvoiceClient from "./InvoiceClient";

export default async function InvoicePage(props: { params: Promise<{ username: string; order_id: string }> }) {
  const params = await props.params;
  const store = await db.query.stores.findFirst({
    where: eq(stores.slug, params.username),
  });

  if (!store) return notFound();

  // Find Order by invoiceId
  const invoiceIdStr = params.order_id;
  const orderData = await db.query.orders.findFirst({
    where: eq(orders.invoiceId, invoiceIdStr),
  });

  if (!orderData || orderData.storeId !== store.id) return notFound();

  // Load Order Items
  const itemsData = await db.query.orderItems.findMany({
    where: eq(orderItems.orderId, orderData.id),
  });

  // Calculate status step
  const getStepForStatus = (status: string) => {
    switch (status) {
      case "PENDING": return 1;
      case "PROCESSING": return 2;
      case "COMPLETED": return 4;
      case "CANCELLED": return 0; // Special case or red color, we'll map to 0 for now
      default: return 1;
    }
  };

  const statusTextMap: Record<string, string> = {
    "PENDING": "Menunggu Pembayaran",
    "PROCESSING": "Diproses oleh Penjual",
    "COMPLETED": "Selesai",
    "CANCELLED": "Dibatalkan",
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta"
    }).format(date).replace(/\./g, ":") + " WIB";
  };

  const invoice = {
    id: orderData.invoiceId,
    date: formatDate(new Date(orderData.createdAt)),
    expiresAt: formatDate(new Date(orderData.createdAt.getTime() + 24 * 60 * 60 * 1000)),
    currentStep: getStepForStatus(orderData.status),
    statusText: statusTextMap[orderData.status] || "Tidak Diketahui",
    storeName: store.storeName,
    storeLogo: store.logoUrl,
    storeWhatsapp: store.whatsappNumber,
    customer: {
      name: orderData.customerName,
      phone: orderData.customerPhone,
      address: orderData.customerAddress || "",
    },
    items: itemsData.map(i => ({
      name: i.productNameSnapshot,
      qty: i.quantity,
      price: Number(i.priceSnapshot),
      variant: "" // We don't have variants yet
    })),
    shipping: 0, // Hardcoded for now
    discount: 0,
    total: Number(orderData.totalAmount),
    payment: {
      bank: "BCA / Mandiri / Tujuan Lain",
      accountNumber: "Mohon chat",
      accountName: store.storeName
    }
  };

  return <InvoiceClient invoice={invoice} />;
}

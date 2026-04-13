import { requireSession } from "@/lib/session";
import { getStoreByUserId, getCustomersByStoreId } from "@/lib/queries";
import { redirect } from "next/navigation";
import AudiensClient from "./AudiensClient";

export default async function AudiensPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const customers = await getCustomersByStoreId(store.id);

  // Serialize format
  const serializedCustomers = customers.map((c) => ({
    id: c.id,
    email: c.phoneNumber || "No Contact",
    phone: c.phoneNumber,
    name: c.name,
    joined: new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(c.createdAt)),
    promoStatus: "Setuju",
  }));

  return <AudiensClient initialAudience={serializedCustomers} />;
}

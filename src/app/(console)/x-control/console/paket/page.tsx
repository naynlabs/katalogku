import { getAdminPlans } from "@/lib/queries";
import PaketClient from "./PaketClient";

export default async function PaketPage() {
  const plans = await getAdminPlans();

  const serialized = plans.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    billingCycle: p.billingCycle,
    limitsJson: p.limitsJson as Record<string, number | boolean> | null,
    isActive: p.isActive,
    createdAt: p.createdAt.toISOString(),
  }));

  return <PaketClient plans={serialized} />;
}

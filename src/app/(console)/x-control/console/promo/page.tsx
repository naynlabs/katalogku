import { getAdminPromos } from "@/lib/queries";
import PromoClient from "./PromoClient";

export default async function PromoPage() {
  const promos = await getAdminPromos();

  const serialized = promos.map((p) => ({
    id: p.id,
    code: p.code,
    discountType: p.discountType,
    discountAmount: Number(p.discountAmount),
    maxUses: p.maxUses,
    usedCount: p.usedCount,
    validUntil: p.validUntil?.toISOString() ?? null,
    isActive: p.isActive,
    createdAt: p.createdAt.toISOString(),
  }));

  return <PromoClient promos={serialized} />;
}

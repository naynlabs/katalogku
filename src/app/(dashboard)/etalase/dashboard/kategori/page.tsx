import { requireSession } from "@/lib/session";
import { getStoreByUserId, getCategoriesByStoreId, getProductsByStoreId } from "@/lib/queries";
import { redirect } from "next/navigation";
import KategoriClient from "./KategoriClient";

export default async function KategoriPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const [categories, products] = await Promise.all([
    getCategoriesByStoreId(store.id),
    getProductsByStoreId(store.id),
  ]);

  // Count products for each category
  const serializedCategories = categories.map((c) => ({
    id: c.id.toString(),
    name: c.name,
    count: products.filter(p => p.categoryId === c.id).length,
    enabled: true, // Placeholder since schema has no isActive, but kept for UI sync
  }));

  return (
    <KategoriClient
      initialCategories={serializedCategories}
    />
  );
}

import KatalogClient from "./KatalogClient";
import { requireSession } from "@/lib/session";
import { getStoreByUserId, getProductsByStoreId, getCategoriesByStoreId } from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function KatalogPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const [products, categories] = await Promise.all([
    getProductsByStoreId(store.id),
    getCategoriesByStoreId(store.id),
  ]);

  // Serialize for client component
  const serializedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    isActive: p.isActive,
    category: p.category ? { id: p.category.id, name: p.category.name } : null,
  }));

  const serializedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  return (
    <KatalogClient
      products={serializedProducts}
      categories={serializedCategories}
    />
  );
}

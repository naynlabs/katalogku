import { requireSession } from "@/lib/session";
import { getStoreByUserId, getCategoriesByStoreId } from "@/lib/queries";
import { redirect } from "next/navigation";
import TambahProdukClient from "./TambahProdukClient";

export default async function TambahProdukPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const categories = await getCategoriesByStoreId(store.id);

  const serializedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  return <TambahProdukClient categories={serializedCategories} />;
}

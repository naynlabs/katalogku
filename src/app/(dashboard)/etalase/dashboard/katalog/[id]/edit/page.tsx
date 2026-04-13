import { requireSession } from "@/lib/session";
import { getStoreByUserId, getProductById, getCategoriesByStoreId } from "@/lib/queries";
import { redirect, notFound } from "next/navigation";
import EditProdukClient from "./EditProdukClient";

export default async function EditProdukPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const productId = parseInt(params.id, 10);
  if (isNaN(productId)) notFound();

  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const [product, categories] = await Promise.all([
    getProductById(productId),
    getCategoriesByStoreId(store.id),
  ]);

  // Ensure product exists and belongs to this store
  if (!product || product.storeId !== store.id) notFound();

  const serializedProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
    isActive: product.isActive,
    stockStatus: product.stockStatus,
    categoryId: product.categoryId,
  };

  const serializedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  return (
    <EditProdukClient
      product={serializedProduct}
      categories={serializedCategories}
    />
  );
}

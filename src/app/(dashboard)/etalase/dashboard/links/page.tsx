import { requireSession } from "@/lib/session";
import { getStoreByUserId, getLinksByStoreId, getSocialLinksByStoreId, getProductsByStoreId } from "@/lib/queries";
import { redirect } from "next/navigation";
import LinksClient from "./LinksClient";

export default async function LinksPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  const [dbLinks, dbSocials, dbProducts] = await Promise.all([
    getLinksByStoreId(store.id),
    getSocialLinksByStoreId(store.id),
    getProductsByStoreId(store.id),
  ]);

  // Serialize for client
  const serializedLinks = dbLinks.map((l) => ({
    id: l.id.toString(),
    type: l.type,
    label: l.title,
    url: l.url ?? "",
    image: l.imageUrl ?? undefined,
    icon: l.iconName ?? undefined,
    iconBg: l.iconBg ?? undefined,
    iconColor: l.iconColor ?? undefined,
    isVisible: l.isActive,
    isFeatured: l.isFeatured,
    animation: l.animationType as "none" | "pulse" | "bounce" | "glow",
  }));

  const serializedSocials = dbSocials.map((s) => ({
    id: s.id.toString(),
    platform: s.platform,
    handle: s.handle,
    url: s.url,
    color: s.color ?? undefined,
  }));

  const serializedProducts = dbProducts.slice(0, 2).map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    cat: p.category?.name ?? "Produk",
    img: p.imageUrl ?? "",
  }));

  // Pass store profile data for hydration
  const storeProfile = {
    name: store.storeName,
    tagline: store.bio ?? "",
    wa: store.whatsappNumber ?? "",
    banner: store.bannerUrl ?? "",
    profile: store.logoUrl ?? "",
    isVerified: true, // Can be stored in DB later
    themeConfig: (store.themeConfig as Record<string, unknown>) ?? {},
  };

  return (
    <LinksClient
      initialLinks={serializedLinks}
      initialSocials={serializedSocials}
      storeProducts={serializedProducts}
      storeProfile={storeProfile}
    />
  );
}

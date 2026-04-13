import { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  getStoreBySlug, 
  getProductsByStoreId, 
  getCategoriesByStoreId, 
  getLinksByStoreId, 
  getSocialLinksByStoreId 
} from "@/lib/queries";
import StorefrontUI from "@/components/storefront/StorefrontUI";
import type { StorefrontData, StoreProfile, Product, StorefrontLink, SocialLink } from "@/types";

export async function generateMetadata(props: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const params = await props.params;
  const store = await getStoreBySlug(params.username);

  if (!store) {
    return {
      title: "Toko Tidak Ditemukan | Katalogku",
      description: "Halaman toko yang Anda cari tidak tersedia."
    };
  }

  const title = `${store.storeName} | Katalogku`;
  const description = store.bio || `Belanja produk terbaik dari ${store.storeName} di Katalogku.`;
  const imageUrl = store.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(store.storeName)}&background=random`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://katalogku.com/${store.slug}`,
      siteName: "Katalogku",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: store.storeName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function StorefrontPage(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  const store = await getStoreBySlug(params.username);

  if (!store) {
    notFound();
  }

  // Fetch related active items
  const [dbProducts, dbCategories, dbLinks, dbSocials] = await Promise.all([
    getProductsByStoreId(store.id),
    getCategoriesByStoreId(store.id),
    getLinksByStoreId(store.id),
    getSocialLinksByStoreId(store.id)
  ]);

  // Parse JSON config safely
  const themeConfig = store.themeConfig ? (store.themeConfig as any) : {};

  const profile: StoreProfile = {
    name: store.storeName,
    tagline: store.bio || "Selamat datang di toko kami!",
    wa: store.whatsappNumber || "",
    profile: store.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(store.storeName)}&background=random`,
    banner: store.bannerUrl || "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=1200",
    isVerified: true,
    theme: themeConfig.theme || "classic-light",

    // Visual Customizations
    bgColor: themeConfig.bgColor || "#f8f9fb",
    bgImage: themeConfig.bgImage || "",
    bgPattern: themeConfig.bgPattern || "none",
    patternColor: themeConfig.patternColor || "#000000",
    patternOpacity: themeConfig.patternOpacity || 5, // 5% by default
    fontFamily: themeConfig.fontFamily || "Inter",
    nameFontSize: themeConfig.nameFontSize || 24,
    bioFontSize: themeConfig.bioFontSize || 14,
    linksFontSize: themeConfig.linksFontSize || 14,
    productTitleFontSize: themeConfig.productTitleFontSize || 14,
    buttonStyle: themeConfig.buttonStyle || "pill",
    productImageStyle: themeConfig.productImageStyle || "rounded",
    productLayout: themeConfig.productLayout || "grid",
    storeLayout: themeConfig.storeLayout || "tabs",
    
    linkButtonColor: themeConfig.linkButtonColor || "#ffffff",
    linkTextColor: themeConfig.linkTextColor || "#191c1e",
    shopButtonColor: themeConfig.shopButtonColor || "#4f46e5",
    shopTextColor: themeConfig.shopTextColor || "#ffffff",

    // Header & Typography
    profileTitleColor: themeConfig.profileTitleColor || "",
    profileBioColor: themeConfig.profileBioColor || "",
    headerAlignment: themeConfig.headerAlignment || "center",
    
    // Effects
    glassmorphism: themeConfig.glassmorphism ?? true,
    
    // Product Specific
    hidePrice: themeConfig.hidePrice ?? false,
    productCtaText: themeConfig.productCtaText || "Pesan",
    hideWatermark: themeConfig.hideWatermark ?? false,

    // Promo Banner
    promoEnabled: themeConfig.promoEnabled ?? false,
    promoLabel: themeConfig.promoLabel || "PROMO",
    promoTitle: themeConfig.promoTitle || "Penawaran Spesial",
    promoButtonText: themeConfig.promoButtonText || "Klaim",
    promoButtonUrl: themeConfig.promoButtonUrl || "#",
    promoTitleFontSize: themeConfig.promoTitleFontSize || 20,
    promoBgColor: themeConfig.promoBgColor || "#4f46e5",
    promoTextColor: themeConfig.promoTextColor || "#ffffff",
    promoBtnBgColor: themeConfig.promoBtnBgColor || "#ffffff",
    promoBtnTextColor: themeConfig.promoBtnTextColor || "#4f46e5",
  };

  const parsedProducts: Product[] = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    cat: p.category ? p.category.name : "Tanpa Kategori",
    img: p.imageUrl || "https://placehold.co/400x500/eeeeee/999999?text=No+Image",
    // No explicit badge directly in DB yet, but can be added later
  }));

  const parsedLinks: StorefrontLink[] = dbLinks.map(l => ({
    type: l.type as "icon" | "image" | "divider",
    label: l.title,
    url: l.url || "#",
    icon: l.iconName || "link",
    image: l.imageUrl || undefined,
    iconBg: l.iconBg || undefined,
    iconColor: l.iconColor || undefined,
    animation: l.animationType as "none" | "pulse" | "bounce" | "glow" || "none",
    isVisible: l.isActive,
    isFeatured: l.isFeatured
  }));

  const parsedSocials: SocialLink[] = dbSocials.map(s => ({
    id: s.id.toString(),
    platform: s.platform,
    handle: s.handle,
    url: s.url,
    color: s.color || undefined,
  }));

  const storefrontData: StorefrontData = {
    ...profile,
    storeId: store.id,
    username: store.slug,
    // ensure unique custom categories or extract from products
    categories: dbCategories.map(c => c.name),
    products: parsedProducts,
    links: parsedLinks,
    socials: parsedSocials,
  };

  return <StorefrontUI data={storefrontData} />;
}

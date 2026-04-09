"use server";

import { db } from "@/lib/db";
import {
  stores,
  products,
  productCategories,
  links,
  socialLinks,
} from "@/lib/db/schema";
import { requireSession } from "@/lib/session";
import { getStoreByUserId } from "@/lib/queries";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Get authenticated user's store or throw */
async function getMyStore() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) throw new Error("Toko tidak ditemukan");
  return store;
}

// ─── Store Actions ──────────────────────────────────────────────────────────

export async function updateStore(data: {
  storeName?: string;
  slug?: string;
  whatsappNumber?: string;
  bio?: string;
  logoUrl?: string;
  bannerUrl?: string;
  category?: string;
  themeConfig?: Record<string, unknown>;
}) {
  const store = await getMyStore();

  // If slug changed, check uniqueness
  if (data.slug && data.slug !== store.slug) {
    const existing = await db.query.stores.findFirst({
      where: eq(stores.slug, data.slug),
    });
    if (existing) return { error: "URL toko sudah digunakan." };
  }

  await db
    .update(stores)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(stores.id, store.id));

  revalidatePath("/etalase/dashboard");
  return { success: true };
}

// ─── Product Actions ────────────────────────────────────────────────────────

export async function createProduct(data: {
  name: string;
  price: string;
  description?: string;
  categoryId?: number;
  imageUrl?: string;
  stockStatus?: "AVAILABLE" | "SOLD_OUT" | "PRE_ORDER";
}) {
  const store = await getMyStore();

  const [result] = await db.insert(products).values({
    storeId: store.id,
    name: data.name,
    price: data.price,
    description: data.description || null,
    categoryId: data.categoryId || null,
    imageUrl: data.imageUrl || null,
    stockStatus: data.stockStatus || "AVAILABLE",
  });

  revalidatePath("/etalase/dashboard/katalog");
  return { success: true, productId: result.insertId };
}

export async function updateProduct(
  productId: number,
  data: {
    name?: string;
    price?: string;
    description?: string;
    categoryId?: number | null;
    imageUrl?: string;
    isActive?: boolean;
    stockStatus?: "AVAILABLE" | "SOLD_OUT" | "PRE_ORDER";
    sortOrder?: number;
  }
) {
  const store = await getMyStore();

  await db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(products.id, productId), eq(products.storeId, store.id)));

  revalidatePath("/etalase/dashboard/katalog");
  return { success: true };
}

export async function deleteProduct(productId: number) {
  const store = await getMyStore();

  await db
    .delete(products)
    .where(and(eq(products.id, productId), eq(products.storeId, store.id)));

  revalidatePath("/etalase/dashboard/katalog");
  return { success: true };
}

// ─── Category Actions ───────────────────────────────────────────────────────

export async function createCategory(name: string) {
  const store = await getMyStore();

  await db.insert(productCategories).values({
    storeId: store.id,
    name,
  });

  revalidatePath("/etalase/dashboard/kategori");
  revalidatePath("/etalase/dashboard/katalog");
  return { success: true };
}

export async function deleteCategory(categoryId: number) {
  const store = await getMyStore();

  await db
    .delete(productCategories)
    .where(
      and(
        eq(productCategories.id, categoryId),
        eq(productCategories.storeId, store.id)
      )
    );

  revalidatePath("/etalase/dashboard/kategori");
  revalidatePath("/etalase/dashboard/katalog");
  return { success: true };
}

// ─── Link Actions ───────────────────────────────────────────────────────────

export async function createLink(data: {
  type: "image" | "icon" | "divider";
  title: string;
  url?: string;
  imageUrl?: string;
  iconName?: string;
  iconBg?: string;
  iconColor?: string;
  isFeatured?: boolean;
  animationType?: "none" | "pulse" | "bounce" | "glow";
}) {
  const store = await getMyStore();

  await db.insert(links).values({
    storeId: store.id,
    ...data,
    url: data.url || null,
    imageUrl: data.imageUrl || null,
    iconName: data.iconName || null,
    iconBg: data.iconBg || null,
    iconColor: data.iconColor || null,
  });

  revalidatePath("/etalase/dashboard/links");
  return { success: true };
}

export async function updateLink(
  linkId: number,
  data: {
    title?: string;
    url?: string;
    imageUrl?: string;
    iconName?: string;
    iconBg?: string;
    iconColor?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    animationType?: "none" | "pulse" | "bounce" | "glow";
    sortOrder?: number;
  }
) {
  const store = await getMyStore();

  await db
    .update(links)
    .set(data)
    .where(and(eq(links.id, linkId), eq(links.storeId, store.id)));

  revalidatePath("/etalase/dashboard/links");
  return { success: true };
}

export async function deleteLink(linkId: number) {
  const store = await getMyStore();

  await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.storeId, store.id)));

  revalidatePath("/etalase/dashboard/links");
  return { success: true };
}

// ─── Social Link Actions ────────────────────────────────────────────────────

export async function createSocialLink(data: {
  platform: string;
  handle: string;
  url: string;
  color?: string;
}) {
  const store = await getMyStore();

  await db.insert(socialLinks).values({
    storeId: store.id,
    platform: data.platform,
    handle: data.handle,
    url: data.url,
    color: data.color || null,
  });

  revalidatePath("/etalase/dashboard/links");
  return { success: true };
}

export async function deleteSocialLink(socialLinkId: number) {
  const store = await getMyStore();

  await db
    .delete(socialLinks)
    .where(
      and(eq(socialLinks.id, socialLinkId), eq(socialLinks.storeId, store.id))
    );

  revalidatePath("/etalase/dashboard/links");
  return { success: true };
}

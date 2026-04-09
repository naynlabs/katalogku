"use server";

import { db } from "@/lib/db";
import { stores } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createStore(formData: {
  storeName: string;
  storeSlug: string;
  whatsappNumber: string;
  category?: string;
  fullName?: string;
}) {
  // Get the current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "Anda harus login terlebih dahulu." };
  }

  // Check if user already has a store
  const existingStore = await db.query.stores.findFirst({
    where: (s, { eq }) => eq(s.userId, session.user.id),
  });

  if (existingStore) {
    return { error: "Anda sudah memiliki toko.", storeSlug: existingStore.slug };
  }

  // Check if slug is already taken
  const slugTaken = await db.query.stores.findFirst({
    where: (s, { eq }) => eq(s.slug, formData.storeSlug),
  });

  if (slugTaken) {
    return { error: "URL toko sudah digunakan. Silakan pilih URL lain." };
  }

  try {
    await db.insert(stores).values({
      userId: session.user.id,
      storeName: formData.storeName,
      slug: formData.storeSlug,
      whatsappNumber: formData.whatsappNumber,
      category: formData.category || null,
    });

    return { success: true, storeSlug: formData.storeSlug };
  } catch {
    return { error: "Gagal membuat toko. Silakan coba lagi." };
  }
}

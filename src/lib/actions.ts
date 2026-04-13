"use server";

import { db } from "@/lib/db";
import {
  stores,
  products,
  productCategories,
  links,
  socialLinks,
  orders,
  orderItems,
  customers,
  pageViews,
  productClicks,
  linkClicks,
  promocodes,
  feedbacks,
  themes,
  subscriptionPlans,
  platformBanks,
  subscriptionInvoices,
  subscriptions,
} from "@/lib/db/schema";
import { requireSession } from "@/lib/session";
import { getStoreByUserId } from "@/lib/queries";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getImageKitAuthParams } from "@/lib/imagekit";

// ─── Helpers ────────────────────────────────────────────────────────────────

export async function getUploadSignature() {
  await requireSession(); // Ensure user is authenticated
  return getImageKitAuthParams();
}

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
  teksConfig?: Record<string, unknown>;
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

export async function updateCategory(categoryId: number, name: string) {
  const store = await getMyStore();

  await db
    .update(productCategories)
    .set({ name })
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

export async function reorderCategories(orderedIds: number[]) {
  const store = await getMyStore();
  
  // Provide sortOrder for each ID
  const updates = orderedIds.map((id, index) => 
    db.update(productCategories)
      .set({ sortOrder: index })
      .where(and(eq(productCategories.id, id), eq(productCategories.storeId, store.id)))
  );

  await Promise.all(updates);

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

export async function updateSocialLink(
  socialLinkId: number,
  data: { handle?: string; url?: string; color?: string }
) {
  const store = await getMyStore();

  await db
    .update(socialLinks)
    .set(data)
    .where(and(eq(socialLinks.id, socialLinkId), eq(socialLinks.storeId, store.id)));

  revalidatePath("/etalase/dashboard/links");
  return { success: true };
}

// ─── Order Actions ──────────────────────────────────────────────────────────

export async function createCartOrder({
  storeId,
  customerName,
  customerPhone,
  customerAddress,
  notes,
  cartItems,
}: {
  storeId: number;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  notes?: string;
  cartItems: { id: number; qty: number }[];
}) {
  if (cartItems.length === 0) return { error: "Cart is empty" };

  try {
    // 1. Fetch real product prices from DB to ensure no client-side spoofing
    const productIds = cartItems.map((c) => c.id);
    const dbProducts = await db.query.products.findMany({
      where: (p, { inArray }) => inArray(p.id, productIds),
    });

    let totalAmount = 0;
    const finalItems = cartItems.map((cartItem) => {
      const dbProd = dbProducts.find((p) => p.id === cartItem.id);
      if (!dbProd) throw new Error("Product not found");
      const subtotal = Number(dbProd.price) * cartItem.qty;
      totalAmount += subtotal;
      return {
        productId: dbProd.id,
        productNameSnapshot: dbProd.name,
        priceSnapshot: dbProd.price,
        quantity: cartItem.qty,
      };
    });

    // 2. Generate unique Invoice ID
    const invoiceStr = `INV-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

    // 3. Insert Order
    const [insertedOrder] = await db.insert(orders).values({
      invoiceId: invoiceStr,
      storeId,
      customerName,
      customerPhone,
      customerAddress: customerAddress || null,
      notes: notes || null,
      totalAmount: totalAmount.toString(),
      status: "PENDING",
    }).$returningId();

    const orderId = insertedOrder.id;

    // 4. Insert Order Items (Sequential or Batch, here we batch map)
    await db.insert(orderItems).values(
      finalItems.map((fi) => ({
        orderId,
        productId: fi.productId,
        productNameSnapshot: fi.productNameSnapshot,
        priceSnapshot: fi.priceSnapshot.toString(),
        quantity: fi.quantity,
      }))
    );

    // 5. Update/Insert Customer CRM logic if needed (optional bonus points)
    const existingCust = await db.query.customers.findFirst({
      where: (c, { and, eq }) => and(eq(c.storeId, storeId), eq(c.phoneNumber, customerPhone)),
    });

    if (existingCust) {
      await db.update(customers)
        .set({
          totalSpent: (Number(existingCust.totalSpent) + totalAmount).toString(),
          totalOrders: existingCust.totalOrders + 1,
        })
        .where(eq(customers.id, existingCust.id));
    } else {
      await db.insert(customers).values({
        storeId,
        name: customerName,
        phoneNumber: customerPhone,
        totalSpent: totalAmount.toString(),
        totalOrders: 1,
      });
    }

    // Revalidate storefront path maybe? Not strictly necessary for public, but good for dashboard
    // revalidatePath(`/${storename}`); -> we don't have storename readily, but dashboard needs it:
    revalidatePath("/etalase/dashboard/pesanan");
    revalidatePath("/etalase/dashboard/audiens");

    return { success: true, invoiceId: invoiceStr };
  } catch (error) {
    console.error("Cart order error:", error);
    return { error: "Failed to create order" };
  }
}

export async function updateOrderStatus(
  orderId: number,
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"
) {
  const store = await getMyStore();

  await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(orders.id, orderId), eq(orders.storeId, store.id)));

  revalidatePath("/etalase/dashboard/pesanan");
  revalidatePath("/etalase/dashboard");
  return { success: true };
}

// ─── Bulk Link Sync ─────────────────────────────────────────────────────────

/** Sync all links in a single batch (delete all + re-insert) */
export async function syncLinks(
  linksData: {
    type: "image" | "icon" | "divider";
    title: string;
    url?: string;
    imageUrl?: string;
    iconName?: string;
    iconBg?: string;
    iconColor?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    animationType?: "none" | "pulse" | "bounce" | "glow";
    sortOrder: number;
  }[]
) {
  const store = await getMyStore();

  // Delete existing links and re-insert (atomic replace)
  await db.delete(links).where(eq(links.storeId, store.id));

  if (linksData.length > 0) {
    await db.insert(links).values(
      linksData.map((l) => ({
        storeId: store.id,
        type: l.type,
        title: l.title,
        url: l.url || null,
        imageUrl: l.imageUrl || null,
        iconName: l.iconName || null,
        iconBg: l.iconBg || null,
        iconColor: l.iconColor || null,
        isActive: l.isActive ?? true,
        isFeatured: l.isFeatured ?? false,
        animationType: l.animationType ?? "none",
        sortOrder: l.sortOrder,
      }))
    );
  }

  revalidatePath("/etalase/dashboard/links");
  return { success: true };
}

/** Sync all social links in a single batch (delete all + re-insert) */
export async function syncSocialLinks(
  socialsData: {
    platform: string;
    handle: string;
    url: string;
    color?: string;
    sortOrder: number;
  }[]
) {
  const store = await getMyStore();

  await db.delete(socialLinks).where(eq(socialLinks.storeId, store.id));

  if (socialsData.length > 0) {
    await db.insert(socialLinks).values(
      socialsData.map((s) => ({
        storeId: store.id,
        platform: s.platform,
        handle: s.handle,
        url: s.url,
        color: s.color || null,
        sortOrder: s.sortOrder,
      }))
    );
  }

  revalidatePath("/etalase/dashboard/links");
  return { success: true };
}

// ─── Analytics Tracking ───────────────────────────────────────────────────────

/**
 * Log page view efficiently (Fire and forget).
 */
export async function logPageView(storeId: number, userAgent?: string, referrer?: string) {
  try {
    await db.insert(pageViews).values({
      storeId,
      userAgent: userAgent?.slice(0, 255) || null,
      referrer: referrer?.slice(0, 255) || null,
    });
  } catch (error) {
    // Silent fail so it never breaks the user flow. Tracker is non-critical.
    console.error("Failed to log page view:", error);
  }
}

/**
 * Log product click efficiently (Fire and forget).
 */
export async function logProductClick(storeId: number, productId: number) {
  try {
    await db.insert(productClicks).values({
      storeId,
      productId,
    });
  } catch (error) {
    console.error("Failed to log product click:", error);
  }
}

/**
 * Log link click efficiently (Fire and forget).
 */
export async function logLinkClick(storeId: number, linkId: number) {
  try {
    await db.insert(linkClicks).values({
      storeId,
      linkId,
    });
  } catch (error) {
    console.error("Failed to log link click:", error);
  }
}

// ─── Super Admin Actions ────────────────────────────────────────────────────

/** Require admin role — throws if not ADMIN */
async function requireAdmin() {
  const session = await requireSession();
  if (session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required.");
  }
  return session;
}

/** Toggle store active status (ban/unban) */
export async function adminToggleStoreStatus(storeId: number, isActive: boolean) {
  await requireAdmin();
  await db.update(stores).set({ isActive }).where(eq(stores.id, storeId));
  revalidatePath("/x-control/console/pengguna");
  return { success: true };
}

/** Create a new promo code */
export async function adminCreatePromo(data: {
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountAmount: number;
  maxUses?: number;
  validUntil?: Date;
}) {
  await requireAdmin();
  await db.insert(promocodes).values({
    code: data.code.toUpperCase(),
    discountType: data.discountType,
    discountAmount: String(data.discountAmount),
    maxUses: data.maxUses ?? null,
    validUntil: data.validUntil ?? null,
  });
  revalidatePath("/x-control/console/promo");
  return { success: true };
}

/** Toggle promo code active status */
export async function adminTogglePromo(promoId: number, isActive: boolean) {
  await requireAdmin();
  await db.update(promocodes).set({ isActive }).where(eq(promocodes.id, promoId));
  revalidatePath("/x-control/console/promo");
  return { success: true };
}

/** Update feedback status */
export async function adminUpdateFeedbackStatus(
  feedbackId: number,
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
) {
  await requireAdmin();
  await db.update(feedbacks).set({ status }).where(eq(feedbacks.id, feedbackId));
  revalidatePath("/x-control/console/feedback");
  return { success: true };
}

/** Create a new theme */
export async function adminCreateTheme(data: {
  internalName: string;
  displayName: string;
  cssVariablesJson?: Record<string, string>;
  previewImageUrl?: string;
  isProOnly?: boolean;
}) {
  await requireAdmin();
  await db.insert(themes).values({
    internalName: data.internalName,
    displayName: data.displayName,
    cssVariablesJson: data.cssVariablesJson ?? null,
    previewImageUrl: data.previewImageUrl ?? null,
    isProOnly: data.isProOnly ?? false,
  });
  revalidatePath("/x-control/console/tema");
  return { success: true };
}

/** Create or update a subscription plan */
export async function adminUpsertPlan(data: {
  id?: number;
  name: string;
  price: number;
  billingCycle: "MONTHLY" | "YEARLY" | "LIFETIME";
  limitsJson?: Record<string, number | boolean>;
  isActive?: boolean;
}) {
  await requireAdmin();
  if (data.id) {
    await db.update(subscriptionPlans).set({
      name: data.name,
      price: String(data.price),
      billingCycle: data.billingCycle,
      limitsJson: data.limitsJson ?? null,
      isActive: data.isActive ?? true,
    }).where(eq(subscriptionPlans.id, data.id));
  } else {
    await db.insert(subscriptionPlans).values({
      name: data.name,
      price: String(data.price),
      billingCycle: data.billingCycle,
      limitsJson: data.limitsJson ?? null,
      isActive: data.isActive ?? true,
    });
  }
  revalidatePath("/x-control/console/paket");
  return { success: true };
}

// ============================================================
// ADMIN BANK & BILLING ACTIONS
// ============================================================

export async function adminUpsertBank(data: {
  id?: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  logoUrl?: string;
  isActive: boolean;
}) {
  await requireAdmin();
  if (data.id) {
    await db.update(platformBanks).set({
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      logoUrl: data.logoUrl,
      isActive: data.isActive,
    }).where(eq(platformBanks.id, data.id));
  } else {
    await db.insert(platformBanks).values({
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      logoUrl: data.logoUrl,
      isActive: data.isActive,
    });
  }
  revalidatePath("/x-control/console/pembayaran");
  return { success: true };
}

export async function adminDeleteBank(id: number) {
  await requireAdmin();
  await db.delete(platformBanks).where(eq(platformBanks.id, id));
  revalidatePath("/x-control/console/pembayaran");
  return { success: true };
}

// ============================================================
// PUBLIC OR MERCHANT BILLING ACTIONS
// ============================================================

export async function merchantCheckoutSubscription(planId: number, promoCode: string | null = null) {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) throw new Error("Store not found");

  const plan = await db.query.subscriptionPlans.findFirst({
    where: eq(subscriptionPlans.id, planId),
  });
  if (!plan) throw new Error("Plan not found");

  let amount = Number(plan.price);
  let appliedPromoId = null;

  if (promoCode) {
    const promo = await db.query.promocodes.findFirst({
      where: (p, { eq, and }) => and(
        eq(p.code, promoCode),
        eq(p.isActive, true)
      ),
    });

    if (promo) {
      if (promo.discountType === "PERCENTAGE") {
        amount = amount - (amount * Number(promo.discountAmount) / 100);
      } else {
        amount = amount - Number(promo.discountAmount);
      }
      if (amount < 0) amount = 0;
      appliedPromoId = promo.id;
    } else {
      throw new Error("Promo code invalid or inactive");
    }
  }

  const invoiceId = "INV-SUB-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

  await db.insert(subscriptionInvoices).values({
    invoiceId,
    storeId: store.id,
    planId: plan.id,
    amount: amount.toString(),
    promoCodeId: appliedPromoId,
    status: "PENDING",
  });

  return { invoiceId };
}

export async function merchantConfirmPayment(invoiceId: string, proofUrl: string | null) {
  const session = await requireSession();
  
  await db.update(subscriptionInvoices)
    .set({
      status: "WAITING_CONFIRMATION",
      paymentProofUrl: proofUrl
    })
    .where(eq(subscriptionInvoices.invoiceId, invoiceId));

  revalidatePath("/etalase/dashboard/billing");
  return { success: true };
}

export async function adminApproveSubscription(invoiceId: string) {
  await requireAdmin();
  
  const invoice = await db.query.subscriptionInvoices.findFirst({
    where: eq(subscriptionInvoices.invoiceId, invoiceId),
    with: {
      plan: true
    }
  });

  if (!invoice) throw new Error("Invoice not found");

  await db.transaction(async (tx) => {
    await tx.update(subscriptionInvoices)
      .set({ status: "PAID" })
      .where(eq(subscriptionInvoices.id, invoice.id));

    const endDate = new Date();
    if (invoice.plan.billingCycle === "MONTHLY") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (invoice.plan.billingCycle === "YEARLY") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 100);
    }

    const currentSub = await tx.query.subscriptions.findFirst({
      where: eq(subscriptions.storeId, invoice.storeId)
    });

    if (currentSub) {
      await tx.update(subscriptions)
        .set({
          planId: invoice.planId,
          status: "ACTIVE",
          endDate: endDate
        })
        .where(eq(subscriptions.id, currentSub.id));
    } else {
      await tx.insert(subscriptions).values({
        storeId: invoice.storeId,
        planId: invoice.planId,
        status: "ACTIVE",
        endDate: endDate
      });
    }
  });

  revalidatePath("/x-control/console/keuangan");
  return { success: true };
}

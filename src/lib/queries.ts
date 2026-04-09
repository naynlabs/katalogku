import { db } from "./db";
import { eq, desc, count, sql } from "drizzle-orm";
import {
  stores,
  products,
  productCategories,
  links,
  socialLinks,
  orders,
  customers,
  pageViews,
} from "./db/schema";

// ─── Store Queries ──────────────────────────────────────────────────────────

/** Get store by user ID (most common query — 1 user = 1 store) */
export async function getStoreByUserId(userId: string) {
  return db.query.stores.findFirst({
    where: eq(stores.userId, userId),
  });
}

/** Get store by slug (for public storefront) */
export async function getStoreBySlug(slug: string) {
  return db.query.stores.findFirst({
    where: eq(stores.slug, slug),
    with: {
      user: { columns: { id: true, name: true, image: true } },
    },
  });
}

// ─── Product Queries ────────────────────────────────────────────────────────

/** Get all products for a store */
export async function getProductsByStoreId(storeId: number) {
  return db.query.products.findMany({
    where: eq(products.storeId, storeId),
    with: { category: true },
    orderBy: [products.sortOrder],
  });
}

/** Get single product */
export async function getProductById(productId: number) {
  return db.query.products.findFirst({
    where: eq(products.id, productId),
    with: { category: true },
  });
}

// ─── Category Queries ───────────────────────────────────────────────────────

/** Get all categories for a store */
export async function getCategoriesByStoreId(storeId: number) {
  return db.query.productCategories.findMany({
    where: eq(productCategories.storeId, storeId),
    orderBy: [productCategories.sortOrder],
  });
}

// ─── Link Queries ───────────────────────────────────────────────────────────

/** Get all links for a store */
export async function getLinksByStoreId(storeId: number) {
  return db.query.links.findMany({
    where: eq(links.storeId, storeId),
    orderBy: [links.sortOrder],
  });
}

/** Get all social links for a store */
export async function getSocialLinksByStoreId(storeId: number) {
  return db.query.socialLinks.findMany({
    where: eq(socialLinks.storeId, storeId),
    orderBy: [socialLinks.sortOrder],
  });
}

// ─── Order Queries ──────────────────────────────────────────────────────────

/** Get recent orders for a store */
export async function getRecentOrders(storeId: number, limit = 5) {
  return db.query.orders.findMany({
    where: eq(orders.storeId, storeId),
    with: { items: true },
    orderBy: [desc(orders.createdAt)],
    limit,
  });
}

// ─── Dashboard Stats ────────────────────────────────────────────────────────

/** Get dashboard overview counts in a single efficient query batch */
export async function getDashboardStats(storeId: number) {
  const [productCount, orderCount, customerCount, pageViewCount] =
    await Promise.all([
      db
        .select({ count: count() })
        .from(products)
        .where(eq(products.storeId, storeId)),
      db
        .select({ count: count() })
        .from(orders)
        .where(eq(orders.storeId, storeId)),
      db
        .select({ count: count() })
        .from(customers)
        .where(eq(customers.storeId, storeId)),
      db
        .select({ count: count() })
        .from(pageViews)
        .where(eq(pageViews.storeId, storeId)),
    ]);

  // Revenue sum
  const [revenueResult] = await db
    .select({ total: sql<string>`COALESCE(SUM(total_amount), 0)` })
    .from(orders)
    .where(eq(orders.storeId, storeId));

  return {
    totalProducts: productCount[0]?.count ?? 0,
    totalOrders: orderCount[0]?.count ?? 0,
    totalCustomers: customerCount[0]?.count ?? 0,
    totalPageViews: pageViewCount[0]?.count ?? 0,
    totalRevenue: revenueResult?.total ?? "0",
  };
}

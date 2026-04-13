import { db } from "./db";
import { eq, desc, count, sql, and } from "drizzle-orm";
import {
  stores,
  products,
  productCategories,
  links,
  socialLinks,
  orders,
  customers,
  pageViews,
  productClicks,
  users,
  subscriptionPlans,
  subscriptions,
  promocodes,
  feedbacks,
  themes,
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

// ─── Customer Queries ───────────────────────────────────────────────────────

/** Get all customers for a store */
export async function getCustomersByStoreId(storeId: number) {
  return db.query.customers.findMany({
    where: eq(customers.storeId, storeId),
    orderBy: [desc(customers.createdAt)],
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

/** Get all orders for a store (pesanan page — no limit) */
export async function getOrdersByStoreId(storeId: number) {
  return db.query.orders.findMany({
    where: eq(orders.storeId, storeId),
    with: { items: true },
    orderBy: [desc(orders.createdAt)],
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

/** Get analytics data for charting (grouped by date) */
export async function getStoreAnalytics(storeId: number, days: number = 7) {
  // Using SQL to group by date
  const viewsDaily = await db
    .select({
      dateStr: sql<string>`DATE(created_at)`,
      count: count(),
    })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.storeId, storeId),
        sql`created_at >= DATE_SUB(NOW(), INTERVAL ${days} DAY)`
      )
    )
    .groupBy(sql`DATE(created_at)`)
    .orderBy(sql`DATE(created_at)`);

  const clicksDaily = await db
    .select({
      dateStr: sql<string>`DATE(created_at)`,
      count: count(),
    })
    .from(productClicks)
    .where(
      and(
        eq(productClicks.storeId, storeId),
        sql`created_at >= DATE_SUB(NOW(), INTERVAL ${days} DAY)`
      )
    )
    .groupBy(sql`DATE(created_at)`)
    .orderBy(sql`DATE(created_at)`);

  return { viewsDaily, clicksDaily };
}

// ─── Super Admin Queries ────────────────────────────────────────────────────

/** Get global platform stats for Super Admin console */
export async function getAdminDashboardStats() {
  const [userCount, storeCount, pageViewCount, orderCount] =
    await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(stores),
      db.select({ count: count() }).from(pageViews),
      db.select({ count: count() }).from(orders),
    ]);

  // Global GMV (total order value across all stores)
  const [revenueResult] = await db
    .select({ total: sql<string>`COALESCE(SUM(total_amount), 0)` })
    .from(orders);

  return {
    totalUsers: userCount[0]?.count ?? 0,
    totalStores: storeCount[0]?.count ?? 0,
    totalPageViews: pageViewCount[0]?.count ?? 0,
    totalOrders: orderCount[0]?.count ?? 0,
    totalGMV: revenueResult?.total ?? "0",
  };
}

/** Get all users with their store info + stats (single query, no N+1) */
export async function getAdminUsers() {
  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
      storeId: stores.id,
      storeName: stores.storeName,
      storeSlug: stores.slug,
      storeIsActive: stores.isActive,
      storeCategory: stores.category,
      productCount: sql<number>`COALESCE((SELECT COUNT(*) FROM products WHERE products.store_id = ${stores.id}), 0)`,
      viewCount: sql<number>`COALESCE((SELECT COUNT(*) FROM page_views WHERE page_views.store_id = ${stores.id}), 0)`,
      orderCount: sql<number>`COALESCE((SELECT COUNT(*) FROM orders WHERE orders.store_id = ${stores.id}), 0)`,
    })
    .from(users)
    .leftJoin(stores, eq(users.id, stores.userId))
    .orderBy(desc(users.createdAt));
}

/** Get recent signups (latest users with store info, limited) */
export async function getAdminRecentSignups(limit = 5) {
  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
      storeName: stores.storeName,
      storeSlug: stores.slug,
      productCount: sql<number>`COALESCE((SELECT COUNT(*) FROM products WHERE products.store_id = ${stores.id}), 0)`,
    })
    .from(users)
    .leftJoin(stores, eq(users.id, stores.userId))
    .orderBy(desc(users.createdAt))
    .limit(limit);
}

/** Get monthly signup counts for the last 12 months (chart data) */
export async function getAdminMonthlySignups() {
  return db
    .select({
      month: sql<string>`DATE_FORMAT(created_at, '%Y-%m')`,
      monthLabel: sql<string>`DATE_FORMAT(created_at, '%b')`,
      count: count(),
    })
    .from(stores)
    .where(sql`created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)`)
    .groupBy(sql`DATE_FORMAT(created_at, '%Y-%m')`, sql`DATE_FORMAT(created_at, '%b')`)
    .orderBy(sql`DATE_FORMAT(created_at, '%Y-%m')`);
}

/** Get platform-wide financial overview (order-based revenue aggregation) */
export async function getAdminFinancialOverview() {
  // Monthly revenue for chart (last 6 months)
  const monthlyRevenue = await db
    .select({
      month: sql<string>`DATE_FORMAT(created_at, '%Y-%m')`,
      monthLabel: sql<string>`DATE_FORMAT(created_at, '%b')`,
      revenue: sql<string>`COALESCE(SUM(total_amount), 0)`,
      orderCount: count(),
    })
    .from(orders)
    .where(sql`created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)`)
    .groupBy(sql`DATE_FORMAT(created_at, '%Y-%m')`, sql`DATE_FORMAT(created_at, '%b')`)
    .orderBy(sql`DATE_FORMAT(created_at, '%Y-%m')`);

  // Recent orders across all stores (for transaction table)
  const recentOrders = await db
    .select({
      invoiceId: orders.invoiceId,
      customerName: orders.customerName,
      totalAmount: orders.totalAmount,
      status: orders.status,
      createdAt: orders.createdAt,
      storeName: stores.storeName,
      storeSlug: stores.slug,
    })
    .from(orders)
    .leftJoin(stores, eq(orders.storeId, stores.id))
    .orderBy(desc(orders.createdAt))
    .limit(20);

  // Total completed vs pending vs cancelled
  const statusBreakdown = await db
    .select({
      status: orders.status,
      count: count(),
      total: sql<string>`COALESCE(SUM(total_amount), 0)`,
    })
    .from(orders)
    .groupBy(orders.status);

  return { monthlyRevenue, recentOrders, statusBreakdown };
}

/** Get all promo codes */
export async function getAdminPromos() {
  return db.query.promocodes.findMany({
    orderBy: [desc(promocodes.createdAt)],
  });
}

/** Get all feedbacks with user info */
export async function getAdminFeedbacks() {
  return db.query.feedbacks.findMany({
    with: { user: { columns: { id: true, name: true, email: true } } },
    orderBy: [desc(feedbacks.createdAt)],
  });
}

/** Get all themes */
export async function getAdminThemes() {
  return db.query.themes.findMany({
    orderBy: [desc(themes.createdAt)],
  });
}

/** Get all subscription plans */
export async function getAdminPlans() {
  return db.query.subscriptionPlans.findMany({
    orderBy: [subscriptionPlans.id],
  });
}

/** Get all platform bank accounts */
export async function getAdminBanks() {
  return db.query.platformBanks.findMany({
    orderBy: (b, { desc }) => [desc(b.isActive), desc(b.createdAt)],
  });
}

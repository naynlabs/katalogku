import {
  mysqlTable,
  varchar,
  text,
  int,
  bigint,
  boolean,
  timestamp,
  mysqlEnum,
  decimal,
  json,
  serial,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// ============================================================
// 1. AUTH & IDENTITY (Better Auth Compatible)
// ============================================================

/** Users table — Better Auth core + custom `role` field */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: mysqlEnum("role", ["MERCHANT", "ADMIN"]).notNull().default("MERCHANT"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/** Accounts table — Better Auth OAuth accounts (Google, etc.) */
export const accounts = mysqlTable("accounts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/** Sessions table — Better Auth session management */
export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/** Verifications table — Better Auth email verification, password reset tokens */
export const verifications = mysqlTable("verifications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/** Better Auth expects singular model names */
export const user = users;
export const account = accounts;
export const session = sessions;
export const verification = verifications;

// ============================================================
// 2. TENANT & PROFIL (Manajemen Toko)
// ============================================================

/** Stores table — 1 User = 1 Store */
export const stores = mysqlTable("stores", {
  id: int("id").autoincrement().primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  storeName: varchar("store_name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }),
  bio: text("bio"),
  logoUrl: text("logo_url"),
  bannerUrl: text("banner_url"),
  category: varchar("category", { length: 50 }),
  isActive: boolean("is_active").notNull().default(true),
  // Theme & Customization stored as JSON for flexibility
  themeConfig: json("theme_config"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/** Store Policies — Welcome message, FAQ, Terms */
export const storePolicies = mysqlTable("store_policies", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  welcomeMessage: text("welcome_message"),
  faqContent: text("faq_content"),
  termsContent: text("terms_content"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================================
// 3. KATALOG & TAUTAN (Core Features)
// ============================================================

/** Product Categories */
export const productCategories = mysqlTable("product_categories", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 50 }).notNull(),
  sortOrder: int("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Products */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  categoryId: int("category_id").references(() => productCategories.id, { onDelete: "set null" }),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 12, scale: 0 }).notNull().default("0"),
  originalPrice: decimal("original_price", { precision: 12, scale: 0 }),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  stockStatus: mysqlEnum("stock_status", ["AVAILABLE", "SOLD_OUT", "PRE_ORDER"]).notNull().default("AVAILABLE"),
  sortOrder: int("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/** Links (Bio Links) */
export const links = mysqlTable("links", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  type: mysqlEnum("type", ["image", "icon", "divider"]).notNull().default("icon"),
  title: varchar("title", { length: 100 }).notNull(),
  url: text("url"),
  imageUrl: text("image_url"),
  iconName: varchar("icon_name", { length: 50 }),
  iconBg: varchar("icon_bg", { length: 50 }),
  iconColor: varchar("icon_color", { length: 50 }),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  animationType: mysqlEnum("animation_type", ["none", "pulse", "bounce", "glow"]).notNull().default("none"),
  sortOrder: int("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Social Links */
export const socialLinks = mysqlTable("social_links", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  platform: varchar("platform", { length: 30 }).notNull(),
  handle: varchar("handle", { length: 100 }).notNull(),
  url: text("url").notNull(),
  color: varchar("color", { length: 100 }),
  sortOrder: int("sort_order").notNull().default(0),
});

// ============================================================
// 4. TRANSAKSI & CRM (Pesanan & Audiens)
// ============================================================

/** Orders / Invoices */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  invoiceId: varchar("invoice_id", { length: 20 }).notNull().unique(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  customerAddress: text("customer_address"),
  notes: text("notes"),
  totalAmount: decimal("total_amount", { precision: 15, scale: 0 }).notNull().default("0"),
  status: mysqlEnum("status", ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]).notNull().default("PENDING"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/** Order Items */
export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: int("product_id").references(() => products.id, { onDelete: "set null" }),
  productNameSnapshot: varchar("product_name_snapshot", { length: 150 }).notNull(),
  quantity: int("quantity").notNull().default(1),
  priceSnapshot: decimal("price_snapshot", { precision: 12, scale: 0 }).notNull(),
});

/** Customers (Audiens/CRM) */
export const customers = mysqlTable("customers", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  totalSpent: decimal("total_spent", { precision: 15, scale: 0 }).notNull().default("0"),
  totalOrders: int("total_orders").notNull().default(0),
  lastOrderDate: timestamp("last_order_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============================================================
// 5. ANALYTICS (Merchant Analytics)
// ============================================================

/** Page Views */
export const pageViews = mysqlTable("page_views", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  visitorId: varchar("visitor_id", { length: 64 }),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Product Clicks */
export const productClicks = mysqlTable("product_clicks", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  productId: int("product_id").references(() => products.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Link Clicks */
export const linkClicks = mysqlTable("link_clicks", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  linkId: int("link_id").references(() => links.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============================================================
// 6. SAAS & MONETISASI (Billing & Super Admin)
// ============================================================

/** Subscription Plans (managed by Super Admin) */
export const subscriptionPlans = mysqlTable("subscription_plans", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  price: decimal("price", { precision: 12, scale: 0 }).notNull().default("0"),
  billingCycle: mysqlEnum("billing_cycle", ["MONTHLY", "YEARLY", "LIFETIME"]).notNull().default("MONTHLY"),
  limitsJson: json("limits_json"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Subscriptions (per store) */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id, { onDelete: "cascade" }),
  planId: int("plan_id").notNull().references(() => subscriptionPlans.id),
  status: mysqlEnum("status", ["ACTIVE", "EXPIRED", "CANCELLED"]).notNull().default("ACTIVE"),
  startDate: timestamp("start_date").notNull().defaultNow(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Promo Codes */
export const promocodes = mysqlTable("promocodes", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 30 }).notNull().unique(),
  discountType: mysqlEnum("discount_type", ["PERCENTAGE", "FIXED"]).notNull().default("PERCENTAGE"),
  discountAmount: decimal("discount_amount", { precision: 12, scale: 0 }).notNull(),
  maxUses: int("max_uses"),
  usedCount: int("used_count").notNull().default(0),
  validUntil: timestamp("valid_until"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Feedbacks */
export const feedbacks = mysqlTable("feedbacks", {
  id: int("id").autoincrement().primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  typeOfReport: mysqlEnum("type_of_report", ["BUG", "FEATURE_REQUEST", "COMPLAINT", "OTHER"]).notNull().default("OTHER"),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).notNull().default("OPEN"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

/** Themes (managed by Super Admin) */
export const themes = mysqlTable("themes", {
  id: int("id").autoincrement().primaryKey(),
  internalName: varchar("internal_name", { length: 50 }).notNull().unique(),
  displayName: varchar("display_name", { length: 50 }).notNull(),
  cssVariablesJson: json("css_variables_json"),
  previewImageUrl: text("preview_image_url"),
  isProOnly: boolean("is_pro_only").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============================================================
// RELATIONS (Drizzle Relational Queries)
// ============================================================

export const usersRelations = relations(users, ({ one, many }) => ({
  store: one(stores, { fields: [users.id], references: [stores.userId] }),
  accounts: many(accounts),
  sessions: many(sessions),
  feedbacks: many(feedbacks),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const storesRelations = relations(stores, ({ one, many }) => ({
  user: one(users, { fields: [stores.userId], references: [users.id] }),
  policies: one(storePolicies, { fields: [stores.id], references: [storePolicies.storeId] }),
  categories: many(productCategories),
  products: many(products),
  links: many(links),
  socialLinks: many(socialLinks),
  orders: many(orders),
  customers: many(customers),
  pageViews: many(pageViews),
  subscriptions: many(subscriptions),
}));

export const storePoliciesRelations = relations(storePolicies, ({ one }) => ({
  store: one(stores, { fields: [storePolicies.storeId], references: [stores.id] }),
}));

export const productCategoriesRelations = relations(productCategories, ({ one, many }) => ({
  store: one(stores, { fields: [productCategories.storeId], references: [stores.id] }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
  category: one(productCategories, { fields: [products.categoryId], references: [productCategories.id] }),
}));

export const linksRelations = relations(links, ({ one }) => ({
  store: one(stores, { fields: [links.storeId], references: [stores.id] }),
}));

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  store: one(stores, { fields: [socialLinks.storeId], references: [stores.id] }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  store: one(stores, { fields: [orders.storeId], references: [stores.id] }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));

export const customersRelations = relations(customers, ({ one }) => ({
  store: one(stores, { fields: [customers.storeId], references: [stores.id] }),
}));

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  user: one(users, { fields: [feedbacks.userId], references: [users.id] }),
}));

export const subscriptionPlansRelations = relations(subscriptionPlans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  store: one(stores, { fields: [subscriptions.storeId], references: [stores.id] }),
  plan: one(subscriptionPlans, { fields: [subscriptions.planId], references: [subscriptionPlans.id] }),
}));

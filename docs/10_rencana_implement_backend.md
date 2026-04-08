Rencana Implementasi Backend - Katalogku
Dokumen ini adalah rencana teknis untuk mengimplementasikan backend Katalogku sesuai dengan dokumen arsitektur dan UI yang sudah Anda rintis.

🛠️ Persiapan yang Perlu Anda Lakukan
Sebelum kita mulai coding backend, Anda perlu menyiapkan beberapa API Keys / Credentials dari layanan pihak ketiga dan memasukkannya ke dalam file .env.local:

TiDB Cloud (Database): Dapatkan Connection String (Database URL) dari TiDB Serverless.
Google Cloud Console (Autentikasi OAuth): Dapatkan Client ID dan Client Secret.
ImageKit.io (Media): Dapatkan URL Endpoint, Public Key, dan Private Key.
Better Auth Secret: Generate random hex/base64 string untuk session (openssl rand -base64 32).
🗄️ Analisis Mendalam Skema Database (Drizzle ORM)
Ternyata struktur aplikasi Anda sangat besar dan berkelas SaaS (terdapat Super Admin Console, Billing, Analytics, Invoices, dll). Berikut adalah struktur tabel yang seharusnya kita buat agar seluruh menu di UI bisa hidup dan proporsional:

1. Autentikasi & Core (Auth & Identity)
users: id, name, email, emailVerified, image, role (MERCHANT / ADMIN), createdAt.
accounts: Integrasi akun Google OAuth (dari Better Auth).
sessions: Manajemen sessi token (dari Better Auth).
2. Tenant & Profil (Manajemen Toko)
stores: id, user_id, store_name, username_slug, whatsapp_number, bio, logo_url, is_active, theme_id. (1 User = 1 Store).
store_texts / policies: id, store_id, welcome_message, faq_content, terms_content. (Untuk modul Teks Toko).
3. Katalog & Tautan (Core Features)
product_categories: id, store_id, name, sort_order.
products: id, store_id, category_id, name, description, price, original_price, image_url, is_active, stock_status, sort_order.
links: id, store_id, title, url, icon_name, is_active, animation_type, sort_order.
4. Transaksi & CRM (Pesanan & Audiens)
orders (Invoices): id, invoice_id (UUID short), store_id, customer_name, customer_phone, total_amount, status (PENDING / COMPLETED / CANCELLED), created_at. (Diperlukan karena Anda memiliki UI app/[username]/invoice/[order_id]).
order_items: id, order_id, product_id, product_name_snapshot, quantity, price_snapshot.
customers (Audiens): id, store_id, name, phone_number, total_spent, total_orders, last_order_date. (Akan memanjakan penjual di menu CRM Audiens).
5. Analitik (Merchant Analytics)
page_views: id, store_id, visitor_id, referrer, created_at.
product_clicks: id, product_id_clicked, store_id, created_at.
link_clicks: id, link_id_clicked, store_id, created_at.
6. SaaS & Monetisasi (Billing & Super Admin)
subscription_plans (Paket): id, name, price, limits_json, is_active. (Dikelola Super Admin di /x-control/console/paket).
promocodes (Promo): id, code, discount_type, discount_amount, valid_until.
subscriptions (Billing Penjual): id, store_id, plan_id, status (ACTIVE / EXPIRED / CANCELLED), start_date, end_date.
feedbacks: id, user_id, type_of_report, message, status (OPEN / RESOLVED).
themes: id, internal_name, css_variables_json, is_pro_only.
📋 Fase Implementasi Backend
Fase 1: Database & Skema Raksasa
Menulis Schema Drizzle untuk ±18 Tabel di atas.
Mendorong migrasi ke TiDB.
Fase 2: Autentikasi Better Auth & RBAC
Melakukan setup spesifikasi login.
Membuat perlindungan Middleware untuk rute /(dashboard).
Mengamankan rute /(console) (Super Admin) agar hanya akun role "ADMIN" yang dapat menerobos.
Fase 3: Server Actions Inti (Tenant, Produk, Links)
Membuat aksi backend (CRUD) untuk stores, products, product_categories, dan links.
Fase 4: Digital Receipt & Invoice
Mengubah alur order. Sebelumnya hanya direct WA, sekarang aplikasi akan menyimpan Order ke dalam DB, mencetak tautan /invoice/xxx, lalu tautan tersebut disematkan ke dalam pesan WA pembeli.
Fase 5: Analytics & Audience CRM
Setup logging view dan click untuk penjual.
Agregasi data (Total Pendapatan, Kunjungan, dll) ke beranda Dasbor.
⚠️ User Review Required
Bagian ini membutuhkan persetujuan Anda:

IMPORTANT

Saya sudah merevisi skema tabelnya! Ternyata SaaS Anda sangat kompleks dengan sistem Super Admin, Invoice, dan Analytics. Apakah ke-18 tabel di atas sudah menggambarkan kebutuhan fitur dari UI Slicing Anda saat ini?
Bila iya, apakah Anda mau saya buatkan file Drizzle schemanya (schema.ts) sekarang sekalian menunggu Anda setup akun TiDB Cloud-nya?
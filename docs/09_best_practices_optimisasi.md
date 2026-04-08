# Panduan Efisiensi & Optimasi Backend (Next.js + Drizzle ORM + TiDB MySQL)

Dokumen ini berisi rangkuman anti-pattern (kode yang inefisien) dan alternatif terbaiknya yang dirancang khusus bersinggungan dengan *tech-stack* Katalogku. 

## 1. Drizzle ORM & MySQL (TiDB)

### A. Overfetching Data (Select All)
Mengambil kolom yang tidak dibutuhkan. Ini sangat merugikan bagi performa Node.js dan TiDB karena ada biaya bandwidth.
*   **❌ Inefisien:**
    ```typescript
    // Drizzle menghasilkan: SELECT * FROM products
    const items = await db.select().from(products);
    ```
*   **✅ Alternatif Teroptimasi (Partial Select):**
    ```typescript
    // Drizzle menghasilkan: SELECT id, name, price FROM products
    const items = await db.select({
      id: products.id,
      name: products.name,
      price: products.price
    }).from(products);
    ```

### B. Kutukan Query Bersarang (N+1 Problem)
Masalah fatal di mana Anda mengeksekusi *query API/Database* di dalam sebuah perulangan array.
*   **❌ Inefisien:**
    ```typescript
    const categories = await db.select().from(productCategories);
    
    // Membuka ratusan rute koneksi MySQL satu per satu (Sangat Buruk)
    for (const cat of categories) {
      const items = await db.select().from(products).where(eq(products.categoryId, cat.id));
      cat.items = items;
    }
    ```
*   **✅ Alternatif Teroptimasi (Relational API / JSON Aggregation):**
    Gunakan relasi bawaan Drizzle agar MySQL melakukan penggabungan data dalam 1 tarikan.
    ```typescript
    const categories = await db.query.productCategories.findMany({
      with: {
        products: true // Drizzle mengeksekusi 1 single JOIN / batching di balik layar
      }
    });
    ```

### C. Masalah Mengukur Jumlah Baris (Counting)
Membebani *garbage collector* V8 Engine (Node.js) karena menarik semua data ke memori RAM aplikasi sekadar untuk melihat panjang array-nya.
*   **❌ Inefisien:**
    ```typescript
    const allUsers = await db.select().from(users);
    const totalCount = allUsers.length; 
    ```
*   **✅ Alternatif Teroptimasi (MySQL Native Count):**
    ```typescript
    const result = await db.select({ count: sql<number>`count(*)` }).from(users);
    const totalCount = Number(result[0].count);
    ```

### D. Serverless Connection Exhaustion
Next.js App Router (khususnya Vercel) merender *route* dalam wujud Serverless Function. Jika tidak ditangani, tiap panggilandapat membuang *connection DB*.
*   **❌ Inefisien:** Menggunakan modul klien MySQL tradisional `mysql2` untuk koneksi TCP permanen di lingkungan Serverless.
*   **✅ Alternatif Teroptimasi:** Hanya gunakan **driver serverless resmi** dari TiDB Cloud / PlanetScale (via HTTP) agar koneksi diatur melalui pool HTTP.
    ```typescript
    import { connect } from '@tidbcloud/serverless'
    import { drizzle } from 'drizzle-orm/tidb-serverless'
    
    // Gunakan koneksi via Driver serverless
    const client = connect({ url: process.env.DATABASE_URL })
    export const db = drizzle(client)
    ```

---

## 2. Next.js 15 App Router & React

### A. Data Waterfall (Blokir Sinkronisasi Berurutan)
Server Component yang menunggu sebuah proses selesai sebelum mulai merequest data lain yang sebenarnya tidak saling berkaitan.
*   **❌ Inefisien (Waterfall Load):**
    ```tsx
    export default async function Dashboard() {
      const user = await getUserData(); // Tunggu 1 detik
      const products = await getProducts(); // Tunggu 1 detik lagi
      const analytics = await getAnalytics(); // Tunggu 1 detik lagi
      // Total Load: 3 Detik
    }
    ```
*   **✅ Alternatif Teroptimasi (Parallel Fetching):**
    ```tsx
    export default async function Dashboard() {
      // Dijalankan bersamaan secara konkuren. Total Load: Mengikuti yang paling lambat (1 detik)
      const [user, products, analytics] = await Promise.all([
        getUserData(),
        getProducts(),
        getAnalytics()
      ]);
    }
    ```

### B. Mencekik Client Boundary (Over-passing Props)
Melempar *payload* objek yang sangat gemuk dari Server Component `page.tsx` ke dalam Client Component `"use client"`. Ini mencemari dokumen HTML/RSC Payload bawaan Next.js dan merusak kecepatan muat.
*   **❌ Inefisien:**
    ```tsx
    // Di Server Component
    const user = await db.query.users.findFirst({ with: { orders: true, logs: true } });
    return <ClientDashboard user={user} /> // Membocorkan megabyte data JSON ke sisi Klien
    ```
*   **✅ Alternatif Teroptimasi:**
    Lakukan proses *filtering/mapping* hanya di Server Component. Lempar saja ID atau data paling primitif yang dibutuhkan UI.
    ```tsx
    // Di Server Component
    const user = await db.query.users.findFirst();
    const isPro = user.planId === 'pro';
    
    // Hanya kirim struktur boolean & string tipis
    return <ClientDashboard userName={user.name} isPro={isPro} /> 
    ```

### C. Menghindari Multiple Re-renders di State Lokal
Kadang saat mengubah beberapa state Zustand atau React Context bersamaan bisa mentrigger komponen me-*render* ulang berkali-kali.
*   **❌ Inefisien:**
    ```typescript
    // Bisa mentrigger 3x re-render di React
    setLoading(false);
    setProducts(newProducts);
    setError(null);
    ```
*   **✅ Alternatif Teroptimasi:** Walau sejak React 18 fungsi *Batching* sudah otomatis, lebih baik menyatukan satu kesatuan state jika mereka saling terkait.
    ```typescript
    setState({ isLoading: false, products: newProducts, error: null });
    ```

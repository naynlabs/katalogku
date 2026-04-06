# Katalogku Codebase Audit Report (Tahap Lanjutan & Integrasi) 🔍

Setelah kita membereskan *critical bugs* (Next.js 16 params), *code duplication* (`formatRupiah`), dan resiko fatal `console.log` + metadata error, kondisi *frontend* Katalogku saat ini **sudah sangat stabil untuk dirender secara production**.

Namun, dari hasil *Deep-Dive Audit* lanjutan, saat ini **hampir 100% data adalah Hardcoded/Mock State**. Kode masih banyak yang berstatus "Simulasi" yang mengakibatkan komponen *bloated* (terlalu membengkak) dengan state lokal dan rawan memicu masalah ketika integrasi DB sesungguhnya dimulai.

Berikut adalah temuan audit saya beserta rencana implementasi (Implementation Plan) yang harus disetujui.

---

## 🛑 Temuan Kritis & Code Inefficiency (Butuh Refactoring)

### 1. Monolithic Components (Komponen Bengkak)
*   `src/components/storefront/StorefrontUI.tsx`: **+450 baris kode.** Mengandung logika UI Menu, Grid Produk, Modal Subscribe, Modal Promo, Keranjang Belanja (Cart), dan Checkout sekaligus. Ini sangat melanggar prinsip *Single Responsibility* dan memberatkan proses re-render.
*   `src/app/(dashboard)/etalase/dashboard/links/page.tsx`: **+500 baris kode.** Memiliki logika string manipulation CSS `replace(/#000000/g)` *inline* di dalam render function yang kotor dan boros memori.

### 2. Sisa Penggunaan `any` Type
*   Masih ditemukan di `src/store/useBuilderStore.ts` pada baris ke-85: `setProfileField: (field: keyof StoreProfile, value: any) => void;`. 
*   Di dashboard pesanan `useState<any>(null);`.
*   *Resiko:* Menghilangkan manfaat utama TypeScript dan berpotensi memunculkan undefined runtime error saat integrasi backend.

### 3. Masalah *State Management* (Zustand & useState)
*   **Zustand Builder:** Saat ini menyimpan *default mock data* yang sangat panjang. Ini idealnya harus berasal dari DB TiDB.
*   **Excessive useState:** Komponen dashboard terlalu mengandalkan `useState` untuk flow data palsu (mock), kita harus membersihkannya agar struktur siap menerima `useQuery` atau `fetch`.


> [!WARNING]  
> **Backend Vacuum:** Aplikasi tidak memiliki middleware otentikasi. Siapapun (meski belum login secara session) secara teknis bisa merender komponen dashboard saat ini. Tidak ada Drizzle Schema, tidak ada koneksi TiDB.

---

## 🛠️ Proposed Changes (Rencana Implementasi)

Jika disetujui, ini adalah langkah yang akan kita kerjakan:

### Tahap 1: Frontend Cleanup & Component Splitting (1-2 Jam)
Memecah komponen raksasa menjadi modular:
#### [MODIFY] `src/components/storefront/StorefrontUI.tsx`
- Memisahkannya ke `CartDrawer.tsx`, `ProductGrid.tsx`, dan `StoreHeader.tsx`.
#### [MODIFY] `src/store/useBuilderStore.ts`
- Memperbaiki tipe data ke `keyof StoreProfile` secara ketat. Menghapus tipe `any`.

### Tahap 2: Backend Foundation - Database & Auth (2-3 Jam)
Kita akan memulai integrasi backend!
#### [NEW] `src/db/schema.ts` & `src/db/index.ts`
- Mendefinisikan skema Drizzle ORM untuk tabel `users`, `stores` (profil, pengaturan tema), `products`, `links`, dan `orders`.
#### [NEW] `src/lib/auth.ts`
- Inisialisasi *Better Auth* menggunakan provider Google dan Email (Magic Link/Password).
#### [NEW] `src/middleware.ts`
- Melindungi rute `/etalase/dashboard/*` agar hanya bisa diakses oleh *authenticated users*. (Redirect unauthenticated ke `/login`).

---

## 💬 User Review Required

> [!IMPORTANT]
> **Keputusan Integrasi Database:** 
> Untuk Phase selanjutnya, apakah Anda setuju jika kita langsung mendesain **Drizzle ORM Schema (TiDB Postgres/MySQL)** terlebih dahulu agar *state management* punya acuan struktur data API yang solid, atau haruskah memecah belah komponen frontend (`StorefrontUI` dst) terlebih dahulu?

Silakan beri konfirmasi mana jalur yang ingin Anda utamakan, dan saya akan mengeksekusi rencana di atas sekarang juga!

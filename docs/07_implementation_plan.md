# Rencana Eksekusi Implementasi - Katalogku

Karena kerangka logika telah matang, penulisan kode akan dieksekusi berdasarkan fase pengiriman (*Milestone Delivery*). Strategi ini diawali dengan mengamankan muka proyek terlebih dahulu.

## Fokus Pertama: Fase 1
Membangun kombinasi Muka Publik & Tata Letak Dasar (Frontend):
* Eksekusi 1: Setup *Boilerplate* dengan `Next.js App Router, Tailwind, Shadcn UI (+ Lucide Icons)`.
* Eksekusi 2: Bangun *Landing Page* Pemasaran (Hero Section dengan USP, Cara Kerja, Pricing, CTA) - Ini penting agar jika dihosting besok sudah punya identitas.
* Eksekusi 3: Buat Halaman `/login` dan `/register` UI yang responsif dan mengundang konversi tanpa diisi sistem *backend* Auth dulu (Pure UI Static).

## Fokus Lanjutan: Fase 2
Pembangunan Ekosistem Ruang Kerja (*Internal Apps*):
* Eksekusi 4: Setup struktur global Admin Dashboard (Terdapat Sidebar Navigasi di layar besar, Bottom Navigation/Hamburger Sidebar di Layar HP).
* Eksekusi 5: Desain Halaman Statis *Katalog Produk*. Berisi bentuk grid foto, modal penambahan produk, tampilan kartu.
* Eksekusi 6: Desain Halaman Statis *Tautan* dan *Pengaturan*.

## Milestone Database & Engine: Fase 3
Setelah antarmuka matang dan di-acc, kita ubah dummy menjadi fungsional:
* Eksekusi 7: Rancang Skema Kolom Database dengan Drizzle (Table `users`, `products`, `links`) lalu *Push* migrasi ke TiDB Serverless.
* Eksekusi 8: Konfigurasi pustaka *Better Auth* serta integrasi Google OAuth Secret Credentials. Proteksi ruang `/dashboard`.
* Eksekusi 9: Implementasi *Next.js Server Actions* untuk menghubungkan tombol formulir `Upload Product` agar data bisa dimuat ke Database & Vercel Blob.

## Jantung Utama Aplikasi: Fase 4
Mengintegrasikan Hasil Akhir ke dunia publik:
* Eksekusi 10: Bangun Rute Dinamis Halaman Publik Etalase `app/[username]/page.tsx`. Mengambil parameter data *store* dari DB berdasarkan *username/url* di link Bio.
* Eksekusi 11: Implementasi Zustand / React Context untuk mengelola "Global Shopping Cart State".
* Eksekusi 12: Penulisan fungsi logaritma Konversi Keranjang ke URL WhatsApp API dan menguji coba Transaksi.

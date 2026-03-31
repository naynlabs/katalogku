# Arsitektur Sistem & Tech Stack - Katalogku

## 1. Tech Stack Lengkap

### 🧱 Core Framework
| Komponen | Teknologi | Keterangan |
|---|---|---|
| Framework Utama | **Next.js 15** (App Router) | Full-stack React framework dengan Server Components, Server Actions, dan API Routes |
| Bahasa | **TypeScript** | Type-safety di seluruh codebase (frontend & backend) |
| Runtime | **Node.js 20+** | JavaScript runtime untuk server-side |

### 🎨 Frontend & UI
| Komponen | Teknologi | Keterangan |
|---|---|---|
| Styling | **Tailwind CSS 4** | Utility-first CSS framework untuk styling cepat & konsisten |
| Komponen UI | **Shadcn UI** | Library komponen aksesibel berbasis Radix UI, bisa dikustomisasi penuh |
| Ikon | **Material Symbols Outlined** | Sistem ikon Google yang fleksibel (variable font: weight, fill) dimuat via Google Fonts CDN |
| Animasi | **Framer Motion** | Library animasi deklaratif untuk React (fade-up, stagger, parallax, dll) |
| Font | **Google Fonts (Plus Jakarta Sans)** | Tipografi geometric sans-serif modern, weight 400-800, sangat cocok untuk UI SaaS playful & premium |
| State Management | **Zustand** | State manager ringan untuk mengelola Shopping Cart (Keranjang Bayangan) di sisi client |
| Form Handling | **React Hook Form + Zod** | Validasi form yang performant dan type-safe |
| Toast / Notifikasi | **Sonner** | Notifikasi toast yang cantik dan ringan |
| Drag & Drop | **dnd-kit** | Library drag-and-drop modern untuk fitur pengurutan Tautan (Links) |

### 🗄️ Backend & Database
| Komponen | Teknologi | Keterangan |
|---|---|---|
| Database | **TiDB Serverless** (MySQL-compatible) | Database relasional cloud, auto-scaling, bayar sesuai pemakaian |
| ORM | **Drizzle ORM** | TypeScript ORM yang ringan, type-safe, dan mendukung MySQL |
| Migrasi Database | **Drizzle Kit** | CLI untuk generate dan push migrasi skema database |
| Server Actions | **Next.js Server Actions** | Fungsi server-side yang dipanggil langsung dari komponen React tanpa perlu buat API endpoint manual |

### 🔐 Autentikasi & Keamanan
| Komponen | Teknologi | Keterangan |
|---|---|---|
| Auth Provider | **Better Auth** | Library autentikasi modern untuk Next.js, mendukung multi-provider |
| OAuth Provider | **Google OAuth 2.0** | Login instan menggunakan akun Google |
| Session | **Database Session (Better Auth)** | Sesi disimpan di database, aman dari manipulasi client-side |
| Validasi Input | **Zod** | Schema validation library untuk memvalidasi semua input dari user & API |

### 📦 Penyimpanan Media (File Uploads)
| Komponen | Teknologi | Keterangan |
|---|---|---|
| Image & Video Storage | **ImageKit.io** | CDN + Media Storage cloud khusus untuk gambar & video. Fitur: auto-compression, lazy loading URL, transformasi ukuran on-the-fly, dan CDN global |
| Upload Method | **ImageKit Upload API** | Upload langsung dari client-side (browser) atau server-side via SDK |

### 🚀 Infrastruktur & Deployment
| Komponen | Teknologi | Keterangan |
|---|---|---|
| Hosting Aplikasi | **Vercel** | Platform deployment Next.js (auto CI/CD dari GitHub, Edge Network global) |
| Hosting Database | **TiDB Cloud** | Managed database cloud (serverless tier gratis tersedia) |
| Version Control | **Git + GitHub** | Source code management dan kolaborasi |
| CI/CD | **Vercel Git Integration** | Auto-deploy setiap kali push ke branch `main` di GitHub |
| Domain & SSL | **Vercel Domains** | Custom domain + sertifikat HTTPS otomatis gratis |
| Environment Variables | **Vercel Environment** | Penyimpanan aman untuk API keys, database credentials, dan secret tokens |

### 📊 Monitoring & Analitik (Fase Lanjutan)
| Komponen | Teknologi | Keterangan |
|---|---|---|
| Web Analytics | **Google Analytics 4** atau **Umami** | Tracking kunjungan, klik, dan perilaku pengguna di etalase publik |
| Error Monitoring | **Sentry** (opsional) | Pelacakan bug dan crash secara real-time di production |

---

## 2. Manajemen Penyimpanan Media (ImageKit)

### Mengapa ImageKit?
ImageKit dipilih karena menyediakan solusi **all-in-one** untuk kebutuhan media SaaS:
- **CDN Global:** Gambar dan video dimuat super cepat dari server terdekat pembeli (penting karena 95% traffic dari HP).
- **Auto Compression:** Foto produk yang diunggah penjual akan dikompres otomatis tanpa kehilangan kualitas visual.
- **On-the-fly Transformation:** Bisa generate thumbnail, crop, atau resize gambar langsung via URL parameter (contoh: `?tr=w-300,h-300`).
- **Bandwidth Efisien:** Mengurangi beban server Next.js karena media dilayani langsung dari CDN ImageKit.

### Alur Upload Foto Produk
```
Penjual klik "Tambah Produk"
  → Pilih foto dari galeri HP
  → Frontend upload langsung ke ImageKit (client-side upload)
  → ImageKit mengembalikan URL gambar yang sudah di-CDN
  → URL disimpan ke kolom `image_url` di tabel `products` (TiDB)
  → Etalase publik menampilkan gambar via URL ImageKit
```

### Jenis File yang Didukung
| Tipe | Format | Keterangan |
|---|---|---|
| Foto Produk | JPG, PNG, WebP | Auto-convert ke WebP oleh ImageKit untuk performa optimal |
| Logo / Foto Profil | JPG, PNG | Ukuran kecil, di-crop jadi lingkaran di UI |
| Video Pendek (Fase Lanjutan) | MP4, WebM | Jika nanti fitur video produk ditambahkan, ImageKit sudah mendukung |

---

## 3. Ketergantungan Eksternal (3rd Party API)

| Layanan | Status | Keterangan |
|---|---|---|
| Payment Gateway (Midtrans/Xendit) | ❌ TIDAK BUTUH | Pembayaran langsung via negosiasi di WhatsApp |
| WhatsApp Business API Resmi | ❌ TIDAK BUTUH | Menggunakan URL scheme `wa.me` (Click-to-Chat) yang gratis |
| Email Service (Resend/Sendgrid) | ⏳ NANTI (Fase Lanjutan) | Untuk notifikasi email verifikasi & pemberitahuan jika nanti dibutuhkan |
| ImageKit.io | ✅ AKTIF | Penyimpanan dan distribusi seluruh file media (foto produk, logo toko) |

---

## 4. Diagram Arsitektur Tingkat Tinggi

```
┌─────────────────────────────────────────────────────────┐
│                    PENGGUNA (BROWSER / HP)               │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Landing Page  │  │  Dashboard   │  │ Etalase Publik│  │
│  │  (Marketing)  │  │  (Penjual)   │  │  (Pembeli)    │  │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘  │
└─────────┼──────────────────┼─────────────────┼──────────┘
          │                  │                 │
          ▼                  ▼                 ▼
┌─────────────────────────────────────────────────────────┐
│              NEXT.JS 15 (VERCEL EDGE NETWORK)           │
│  ┌────────────────┐  ┌────────────┐  ┌───────────────┐  │
│  │ Server Actions  │  │ API Routes │  │  Middleware    │  │
│  │ (Form Submit)   │  │ (Auth API) │  │ (Route Guard) │  │
│  └────────┬───────┘  └─────┬──────┘  └───────────────┘  │
└───────────┼────────────────┼────────────────────────────┘
            │                │
     ┌──────┴────────────────┴──────┐
     │                              │
     ▼                              ▼
┌──────────────┐            ┌──────────────┐
│  TiDB Cloud  │            │  ImageKit.io │
│  (Database)  │            │  (Media CDN) │
│              │            │              │
│ • users      │            │ • Foto Produk│
│ • products   │            │ • Logo Toko  │
│ • links      │            │ • Thumbnails │
│ • sessions   │            │              │
└──────────────┘            └──────────────┘
            │
            ▼
┌──────────────────┐
│   Better Auth    │
│  (Google OAuth)  │
│  (Email/Pass)    │
└──────────────────┘
```

---

## 5. Struktur Folder Proyek (Rencana)

```
katalogku/
├── docs/                    # Dokumentasi SaaS (PRD, Architecture, dll)
├── public/                  # Asset statis (favicon, og-image)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Grup rute: /login, /register
│   │   ├── (dashboard)/     # Grup rute: /dashboard/*
│   │   ├── (marketing)/     # Grup rute: / (landing page)
│   │   ├── [username]/      # Rute dinamis: etalase publik
│   │   ├── api/             # API routes (auth handler)
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/          # Komponen UI reusable
│   │   ├── ui/              # Shadcn UI components
│   │   ├── landing/         # Komponen Landing Page
│   │   ├── dashboard/       # Komponen Dashboard
│   │   └── storefront/      # Komponen Etalase Publik
│   ├── lib/                 # Utilitas & konfigurasi
│   │   ├── db/              # Drizzle schema & connection
│   │   ├── auth.ts          # Better Auth config
│   │   ├── imagekit.ts      # ImageKit config & helpers
│   │   └── utils.ts         # Helper functions
│   ├── actions/             # Next.js Server Actions
│   └── stores/              # Zustand stores (cart, dll)
├── drizzle.config.ts        # Drizzle ORM config
├── tailwind.config.ts       # Tailwind config
├── next.config.ts           # Next.js config
├── package.json
└── tsconfig.json
```

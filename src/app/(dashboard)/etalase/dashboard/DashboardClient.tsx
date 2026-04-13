"use client";

import Link from "next/link";
import { formatRupiah } from "@/lib/utils";

// ── Types ───────────────────────────────────────────────────────────────────
type DashboardStats = {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalPageViews: number;
  totalRevenue: string;
};

type RecentOrder = {
  id: number;
  invoiceId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  itemsSummary: string;
};

type TopProduct = {
  id: number;
  name: string;
  price: string;
  imageUrl: string | null;
};

type TopLink = {
  id: number;
  title: string;
  iconName: string;
};

type DashboardProps = {
  storeSlug: string;
  stats: DashboardStats;
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  topLinks: TopLink[];
};

// ── Status Helpers ──────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Menunggu", className: "bg-blue-100 text-blue-700" },
  PROCESSING: { label: "Diproses", className: "bg-amber-100 text-amber-700" },
  COMPLETED: { label: "Selesai", className: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Batal", className: "bg-red-100 text-red-600" },
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

// ── Halaman Utama ───────────────────────────────────────────────────────────
export default function DashboardOverview({
  storeSlug,
  stats,
  recentOrders,
  topProducts,
  topLinks,
}: DashboardProps) {
  const statCards = [
    { icon: "visibility", label: "Total Kunjungan", value: stats.totalPageViews.toLocaleString("id-ID") },
    { icon: "person", label: "Total Pelanggan", value: stats.totalCustomers.toLocaleString("id-ID") },
    { icon: "shopping_bag", label: "Total Pesanan", value: stats.totalOrders.toLocaleString("id-ID") },
    { icon: "inventory_2", label: "Total Produk", value: stats.totalProducts.toLocaleString("id-ID") },
  ];

  return (
    <>
      {/* ═══ HEADER WELCOME ═══ */}
      <section className="mb-8 mt-2">
        <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-8 text-on-primary relative overflow-hidden min-h-[200px]">
          <div className="relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Etalase Aktif
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
              Selamat datang di Dashboard! 🚀
            </h2>
            <p className="text-on-primary/80 max-w-lg text-sm mb-6">
              Berikut ringkasan performa toko Anda. Terus tingkatkan promosi link etalasemu untuk hasil yang lebih maksimal.
            </p>
            {/* Link Etalase — Inline */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg">
              <div className="flex-1 bg-white/15 backdrop-blur-md px-4 py-3 rounded-xl flex items-center justify-between">
                <span className="font-semibold text-white truncate text-sm">katalogku.id/{storeSlug}</span>
                <button
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors ml-2"
                  title="Salin Link"
                  onClick={() => navigator.clipboard?.writeText(`https://katalogku.id/${storeSlug}`)}
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
              <Link href={`/${storeSlug}`} className="py-3 px-6 bg-white text-primary font-bold rounded-xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform text-center shrink-0 shadow-lg shadow-black/10">
                Lihat Etalase
              </Link>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 p-8 hidden md:block">
            <span className="material-symbols-outlined text-white/15 text-9xl">rocket_launch</span>
          </div>
        </div>
      </section>

      {/* ═══ STAT CARDS ═══ */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 group hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-xl">
                <span className="material-symbols-outlined text-primary text-xl">{s.icon}</span>
              </div>
            </div>
            <p className="text-on-surface-variant text-xs font-semibold mb-1">{s.label}</p>
            <p className="text-2xl font-black text-on-surface tracking-tight">{s.value}</p>
          </div>
        ))}
      </section>

      {/* ═══ PRODUK + PESANAN TERBARU ═══ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Produk */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Produk Saya</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Daftar produk terbaru di katalog</p>
            </div>
            <Link href="/etalase/dashboard/katalog" className="text-primary font-bold text-xs hover:underline">Lihat Semua</Link>
          </div>
          {topProducts.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-outline/30 text-5xl mb-3 block">inventory_2</span>
              <p className="font-bold text-on-surface-variant">Belum ada produk</p>
              <Link href="/etalase/dashboard/katalog/tambah" className="text-primary font-bold text-sm hover:underline mt-1 inline-block">+ Tambah Produk</Link>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/10">
              {topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4 py-3.5 px-3 hover:bg-surface-container-low/50 rounded-xl transition-colors">
                  <span className="text-xs font-black text-on-surface-variant/40 w-5">{i + 1}</span>
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container-low shrink-0">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline/30 text-sm">image</span>
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-sm text-on-surface flex-1 line-clamp-1">{p.name}</span>
                  <span className="text-sm font-bold text-primary shrink-0">{formatRupiah(Number(p.price))}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pesanan Terbaru */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Pesanan Terbaru</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Masuk melalui WhatsApp</p>
            </div>
            <Link href="/etalase/dashboard/pesanan" className="text-primary font-bold text-xs hover:underline">Lihat Semua</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-outline/30 text-5xl mb-3 block">inbox</span>
              <p className="font-bold text-on-surface-variant">Belum ada pesanan</p>
              <p className="text-xs text-outline">Pesanan akan muncul saat pelanggan mulai memesan via WhatsApp.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => {
                const statusInfo = STATUS_MAP[o.status] || STATUS_MAP.PENDING;
                return (
                  <div key={o.id} className="p-4 bg-surface-container-low/50 rounded-xl hover:bg-surface-container-low transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-sm text-on-surface line-clamp-1">{o.itemsSummary}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">{o.customerName} · {o.invoiceId}</p>
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold shrink-0 ${statusInfo.className}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface-variant">{timeAgo(o.createdAt)}</span>
                      <span className="font-bold text-sm text-on-surface">{formatRupiah(Number(o.totalAmount))}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══ LINK POPULER + RINGKASAN ═══ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-4">
        {/* Link Populer */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Link Saya</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Tautan di etalase bio</p>
            </div>
            <Link href="/etalase/dashboard/links" className="text-primary font-bold text-xs hover:underline">Kelola</Link>
          </div>
          {topLinks.length === 0 ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-outline/30 text-4xl mb-2 block">link_off</span>
              <p className="font-bold text-on-surface-variant text-sm">Belum ada link</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topLinks.map((l, i) => (
                <div key={l.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low/50 transition-colors group">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-primary text-lg">{l.iconName}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-on-surface truncate">{l.title}</p>
                  </div>
                  <span className="text-xs font-black text-on-surface-variant/50">#{i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ringkasan Cepat */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pendapatan */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-xl">payments</span>
              </div>
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Total Pendapatan</span>
            </div>
            <p className="text-3xl font-black text-green-800 tracking-tight mb-1">{formatRupiah(Number(stats.totalRevenue))}</p>
            <p className="text-xs text-green-600 font-medium">Dari {stats.totalOrders} pesanan</p>
          </div>

          {/* Produk Aktif */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 text-xl">inventory_2</span>
              </div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Produk Aktif</span>
            </div>
            <p className="text-3xl font-black text-blue-800 tracking-tight mb-1">{stats.totalProducts} Produk</p>
            <p className="text-xs text-blue-600 font-medium">Di katalog Anda</p>
          </div>

          {/* Total Kunjungan */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 text-xl">visibility</span>
              </div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Total Views</span>
            </div>
            <p className="text-3xl font-black text-purple-800 tracking-tight mb-1">{stats.totalPageViews.toLocaleString("id-ID")}</p>
            <p className="text-xs text-purple-600 font-medium">Kunjungan ke etalase</p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200/30 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600 text-xl">campaign</span>
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Promosikan</span>
            </div>
            <p className="text-sm font-bold text-amber-800 mb-3">Bagikan link etalasemu ke pelanggan!</p>
            <button
              onClick={() => navigator.clipboard?.writeText(`https://katalogku.id/${storeSlug}`)}
              className="w-full py-2.5 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors active:scale-95"
            >
              Salin Link Etalase
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

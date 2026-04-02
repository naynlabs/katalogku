"use client";

import Link from "next/link";
import { useState } from "react";

// ── Dummy Data ──────────────────────────────────────────────────────────────
const STATS = [
  { icon: "visibility", label: "Total Kunjungan", value: "12.847", change: "+18%", positive: true, sparkline: [30, 45, 35, 60, 55, 80, 72] },
  { icon: "person", label: "Pengunjung Unik", value: "4.231", change: "+12%", positive: true, sparkline: [20, 30, 25, 45, 40, 55, 50] },
  { icon: "ads_click", label: "Klik WhatsApp", value: "892", change: "+32%", positive: true, sparkline: [10, 15, 20, 25, 35, 45, 55] },
  { icon: "percent", label: "Rasio Konversi", value: "6.9%", change: "+0.8%", positive: true, sparkline: [4, 5, 5, 6, 6, 7, 7] },
  { icon: "shopping_bag", label: "Total Pesanan", value: "356", change: "+8%", positive: true, sparkline: [40, 35, 50, 45, 55, 60, 65] },
  { icon: "link", label: "Klik Link Bio", value: "2.105", change: "-3%", positive: false, sparkline: [60, 55, 50, 52, 48, 45, 42] },
];

const TRAFFIC_DAILY = [
  { day: "Sen", visitors: 580, clicks: 42 },
  { day: "Sel", visitors: 720, clicks: 55 },
  { day: "Rab", visitors: 640, clicks: 38 },
  { day: "Kam", visitors: 890, clicks: 67 },
  { day: "Jum", visitors: 1250, clicks: 95 },
  { day: "Sab", visitors: 1480, clicks: 112 },
  { day: "Min", visitors: 1100, clicks: 78 },
];

const TOP_PRODUCTS = [
  { name: "Cokelat Klasik Bunda", views: 1284, clicks: 234, conversion: "18.2%", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop" },
  { name: "Strawberry Cheesecake", views: 1050, clicks: 189, conversion: "18.0%", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=80&h=80&fit=crop" },
  { name: "Rainbow Cake Special", views: 876, clicks: 152, conversion: "17.4%", img: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=80&h=80&fit=crop" },
  { name: "Set Cupcake Pelangi", views: 654, clicks: 98, conversion: "15.0%", img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=80&h=80&fit=crop" },
  { name: "Tarte aux Fruits", views: 432, clicks: 65, conversion: "15.0%", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=80&h=80&fit=crop" },
];

const TRAFFIC_SOURCES = [
  { source: "Instagram", percent: 42, color: "#E1306C" },
  { source: "TikTok", percent: 28, color: "#010101" },
  { source: "Direct URL", percent: 15, color: "#4f46e5" },
  { source: "WhatsApp Share", percent: 10, color: "#25D366" },
  { source: "Lainnya", percent: 5, color: "#9ca3af" },
];

const RECENT_ORDERS = [
  { name: "Cokelat Klasik Bunda x2", buyer: "Sarah Wijaya", phone: "0812-xxx-1234", price: "Rp 90.000", time: "2 menit lalu", status: "Baru" },
  { name: "Strawberry Cheesecake x1", buyer: "Ahmad Dani", phone: "0858-xxx-5678", price: "Rp 55.000", time: "15 menit lalu", status: "Diproses" },
  { name: "Rainbow Cake Special x1", buyer: "Lina Marlina", phone: "0877-xxx-9012", price: "Rp 85.000", time: "1 jam lalu", status: "Dikirim" },
  { name: "Set Cupcake Pelangi x3", buyer: "Budi Santoso", phone: "0821-xxx-3456", price: "Rp 255.000", time: "3 jam lalu", status: "Selesai" },
];

const TOP_LINKS = [
  { title: "Pesan Hampers Lebaran", clicks: 342, icon: "redeem" },
  { title: "Katalog Ulang Tahun", clicks: 278, icon: "cake" },
  { title: "Chat Admin (Tanya Stok)", clicks: 195, icon: "chat" },
  { title: "Testimoni Pelanggan", clicks: 156, icon: "reviews" },
];

// ── Komponen Mini Sparkline (SVG) ───────────────────────────────────────────
function Sparkline({ data, color = "#4f46e5" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="block">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

// ── Komponen Bar Chart Sederhana (SVG) ──────────────────────────────────────
function BarChart({ data, period }: { data: typeof TRAFFIC_DAILY; period: string }) {
  const maxV = Math.max(...data.map((d) => d.visitors));
  const maxC = Math.max(...data.map((d) => d.clicks));
  const barW = 100 / data.length;

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary"></div>
          <span className="text-xs font-medium text-on-surface-variant">Kunjungan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-secondary"></div>
          <span className="text-xs font-medium text-on-surface-variant">Klik WA</span>
        </div>
      </div>
      {/* Chart Area */}
      <div className="relative h-52 w-full flex items-end gap-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-bold shadow-lg">
              {d.visitors} kunjungan · {d.clicks} klik WA
            </div>
            <div className="w-full flex gap-[2px] items-end h-44">
              <div
                className="flex-1 bg-primary rounded-t-md transition-all duration-500 hover:bg-primary/80"
                style={{ height: `${(d.visitors / maxV) * 100}%` }}
              />
              <div
                className="flex-1 bg-secondary rounded-t-md transition-all duration-500 hover:bg-secondary/80"
                style={{ height: `${(d.clicks / maxC) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-on-surface-variant mt-1">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Halaman Utama ───────────────────────────────────────────────────────────
export default function DashboardOverview() {
  const [period, setPeriod] = useState("7hari");

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
              Performa tokomu naik 18% minggu ini! 🚀
            </h2>
            <p className="text-on-primary/80 max-w-lg text-sm mb-6">
              Terus tingkatkan promosi link etalasemu ke pelanggan setia untuk hasil yang lebih maksimal.
            </p>
            {/* Link Etalase — Inline */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg">
              <div className="flex-1 bg-white/15 backdrop-blur-md px-4 py-3 rounded-xl flex items-center justify-between">
                <span className="font-semibold text-white truncate text-sm">katalogku.id/kue-bunda</span>
                <button className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors ml-2" title="Salin Link">
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
              <Link href="/kue-bunda" className="py-3 px-6 bg-white text-primary font-bold rounded-xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform text-center shrink-0 shadow-lg shadow-black/10">
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

      {/* ═══ STAT CARDS (6 KARTU) ═══ */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 group hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-xl">
                <span className="material-symbols-outlined text-primary text-xl">{s.icon}</span>
              </div>
              <Sparkline data={s.sparkline} color={s.positive ? "#4f46e5" : "#dc2626"} />
            </div>
            <p className="text-on-surface-variant text-xs font-semibold mb-1">{s.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-on-surface tracking-tight">{s.value}</p>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.positive ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"}`}>
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* ═══ GRAFIK TRAFIK + SUMBER TRAFIK ═══ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Trafik Mingguan</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Perbandingan kunjungan vs klik WhatsApp</p>
            </div>
            <div className="flex bg-surface-container-low rounded-full p-1">
              {[
                { key: "7hari", label: "7 Hari" },
                { key: "30hari", label: "30 Hari" },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${period === p.key ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <BarChart data={TRAFFIC_DAILY} period={period} />
        </div>

        {/* Sumber Trafik */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <h3 className="text-lg font-bold text-on-surface mb-1">Sumber Trafik</h3>
          <p className="text-xs text-on-surface-variant mb-6">Dari mana pengunjung datang</p>
          <div className="space-y-4">
            {TRAFFIC_SOURCES.map((src) => (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-on-surface">{src.source}</span>
                  <span className="text-sm font-bold text-on-surface">{src.percent}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${src.percent}%`, backgroundColor: src.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUK TERPOPULER + PESANAN TERBARU ═══ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Produk Populer */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Produk Terpopuler</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Berdasarkan kunjungan dan klik tertinggi</p>
            </div>
            <Link href="/dashboard/katalog" className="text-primary font-bold text-xs hover:underline">Lihat Semua</Link>
          </div>
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 text-xs font-bold text-on-surface-variant uppercase tracking-wider px-3 pb-3 border-b border-outline-variant/10">
            <span className="col-span-5">Produk</span>
            <span className="col-span-2 text-center">Dilihat</span>
            <span className="col-span-2 text-center">Klik WA</span>
            <span className="col-span-3 text-right">Konversi</span>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="grid grid-cols-12 items-center py-3.5 px-3 hover:bg-surface-container-low/50 rounded-xl transition-colors group">
                <div className="col-span-12 sm:col-span-5 flex items-center gap-3 mb-2 sm:mb-0">
                  <span className="text-xs font-black text-on-surface-variant/40 w-5">{i + 1}</span>
                  <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                  <span className="font-bold text-sm text-on-surface line-clamp-1">{p.name}</span>
                </div>
                <span className="col-span-4 sm:col-span-2 text-center text-sm font-semibold text-on-surface-variant">{p.views.toLocaleString("id-ID")}</span>
                <span className="col-span-4 sm:col-span-2 text-center text-sm font-bold text-primary">{p.clicks}</span>
                <div className="col-span-4 sm:col-span-3 flex justify-end">
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">{p.conversion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pesanan Terbaru */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Pesanan Terbaru</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Masuk melalui WhatsApp</p>
            </div>
            <Link href="/dashboard/pesanan" className="text-primary font-bold text-xs hover:underline">Lihat Semua</Link>
          </div>
          <div className="space-y-3">
            {RECENT_ORDERS.map((o) => {
              const statusStyles: Record<string, string> = {
                "Baru": "bg-blue-100 text-blue-700",
                "Diproses": "bg-amber-100 text-amber-700",
                "Dikirim": "bg-purple-100 text-purple-700",
                "Selesai": "bg-green-100 text-green-700",
              };
              return (
                <div key={o.name + o.buyer} className="p-4 bg-surface-container-low/50 rounded-xl hover:bg-surface-container-low transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-sm text-on-surface line-clamp-1">{o.name}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{o.buyer} · {o.phone}</p>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold shrink-0 ${statusStyles[o.status] || ""}`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{o.time}</span>
                    <span className="font-bold text-sm text-on-surface">{o.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ LINK POPULER + RINGKASAN CEPAT ═══ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-4">
        {/* Link Populer */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Link Paling Diklik</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Dari tab Links di etalase</p>
            </div>
            <Link href="/dashboard/links" className="text-primary font-bold text-xs hover:underline">Kelola</Link>
          </div>
          <div className="space-y-3">
            {TOP_LINKS.map((l, i) => (
              <div key={l.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low/50 transition-colors group">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-lg">{l.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-on-surface truncate">{l.title}</p>
                  <p className="text-xs text-on-surface-variant">{l.clicks} klik</p>
                </div>
                <span className="text-xs font-black text-on-surface-variant/50">#{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan Cepat */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pendapatan Estimasi */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-xl">payments</span>
              </div>
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Estimasi Pendapatan</span>
            </div>
            <p className="text-3xl font-black text-green-800 tracking-tight mb-1">Rp 12.450.000</p>
            <p className="text-xs text-green-600 font-medium">Bulan ini · dari 356 pesanan</p>
          </div>

          {/* Produk Aktif */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 text-xl">inventory_2</span>
              </div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Produk Aktif</span>
            </div>
            <p className="text-3xl font-black text-blue-800 tracking-tight mb-1">24 Produk</p>
            <p className="text-xs text-blue-600 font-medium">Dalam 5 kategori</p>
          </div>

          {/* Rata-rata Harian */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 text-xl">avg_pace</span>
              </div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Rata-rata Harian</span>
            </div>
            <p className="text-3xl font-black text-purple-800 tracking-tight mb-1">1.835</p>
            <p className="text-xs text-purple-600 font-medium">Kunjungan per hari</p>
          </div>

          {/* Waktu Ramai */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600 text-xl">schedule</span>
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Waktu Tersibuk</span>
            </div>
            <p className="text-3xl font-black text-amber-800 tracking-tight mb-1">19:00 - 21:00</p>
            <p className="text-xs text-amber-600 font-medium">Jumat &amp; Sabtu paling ramai</p>
          </div>
        </div>
      </section>
    </>
  );
}

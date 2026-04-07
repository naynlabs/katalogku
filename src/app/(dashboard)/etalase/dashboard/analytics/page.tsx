"use client";

import { useState } from "react";
import Image from "next/image";

// --- DUMMY DATA ---
const WEEKLY_DATA = [
  { day: 'Sen', views: 142, clicks: 18 },
  { day: 'Sel', views: 198, clicks: 32 },
  { day: 'Rab', views: 176, clicks: 25 },
  { day: 'Kam', views: 280, clicks: 48 },
  { day: 'Jum', views: 220, clicks: 35 },
  { day: 'Sab', views: 310, clicks: 52 },
  { day: 'Min', views: 158, clicks: 22 },
];

const MONTHLY_DATA = [
  { day: 'Mg 1', views: 820, clicks: 142 },
  { day: 'Mg 2', views: 1050, clicks: 198 },
  { day: 'Mg 3', views: 940, clicks: 165 },
  { day: 'Mg 4', views: 1280, clicks: 248 },
];

const TOP_LINKS = [
  { label: "Review Pelanggan", icon: "star", clicks: 312, ctr: 24.3, trend: "+8%" },
  { label: "Katalog Produk", icon: "inventory_2", clicks: 248, ctr: 19.3, trend: "+12%" },
  { label: "WhatsApp Order", icon: "chat", clicks: 158, ctr: 12.3, trend: "+3%" },
  { label: "Promo Flash Sale", icon: "local_fire_department", clicks: 94, ctr: 7.3, trend: "-2%" },
  { label: "Instagram", icon: "photo_camera", clicks: 72, ctr: 5.6, trend: "+1%" },
];

const TRAFFIC_SOURCES = [
  { label: "Langsung (Direct)", pct: 42, color: "#4f46e5" },
  { label: "Instagram Bio", pct: 28, color: "#e11d48" },
  { label: "WhatsApp Share", pct: 18, color: "#25D366" },
  { label: "TikTok Bio", pct: 8, color: "#000000" },
  { label: "Lainnya", pct: 4, color: "#94a3b8" },
];

const POPULAR_PRODUCTS = [
  {
    title: "Jam Tangan Minimalis",
    category: "Fashion & Aksesoris",
    views: "1.2k",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBw7g27iBPWTJoFDqvjMJ9t8-uYIU0bNpPtHmh-75e3nJ8Jzmn5EBhNtvXlfpUF3KMUSVOgfFGkwC_Wr0abRbScKbmQM2jk5nwuS3zGeCXJDm3pE8g9QyJNCoeZweXmy0cX2Gq5IJrNlz7f5-nUNTNLTXpTgWOIHAZbF_HuO7S2lv9d7NP087LbbqQNrFxefXKOSs4gdaZi_0JL1ya-4pa9p_7Ki_8hF--R6OBRhDOcqg3ObyamPn4Ubh1E59CHgevpqHAZxSEbnXn"
  },
  {
    title: "Sepatu Lari Pro X",
    category: "Olahraga",
    views: "856",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcVmXeeYqHuyvY-9nBbQAVq7zd35YitdrThGaL4aEve_Cabjm3FeBz3eG1Lg_jOO62jLT_hCaVC4wNVtoZzfdVCcSaIwB5hAHvvpCoCoaFuwumtpryjeMVGa6w02fXnR1Pg1PFMHThCfUkdOJckibCZQvHCephsgDy17KC3Chf3EiWJN8ObX1joRJQmZ5TWvIjDptt4evhjL0QFHrMYRHTBLpJj3_v5nvzDto-1Byy__qeZuCP8eqq861bpVUKzklbMdnFH3EIEFBE"
  },
  {
    title: "Headset Bluetooth",
    category: "Elektronik",
    views: "742",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZWGCOe2JnNd262clbvov3QO77VSPP4VrFLQi8NDW43PvJva_Nieg6DAg37tJRcekDQQFEaEk5qXxfDBQM4l0yeIkt-g4jrNdjy3cxY5lt6p3bfPZEPYP2JeFhZZypdaKuTwsXVLn1E0Dj5eKAEkyERxMXg399PsHEeiMHqzu8t2VoSrXLhppB_tFep8bzdr9LJ6911R0xPj_0ySf61b0B12CV2zN7QYAtJFkAr18cbeorqAdT7ESseRVRpxZB0jSBUeb-2Cz3sPOB"
  },
  {
    title: "Kacamata Retro",
    category: "Fashion",
    views: "611",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQnhxiUXbi5vte3LWQd3RlFbsA8LwWpe_am7zoJjK9I_ppxcRzkb5tGdqRKeNjrRj2TT4tHFTg8lRrNdlIoGfNvHd_B2SB_lvsNfexVnc3mgrclpsqHxR_Jm3OLk6v90O4UUK16Wf_HJ0s2Mbx3VdhsHqLCbM48l0tM1oKdIl4N0ksPR_Z8jJM72jDBoP8ueXZoScg7kSbV-MDQ8mBwhjzCbNA_pvoOTklLknBQfE9jHSYw6MqLwhmDZS4Tx7ihUWVivsJccL1xMSe"
  }
];

// ---- SVG Area Chart Component ----
function AreaChart({ data, width = 600, height = 220 }: { data: typeof WEEKLY_DATA; width?: number; height?: number }) {
  const maxVal = Math.max(...data.map(d => d.views));
  const padding = { top: 20, right: 20, bottom: 40, left: 10 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Generate points
  const viewPoints = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + chartH - (d.views / maxVal) * chartH,
  }));

  const clickPoints = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + chartH - (d.clicks / maxVal) * chartH,
  }));

  // Create smooth curve path
  const smoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const cp1x = points[i].x + (points[i + 1].x - points[i].x) / 3;
      const cp1y = points[i].y;
      const cp2x = points[i + 1].x - (points[i + 1].x - points[i].x) / 3;
      const cp2y = points[i + 1].y;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i + 1].x},${points[i + 1].y}`;
    }
    return d;
  };

  // Area fill path (close to bottom)
  const areaPath = (points: { x: number; y: number }[]) => {
    const line = smoothPath(points);
    return `${line} L ${points[points.length - 1].x},${padding.top + chartH} L ${points[0].x},${padding.top + chartH} Z`;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#25D366" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#25D366" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
        <line
          key={i}
          x1={padding.left}
          y1={padding.top + chartH * (1 - pct)}
          x2={width - padding.right}
          y2={padding.top + chartH * (1 - pct)}
          stroke="rgba(0,0,0,0.06)"
          strokeDasharray={i === 0 ? "0" : "4 4"}
        />
      ))}
      {/* Views Area */}
      <path d={areaPath(viewPoints)} fill="url(#viewsGrad)" />
      <path d={smoothPath(viewPoints)} fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
      {/* Clicks Area */}
      <path d={areaPath(clickPoints)} fill="url(#clicksGrad)" />
      <path d={smoothPath(clickPoints)} fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 3" />
      {/* Data dots (Views) */}
      {viewPoints.map((p, i) => (
        <g key={`vd-${i}`}>
          <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="#4f46e5" strokeWidth="2.5" className="opacity-0 hover:opacity-100 transition-opacity" />
          <circle cx={p.x} cy={p.y} r="3" fill="#4f46e5" className="opacity-70" />
        </g>
      ))}
      {/* Day labels */}
      {data.map((d, i) => (
        <text
          key={`lb-${i}`}
          x={padding.left + (i / (data.length - 1)) * chartW}
          y={height - 8}
          textAnchor="middle"
          className="fill-gray-400 text-[11px] font-bold uppercase"
          style={{ letterSpacing: '0.05em' }}
        >
          {d.day}
        </text>
      ))}
    </svg>
  );
}

// ---- Donut Chart Component ----
function DonutChart({ data }: { data: typeof TRAFFIC_SOURCES }) {
  const size = 140;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      {data.map((source, i) => {
        const dashLength = (source.pct / 100) * circumference;
        const dashOffset = -cumulativeOffset;
        cumulativeOffset += dashLength;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={source.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="transition-all duration-500"
            style={{ opacity: 0.85 }}
          />
        );
      })}
      {/* Center text */}
      <text x={size / 2} y={size / 2 - 6} textAnchor="middle" className="fill-on-surface text-lg font-black">1,484</text>
      <text x={size / 2} y={size / 2 + 12} textAnchor="middle" className="fill-gray-400 text-[9px] font-bold uppercase" style={{ letterSpacing: '0.1em' }}>Total Visit</text>
    </svg>
  );
}

// ---- Main Page ----
export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d');
  const activeData = period === '7d' ? WEEKLY_DATA : MONTHLY_DATA;

  const totalViews = activeData.reduce((s, d) => s + d.views, 0);
  const totalClicks = activeData.reduce((s, d) => s + d.clicks, 0);
  const ctr = ((totalClicks / totalViews) * 100).toFixed(1);

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Time Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">Ringkasan Performa</h1>
          <p className="text-on-surface-variant text-sm mt-1 font-medium">
            Pantau pertumbuhan toko Anda secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-full shadow-sm border border-outline-variant/10">
          <button
            onClick={() => setPeriod('7d')}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${period === '7d' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
          >
            7 Hari
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${period === '30d' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
          >
            30 Hari
          </button>
          <span className="material-symbols-outlined text-sm px-2 text-on-surface-variant">calendar_today</span>
        </div>
      </div>

      {/* 4x Scoreboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Views */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 group hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="flex items-center text-[10px] font-black text-green-700 bg-green-100 px-2 py-1 rounded-full gap-0.5">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
            </span>
          </div>
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Total Kunjungan</p>
          <h3 className="text-3xl font-black mt-1 text-on-surface">{totalViews.toLocaleString('id-ID')}</h3>
        </div>

        {/* Product Views */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 group hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <span className="flex items-center text-[10px] font-black text-green-700 bg-green-100 px-2 py-1 rounded-full gap-0.5">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 8.4%
            </span>
          </div>
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Produk Dilihat</p>
          <h3 className="text-3xl font-black mt-1 text-on-surface">5,432</h3>
        </div>

        {/* WA Clicks */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 group hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <span className="flex items-center text-[10px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-full gap-0.5">
              <span className="material-symbols-outlined text-[14px]">arrow_downward</span> 2.1%
            </span>
          </div>
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Klik WhatsApp</p>
          <h3 className="text-3xl font-black mt-1 text-on-surface">{totalClicks.toLocaleString('id-ID')}</h3>
        </div>

        {/* CTR (NEW) */}
        <div className="bg-gradient-to-br from-primary to-primary-container text-white p-6 rounded-2xl shadow-xl shadow-primary/15 group hover:-translate-y-1 hover:shadow-2xl transition-all relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <span className="material-symbols-outlined">ads_click</span>
            </div>
            <span className="flex items-center text-[10px] font-black text-white/80 bg-white/20 px-2 py-1 rounded-full gap-0.5">
              Konversi
            </span>
          </div>
          <p className="text-[11px] font-bold text-white/70 uppercase tracking-widest">CTR Rata-rata</p>
          <h3 className="text-3xl font-black mt-1">{ctr}%</h3>
        </div>
      </div>

      {/* Chart & Traffic Source */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: SVG Area Chart (2-col) */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black tracking-tight text-on-surface">Tren Pengunjung</h3>
            <div className="flex items-center gap-5 text-xs font-bold text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] rounded-full bg-primary inline-block" /> Kunjungan
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-[3px] rounded-full bg-[#25D366] inline-block" style={{ borderTop: '2px dashed #25D366', height: 0 }} /> Klik WA
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[220px]">
            <AreaChart data={activeData} />
          </div>
        </div>

        {/* Right: Traffic Source Donut */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col">
          <h3 className="text-lg font-black tracking-tight text-on-surface mb-6">Sumber Traffic</h3>
          <div className="flex flex-col items-center gap-6 flex-1 justify-center">
            <DonutChart data={TRAFFIC_SOURCES} />
            <div className="w-full space-y-2.5">
              {TRAFFIC_SOURCES.map((src, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: src.color }} />
                    <span className="font-medium text-on-surface text-[13px]">{src.label}</span>
                  </div>
                  <span className="font-black text-on-surface text-[13px]">{src.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Link Performers & Popular Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Top Link Performers (2-col) */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-outline-variant/10">
            <h3 className="text-lg font-black tracking-tight text-on-surface">Link Performa Terbaik</h3>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container-low px-3 py-1.5 rounded-full">
              Berdasarkan Klik
            </span>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {TOP_LINKS.map((link, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-surface-container-low/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{link.label}</p>
                    <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">CTR: {link.ctr}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-black text-primary">{link.clicks}</p>
                    <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest">Klik</p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${
                    link.trend.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}>
                    {link.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Popular Products */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black tracking-tight text-on-surface">Produk Populer</h3>
            <button className="text-primary text-xs font-bold hover:underline px-3 py-1 bg-primary/10 rounded-full">
              Lihat Semua
            </button>
          </div>
          
          <div className="space-y-5 flex-1">
            {POPULAR_PRODUCTS.map((p, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-surface-container/50 p-2 -mx-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-surface-container shadow-sm group-hover:shadow-md transition-shadow shrink-0">
                    <Image src={p.img} alt={p.title} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface line-clamp-1 mb-0.5">{p.title}</p>
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">{p.category}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="text-sm font-black text-primary">{p.views}</p>
                  <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">Views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

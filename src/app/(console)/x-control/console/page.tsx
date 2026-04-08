"use client";

import React from "react";

// Dummy data
const stats = [
  { label: "Total Pengguna Aktif", value: "2,408", trend: "+12%", trendUp: true, icon: "group", sparkline: [30, 45, 35, 60, 50, 80, 72] },
  { label: "Toko Online Dibuat", value: "1,945", trend: "+18%", trendUp: true, icon: "storefront", sparkline: [20, 30, 28, 50, 45, 65, 75] },
  { label: "Total Kunjungan", value: "842.1K", trend: "+5%", trendUp: true, icon: "visibility", sparkline: [60, 55, 70, 65, 80, 75, 85] },
  { label: "MRR", value: "Rp 14.5M", trend: "-2%", trendUp: false, icon: "payments", sparkline: [90, 85, 88, 80, 78, 75, 74] },
];

const recentSignups = [
  { id: 1, name: "Budi Santoso", store: "Kopi Senja", date: "Hari ini, 10:45", plan: "Free", products: 12 },
  { id: 2, name: "Siti Aminah", store: "Hijab Stylist", date: "Hari ini, 09:12", plan: "Pro", products: 45 },
  { id: 3, name: "Reza Oktovian", store: "Gears Gadget", date: "Kemarin, 21:30", plan: "Free", products: 0 },
  { id: 4, name: "Ayu Tingting", store: "Beauty Care ID", date: "Kemarin, 14:20", plan: "Free", products: 8 },
  { id: 5, name: "Joko Anwar", store: "Sinema Kopi", date: "2 hari lalu", plan: "Pro", products: 24 },
];

const planBreakdown = [
  { plan: "Free", count: 1820, pct: 75.5, color: "#94a3b8" },
  { plan: "Pro", count: 480, pct: 19.9, color: "#4f46e5" },
  { plan: "VIP", count: 108, pct: 4.5, color: "#eab308" },
];

// --- Sparkline SVG ---
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 80, h = 28;
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// --- Ring Chart ---
function PlanRing({ data }: { data: typeof planBreakdown }) {
  const size = 120;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ringData = data.reduce<{ dash: number; dashOffset: number; color: string }[]>((acc, d) => {
    const dash = (d.pct / 100) * circumference;
    const prev = acc[acc.length - 1];
    const offset = prev ? prev.dashOffset - prev.dash : 0;
    acc.push({ dash, dashOffset: offset, color: d.color });
    return acc;
  }, []);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {ringData.map((d, i) => (
        <circle
          key={i}
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={d.color} strokeWidth={strokeWidth}
          strokeDasharray={`${d.dash} ${circumference - d.dash}`}
          strokeDashoffset={d.dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      ))}
      <text x={size / 2} y={size / 2 - 4} textAnchor="middle" className="fill-on-surface text-sm font-black">2,408</text>
      <text x={size / 2} y={size / 2 + 10} textAnchor="middle" className="fill-on-surface-variant text-[8px] font-bold uppercase" style={{ letterSpacing: '0.1em' }}>Users</text>
    </svg>
  );
}

export default function ConsoleOverviewPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Ikhtisar Platform</h1>
          <p className="text-on-surface-variant mt-1">Pantau performa dan daya tarik Katalogku secara real-time.</p>
        </div>
        <div className="flex bg-surface-container rounded-lg p-1 border border-outline-variant/20">
          <button className="px-4 py-1.5 text-sm font-bold bg-on-surface text-surface rounded-md shadow-sm">Bulan Ini</button>
          <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors rounded-md">Bulan Lalu</button>
          <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors rounded-md">Tahun Ini</button>
        </div>
      </div>

      {/* Stats with Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface rounded-2xl p-5 border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-surface-container rounded-xl text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
              <Sparkline data={stat.sparkline} color={stat.trendUp ? '#4f46e5' : '#ef4444'} />
            </div>
            <p className="text-xs font-semibold text-on-surface-variant mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-on-surface">{stat.value}</span>
              <span className={`flex items-center gap-0.5 text-[11px] font-bold ${stat.trendUp ? 'text-primary' : 'text-error'}`}>
                <span className="material-symbols-outlined text-[14px]">{stat.trendUp ? 'trending_up' : 'trending_down'}</span>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-on-surface">Tren Pengguna Baru</h2>
            <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">download</span> Unduh CSV
            </button>
          </div>
          <div className="flex-1 rounded-xl bg-surface-container-lowest border border-outline-variant/15 flex items-end justify-around p-6 gap-2 relative overflow-hidden">
            {/* Y-axis labels */}
            <div className="absolute left-2 top-4 bottom-12 flex flex-col justify-between text-[9px] text-on-surface-variant font-medium">
              <span>150</span><span>100</span><span>50</span><span>0</span>
            </div>
            {[40, 20, 60, 45, 80, 50, 95, 78, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 relative group" style={{ height: '100%' }}>
                <div
                  className="w-full bg-primary/15 hover:bg-primary/30 rounded-t-lg transition-all duration-300 relative group-hover:-translate-y-0.5 mt-auto"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] font-bold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap transition-opacity">
                    +{Math.floor(h * 1.5)} toko
                  </div>
                </div>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase">{['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Plan Breakdown */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-on-surface mb-6">Distribusi Paket</h2>
          <div className="flex flex-col items-center gap-6 flex-1 justify-center">
            <PlanRing data={planBreakdown} />
            <div className="w-full space-y-3">
              {planBreakdown.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    <span className="text-sm font-semibold text-on-surface">{p.plan}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-on-surface">{p.count.toLocaleString()}</span>
                    <span className="text-xs text-on-surface-variant ml-1.5">({p.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Signups */}
      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-outline-variant/20">
          <h2 className="text-lg font-bold text-on-surface">Pendaftaran Terbaru</h2>
          <button className="text-sm font-bold text-on-surface-variant hover:text-on-surface flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-[16px]">refresh</span> Refresh
          </button>
        </div>
        <div className="divide-y divide-outline-variant/15">
          {recentSignups.map((user) => (
            <div key={user.id} className="flex items-center justify-between px-6 py-4 hover:bg-surface-container-lowest transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-primary flex items-center justify-center font-bold text-sm">
                  {user.store.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">{user.store}</h3>
                  <p className="text-xs text-on-surface-variant">{user.name} • {user.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-on-surface-variant font-medium">{user.products} produk</span>
                {user.plan === "Pro" ? (
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-tertiary-container text-tertiary rounded-lg">Pro</span>
                ) : (
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant rounded-lg">Free</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-outline-variant/20 text-center">
          <button className="text-sm font-bold text-primary hover:underline">Lihat Semua Pendaftar →</button>
        </div>
      </div>
    </div>
  );
}

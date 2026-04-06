"use client";

import React from "react";

// Dummy data for initial UI slicing
const stats = [
  { label: "Total Pengguna Aktif", value: "2,408", trend: "+12%", trendUp: true, icon: "group" },
  { label: "Toko Online Dibuat", value: "1,945", trend: "+18%", trendUp: true, icon: "storefront" },
  { label: "Total Kunjungan Platform", value: "842.1K", trend: "+5%", trendUp: true, icon: "visibility" },
  { label: "Monthly Recurring Revenue (MRR)", value: "Rp 14.5M", trend: "-2%", trendUp: false, icon: "payments" },
];

const recentSignups = [
  { id: 1, name: "Budi Santoso", store: "Kopi Senja", date: "Hari ini, 10:45 AM", plan: "Gratisan" },
  { id: 2, name: "Siti Aminah", store: "Hijab Stylist", date: "Hari ini, 09:12 AM", plan: "Gratisan" },
  { id: 3, name: "Reza Oktovian", store: "Gears Gadget", date: "Kemarin, 21:30 PM", plan: "Pro" },
  { id: 4, name: "Ayu Tingting", store: "Beauty Care ID", date: "Kemarin, 14:20 PM", plan: "Gratisan" },
];

export default function ConsoleOverviewPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Ikhtisar Platform</h1>
          <p className="text-on-surface-variant mt-1">Pantau performa dan daya tarik Katalogku secara real-time.</p>
        </div>
        <div className="flex bg-surface-container rounded-lg p-1">
          <button className="px-4 py-1.5 text-sm font-bold bg-surface text-on-surface rounded-md shadow-sm">Bulan Ini</button>
          <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors rounded-md">Bulan Lalu</button>
          <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors rounded-md">Tahun Ini</button>
        </div>
      </div>

      {/* Hero Stats Wrapper - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface rounded-2xl p-6 border border-outline-variant/40 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-on-surface">{stat.icon}</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-surface-container rounded-lg text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">{stat.icon}</span>
              </div>
              <span className="font-semibold text-sm text-on-surface-variant">{stat.label}</span>
            </div>
            <div className="text-3xl font-black text-on-surface mb-2">{stat.value}</div>
            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? "text-primary" : "text-error"}`}>
              <span className="material-symbols-outlined text-[14px]">
                {stat.trendUp ? "trending_up" : "trending_down"}
              </span>
              <span>{stat.trend} dari bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Chart Area Mock) */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-outline-variant/40 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-on-surface">Tren Pengguna Baru</h2>
            <button className="text-sm font-bold text-primary hover:underline">Unduh Laporan CSV</button>
          </div>
          <div className="flex-1 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center relative overflow-hidden">
             {/* Mocking a bar/line chart visually */}
             <div className="flex items-end justify-around w-full h-full p-4 gap-2 pt-12">
               {[40, 20, 60, 45, 80, 50, 95, 78, 90, 65, 85, 100].map((h, i) => (
                 <div key={i} className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all duration-300 relative group" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] font-bold py-1 px-2 rounded">
                      +{Math.floor(h * 1.5)}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right Column (Recent Signups) */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/40 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-on-surface">Pendaftaran Terbaru</h2>
            <button className="text-sm font-bold text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-sm">refresh</span></button>
          </div>
          <div className="space-y-4 flex-1">
            {recentSignups.map((user) => (
              <div key={user.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">{user.store}</h3>
                    <p className="text-xs text-on-surface-variant">{user.name} • {user.date}</p>
                  </div>
                </div>
                {user.plan === "Pro" ? (
                  <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider bg-tertiary-container text-tertiary rounded-md">Pro</span>
                ) : (
                  <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant rounded-md">Free</span>
                )}
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2.5 rounded-lg border border-outline-variant/50 text-sm font-bold text-on-surface hover:bg-surface-container transition-colors">
            Lihat Semua Pendaftar
          </button>
        </div>
      </div>
    </div>
  );
}

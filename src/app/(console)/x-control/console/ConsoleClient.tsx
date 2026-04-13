"use client";

import React from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type StatCard = {
  label: string;
  value: string;
  icon: string;
};

type RecentSignup = {
  id: string;
  name: string;
  storeName: string;
  productCount: number;
  createdAt: string;
};

type ChartBar = {
  label: string;
  count: number;
};

type ConsoleProps = {
  stats: StatCard[];
  totalUsers: number;
  recentSignups: RecentSignup[];
  chartData: ChartBar[];
};

// ─── Components ─────────────────────────────────────────────────────────────

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return "Baru saja";
  if (diffH < 24) return `${diffH} jam lalu`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "Kemarin";
  if (diffD < 7) return `${diffD} hari lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function ConsoleClient({ stats, totalUsers, recentSignups, chartData }: ConsoleProps) {
  const maxChart = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Ikhtisar Platform</h1>
          <p className="text-on-surface-variant mt-1">Pantau performa dan daya tarik Katalogku secara real-time.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface rounded-2xl p-5 border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-surface-container rounded-xl text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
            </div>
            <p className="text-xs font-semibold text-on-surface-variant mb-1">{stat.label}</p>
            <span className="text-2xl font-black text-on-surface">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-on-surface">Tren Pendaftaran Toko</h2>
            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full">12 Bulan Terakhir</span>
          </div>
          <div className="flex-1 rounded-xl bg-surface-container-lowest border border-outline-variant/15 flex items-end justify-around p-6 gap-2 relative overflow-hidden">
            {chartData.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-30">bar_chart</span>
                <p className="text-sm font-medium">Belum ada data pendaftaran</p>
              </div>
            ) : (
              chartData.map((d, i) => {
                const h = (d.count / maxChart) * 100;
                const isLast = i === chartData.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar relative" style={{ height: "100%" }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 bg-on-surface text-surface text-[10px] font-bold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap transition-opacity z-10">
                      +{d.count} toko
                    </div>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 group-hover/bar:-translate-y-0.5 mt-auto ${
                        isLast
                          ? "bg-gradient-to-t from-primary to-primary-container shadow-lg shadow-primary/20 ring-2 ring-primary/20"
                          : "bg-primary/15 hover:bg-primary/25"
                      }`}
                      style={{ height: `${Math.max(h, 4)}%` }}
                    />
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${isLast ? "text-primary" : "text-on-surface-variant"}`}>
                      {d.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* User Summary */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-on-surface mb-6">Ringkasan Platform</h2>
          <div className="flex flex-col items-center gap-4 flex-1 justify-center">
            <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-black text-primary block">{totalUsers.toLocaleString("id-ID")}</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Total Users</span>
              </div>
            </div>
            <div className="w-full space-y-3 mt-2">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                  <span className="text-sm font-bold text-on-surface">{s.value}</span>
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
        </div>
        <div className="divide-y divide-outline-variant/15">
          {recentSignups.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-30">person_add</span>
              <p className="text-sm font-medium">Belum ada pendaftaran</p>
            </div>
          ) : (
            recentSignups.map((user) => (
              <div key={user.id} className="flex items-center justify-between px-6 py-4 hover:bg-surface-container-lowest transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-primary flex items-center justify-center font-bold text-sm">
                    {user.storeName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">{user.storeName}</h3>
                    <p className="text-xs text-on-surface-variant">{user.name} • {formatRelativeDate(user.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant font-medium">{user.productCount} produk</span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-outline-variant/20 text-center">
          <a href="/x-control/console/pengguna" className="text-sm font-bold text-primary hover:underline">
            Lihat Semua Pendaftar →
          </a>
        </div>
      </div>
    </div>
  );
}

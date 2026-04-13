"use client";

import React, { useState } from "react";
import { formatRupiah } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

type MonthlyRevenue = { label: string; revenue: number; orderCount: number };
type RecentOrder = { invoiceId: string; customerName: string; totalAmount: number; status: string; createdAt: string; storeName: string };
type StatusBreakdown = { status: string; count: number; total: number };

type KeuanganProps = {
  monthlyRevenue: MonthlyRevenue[];
  recentOrders: RecentOrder[];
  statusBreakdown: StatusBreakdown[];
  totalGMV: number;
  totalOrders: number;
};

// ─── Revenue Bar Chart ──────────────────────────────────────────────────────

function RevenueChart({ data }: { data: MonthlyRevenue[] }) {
  const maxRev = Math.max(...data.map((d) => d.revenue), 1);
  return (
    <div className="flex items-end justify-between gap-3 h-[220px] w-full pt-4">
      {data.map((d, i) => {
        const h = (d.revenue / maxRev) * 100;
        const isLast = i === data.length - 1;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap transition-opacity z-10">
              {formatRupiah(d.revenue)} • {d.orderCount} order
            </div>
            <div
              className={`w-full rounded-t-xl transition-all duration-300 group-hover:-translate-y-1 ${
                isLast
                  ? "bg-gradient-to-t from-primary to-primary-container shadow-lg shadow-primary/20 ring-2 ring-primary/20"
                  : "bg-primary/15 hover:bg-primary/25"
              }`}
              style={{ height: `${Math.max(h, 4)}%` }}
            />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isLast ? "text-primary" : "text-on-surface-variant"}`}>
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Status helpers ─────────────────────────────────────────────────────────

const statusLabel: Record<string, string> = {
  PENDING: "Pending",
  PROCESSING: "Diproses",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

const statusStyle: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-600",
};

const statusDot: Record<string, string> = {
  PENDING: "bg-amber-500",
  PROCESSING: "bg-blue-500",
  COMPLETED: "bg-green-500",
  CANCELLED: "bg-red-500",
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function KeuanganClient({ monthlyRevenue, recentOrders, statusBreakdown, totalGMV, totalOrders }: KeuanganProps) {
  const [filterStatus, setFilterStatus] = useState("Semua");
  const statusFilters = ["Semua", "COMPLETED", "PENDING", "CANCELLED"];

  const filteredTx = filterStatus === "Semua" ? recentOrders : recentOrders.filter((t) => t.status === filterStatus);

  // Calculate completed revenue
  const completedRevenue = statusBreakdown.find((s) => s.status === "COMPLETED")?.total ?? 0;
  const completedCount = statusBreakdown.find((s) => s.status === "COMPLETED")?.count ?? 0;

  // Month-over-month growth
  const lastMonth = monthlyRevenue.length >= 1 ? monthlyRevenue[monthlyRevenue.length - 1].revenue : 0;
  const prevMonth = monthlyRevenue.length >= 2 ? monthlyRevenue[monthlyRevenue.length - 2].revenue : 0;
  const growthPct = prevMonth > 0 ? (((lastMonth - prevMonth) / prevMonth) * 100).toFixed(1) : "0";

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Dasbor Finansial</h1>
          <p className="text-on-surface-variant mt-1">Pantau aliran dana dan manajemen transaksi platform.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total GMV */}
        <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl p-6 shadow-xl shadow-primary/15 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <p className="text-sm font-semibold text-white/70 mb-1">Total GMV Platform</p>
          <h3 className="text-3xl font-black">{formatRupiah(totalGMV)}</h3>
          <div className="flex items-center gap-1 mt-3 text-sm font-bold text-white/80">
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            {totalOrders} total pesanan
          </div>
        </div>

        {/* Completed Revenue */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-500/5 rounded-full blur-xl" />
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Revenue Selesai</p>
          <h3 className="text-3xl font-black text-green-600">{formatRupiah(completedRevenue)}</h3>
          <div className="flex items-center gap-1 mt-3 text-sm font-bold text-green-600">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            {completedCount} pesanan selesai
          </div>
        </div>

        {/* Growth */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-tertiary/5 rounded-full blur-xl" />
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Pertumbuhan Bulanan</p>
          <h3 className="text-3xl font-black text-on-surface">{Number(growthPct) >= 0 ? "+" : ""}{growthPct}%</h3>
          <div className="flex items-center gap-1 mt-3 text-sm font-bold text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">
              {Number(growthPct) >= 0 ? "trending_up" : "trending_down"}
            </span>
            vs bulan sebelumnya
          </div>
        </div>
      </div>

      {/* Revenue Chart + Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-on-surface">Revenue Bulanan</h2>
            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full">6 Bulan Terakhir</span>
          </div>
          <div className="flex-1 min-h-[220px]">
            {monthlyRevenue.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-30">bar_chart</span>
                <p className="text-sm font-medium">Belum ada data revenue</p>
              </div>
            ) : (
              <RevenueChart data={monthlyRevenue} />
            )}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-on-surface mb-6">Status Pesanan</h2>
          <div className="space-y-5 flex-1">
            {statusBreakdown.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant py-8">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-30">inventory_2</span>
                <p className="text-sm font-medium">Belum ada pesanan</p>
              </div>
            ) : (
              statusBreakdown.map((s, i) => {
                const totalAll = statusBreakdown.reduce((sum, x) => sum + x.count, 0);
                const pct = totalAll > 0 ? ((s.count / totalAll) * 100).toFixed(1) : "0";
                const colors: Record<string, string> = {
                  COMPLETED: "#22c55e",
                  PENDING: "#f59e0b",
                  PROCESSING: "#3b82f6",
                  CANCELLED: "#ef4444",
                };
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: colors[s.status] ?? "#94a3b8" }} />
                        <span className="text-sm font-semibold text-on-surface">{statusLabel[s.status] ?? s.status}</span>
                      </div>
                      <span className="text-sm font-black text-on-surface">{formatRupiah(s.total)}</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: colors[s.status] ?? "#94a3b8" }}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-on-surface-variant">{s.count} pesanan • {pct}% dari total</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold text-on-surface">Histori Transaksi</h2>
          <div className="flex bg-surface-container rounded-lg p-1 gap-0.5">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  filterStatus === f ? "bg-surface text-on-surface shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {f === "Semua" ? "Semua" : statusLabel[f] ?? f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[700px]">
            <thead className="bg-surface-container-lowest text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/15">
              <tr>
                <th className="py-4 px-6 font-bold">Invoice</th>
                <th className="py-4 px-6 font-bold">Toko / Customer</th>
                <th className="py-4 px-6 font-bold">Tanggal</th>
                <th className="py-4 px-6 font-bold">Nominal</th>
                <th className="py-4 px-6 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredTx.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-30 block">receipt_long</span>
                    <p className="font-medium">Belum ada transaksi</p>
                  </td>
                </tr>
              ) : (
                filteredTx.map((tx, i) => (
                  <tr key={i} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="py-4 px-6 font-mono font-medium text-on-surface">{tx.invoiceId}</td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-bold text-on-surface">{tx.storeName}</span>
                        <p className="text-xs text-on-surface-variant mt-0.5">{tx.customerName}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant font-medium">{formatDate(tx.createdAt)}</td>
                    <td className="py-4 px-6 font-bold text-on-surface">{formatRupiah(tx.totalAmount)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${statusStyle[tx.status] ?? "bg-surface-container text-on-surface-variant"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[tx.status] ?? "bg-gray-400"}`} />
                        {statusLabel[tx.status] ?? tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/20 flex items-center justify-between text-sm text-on-surface-variant">
          <span className="font-medium">Menampilkan {filteredTx.length} transaksi</span>
        </div>
      </div>
    </div>
  );
}

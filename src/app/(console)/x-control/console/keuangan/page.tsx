"use client";

import React, { useState } from "react";

// --- Dummy Data ---
const monthlyRevenue = [
  { month: "Jan", revenue: 8200000, subscribers: 320 },
  { month: "Feb", revenue: 9100000, subscribers: 345 },
  { month: "Mar", revenue: 10500000, subscribers: 390 },
  { month: "Apr", revenue: 11800000, subscribers: 420 },
  { month: "Mei", revenue: 12300000, subscribers: 448 },
  { month: "Jun", revenue: 14500000, subscribers: 488 },
];

const planRevenue = [
  { plan: "Pro (Rp 49K/bln)", count: 480, revenue: 23520000, color: "#4f46e5", pct: 65 },
  { plan: "VIP (Rp 99K/bln)", count: 108, revenue: 10692000, color: "#eab308", pct: 30 },
  { plan: "Custom / Enterprise", count: 5, revenue: 1750000, color: "#06b6d4", pct: 5 },
];

const transactions = [
  { id: "TRX-0412", store: "Kopi Senja", user: "Budi Santoso", date: "07 Apr 2026", amount: 49000, plan: "Pro", status: "Berhasil" },
  { id: "TRX-0411", store: "Hijab Stylist", user: "Siti Aminah", date: "06 Apr 2026", amount: 99000, plan: "VIP", status: "Berhasil" },
  { id: "TRX-0410", store: "Sinema Kopi", user: "Joko Anwar", date: "05 Apr 2026", amount: 49000, plan: "Pro", status: "Berhasil" },
  { id: "TRX-0409", store: "Fashion Hub", user: "Diana Putri", date: "05 Apr 2026", amount: 49000, plan: "Pro", status: "Gagal" },
  { id: "TRX-0408", store: "Tech Store ID", user: "Andi Wijaya", date: "04 Apr 2026", amount: 99000, plan: "VIP", status: "Berhasil" },
  { id: "TRX-0407", store: "Bakery Mama", user: "Rina Susanti", date: "04 Apr 2026", amount: 49000, plan: "Pro", status: "Pending" },
  { id: "TRX-0406", store: "Gears Gadget", user: "Reza Oktovian", date: "03 Apr 2026", amount: 49000, plan: "Pro", status: "Berhasil" },
];

// --- Revenue Bar Chart ---
function RevenueChart({ data }: { data: typeof monthlyRevenue }) {
  const maxRev = Math.max(...data.map(d => d.revenue));
  return (
    <div className="flex items-end justify-between gap-3 h-[220px] w-full pt-4">
      {data.map((d, i) => {
        const h = (d.revenue / maxRev) * 100;
        const isLast = i === data.length - 1;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap transition-opacity z-10">
              Rp {(d.revenue / 1000000).toFixed(1)}M • {d.subscribers} user
            </div>
            <div
              className={`w-full rounded-t-xl transition-all duration-300 group-hover:-translate-y-1 ${
                isLast
                  ? 'bg-gradient-to-t from-primary to-primary-container shadow-lg shadow-primary/20 ring-2 ring-primary/20'
                  : 'bg-primary/15 hover:bg-primary/25'
              }`}
              style={{ height: `${h}%` }}
            />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isLast ? 'text-primary' : 'text-on-surface-variant'}`}>
              {d.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function KeuanganPage() {
  const [filterStatus, setFilterStatus] = useState("Semua");
  const statusFilters = ["Semua", "Berhasil", "Pending", "Gagal"];

  const totalRevenue = monthlyRevenue[monthlyRevenue.length - 1].revenue;
  const prevRevenue = monthlyRevenue[monthlyRevenue.length - 2].revenue;
  const revenueGrowth = (((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1);

  const filteredTx = filterStatus === "Semua" ? transactions : transactions.filter(t => t.status === filterStatus);

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Dasbor Finansial</h1>
          <p className="text-on-surface-variant mt-1">Pantau aliran dana, MRR, dan manajemen invoice platform.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-on-surface text-surface rounded-xl font-bold text-sm shadow-md hover:bg-on-surface/90 transition-colors">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Unduh Laporan
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* MRR */}
        <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl p-6 shadow-xl shadow-primary/15 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <p className="text-sm font-semibold text-white/70 mb-1">Pendapatan Bulan Ini</p>
          <h3 className="text-3xl font-black">Rp {(totalRevenue / 1000000).toFixed(1)}M</h3>
          <div className="flex items-center gap-1 mt-3 text-sm font-bold text-white/80">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            +{revenueGrowth}% dari bulan lalu
          </div>
        </div>

        {/* Projected MRR */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-tertiary/5 rounded-full blur-xl" />
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Proyeksi MRR</p>
          <h3 className="text-3xl font-black text-tertiary">Rp 18.2M</h3>
          <div className="flex items-center gap-1 mt-3 text-sm font-bold text-tertiary">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            +8.2% growth rate
          </div>
        </div>

        {/* Refunds */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-error/5 rounded-full blur-xl" />
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Pengembalian (Refunds)</p>
          <h3 className="text-3xl font-black text-on-surface">Rp 0</h3>
          <div className="flex items-center gap-1 mt-3 text-sm font-bold text-green-600">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Zero refunds 🎉
          </div>
        </div>
      </div>

      {/* Revenue Chart + Plan Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-on-surface">Revenue Bulanan</h2>
            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full">6 Bulan Terakhir</span>
          </div>
          <div className="flex-1 min-h-[220px]">
            <RevenueChart data={monthlyRevenue} />
          </div>
        </div>

        {/* Plan Breakdown */}
        <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-on-surface mb-6">Revenue per Paket</h2>
          <div className="space-y-5 flex-1">
            {planRevenue.map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    <span className="text-sm font-semibold text-on-surface">{p.plan}</span>
                  </div>
                  <span className="text-sm font-black text-on-surface">Rp {(p.revenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${p.pct}%`, backgroundColor: p.color }}
                  />
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant">{p.count} subscriber • {p.pct}% dari total</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold text-on-surface">Histori Langganan</h2>
          <div className="flex bg-surface-container rounded-lg p-1 gap-0.5">
            {statusFilters.map(f => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  filterStatus === f ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[700px]">
            <thead className="bg-surface-container-lowest text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/15">
              <tr>
                <th className="py-4 px-6 font-bold">ID Transaksi</th>
                <th className="py-4 px-6 font-bold">Toko / User</th>
                <th className="py-4 px-6 font-bold">Tanggal</th>
                <th className="py-4 px-6 font-bold">Paket</th>
                <th className="py-4 px-6 font-bold">Nominal</th>
                <th className="py-4 px-6 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredTx.map((tx, i) => (
                <tr key={i} className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="py-4 px-6 font-mono font-medium text-on-surface">{tx.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <span className="font-bold text-on-surface">{tx.store}</span>
                      <p className="text-xs text-on-surface-variant mt-0.5">{tx.user}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium">{tx.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg ${
                      tx.plan === 'VIP' ? 'bg-yellow-100 text-yellow-700' : 'bg-primary/10 text-primary'
                    }`}>
                      {tx.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-on-surface">Rp {tx.amount.toLocaleString("id-ID")}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      tx.status === 'Berhasil' ? 'bg-green-100 text-green-700' :
                      tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        tx.status === 'Berhasil' ? 'bg-green-500' :
                        tx.status === 'Pending' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`} />
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/20 flex items-center justify-between text-sm text-on-surface-variant">
          <span className="font-medium">Menampilkan {filteredTx.length} transaksi</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-on-surface text-surface font-bold text-xs">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

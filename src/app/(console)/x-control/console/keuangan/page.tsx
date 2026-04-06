"use client";

import React from "react";

export default function KeuanganPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Dasbor Finansial</h1>
        <p className="text-on-surface-variant mt-1">Pantau aliran dana, MRR, dan manajemen invoice platform.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{ label: "Total Pendapatan (Bulan Ini)", value: "Rp 14.500.000", trend: "+12.5%", color: "text-primary", bg: "bg-primary/10" },
          { label: "Proyeksi MRR", value: "Rp 18.250.000", trend: "+8.2%", color: "text-tertiary", bg: "bg-tertiary/10" },
          { label: "Pengembalian (Refunds)", value: "Rp 0", trend: "0%", color: "text-error", bg: "bg-error/10" }
        ].map((stat, i) => (
          <div key={i} className="bg-surface rounded-2xl p-6 border border-outline-variant/40 shadow-sm relative overflow-hidden">
            <h3 className="text-sm font-semibold text-on-surface-variant mb-2">{stat.label}</h3>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
            <div className={`inline-block mt-4 px-2.5 py-1 ${stat.bg} ${stat.color} text-xs font-bold rounded-lg`}>
              {stat.trend} dari bulan lalu
            </div>
          </div>
        ))}
      </div>

      {/* Invoice List */}
      <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
          <h2 className="text-lg font-bold text-on-surface">Histori Pembayaran Langganan (Pro)</h2>
          <button className="text-sm text-primary font-bold hover:underline">Unduh Laporan</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-lowest text-on-surface-variant text-xs uppercase tracking-wider">
            <tr>
              <th className="py-4 px-6 font-bold">ID Transaksi</th>
              <th className="py-4 px-6 font-bold">Toko / User</th>
              <th className="py-4 px-6 font-bold">Tanggal</th>
              <th className="py-4 px-6 font-bold">Nominal</th>
              <th className="py-4 px-6 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {["TRX-001", "TRX-002", "TRX-003", "TRX-004"].map((id, i) => (
              <tr key={i} className="hover:bg-surface-container-lowest transition-colors">
                <td className="py-4 px-6 font-mono font-medium text-on-surface">{id}</td>
                <td className="py-4 px-6"><span className="font-bold">Kopi Senja</span></td>
                <td className="py-4 px-6 text-on-surface-variant">01 April 2026</td>
                <td className="py-4 px-6 font-bold text-primary">Rp 49.000</td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-green-500/10 text-green-700 text-[10px] font-black tracking-wider uppercase rounded-md">Berhasil</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

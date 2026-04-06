"use client";

import { useState } from "react";

// Dummy Data
const initialAudience = [
  { id: 1, email: "amanda.putri@gmail.com", joined: "Hari ini", promoStatus: "Setuju" },
  { id: 2, email: "budi.santoso_99@yahoo.com", joined: "Kemarin", promoStatus: "Setuju" },
  { id: 3, email: "chika.lia@hotmail.com", joined: "2 Hari lalu", promoStatus: "Batal" },
  { id: 4, email: "dani_firmansyah@gmail.com", joined: "3 Hari lalu", promoStatus: "Setuju" },
  { id: 5, email: "eka.kartika@outlook.com", joined: "4 Hari lalu", promoStatus: "Setuju" },
];

export default function AudiensPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAudience = initialAudience.filter((p) =>
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Audiens & Pelanggan
          </h2>
          <p className="text-on-surface-variant text-sm">
            Kelola daftar email pelanggan yang mengikuti update toko Anda.
          </p>
        </div>
        <button className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-transform flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Export CSV (Pro)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 tonal-depth">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-xl">group</span>
            <span className="text-sm font-bold text-on-surface-variant">Total Audiens</span>
          </div>
          <p className="text-4xl font-black text-on-surface">1,248</p>
          <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +12 hari ini
          </p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 tonal-depth">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-warning bg-warning/10 p-2 rounded-xl">mark_email_read</span>
            <span className="text-sm font-bold text-on-surface-variant">Izin Promo</span>
          </div>
          <p className="text-4xl font-black text-on-surface">98%</p>
          <p className="text-xs text-on-surface-variant font-medium mt-2">Setuju menerima broadcast</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 tonal-depth">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-error bg-error/10 p-2 rounded-xl">unsubscribe</span>
            <span className="text-sm font-bold text-on-surface-variant">Unsubscribes</span>
          </div>
          <p className="text-4xl font-black text-on-surface">14</p>
          <p className="text-xs text-on-surface-variant font-medium mt-2">Berhenti mengikuti bulan ini</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 tonal-depth overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-6 border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Cari email audiens..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-low border border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-full pl-10 pr-4 py-2.5 text-sm font-medium text-on-surface transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-on-surface-variant font-bold">Urutkan:</span>
            <select className="bg-surface-container-low border-none rounded-full px-4 py-2 font-bold text-on-surface focus:ring-0 cursor-pointer outline-none cursor-pointer">
              <option>Terbaru</option>
              <option>Terlama</option>
              <option>A-Z</option>
            </select>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-lowest/50 text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
                <th className="p-4 sm:p-6 pb-3">Email Pelanggan</th>
                <th className="p-4 sm:p-6 pb-3 hidden sm:table-cell">Waktu Bergabung</th>
                <th className="p-4 sm:p-6 pb-3">Status Promo</th>
                <th className="p-4 sm:p-6 pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {filteredAudience.length === 0 ? (
                 <tr>
                    <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                      Tidak ada audiens yang sesuai dengan pencarian Anda.
                    </td>
                 </tr>
              ) : (
                filteredAudience.map((user) => (
                  <tr key={user.id} className="border-b border-outline-variant/5 hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 sm:p-6 text-on-surface font-bold">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                          {user.email[0].toUpperCase()}
                        </div>
                        {user.email}
                      </div>
                    </td>
                    <td className="p-4 sm:p-6 text-on-surface-variant hidden sm:table-cell">{user.joined}</td>
                    <td className="p-4 sm:p-6">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        user.promoStatus === "Setuju" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-surface-container-high text-on-surface-variant"
                      }`}>
                        {user.promoStatus}
                      </span>
                    </td>
                    <td className="p-4 sm:p-6 text-right">
                      <button className="w-8 h-8 rounded-full bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-error transition-colors flex items-center justify-center mx-auto sm:mr-0">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

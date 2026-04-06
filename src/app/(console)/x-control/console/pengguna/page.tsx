"use client";

import React, { useState } from "react";

// Mock Data for MVP slicing
const mockUsers = [
  { id: "USR-001", name: "Budi Santoso", email: "budi@gmail.com", store: "Kopi Senja", username: "kopisenja", joined: "12 Mar 2026", status: "Active", plan: "Free", products: 12 },
  { id: "USR-002", name: "Siti Aminah", email: "siti.hijab@yahoo.com", store: "Hijab Stylist", username: "hijabstylist", joined: "14 Mar 2026", status: "Active", plan: "Pro", products: 45 },
  { id: "USR-003", name: "Reza Oktovian", email: "reza.gear@outlook.com", store: "Gears Gadget", username: "gears", joined: "01 Apr 2026", status: "Suspended", plan: "Free", products: 0 },
  { id: "USR-004", name: "Ayu Tingting", email: "ayu.beauty@gmail.com", store: "Beauty Care ID", username: "beautycare", joined: "05 Apr 2026", status: "Active", plan: "Free", products: 8 },
  { id: "USR-005", name: "Joko Anwar", email: "joko.anwar@kopi.co.id", store: "Sinema Kopi", username: "sinemakopi", joined: "06 Apr 2026", status: "Active", plan: "Pro", products: 24 },
];

export default function ConsoleUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Manajemen Pengguna</h1>
        <p className="text-on-surface-variant mt-1">Kelola seluruh toko dan pengguna yang mendaftar di Katalogku.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface rounded-2xl p-4 border border-outline-variant/40 shadow-sm">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            placeholder="Cari email, nama, atau username toko..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium text-sm transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            <span>Filter Akses</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-on-surface text-surface hover:bg-on-surface/90 font-bold text-sm transition-colors shadow-md">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Undang User Baru</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="py-4 px-6 font-bold text-on-surface">Toko & Pengguna</th>
                <th className="py-4 px-6 font-bold text-on-surface">Data Etalase</th>
                <th className="py-4 px-6 font-bold text-on-surface">Bergabung</th>
                <th className="py-4 px-6 font-bold text-on-surface">Status Akses</th>
                <th className="py-4 px-6 font-bold text-on-surface text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-container text-primary flex items-center justify-center font-bold">
                        {user.store.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-on-surface">{user.store}</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">{user.name} • {user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-primary">/{user.username}</div>
                      <div className="text-xs text-on-surface-variant">{user.products} Produk di Etalase</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-on-surface-variant font-medium">{user.joined}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {user.status === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-700 font-bold text-xs uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-error/10 text-error font-bold text-xs uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Diblokir
                        </span>
                      )}
                      {user.plan === "Pro" && (
                        <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider bg-tertiary-container text-tertiary rounded-md">Pro</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors" title="Kunjungi Etalase">
                        <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" title="Edit Data User">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      {user.status === "Active" ? (
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors" title="Blokir Toko (Suspend)">
                          <span className="material-symbols-outlined text-[20px]">block</span>
                        </button>
                      ) : (
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-500/10 text-on-surface-variant hover:text-green-600 transition-colors" title="Pulihkan Toko (Unban)">
                          <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-outline-variant/30 flex items-center justify-between text-sm text-on-surface-variant">
          <span className="font-medium">Menampilkan 1-5 dari 450 pengguna</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors disabled:opacity-50">
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container font-bold text-on-surface">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

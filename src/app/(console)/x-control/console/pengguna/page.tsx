"use client";

import React, { useState } from "react";

// Mock Data
const mockUsers = [
  { id: "USR-001", name: "Budi Santoso", email: "budi@gmail.com", store: "Kopi Senja", username: "kopisenja", joined: "12 Mar 2026", status: "Active", plan: "Free", products: 12, views: 1240, waClicks: 89 },
  { id: "USR-002", name: "Siti Aminah", email: "siti.hijab@yahoo.com", store: "Hijab Stylist", username: "hijabstylist", joined: "14 Mar 2026", status: "Active", plan: "Pro", products: 45, views: 8420, waClicks: 632 },
  { id: "USR-003", name: "Reza Oktovian", email: "reza.gear@outlook.com", store: "Gears Gadget", username: "gears", joined: "01 Apr 2026", status: "Suspended", plan: "Free", products: 0, views: 0, waClicks: 0 },
  { id: "USR-004", name: "Ayu Tingting", email: "ayu.beauty@gmail.com", store: "Beauty Care ID", username: "beautycare", joined: "05 Apr 2026", status: "Active", plan: "Free", products: 8, views: 560, waClicks: 34 },
  { id: "USR-005", name: "Joko Anwar", email: "joko.anwar@kopi.co.id", store: "Sinema Kopi", username: "sinemakopi", joined: "06 Apr 2026", status: "Active", plan: "Pro", products: 24, views: 3200, waClicks: 245 },
  { id: "USR-006", name: "Diana Putri", email: "diana.fashion@gmail.com", store: "Fashion Hub", username: "fashionhub", joined: "02 Apr 2026", status: "Active", plan: "VIP", products: 68, views: 12400, waClicks: 980 },
];

type User = typeof mockUsers[0];

export default function ConsoleUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("Semua");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ user: User; action: 'ban' | 'unban' } | null>(null);
  const [users, setUsers] = useState(mockUsers);

  const planFilters = ["Semua", "Free", "Pro", "VIP"];

  const filteredUsers = users.filter(u => {
    const matchesSearch = searchTerm === "" ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === "Semua" || u.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const handleConfirmAction = () => {
    if (!confirmAction) return;
    setUsers(prev => prev.map(u =>
      u.id === confirmAction.user.id
        ? { ...u, status: confirmAction.action === 'ban' ? 'Suspended' : 'Active' }
        : u
    ));
    setConfirmAction(null);
    setSelectedUser(null);
  };

  const activeCount = users.filter(u => u.status === 'Active').length;
  const proCount = users.filter(u => u.plan === 'Pro' || u.plan === 'VIP').length;

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Manajemen Pengguna</h1>
          <p className="text-on-surface-variant mt-1">Kelola seluruh toko dan pengguna yang mendaftar di Katalogku.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-xl text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {activeCount} aktif
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-xl text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
            {proCount} berbayar
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface rounded-2xl p-4 border border-outline-variant/30 shadow-sm">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            type="text"
            placeholder="Cari email, nama, atau username toko..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex bg-surface-container rounded-lg p-1 gap-0.5">
            {planFilters.map(f => (
              <button
                key={f}
                onClick={() => setFilterPlan(f)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  filterPlan === f ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/20 text-xs uppercase tracking-wider">
                <th className="py-4 px-6 font-bold text-on-surface-variant">Toko & Pengguna</th>
                <th className="py-4 px-6 font-bold text-on-surface-variant">Data Etalase</th>
                <th className="py-4 px-6 font-bold text-on-surface-variant">Bergabung</th>
                <th className="py-4 px-6 font-bold text-on-surface-variant">Status</th>
                <th className="py-4 px-6 font-bold text-on-surface-variant text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        user.plan === 'VIP' ? 'bg-yellow-100 text-yellow-700' :
                        user.plan === 'Pro' ? 'bg-primary-container text-primary' :
                        'bg-surface-container text-on-surface-variant'
                      }`}>
                        {user.store.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-on-surface flex items-center gap-1.5">
                          {user.store}
                          {user.plan === 'VIP' && <span className="material-symbols-outlined text-yellow-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>}
                        </div>
                        <div className="text-xs text-on-surface-variant mt-0.5">{user.name} • {user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-0.5">
                      <div className="font-semibold text-primary">/{user.username}</div>
                      <div className="text-xs text-on-surface-variant">{user.products} Produk • {user.views.toLocaleString()} views</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-on-surface-variant font-medium">{user.joined}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 flex-wrap">
                      {user.status === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold text-[10px] uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-100 text-red-600 font-bold text-[10px] uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Diblokir
                        </span>
                      )}
                      {user.plan !== 'Free' && (
                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg ${
                          user.plan === 'VIP' ? 'bg-yellow-100 text-yellow-700' : 'bg-tertiary-container text-tertiary'
                        }`}>{user.plan}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
                        title="Lihat Detail"
                      >
                        <span className="material-symbols-outlined text-[18px]">info</span>
                      </button>
                      <button
                        onClick={() => window.open(`/${user.username}`, '_blank')}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                        title="Kunjungi Etalase"
                      >
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                      </button>
                      {user.status === "Active" ? (
                        <button
                          onClick={() => setConfirmAction({ user, action: 'ban' })}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors"
                          title="Blokir"
                        >
                          <span className="material-symbols-outlined text-[18px]">block</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmAction({ user, action: 'unban' })}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-on-surface-variant hover:text-green-600 transition-colors"
                          title="Pulihkan"
                        >
                          <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant/20 flex items-center justify-between text-sm text-on-surface-variant">
          <span className="font-medium">Menampilkan {filteredUsers.length} dari {users.length} pengguna</span>
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

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
          <div className="bg-surface max-w-lg w-full rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-primary-container p-6 text-white relative">
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-black backdrop-blur-sm">
                  {selectedUser.store.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black">{selectedUser.store}</h3>
                  <p className="text-sm text-white/70 font-medium">{selectedUser.name}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/15 text-center">
                  <p className="text-lg font-black text-on-surface">{selectedUser.products}</p>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Produk</p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/15 text-center">
                  <p className="text-lg font-black text-primary">{selectedUser.views.toLocaleString()}</p>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Views</p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/15 text-center">
                  <p className="text-lg font-black text-green-600">{selectedUser.waClicks}</p>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Klik WA</p>
                </div>
              </div>

              {/* Detail Info */}
              <div className="space-y-3">
                {[
                  { label: "Email", value: selectedUser.email, icon: "email" },
                  { label: "Username", value: `/${selectedUser.username}`, icon: "link" },
                  { label: "Bergabung", value: selectedUser.joined, icon: "calendar_today" },
                  { label: "Paket", value: selectedUser.plan, icon: "workspace_premium" },
                  { label: "Status", value: selectedUser.status === 'Active' ? 'Aktif' : 'Diblokir', icon: selectedUser.status === 'Active' ? "check_circle" : "block" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                    <div className="flex items-center gap-2.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      item.label === 'Status' && selectedUser.status === 'Active' ? 'text-green-600' :
                      item.label === 'Status' ? 'text-red-600' :
                      item.label === 'Paket' && selectedUser.plan !== 'Free' ? 'text-primary' :
                      'text-on-surface'
                    }`}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => window.open(`/${selectedUser.username}`, '_blank')}
                  className="flex-1 py-3 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl font-bold text-sm text-on-surface flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  Kunjungi Toko
                </button>
                {selectedUser.status === 'Active' ? (
                  <button
                    onClick={() => { setConfirmAction({ user: selectedUser, action: 'ban' }); }}
                    className="flex-1 py-3 bg-red-50 hover:bg-red-100 transition-colors rounded-xl font-bold text-sm text-red-600 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">block</span>
                    Blokir Toko
                  </button>
                ) : (
                  <button
                    onClick={() => { setConfirmAction({ user: selectedUser, action: 'unban' }); }}
                    className="flex-1 py-3 bg-green-50 hover:bg-green-100 transition-colors rounded-xl font-bold text-sm text-green-600 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    Pulihkan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)} />
          <div className="bg-surface max-w-sm w-full rounded-3xl shadow-2xl relative z-10 p-8 text-center animate-fade-in">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              confirmAction.action === 'ban' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            }`}>
              <span className="material-symbols-outlined text-3xl">
                {confirmAction.action === 'ban' ? 'gpp_bad' : 'how_to_reg'}
              </span>
            </div>
            <h3 className="text-xl font-black text-on-surface mb-2">
              {confirmAction.action === 'ban' ? 'Blokir Toko Ini?' : 'Pulihkan Toko Ini?'}
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              {confirmAction.action === 'ban'
                ? `Toko "${confirmAction.user.store}" milik ${confirmAction.user.name} akan ditangguhkan dan tidak bisa diakses publik.`
                : `Toko "${confirmAction.user.store}" milik ${confirmAction.user.name} akan dipulihkan dan dapat diakses kembali.`
              }
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 py-3 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl font-bold text-sm text-on-surface"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmAction}
                className={`flex-1 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 ${
                  confirmAction.action === 'ban'
                    ? 'bg-red-600 shadow-red-500/20'
                    : 'bg-green-600 shadow-green-500/20'
                }`}
              >
                {confirmAction.action === 'ban' ? 'Ya, Blokir' : 'Ya, Pulihkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

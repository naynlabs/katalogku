"use client";

import React, { useState, useTransition } from "react";
import { adminToggleStoreStatus } from "@/lib/actions";

// ─── Types ──────────────────────────────────────────────────────────────────

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  storeId: number | null;
  storeName: string | null;
  storeSlug: string | null;
  storeIsActive: boolean;
  storeCategory: string | null;
  productCount: number;
  viewCount: number;
  orderCount: number;
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function PenggunaClient({ users: initialUsers }: { users: AdminUser[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ user: AdminUser; action: "ban" | "unban" } | null>(null);
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  const statusFilters = ["Semua", "Aktif", "Diblokir"];

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      searchTerm === "" ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.storeName ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.storeSlug ?? "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "Semua" ||
      (filterStatus === "Aktif" && u.storeIsActive) ||
      (filterStatus === "Diblokir" && !u.storeIsActive);

    return matchesSearch && matchesStatus;
  });

  const handleConfirmAction = () => {
    if (!confirmAction || !confirmAction.user.storeId) return;
    const newIsActive = confirmAction.action === "unban";

    startTransition(async () => {
      await adminToggleStoreStatus(confirmAction.user.storeId!, newIsActive);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === confirmAction.user.id ? { ...u, storeIsActive: newIsActive } : u
        )
      );
      setConfirmAction(null);
      setSelectedUser(null);
    });
  };

  const activeCount = users.filter((u) => u.storeIsActive).length;
  const withStoreCount = users.filter((u) => u.storeId !== null).length;

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }

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
            <span className="material-symbols-outlined text-[14px]">storefront</span>
            {withStoreCount} toko
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
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  filterStatus === f ? "bg-surface text-on-surface shadow-sm" : "text-on-surface-variant hover:text-on-surface"
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-30 block">search_off</span>
                    <p className="font-medium">Tidak ada pengguna ditemukan</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          user.role === "ADMIN" ? "bg-yellow-100 text-yellow-700" : "bg-surface-container text-on-surface-variant"
                        }`}>
                          {(user.storeName ?? user.name).charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface flex items-center gap-1.5">
                            {user.storeName ?? <span className="text-on-surface-variant italic">Belum buat toko</span>}
                            {user.role === "ADMIN" && (
                              <span className="material-symbols-outlined text-yellow-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                            )}
                          </div>
                          <div className="text-xs text-on-surface-variant mt-0.5">{user.name} • {user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-0.5">
                        {user.storeSlug ? (
                          <>
                            <div className="font-semibold text-primary">/{user.storeSlug}</div>
                            <div className="text-xs text-on-surface-variant">{user.productCount} Produk • {user.viewCount.toLocaleString()} views</div>
                          </>
                        ) : (
                          <span className="text-xs text-on-surface-variant italic">—</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-on-surface-variant font-medium">{formatDate(user.createdAt)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        {user.storeId ? (
                          user.storeIsActive ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-100 text-green-700 font-bold text-[10px] uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Aktif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-100 text-red-600 font-bold text-[10px] uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Diblokir
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-bold text-[10px] uppercase tracking-wider">
                            Baru
                          </span>
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
                        {user.storeSlug && (
                          <button
                            onClick={() => window.open(`/${user.storeSlug}`, "_blank")}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                            title="Kunjungi Etalase"
                          >
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                          </button>
                        )}
                        {user.storeId && (
                          user.storeIsActive ? (
                            <button
                              onClick={() => setConfirmAction({ user, action: "ban" })}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors"
                              title="Blokir"
                            >
                              <span className="material-symbols-outlined text-[18px]">block</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => setConfirmAction({ user, action: "unban" })}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-on-surface-variant hover:text-green-600 transition-colors"
                              title="Pulihkan"
                            >
                              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-outline-variant/20 flex items-center justify-between text-sm text-on-surface-variant">
          <span className="font-medium">Menampilkan {filteredUsers.length} dari {users.length} pengguna</span>
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
                  {(selectedUser.storeName ?? selectedUser.name).charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black">{selectedUser.storeName ?? "Belum buat toko"}</h3>
                  <p className="text-sm text-white/70 font-medium">{selectedUser.name}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/15 text-center">
                  <p className="text-lg font-black text-on-surface">{selectedUser.productCount}</p>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Produk</p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/15 text-center">
                  <p className="text-lg font-black text-primary">{selectedUser.viewCount.toLocaleString()}</p>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Views</p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/15 text-center">
                  <p className="text-lg font-black text-green-600">{selectedUser.orderCount}</p>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Pesanan</p>
                </div>
              </div>

              {/* Detail Info */}
              <div className="space-y-3">
                {[
                  { label: "Email", value: selectedUser.email, icon: "email" },
                  { label: "Username", value: selectedUser.storeSlug ? `/${selectedUser.storeSlug}` : "—", icon: "link" },
                  { label: "Bergabung", value: formatDate(selectedUser.createdAt), icon: "calendar_today" },
                  { label: "Kategori", value: selectedUser.storeCategory ?? "—", icon: "category" },
                  { label: "Status", value: selectedUser.storeIsActive ? "Aktif" : "Diblokir", icon: selectedUser.storeIsActive ? "check_circle" : "block" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                    <div className="flex items-center gap-2.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      item.label === "Status" && selectedUser.storeIsActive ? "text-green-600" :
                      item.label === "Status" ? "text-red-600" :
                      "text-on-surface"
                    }`}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {selectedUser.storeSlug && (
                  <button
                    onClick={() => window.open(`/${selectedUser.storeSlug}`, "_blank")}
                    className="flex-1 py-3 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl font-bold text-sm text-on-surface flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    Kunjungi Toko
                  </button>
                )}
                {selectedUser.storeId && (
                  selectedUser.storeIsActive ? (
                    <button
                      onClick={() => setConfirmAction({ user: selectedUser, action: "ban" })}
                      className="flex-1 py-3 bg-red-50 hover:bg-red-100 transition-colors rounded-xl font-bold text-sm text-red-600 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">block</span>
                      Blokir Toko
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirmAction({ user: selectedUser, action: "unban" })}
                      className="flex-1 py-3 bg-green-50 hover:bg-green-100 transition-colors rounded-xl font-bold text-sm text-green-600 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                      Pulihkan
                    </button>
                  )
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
              confirmAction.action === "ban" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}>
              <span className="material-symbols-outlined text-3xl">
                {confirmAction.action === "ban" ? "gpp_bad" : "how_to_reg"}
              </span>
            </div>
            <h3 className="text-xl font-black text-on-surface mb-2">
              {confirmAction.action === "ban" ? "Blokir Toko Ini?" : "Pulihkan Toko Ini?"}
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              {confirmAction.action === "ban"
                ? `Toko "${confirmAction.user.storeName}" milik ${confirmAction.user.name} akan ditangguhkan dan tidak bisa diakses publik.`
                : `Toko "${confirmAction.user.storeName}" milik ${confirmAction.user.name} akan dipulihkan dan dapat diakses kembali.`}
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
                disabled={isPending}
                className={`flex-1 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 ${
                  confirmAction.action === "ban" ? "bg-red-600 shadow-red-500/20" : "bg-green-600 shadow-green-500/20"
                }`}
              >
                {isPending ? "Memproses..." : confirmAction.action === "ban" ? "Ya, Blokir" : "Ya, Pulihkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

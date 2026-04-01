"use client";

import { useState } from "react";

export default function AkunPage() {
  const [email, setEmail] = useState("admin@butikclarissa.com");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Email berhasil diperbarui (Simulasi)");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if(newPassword !== confirmPassword) {
      alert("Konfirmasi sandi tidak cocok!");
      return;
    }
    alert("Kata sandi berhasil diganti (Simulasi)");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Keamanan Akun
          </h2>
          <p className="text-on-surface-variant text-sm">
            Atur kredensial login dan privasi akun Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 max-w-5xl">
        
        {/* Update Email */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 tonal-depth flex flex-col">
          <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">mail</span>
            Alamat Email
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">Gunakan alamat email aktif untuk menerima notifikasi tagihan dan perizinan akses akun.</p>
          
          <form onSubmit={handleSaveEmail} className="mt-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Email Saat Ini</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border-2 border-transparent focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors"
                required
              />
            </div>
            <button 
              type="submit" 
              className="px-6 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>

        {/* Update Password */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 tonal-depth flex flex-col">
          <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">key</span>
            Ubah Kata Sandi
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">Buat kata sandi yang kuat dengan kombinasi huruf dan angka.</p>
          
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="Kata sandi saat ini"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-surface-container-low border-2 border-transparent focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Kata sandi baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-surface-container-low border-2 border-transparent focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Konfirmasi sandi baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-surface-container-low border-2 border-transparent focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors"
                required
              />
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="px-6 py-3 bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded-full font-bold hover:bg-outline-variant/20 transition-all text-sm"
              >
                Perbarui Kata Sandi
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="md:col-span-2 bg-error-container/30 border border-error/20 p-8 rounded-3xl tonal-depth mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-error mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                Hapus Akun Permanen
              </h3>
              <p className="text-sm text-on-surface-variant">Tindakan ini tidak dapat dibatalkan. Semua data toko, katalog, dan tautan bio Anda akan dihapus dadi server.</p>
            </div>
            <button className="px-6 py-3 bg-error text-white rounded-full font-bold shadow-lg shadow-error/20 hover:scale-[1.02] active:scale-95 transition-all text-sm shrink-0 whitespace-nowrap">
              Hapus Akun Saya
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

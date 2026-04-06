"use client";

import React from "react";

export default function PengaturanPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Sistem & Server</h1>
        <p className="text-on-surface-variant mt-1">Pengaturan inti *engine* Katalogku, Mode Maintenance, dan Infrastruktur Database.</p>
      </div>

      <div className="bg-surface rounded-2xl p-6 border border-outline-variant/40 shadow-sm max-w-3xl">
        <h2 className="text-lg font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Kontrol Pintu Utama</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
            <div>
              <h3 className="font-bold text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-sm text-error">warning</span> Maintenance Mode</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Tutup akses aplikasi sementara karena ada perombakan database (*Deployment*).</p>
            </div>
            <button className="w-12 h-6 bg-surface-container-high rounded-full relative transition-colors shadow-inner flex items-center p-1">
               <div className="w-4 h-4 bg-outline-variant rounded-full relative transition-all"></div>
            </button>
          </div>

          <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
            <div>
              <h3 className="font-bold text-on-surface flex items-center gap-2">Tutup Pendaftaran Akun Baru</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Mencegah toko baru (*Sign Up*) dibuat jika server sedang penuh (Scaling hold).</p>
            </div>
            <button className="w-12 h-6 bg-primary/20 rounded-full relative transition-colors shadow-inner flex items-center p-1">
               <div className="w-4 h-4 bg-primary rounded-full relative transition-all translate-x-6"></div>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-outline-variant/20">
          <button className="px-5 py-2.5 bg-on-surface text-surface font-bold rounded-xl shadow-lg hover:bg-on-surface/90 transition-all">
            Simpan Konfigurasi Server
          </button>
        </div>
      </div>
    </div>
  );
}

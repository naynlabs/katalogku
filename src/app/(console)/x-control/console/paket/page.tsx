"use client";

import React from "react";

export default function PaketPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Paket & Harga</h1>
          <p className="text-on-surface-variant mt-1">Konfigurasi batasan fitur (*tiering*) untuk pengguna Gratis dan Pro.</p>
        </div>
        <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all">
          + Buat Paket Baru
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* FREE Plan */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center shadow-sm relative">
          <h2 className="text-lg font-bold mb-1">FREE</h2>
          <p className="text-3xl font-extrabold text-on-surface mb-6">Rp 0</p>
          <ul className="text-sm text-on-surface-variant space-y-3 mb-8 w-full text-left">
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Maks 10 produk</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Link bio toko</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Checkout WA</li>
          </ul>
          <button className="mt-auto w-full py-2.5 border border-outline-variant rounded-xl font-bold hover:bg-surface-container transition-colors text-sm">Edit Paket</button>
        </div>

        {/* STARTER Plan */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center shadow-sm relative">
          <h2 className="text-lg font-bold mb-1 text-on-surface">STARTER</h2>
          <p className="text-3xl font-extrabold text-on-surface mb-6">Rp 29rb<span className="text-xs font-medium text-on-surface-variant">/bln</span></p>
          <ul className="text-sm text-on-surface-variant space-y-3 mb-8 w-full text-left">
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Maks 50 produk</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Tanpa watermark</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Statistik dasar</li>
          </ul>
          <button className="mt-auto w-full py-2.5 border border-outline-variant rounded-xl font-bold hover:bg-surface-container transition-colors text-sm">Edit Paket</button>
        </div>

        {/* GROWTH Plan */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border-2 border-primary flex flex-col items-center text-center shadow-lg shadow-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-bl-lg">Terlaris</div>
          <h2 className="text-lg font-black mb-1 text-primary">GROWTH</h2>
          <p className="text-3xl font-extrabold text-primary mb-6">Rp 59rb<span className="text-xs font-medium text-primary/70">/bln</span></p>
          <ul className="text-sm text-on-surface-variant space-y-3 mb-8 w-full text-left">
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check_circle</span> Produk unlimited</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check_circle</span> Custom domain</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check_circle</span> Integrasi Social Media</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check_circle</span> Analytics lengkap</li>
          </ul>
          <button className="mt-auto w-full py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors text-sm">Edit Paket</button>
        </div>

        {/* PRO Plan */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center shadow-sm relative">
          <h2 className="text-lg font-bold mb-1 text-on-surface">PRO</h2>
          <p className="text-3xl font-extrabold text-on-surface mb-6">Rp 99rb<span className="text-xs font-medium text-on-surface-variant">/bln</span></p>
          <ul className="text-sm text-on-surface-variant space-y-3 mb-8 w-full text-left">
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Semua fitur Growth</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Multi admin</li>
            <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Prioritas support</li>
          </ul>
          <button className="mt-auto w-full py-2.5 border border-outline-variant rounded-xl font-bold hover:bg-surface-container transition-colors text-sm">Edit Paket</button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

export default function PromoPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Kupon & Promo</h1>
          <p className="text-on-surface-variant mt-1">Buat kode diskon untuk meningkatkan konversi berlangganan Pro.</p>
        </div>
        <button className="px-5 py-2.5 bg-on-surface text-surface font-bold rounded-xl shadow-lg hover:bg-on-surface/90 transition-all flex gap-2">
          <span className="material-symbols-outlined">add</span> Buat Kupon
        </button>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden p-8 text-center text-on-surface-variant">
        <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">confirmation_number</span>
        <h2 className="text-xl font-bold mb-2 text-on-surface">Belum Ada Kupon Aktif</h2>
        <p className="max-w-md mx-auto mb-6">Buat kupon pertama Anda, seperti "DISKON50", untuk disebarkan ke audiens UMKM.</p>
      </div>
    </div>
  );
}

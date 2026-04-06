"use client";

import { useState } from "react";

export default function BillingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Paket & Langganan
          </h2>
          <p className="text-on-surface-variant text-sm">
            Tingkatkan omset toko Anda dengan fitur analitik dan tema premium.
          </p>
        </div>
      </div>

      {/* Current Plan Card */}
      <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 tonal-depth mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant">rocket_launch</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Paket Saat Ini</p>
            <h3 className="text-2xl font-black text-on-surface">Gratis (Free)</h3>
            <p className="text-sm text-on-surface-variant mt-1">Anda menggunakan fitur dasar Katalogku.</p>
          </div>
        </div>
        <div>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-4 max-w-sm">
            <span className="material-symbols-outlined text-primary">insights</span>
            <p className="text-xs text-on-surface-variant font-medium">Beralih ke paket <b>Pro</b> untuk membuka pembatasan Analytics dan Tema Kostum.</p>
          </div>
        </div>
      </div>

      {/* Pricing Header */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-black text-on-surface mb-6">Pilih Opsi Bisnis Anda</h3>
        <div className="inline-flex bg-surface-container p-1.5 rounded-full relative">
          <button 
            onClick={() => setIsAnnual(false)}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-colors relative z-10 ${!isAnnual ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Bulanan
          </button>
          <button 
            onClick={() => setIsAnnual(true)}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-colors relative z-10 flex items-center gap-2 ${isAnnual ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Tahunan <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Hemat 20%</span>
          </button>
          <div className={`absolute top-1.5 bottom-1.5 w-[50%] bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${isAnnual ? 'translate-x-full' : 'translate-x-0'}`}></div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        
        {/* Basic Plan */}
        <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border-2 border-transparent hover:border-outline-variant/30 tonal-depth transition-all flex flex-col">
          <h4 className="text-xl font-black text-on-surface mb-2">Basic</h4>
          <p className="text-sm text-on-surface-variant mb-6">Cocok untuk pemula yang baru merintis bisnis jualan.</p>
          <div className="mb-8">
            <span className="text-4xl font-black text-on-surface">Rp 0</span>
            <span className="text-on-surface-variant font-medium">/ selamanya</span>
          </div>
          <button className="w-full py-4 rounded-full font-bold bg-surface-container-high text-on-surface-variant cursor-not-allowed mb-8">
            Paket Aktif Anda
          </button>
          <div className="space-y-4 flex-1">
            <h5 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Yang Didapatkan:</h5>
            <div className="flex items-start gap-3 text-sm font-medium text-on-surface">
              <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
              <p>Maksimal input 50 Produk</p>
            </div>
            <div className="flex items-start gap-3 text-sm font-medium text-on-surface">
              <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
              <p>Tautan Bio (Katalog Publik)</p>
            </div>
            <div className="flex items-start gap-3 text-sm font-medium text-on-surface">
              <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
              <p>Checkout pesanan ke WhatsApp</p>
            </div>
            <div className="flex items-start gap-3 text-sm font-medium text-outline-variant line-through opacity-60">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">cancel</span>
              <p>Pelacak Meta Pixel & TikTok Pixel</p>
            </div>
            <div className="flex items-start gap-3 text-sm font-medium text-outline-variant line-through opacity-60">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">cancel</span>
              <p>Hapus Watermark "Powered by Katalogku"</p>
            </div>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 flex flex-col relative transform hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute -top-4 inset-x-0 flex justify-center">
            <span className="bg-warning text-on-warning font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
              Paling Laris 🔥
            </span>
          </div>
          
          <h4 className="text-xl font-black text-white mb-2">Pro Business</h4>
          <p className="text-sm text-primary-fixed mb-6">Untuk UMKM serius yang ingin skala promosi besar (Ads).</p>
          <div className="mb-8 flex items-end">
            {isAnnual ? (
              <div>
                <span className="text-sm line-through text-white/60 block mb-1">Rp 69.000 / bln</span>
                <span className="text-4xl font-black text-white">Rp 55.000</span>
                <span className="text-primary-fixed font-medium">/ bln (Ditagih tahunan)</span>
              </div>
            ) : (
              <div>
                <span className="text-4xl font-black text-white">Rp 69.000</span>
                <span className="text-primary-fixed font-medium">/ bulan</span>
              </div>
            )}
          </div>
          
          <button className="w-full py-4 rounded-full font-bold bg-white text-primary shadow-lg hover:scale-[1.02] active:scale-95 transition-transform mb-8 flex justify-center items-center gap-2">
            Upgrade Sekarang
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          
          <div className="space-y-4 flex-1 bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <h5 className="text-xs font-bold uppercase tracking-widest text-primary-fixed mb-2">Semua di Basic, DITAMBAH:</h5>
            <div className="flex items-start gap-3 text-sm font-bold text-white">
              <span className="material-symbols-outlined text-green-300 text-[20px]">check_circle</span>
              <p>Produk Kelola Tanpa Batas (Unlimited)</p>
            </div>
            <div className="flex items-start gap-3 text-sm font-bold text-white">
              <span className="material-symbols-outlined text-green-300 text-[20px]">check_circle</span>
              <p>Tracking Pixel Pembeli (Penting untuk Ads)</p>
            </div>
            <div className="flex items-start gap-3 text-sm font-bold text-white">
              <span className="material-symbols-outlined text-green-300 text-[20px]">check_circle</span>
              <p>Akses Semua Tema Premium Exclusive</p>
            </div>
            <div className="flex items-start gap-3 text-sm font-bold text-white">
              <span className="material-symbols-outlined text-green-300 text-[20px]">check_circle</span>
              <p>Polos Tanpa Label "Katalogku"</p>
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

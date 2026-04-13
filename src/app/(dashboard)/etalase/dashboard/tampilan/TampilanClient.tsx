"use client";

import React, { useState, useTransition } from "react";
import { updateStore } from "@/lib/actions";

export default function TampilanClient({ initialTheme, storeInfo }: { initialTheme: any, storeInfo: any }) {
  const [themeConfig, setThemeConfig] = useState(initialTheme);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateStore({
        themeConfig: themeConfig,
      });
      if (res.error) {
        alert(res.error);
      } else {
        alert("Tampilan Toko berhasil disimpan!");
      }
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Tampilan & Tema
          </h2>
          <p className="text-on-surface-variant text-sm">
            Kustomisasi visual halaman bio dan pameran produk Anda agar sesuai dengan identitas *brand*.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isPending}
          className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-transform flex items-center gap-2 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">{isPending ? "hourglass_empty" : "save"}</span>
           {isPending ? "Menyimpan..." : "Publish Tampilan"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
        
        {/* Kolom Kiri: Form Kustomisasi */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Header Profil Halaman Publik */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth">
            <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_check</span>
              Profil Halaman (Header)
            </h3>
            
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-surface-container flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 hover:border-primary cursor-pointer transition-colors relative overflow-hidden group">
                <span className="material-symbols-outlined text-outline-variant text-3xl group-hover:hidden">image</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase mt-1 group-hover:hidden">Logo</span>
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center hidden group-hover:flex">
                  <span className="material-symbols-outlined text-primary text-2xl">upload</span>
                </div>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Judul Tampilan</label>
                  <input type="text" defaultValue="Katalog Fashion Clarissa" className="w-full bg-surface-container-low border-2 border-transparent focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-on-surface text-sm font-medium transition-colors outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Pesan Singkat (Bio)</label>
                  <textarea defaultValue="Temukan gaya terbaikmu hari ini dengan koleksi premium kami." rows={2} className="w-full bg-surface-container-low border-2 border-transparent focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-on-surface text-sm transition-colors outline-none resize-none"></textarea>
                </div>
              </div>
            </div>
          </section>

          {/* Tema Visual Terkurasi */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth">
            <h3 className="text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">palette</span>
              Tema Terpilih
            </h3>
            <p className="text-sm text-on-surface-variant mb-6">Pilih palet warna ahli untuk tampilan instan yang memukau.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Theme 1 */}
              <button className="flex flex-col items-center gap-3 group">
                <div className="w-full aspect-video rounded-xl border-2 border-primary overflow-hidden shadow-lg shadow-primary/20 bg-white p-2">
                  <div className="w-full h-4 bg-gray-100 rounded-full mb-2"></div>
                  <div className="w-3/4 h-3 bg-indigo-500 rounded-full mb-1"></div>
                  <div className="w-1/2 h-3 bg-gray-200 rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-on-surface">Classic Light</span>
              </button>
              
              {/* Theme 2 */}
              <button className="flex flex-col items-center gap-3 group">
                <div className="w-full aspect-video rounded-xl border-2 border-transparent group-hover:border-outline-variant overflow-hidden bg-gray-900 p-2 transition-colors">
                  <div className="w-full h-4 bg-gray-800 rounded-full mb-2"></div>
                  <div className="w-3/4 h-3 bg-white rounded-full mb-1"></div>
                  <div className="w-1/2 h-3 bg-gray-700 rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface">Midnight Dark</span>
              </button>

              {/* Theme 3 (Locked) */}
              <button className="flex flex-col items-center gap-3 group relative cursor-not-allowed">
                <div className="w-full aspect-video rounded-xl border-2 border-transparent overflow-hidden bg-rose-50 p-2 opacity-50 relative">
                  <div className="w-full h-4 bg-rose-100 rounded-full mb-2"></div>
                  <div className="w-3/4 h-3 bg-rose-500 rounded-full mb-1"></div>
                  <div className="w-1/2 h-3 bg-rose-200 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
                    <span className="material-symbols-outlined text-gray-800 text-lg bg-white p-1 rounded-full shadow-sm">lock</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1">Minimalist Rose</span>
              </button>

              {/* Theme 4 (Locked) */}
              <button className="flex flex-col items-center gap-3 group relative cursor-not-allowed">
                <div className="w-full aspect-video rounded-xl border-2 border-transparent overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-2 opacity-50 relative">
                  <div className="w-full h-4 bg-white/20 rounded-full mb-2"></div>
                  <div className="w-3/4 h-3 bg-white rounded-full mb-1"></div>
                  <div className="w-1/2 h-3 bg-white/40 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                    <span className="material-symbols-outlined text-gray-800 text-lg bg-white p-1 rounded-full shadow-sm">lock</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1">Gradient Pop</span>
              </button>
            </div>
          </section>

          {/* Pengaturan Latar Belakang & Tombol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth">
              <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">wallpaper</span>
                Latar Belakang
              </h3>
              <div className="flex gap-4">
                <button className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-primary ring-2 ring-primary/20 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200"></div>
                </button>
                <button className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center border-2 border-transparent hover:border-outline-variant transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400"></div>
                </button>
                <div className="relative group cursor-not-allowed">
                  <button className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center border-2 border-dashed border-outline-variant/50 opacity-50">
                    <span className="material-symbols-outlined text-outline-variant">add_photo_alternate</span>
                  </button>
                  <span className="absolute -top-2 -right-2 bg-warning-container text-on-warning-container text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[10px]">star</span> PRO
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth">
              <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">smart_button</span>
                Bentuk Tombol
              </h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setThemeConfig({ ...themeConfig, buttonStyle: "pill" })}
                  className={`w-full py-3 rounded-full text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-colors ${themeConfig.buttonStyle === "pill" ? "bg-surface-container text-on-surface border-2 border-primary" : "bg-surface-container text-on-surface border-2 border-transparent hover:border-outline-variant"}`}>
                  Pill (Lengkungan Penuh) {themeConfig.buttonStyle === "pill" && <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>}
                </button>
                <button 
                  onClick={() => setThemeConfig({ ...themeConfig, buttonStyle: "rounded" })}
                  className={`w-full py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${themeConfig.buttonStyle === "rounded" ? "bg-surface-container text-on-surface border-2 border-primary shadow-sm" : "bg-surface-container text-on-surface border-2 border-transparent hover:border-outline-variant"}`}>
                  Rounded (Lengkung Halus) {themeConfig.buttonStyle === "rounded" && <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>}
                </button>
                <button 
                  onClick={() => setThemeConfig({ ...themeConfig, buttonStyle: "square" })}
                  className={`w-full py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${themeConfig.buttonStyle === "square" ? "bg-surface-container text-on-surface border-2 border-primary shadow-sm" : "bg-surface-container text-on-surface border-2 border-transparent hover:border-outline-variant"}`}>
                  Sharp (Sudut Tajam) {themeConfig.buttonStyle === "square" && <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>}
                </button>
              </div>
            </section>
          </div>

        </div>

        {/* Kolom Kanan: Live Preview (Miniatur HP) */}
        <div className="xl:col-span-4 lg:hidden xl:block">
          <div className="sticky top-8">
            <div className="border-[6px] border-surface-container-highest rounded-[2.5rem] w-[320px] aspect-[9/19] bg-white mx-auto overflow-hidden shadow-2xl relative">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-surface-container-highest rounded-b-2xl w-32 mx-auto z-20"></div>
              
              {/* Preview Content */}
              <div className="relative z-10 h-full overflow-y-auto hide-scrollbar bg-slate-50 pt-12 pb-8 px-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full mb-4 border-2 border-white shadow-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-400 text-3xl">image</span>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Katalog Fashion Clarissa</h4>
                <p className="text-xs text-gray-600 text-center leading-relaxed px-4 mb-8">
                  Temukan gaya terbaikmu hari ini dengan koleksi premium kami.
                </p>

                {/* Dummy Links */}
                <div className="w-full space-y-3">
                  <div className="w-full bg-white text-gray-900 shadow-sm border border-gray-100 py-3.5 rounded-full text-center text-sm font-bold hover:scale-[1.02] transition-transform">
                    Katalog Lengkap
                  </div>
                  <div className="w-full bg-white text-gray-900 shadow-sm border border-gray-100 py-3.5 rounded-full text-center text-sm font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-green-500">shopping_bag</span>
                    Promo Shopee
                  </div>
                  <div className="w-full bg-indigo-600 text-white shadow-md py-3.5 rounded-full text-center text-sm font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Chat WhatsApp
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest text-center">Powered by Katalogku</p>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-on-surface-variant mt-6 font-medium">Pratinjau Langsung (Live Preview)</p>
          </div>
        </div>
      </div>
    </>
  );
}

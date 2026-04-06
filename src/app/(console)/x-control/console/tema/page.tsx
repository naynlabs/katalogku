"use client";

import React from "react";

export default function TemaPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Pustaka Tema</h1>
        <p className="text-on-surface-variant mt-1">Kelola palet warna dan template tampilan yang tersedia untuk etalase pengguna.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: "Default Light", colors: ["bg-white", "bg-gray-100", "bg-black"], type: "Free" },
          { name: "Kinetic Dark", colors: ["bg-[#191c1e]", "bg-[#333537]", "bg-[#a1f95e]"], type: "Free" },
          { name: "Sunset Gold", colors: ["bg-[#3b120c]", "bg-[#fcdab7]", "bg-[#fe8019]"], type: "Pro" },
          { name: "Ocean Breeze", colors: ["bg-[#002f5c]", "bg-[#cce5ff]", "bg-[#4fc3f7]"], type: "Pro" }
        ].map((theme, i) => (
          <div key={i} className="bg-surface rounded-2xl p-4 border border-outline-variant/40 shadow-sm">
            <div className="flex w-full h-24 rounded-xl overflow-hidden mb-4">
              {theme.colors.map((c, j) => <div key={j} className={`flex-1 ${c}`}></div>)}
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-on-surface">{theme.name}</h3>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${theme.type === 'Pro' ? 'bg-tertiary/10 text-tertiary' : 'bg-surface-container-high text-on-surface'}`}>{theme.type}</span>
            </div>
          </div>
        ))}
        
        {/* Add New Theme Button */}
        <div className="bg-surface-container-lowest rounded-2xl border-2 border-dashed border-outline-variant/50 hover:border-primary/50 transition-colors flex flex-col items-center justify-center p-4 cursor-pointer text-on-surface-variant hover:text-primary min-h-[140px]">
          <span className="material-symbols-outlined text-4xl mb-2">add_circle</span>
          <span className="font-bold text-sm">Tambah Tema</span>
        </div>
      </div>
    </div>
  );
}

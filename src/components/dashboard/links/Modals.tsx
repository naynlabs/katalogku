"use client";

import { Icon } from '@iconify/react';
import { useBuilderStore } from "@/store/useBuilderStore";
import { ECOM_ICONS, AVAILABLE_SOCIALS } from "./constants";
import { useState } from "react";

/** Modal untuk memilih ikon dari galeri */
export function IconPickerModal({ targetId, onClose }: { targetId: string; onClose: () => void }) {
  const store = useBuilderStore();
  const [iconSearch, setIconSearch] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-fade-up">
        <div className="p-5 border-b border-outline-variant/10 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-on-surface">Galeri Ikon</h2>
            <p className="text-xs text-on-surface-variant">Pilih ikon e-commerce yang sesuai</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="p-4 border-b border-outline-variant/10 bg-surface-container-low/50">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Cari ikon... (contoh: cart, star, bag)"
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 mb-1 bg-white border border-outline-variant/30 rounded-xl text-xs font-medium text-on-surface outline-none focus:border-[#4f46e5] transition-colors"
              autoFocus
            />
          </div>
        </div>
        <div className="p-5 grid grid-cols-5 gap-3 max-h-[300px] overflow-y-auto hide-scrollbar">
          {ECOM_ICONS.filter(iName => iName.toLowerCase().includes(iconSearch.toLowerCase())).map(iName => (
             <button
               key={iName}
               onClick={() => {
                  store.updateLink(targetId, { icon: iName });
                  onClose();
               }}
               className="w-12 h-12 flex items-center justify-center bg-surface-container-low hover:bg-white border text-on-surface-variant hover:text-primary border-outline-variant/20 hover:border-primary/50 rounded-xl transition-all active:scale-95"
             >
               <Icon icon={iName} className="w-6 h-6" />
             </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Modal untuk memilih platform sosial media */
export function SocialModal({ onClose }: { onClose: () => void }) {
  const store = useBuilderStore();

  return (
    <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Pilih Sosial Media</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {AVAILABLE_SOCIALS.map(social => {
            const isSelected = store.socials.some(s => s.platform === social.platform);
            return (
            <button
              key={social.platform}
              disabled={isSelected}
              onClick={() => {
                store.addSocial({ id: Date.now().toString(), platform: social.platform, handle: "", url: "" });
                onClose();
              }}
              className={`flex flex-col items-center gap-2 py-3 px-1 rounded-xl transition-all group ${
                isSelected 
                  ? "opacity-30 cursor-not-allowed grayscale" 
                  : "hover:bg-surface-container border border-transparent hover:border-outline-variant/30 active:scale-95"
              }`}
            >
              <div className={`flex items-center justify-center text-on-surface-variant ${!isSelected && "group-hover:text-primary group-hover:scale-110"} transition-transform`}>
                {social.icon}
              </div>
              <span className={`text-[11px] font-bold text-on-surface-variant text-center leading-tight ${!isSelected && "group-hover:text-primary"}`}>
                {social.platform}
              </span>
            </button>
          )})}
        </div>
      </div>
    </div>
  );
}

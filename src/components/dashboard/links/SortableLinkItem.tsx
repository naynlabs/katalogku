"use client";

import { useBuilderStore, StoreLink } from "@/store/useBuilderStore";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react';
import Image from 'next/image';

/**
 * Komponen Pembantu Khusus Item yang Bisa di-Drag
 */
export default function SortableLinkItem({ link, onPickIcon }: { link: StoreLink, onPickIcon: (id: string) => void }) {
  const store = useBuilderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 99 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-white p-5 rounded-2xl border transition-all flex flex-col gap-4 group relative cursor-default ${
        isDragging ? 'border-[#4f46e5]/50 shadow-[0_20px_40px_rgba(79,70,229,0.15)] scale-[1.02] z-50' : 'border-outline-variant/30 shadow-sm hover:border-outline-variant/60 hover:shadow-md'
      }`}
    >
      {/* Drag Handle (Hover) */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 bg-white border border-outline-variant/20 shadow-sm rounded-lg cursor-grab active:cursor-grabbing text-on-surface-variant hover:text-black transition-all z-20"
      >
         <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
      </div>

      {/* HEADER: Tipe & Aksi Cepat */}
      <div className="flex justify-between items-center pb-3 border-b border-outline-variant/10">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${link.type === 'divider' ? 'bg-orange-50 text-orange-500' : 'bg-primary/10 text-primary'}`}>
             {link.type === 'divider' ? (
                <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
             ) : link.type === 'icon' ? (
                <Icon icon={link.icon || 'lucide:link'} className="w-[18px] h-[18px]" />
             ) : (
                <span className="material-symbols-outlined text-[16px]">image</span>
             )}
          </div>
          <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
            {link.type === 'divider' ? 'Pemisah Tautan' : 'Pengaturan Tautan'}
          </span>
        </div>
        
        <div className="flex gap-2 bg-surface-container-low p-1 rounded-full border border-outline-variant/20 touch-none">
          <button 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => store.updateLink(link.id, { isVisible: !(link.isVisible ?? true) })}
            title={link.isVisible !== false ? "Sembunyikan" : "Tampilkan"}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${link.isVisible === false ? 'bg-white shadow-sm text-primary' : 'hover:bg-white text-on-surface-variant'}`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {link.isVisible === false ? 'visibility_off' : 'visibility'}
            </span>
          </button>
          <button 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => store.duplicateLink(link.id)}
            title="Duplikat"
            className="w-7 h-7 rounded-full hover:bg-white hover:shadow-sm text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">content_copy</span>
          </button>
          <button 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => store.removeLink(link.id)}
            title="Hapus"
            className="w-7 h-7 rounded-full hover:bg-red-50 hover:text-red-600 text-on-surface-variant flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">delete</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10" onPointerDown={(e) => e.stopPropagation()}>
        {/* INPUT: Teks Utama */}
        <div>
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 block">
             {link.type === 'divider' ? 'Teks Judul / Deskripsi' : 'Judul Tautan'}
          </label>
          <input 
            type="text" 
            value={link.label}
            onChange={(e) => store.updateLink(link.id, { label: e.target.value })}
            placeholder={link.type === 'divider' ? 'Contoh: 🔥 Diskon Minggu Ini' : 'Contoh: Katalog Produk'}
            className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-[13px] font-bold text-on-surface outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* JIKA BUKAN DIVIDER (LINK AKTIF) */}
        {link.type !== 'divider' && (
          <>
            {/* INPUT: URL */}
            <div>
               <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 block">Tujuan URL</label>
               <div className="flex items-stretch bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden focus-within:bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                 <div className="px-3 flex items-center justify-center bg-outline-variant/10 border-r border-outline-variant/20">
                   <span className="material-symbols-outlined text-[16px] text-on-surface-variant">link</span>
                 </div>
                 <input 
                   type="text" 
                   value={link.url}
                   onChange={(e) => store.updateLink(link.id, { url: e.target.value })}
                   placeholder="https://"
                   className="w-full px-3 py-2.5 bg-transparent text-[13px] font-medium text-primary outline-none"
                 />
               </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-1 bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/30">
              
              {/* OPSI: Fitur Lanjutan (Kiri-Kanan) */}
              <div className="flex flex-col gap-3">
                {/* Highlight */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[16px] ${(link.isFeatured ?? false) ? 'text-[#eab308]' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-on-surface">Jadikan Highlight</span>
                      <span className="text-[9px] text-on-surface-variant mt-0.5">Berikan efek glow emas.</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => store.updateLink(link.id, { isFeatured: !(link.isFeatured ?? false) })}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      (link.isFeatured ?? false) ? 'bg-[#eab308]' : 'bg-outline-variant/50'
                    }`}
                  >
                    <span className="sr-only">Toggle Highlight</span>
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      (link.isFeatured ?? false) ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <hr className="border-outline-variant/20" />

                {/* Deep Link */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-on-surface flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">electric_bolt</span> Deep Link (App)</span>
                  </div>
                  <button 
                    onClick={() => store.updateLink(link.id, { isDeepLink: !(link.isDeepLink ?? false) })}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      (link.isDeepLink ?? false) ? 'bg-primary' : 'bg-outline-variant/50'
                    }`}
                  >
                    <span className="sr-only">Toggle Deep Link</span>
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      (link.isDeepLink ?? false) ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <hr className="border-outline-variant/20" />
                
                {/* Animasi Select */}
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1.5">
                     <span className="material-symbols-outlined text-[16px] text-on-surface-variant">animation</span>
                     <span className="text-[11px] font-bold text-on-surface">Animasi Gerak</span>
                   </div>
                   <select
                     value={link.animation || 'none'}
                     onChange={(e) => store.updateLink(link.id, { animation: e.target.value as any })}
                     className="text-[11px] font-bold py-1.5 px-3 rounded-lg bg-surface-container-low border border-outline-variant/30 outline-none hover:bg-surface-container focus:bg-white focus:border-primary transition-all cursor-pointer"
                   >
                     <option value="none">Tidak Ada</option>
                     <option value="pulse">Berdenyut (Pulse)</option>
                     <option value="bounce">Melompat (Bounce)</option>
                     <option value="glow">Bercahaya (Glow)</option>
                   </select>
                </div>
              </div>
            </div>

            {/* OPSI: Logo / Ikon */}
            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/30 mt-1">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2.5 block">Visual Logo</label>
              <div className="flex flex-col gap-3">
                <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/20">
                   <button 
                      onClick={() => store.updateLink(link.id, { type: 'icon' })}
                     className={`flex-1 text-[10px] uppercase font-bold py-2 rounded-md transition-all ${link.type === 'icon' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                   >
                     Ikon Bawaan
                   </button>
                   <button 
                      onClick={() => store.updateLink(link.id, { type: 'image' })}
                     className={`flex-1 text-[10px] uppercase font-bold py-2 rounded-md transition-all ${link.type === 'image' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                   >
                     Upload Gambar
                   </button>
                </div>

                {link.type === 'icon' ? (
                   <button 
                     onClick={() => onPickIcon(link.id)}
                     className="w-full flex items-center justify-between p-2.5 bg-white border border-outline-variant/30 rounded-xl hover:border-primary transition-all group"
                   >
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0 border border-outline-variant/20">
                          {link.icon ? <Icon icon={link.icon} className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" /> : <Icon icon="lucide:smile" className="text-gray-400 w-5 h-5" />}
                       </div>
                       <div className="flex flex-col text-left">
                         <span className="text-[11px] font-bold text-on-surface truncate">
                           {link.icon ? link.icon.split(':').pop() : 'Belum Ada Ikon'}
                         </span>
                         <span className="text-[9px] text-on-surface-variant mt-0.5">Ubah ikon material</span>
                       </div>
                     </div>
                     <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-primary">chevron_right</span>
                   </button>
                ) : (
                   <div className="p-2.5 bg-white rounded-xl border border-outline-variant/30 flex gap-3 items-center">
                      <div className="w-10 h-10 bg-surface-container-low rounded-lg border border-dashed border-outline-variant/50 flex flex-col items-center justify-center shrink-0 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors overflow-hidden relative group">
                        {link.image ? (
                           <Image src={link.image} fill className="object-cover" alt="Selesai Upload" unoptimized />
                        ) : (
                           <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary">add_photo_alternate</span>
                        )}
                         <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" title="Upload Icon" onChange={(e)=>{
                            if (e.target.files && e.target.files[0]) {
                               const url = URL.createObjectURL(e.target.files[0]);
                               store.updateLink(link.id, { image: url });
                            }
                         }} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-on-surface">Klik ikon kiri u/ upload</span>
                        <span className="text-[9px] text-on-surface-variant mt-0.5">Format persegi 1:1.</span>
                      </div>
                   </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
      className={`bg-surface-container-lowest p-4 rounded-2xl border transition-all flex flex-col gap-3 group relative cursor-default ${
        isDragging ? 'border-[#4f46e5]/50 shadow-[0_20px_40px_rgba(79,70,229,0.15)] scale-[1.02]' : 'border-outline-variant/20 shadow-sm hover:border-[#4f46e5]/20'
      }`}
    >
      {/* Tombol Bergerak (Drag Handle) - Diikat ke *listeners* */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute left-[-16px] xl:left-[-24px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 transition-colors"
      >
         <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-surface-container-high rounded-full flex items-center justify-center">
             {link.type === 'icon' ? (
                <Icon icon={link.icon || 'lucide:link'} className="w-4 h-4" />
             ) : (
                <span className="material-symbols-outlined text-[14px]">image</span>
             )}
          </div>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            {link.type === 'icon' ? 'Tautan Standar' : 'Tautan Gambar'}
          </span>
        </div>
        <div className="flex gap-1 touch-none">
          <button 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => store.updateLink(link.id, { isVisible: !(link.isVisible ?? true) })}
            title={link.isVisible !== false ? "Sembunyikan Tautan ini" : "Tampilkan Tautan ini"}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${link.isVisible === false ? 'bg-surface-container-high text-on-surface hover:text-[#4f46e5]' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {link.isVisible === false ? 'visibility_off' : 'visibility'}
            </span>
          </button>
          <button 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => store.removeLink(link.id)}
            className="w-6 h-6 rounded-full hover:bg-error/10 hover:text-error flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
        </div>
      </div>

      <div className="space-y-3 relative z-10 mt-1" onPointerDown={(e) => e.stopPropagation()}>
        {/* Input Judul Tautan */}
        <div>
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Judul Tautan</label>
          <div className="relative group">
            <input 
              type="text" 
              value={link.label}
              onChange={(e) => store.updateLink(link.id, { label: e.target.value })}
              placeholder="Contoh: Katalog Produk"
              className="w-full px-3 py-2 bg-white border border-outline-variant/30 rounded-xl text-sm font-bold text-on-surface outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all hover:border-outline-variant/60"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[16px] text-gray-400 pointer-events-none group-focus-within:text-[#4f46e5]">edit</span>
          </div>
        </div>

        {/* Input URL Tujuan */}
        <div>
           <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Tujuan URL</label>
           <div className="relative group flex items-center bg-white border border-outline-variant/30 rounded-xl overflow-hidden focus-within:border-[#4f46e5] focus-within:ring-2 focus-within:ring-[#4f46e5]/10 transition-all hover:border-outline-variant/60">
             <div className="pl-3 pr-2 py-2.5 flex items-center justify-center bg-gray-50/50 border-r border-outline-variant/20">
               <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-focus-within:text-[#4f46e5]">link</span>
             </div>
             <input 
               type="text" 
               value={link.url}
               onChange={(e) => store.updateLink(link.id, { url: e.target.value })}
               placeholder="https://"
               className="w-full px-3 py-2.5 bg-transparent text-xs font-medium text-primary outline-none"
             />
           </div>
        </div>
        
        {/* Toggles Behavior */}
        <div className="flex flex-col gap-3 mt-3 px-1 pt-1">
          {/* Toggle Buka Di Tab Baru */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">open_in_new</span>
              <span className="text-[10px] font-bold text-on-surface-variant">Buka di Tab Baru</span>
            </div>
            <button 
              onClick={() => store.updateLink(link.id, { openInNewTab: !(link.openInNewTab ?? true) })}
              className={`w-8 h-4 rounded-full flex items-center transition-colors px-0.5 ${
                (link.openInNewTab ?? true) ? "bg-primary" : "bg-outline-variant/50"
              }`}
            >
              <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${
                (link.openInNewTab ?? true) ? "translate-x-4" : "translate-x-0"
              }`} />
            </button>
          </div>

          {/* Toggle Deep Link */}
          <div className="flex flex-row items-baseline justify-between">
            <div className="flex flex-col pr-4">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant">electric_bolt</span>
                <span className="text-[10px] font-bold text-on-surface-variant">Gunakan Deep Link</span>
              </div>
              <p className="text-[8px] text-on-surface-variant/80 ml-5 mt-0.5 leading-tight">Membuka tujuan langsung ke dalam Aplikasi (misal: Aplikasi Shopee/WhatsApp) alih-alih Browser bawaan.</p>
            </div>
            <button 
              onClick={() => store.updateLink(link.id, { isDeepLink: !(link.isDeepLink ?? false) })}
              className={`w-8 h-4 rounded-full flex items-center transition-colors px-0.5 shrink-0 ${
                (link.isDeepLink ?? false) ? "bg-primary" : "bg-outline-variant/50"
              }`}
            >
              <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${
                (link.isDeepLink ?? false) ? "translate-x-4" : "translate-x-0"
              }`} />
            </button>
          </div>
        </div>

        {/* Toggle between Icon or Image */}
        <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-outline-variant/10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider w-14">Logo:</span>
            <div className="bg-surface-container-high rounded-lg p-1 flex w-full">
               <button 
                  onClick={() => store.updateLink(link.id, { type: 'icon' })}
                 className={`flex-1 text-[10px] uppercase font-bold py-1.5 rounded-md transition-colors ${link.type === 'icon' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
               >
                 Ikon Material
               </button>
               <button 
                  onClick={() => store.updateLink(link.id, { type: 'image' })}
                 className={`flex-1 text-[10px] uppercase font-bold py-1.5 rounded-md transition-colors ${link.type === 'image' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
               >
                 Upload Gambar
               </button>
            </div>
          </div>

          {/* Dependent Input */}
          {link.type === 'icon' ? (
             <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 mt-1">
               <button 
                 onClick={() => onPickIcon(link.id)}
                 className="w-full flex items-center gap-3 px-3 py-2 bg-white border border-outline-variant/30 rounded-lg text-xs hover:border-[#4f46e5] text-left transition-colors group"
               >
                 <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    {link.icon ? <Icon icon={link.icon} className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" /> : <Icon icon="lucide:smile" className="text-gray-400 w-5 h-5" />}
                 </div>
                 <span className="flex-1 text-on-surface-variant font-medium truncate">
                   {link.icon ? link.icon.split(':').pop() : 'Pilih Ikon...'}
                 </span>
                 <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-primary">chevron_right</span>
               </button>
             </div>
          ) : (
             <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 mt-1 flex gap-3 items-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-dashed border-outline-variant/50 flex flex-col items-center justify-center shrink-0 cursor-pointer hover:border-primary transition-colors overflow-hidden relative">
                  {link.image ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <Image src={link.image} fill className="object-cover" alt="Link icon" unoptimized />
                  ) : (
                     <span className="material-symbols-outlined text-[18px] text-on-surface-variant">add_photo_alternate</span>
                  )}
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" title="Upload Icon" onChange={(e)=>{
                      if (e.target.files && e.target.files[0]) {
                         const url = URL.createObjectURL(e.target.files[0]);
                         store.updateLink(link.id, { image: url });
                      }
                   }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant">Klik kotak u/ upload gambar custom</p>
                  <p className="text-[9.5px] text-on-surface-variant/70 mt-0.5">Rasio 1:1, Max 200x200px</p>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

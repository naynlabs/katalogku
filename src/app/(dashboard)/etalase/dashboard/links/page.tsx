"use client";

import { useState, useEffect, useRef } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import Image from "next/image";
import StorefrontUI from "@/components/storefront/StorefrontUI";
import { GOOGLE_FONTS, CSS_PATTERNS, PRESET_THEMES } from "@/lib/designConstants";
import SortableLinkItem from "@/components/dashboard/links/SortableLinkItem";
import { AVAILABLE_SOCIALS } from "@/components/dashboard/links/constants";
import { IconPickerModal, SocialModal } from "@/components/dashboard/links/Modals";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';


export default function LinksPage() {
  const [zoom, setZoom] = useState(80);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [iconPickerTargetId, setIconPickerTargetId] = useState<string | null>(null);
  const [fontSearch, setFontSearch] = useState("");
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const store = useBuilderStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFontDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const previewData = {
    ...store.profile,
    links: store.links,
    socials: store.socials,
    categories: ["Semua Kue", "Brownies", "Roti Manis", "Hampers"],
    products: [
      { id: 1, name: "Contoh Produk Dummy", price: 45000, cat: "Brownies", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVmbwZvBGxgLftpiMFTdkyuNFY5I38vhOye0Btb6dqPps91uwFtWWp2K8-RehVts14PesFlL7vbOEo7VV4mArNGnVCLNOMNRswyePO_zNqmlVeSGdwEUa_BsDwLNbv6IzZRBiMdaxhb1TrSMYaiep0rIi8H8CaBb4ERGBT2a69bMv_UcQDifxHpVm-C6dzWulA0hBY4VM2FucZNWPA2Jy4PtIXdgI6aNwXJ2mh-xbN-iF4n4PLL6ROzYy3RO9PKEtyPx6QAfLfJ6bE" },
      { id: 2, name: "Dummy Strawberry", price: 55000, cat: "Semua Kue", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3E4FDuCXzrfS21Z3O8UCmSIpU9aP6NaZ-CaqfTkJKPPQRejdaKohb76TM4Emq-eoY7IT60kZYSEI9pr7w5NgU66VweBmFGv0nhcuzLKU17gK-BhpuEYuEZNUlZ-lLdNHbY2y6q5nlHsKXNzerIVrgjyQDXS3xJ3Io4b2z4zyVqsr0I4QzIviVZdT6Jz-AJQaBwpE-mhNkWk91ZJYmag1nQCQnOCWkcND5hmRVftYKqxPK6Z5h0eBzAZVtAZnbKZ6-UF4zPLU3kZIm" },
    ]
  };

  // Konfigurasi Sensitivitas Drag (Agar tidak klik salah tarik)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = store.links.findIndex((l) => l.id === active.id);
      const newIndex = store.links.findIndex((l) => l.id === over.id);
      const newLinksArray = arrayMove(store.links, oldIndex, newIndex);
      store.reorderLinks(newLinksArray);
    }
  }

  return (
    <div className="w-full h-full min-h-[calc(100vh-8rem)] flex flex-col xl:flex-row gap-6">
      
      {/* 1. LEFT PANEL: Blocks & Links Management */}
      <div className="w-full xl:w-[340px] shrink-0 flex flex-col gap-6 hide-scrollbar overflow-y-auto max-h-[85vh] xl:pl-4 pl-0 pr-2 pb-10">
        
        {/* Info Toko (Identitas) */}
        <section className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm mt-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-on-surface">Informasi Profil</h3>
            <label className="flex items-center cursor-pointer gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/20 hover:bg-surface-container transition-colors" title="Tampilkan Badge Verifikasi Centang Hijau">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Verified</span>
              <div className={`relative w-8 h-4 rounded-full transition-colors ${store.profile.isVerified ? 'bg-[#25D366]' : 'bg-outline-variant/50'}`}>
                <div className={`absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${store.profile.isVerified ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={store.profile.isVerified}
                onChange={(e) => store.setProfileField("isVerified", e.target.checked)}
              />
            </label>
          </div>
          <div className="space-y-4">
            {/* Upload Foto Profil & Banner */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                 <div className="relative group w-14 h-14 rounded-full bg-surface-container-high border-2 border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                    <Image src={store.profile.profile} fill className="object-cover" alt="Profile" unoptimized />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="material-symbols-outlined text-white text-[18px]">photo_camera</span>
                    </div>
                    <input type="file" title="Ganti Foto Profil" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e)=>{
                        if(e.target.files && e.target.files[0]){
                           store.setProfileField('profile', URL.createObjectURL(e.target.files[0]));
                        }
                    }} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">Foto / Logo Toko</span>
                    <span className="text-[10px] text-on-surface-variant mt-0.5">Disarankan 1:1. Maks 2MB.</span>
                 </div>
              </div>

              <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                 <div className="relative group w-20 h-14 rounded-lg bg-surface-container-high border-2 border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                    <Image src={store.profile.banner} fill className="object-cover" alt="Banner" unoptimized />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="material-symbols-outlined text-white text-[18px]">wallpaper</span>
                    </div>
                    <input type="file" title="Ganti Banner Atas" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e)=>{
                        if(e.target.files && e.target.files[0]){
                           store.setProfileField('banner', URL.createObjectURL(e.target.files[0]));
                        }
                    }} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">Gambar Banner Atas</span>
                    <span className="text-[10px] text-on-surface-variant mt-0.5">Saran orientasi Landscape (16:9).</span>
                 </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant mb-1 block">Nama Toko / Judul</label>
              <input 
                type="text" 
                value={store.profile.name}
                onChange={(e) => store.setProfileField("name", e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant mb-1 block">Deskripsi Singkat (Bio)</label>
              <textarea 
                value={store.profile.tagline}
                onChange={(e) => store.setProfileField("tagline", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 resize-none"
              />
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-outline-variant/20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-on-surface-variant max-w-[150px]">Lencana Sosial Media</h4>
              <button 
                onClick={() => setShowSocialModal(true)}
                className="text-[10px] font-bold text-primary hover:bg-primary/10 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
              >
                + Tambah
              </button>
            </div>
            
            <div className="space-y-2">
              {store.socials.map((social) => {
                const badge = AVAILABLE_SOCIALS.find(s => s.platform.toLowerCase().includes(social.platform.toLowerCase())) || AVAILABLE_SOCIALS[AVAILABLE_SOCIALS.length - 1];
                return (
                <div key={social.id} className="flex flex-col gap-1.5 p-2 bg-surface-container-low rounded-xl border border-outline-variant/30 group relative">
                  <button 
                    onClick={() => store.removeSocial(social.id)}
                    className="absolute -right-2 -top-2 w-5 h-5 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm hover:scale-110 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                  
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-4 h-4 flex items-center justify-center text-on-surface">
                      {badge.icon}
                    </div>
                    <span className="text-[11px] font-bold text-on-surface-variant">{social.platform}</span>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="URL (https://...)"
                    value={social.url}
                    onChange={(e) => store.updateSocial(social.id, { url: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-outline-variant/20 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
              )})}
              {store.socials.length === 0 && (
                <p className="text-[10px] text-center text-on-surface-variant/60 py-1">Belum ada sosmed ditambahkan.</p>
              )}
            </div>
          </div>
        </section>

        {/* Add Blocks Section - Simplified as agreed */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-on-surface">Tambah Komponen</h3>
          </div>
          <button 
            onClick={() => {
              store.addLink({ id: Date.now().toString(), type: 'icon', label: '', url: '', icon: 'link' });
            }}
            className="w-full flex items-center gap-3 py-3 px-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest hover:border-[#4f46e5]/50 hover:bg-[#4f46e5]/5 text-on-surface transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container-low group-hover:bg-white flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-[#4f46e5]">add_link</span>
            </div>
            <div className="text-left">
              <span className="text-sm font-bold block leading-tight">Tautan Standar Baru</span>
              <span className="text-[10px] text-on-surface-variant">Tambahkan menu link dengan ikon custom.</span>
            </div>
          </button>
        </section>

        {/* Tautan Aktif (Links Management with Dnd-Kit) */}
        <section>
          <div className="flex items-center justify-between mb-4 mt-2">
            <h3 className="font-bold text-on-surface">Daftar Tautan</h3>
          </div>
          
          {isMounted ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={store.links.map(l => l.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3">
                  {store.links.map((link) => (
                    <SortableLinkItem key={link.id} link={link} onPickIcon={setIconPickerTargetId} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="flex flex-col gap-3">
              {store.links.map((link) => (
                 <div key={link.id} className="h-32 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          )}
        </section>

        {/* Promo Banner Management */}
        <section className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm mt-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-on-surface leading-tight">Card Promo Shop</h3>
              <p className="text-[10px] text-on-surface-variant">Tampilkan banner promo di bawah list katalog.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={store.profile.promoEnabled}
                onChange={(e) => store.setProfileField('promoEnabled', e.target.checked)}
              />
              <div className="w-9 h-5 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4f46e5]"></div>
            </label>
          </div>
          
          {store.profile.promoEnabled && (
            <div className="flex flex-col gap-3 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant mb-1 block">Label / Tag</label>
                  <input 
                    type="text" 
                    value={store.profile.promoLabel}
                    onChange={(e) => store.setProfileField('promoLabel', e.target.value)}
                    placeholder="Contoh: Promo Akhir Pekan"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant mb-1 block">Teks Tombol</label>
                  <input 
                    type="text" 
                    value={store.profile.promoButtonText}
                    onChange={(e) => store.setProfileField('promoButtonText', e.target.value)}
                    placeholder="Contoh: Klaim Sekarang"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant mb-1 flex justify-between">
                  <span>Judul Promo</span>
                  <span>{store.profile.promoTitleFontSize}px</span>
                </label>
                <div className="flex flex-col gap-2">
                  <textarea 
                    value={store.profile.promoTitle}
                    onChange={(e) => store.setProfileField('promoTitle', e.target.value)}
                    rows={2}
                    placeholder="Contoh: Diskon 15% Untuk Hampers Keluarga"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-gray-400"
                  />
                  <input 
                    type="range" 
                    min="14" max="36" 
                    value={store.profile.promoTitleFontSize}
                    onChange={(e) => store.setProfileField('promoTitleFontSize', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* Promo Styling */}
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 mt-1">
                <span className="text-[10px] font-bold text-on-surface block mb-3">Warna Promo</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-on-surface-variant block mb-1">Background Card</label>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-outline-variant/30">
                      <input type="color" value={store.profile.promoBgColor} onChange={(e) => store.setProfileField('promoBgColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                      <span className="text-[10px] font-mono">{store.profile.promoBgColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-on-surface-variant block mb-1">Teks Card</label>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-outline-variant/30">
                      <input type="color" value={store.profile.promoTextColor} onChange={(e) => store.setProfileField('promoTextColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                      <span className="text-[10px] font-mono">{store.profile.promoTextColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-on-surface-variant block mb-1">Background Tombol</label>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-outline-variant/30">
                      <input type="color" value={store.profile.promoBtnBgColor} onChange={(e) => store.setProfileField('promoBtnBgColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                      <span className="text-[10px] font-mono">{store.profile.promoBtnBgColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-on-surface-variant block mb-1">Teks Tombol</label>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-outline-variant/30">
                      <input type="color" value={store.profile.promoBtnTextColor} onChange={(e) => store.setProfileField('promoBtnTextColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                      <span className="text-[10px] font-mono">{store.profile.promoBtnTextColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-on-surface-variant mb-1 block">URL Tujuan (Link Promo)</label>
                <div className="relative group flex items-center bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <div className="pl-3 pr-2 py-2 flex items-center justify-center bg-black/5 border-r border-outline-variant/20">
                    <span className="material-symbols-outlined text-[14px] text-gray-400 group-focus-within:text-primary">link</span>
                  </div>
                  <input 
                    type="text" 
                    value={store.profile.promoButtonUrl}
                    onChange={(e) => store.setProfileField('promoButtonUrl', e.target.value)}
                    placeholder="https://"
                    className="w-full px-3 py-2 bg-transparent text-xs outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* 2. CENTER PANEL: Mobile Component Direct Preview */}
      <div className="flex-1 min-h-[600px] h-[85vh] bg-surface-container-lowest rounded-[2rem] border border-outline-variant/20 shadow-inner flex flex-col items-center relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden">
        
        {/* Scrollable Canvas area */}
        <div className="w-full h-full flex flex-col items-center overflow-y-auto hide-scrollbar pt-8 pb-24">
          
          {/* Zoom Controls Overlay (Scrolls dynamically with content) */}
          <div className="flex shrink-0 items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm z-50 mb-8">
             <button 
              onClick={() => setZoom(prev => Math.max(50, prev - 10))}
              className="text-on-surface-variant hover:text-black active:scale-95 transition-transform"
             >
               <span className="material-symbols-outlined text-[18px]">remove</span>
             </button>
             <span className="text-sm font-bold w-12 text-center">{zoom}%</span>
             <button 
              onClick={() => setZoom(prev => Math.min(150, prev + 10))}
              className="text-on-surface-variant hover:text-black active:scale-95 transition-transform"
             >
               <span className="material-symbols-outlined text-[18px]">add</span>
             </button>
          </div>

          {/* iPhone Frame Mockup (Unified Border Approach) */}
          <div 
            className="w-[330px] h-[680px] shrink-0 bg-white rounded-[3rem] border-[8px] border-black shadow-2xl overflow-hidden relative ring-1 ring-black/5 transition-transform duration-200 ease-out z-10"
            style={{ 
              transform: `scale(${zoom / 100})`, 
              transformOrigin: 'top center',
              /* Webkit mask forces perfect border-radius clipping on Safari/Chrome */
              maskImage: 'radial-gradient(white, black)',
              WebkitMaskImage: '-webkit-radial-gradient(white, black)'
            }}
          >
             <div className="w-full h-full relative">
                <StorefrontUI data={previewData} disableCheckout={true} />
             </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT PANEL: Design Customization (Pruned Version) */}
      <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6 hide-scrollbar overflow-y-auto max-h-[85vh] pl-2 pb-10">
         
         {/* Design Content */}
         <div className="flex flex-col gap-6 animate-fade-in">

            {/* Tema Preset Cepat */}
            <section className="bg-gradient-to-br from-primary/5 to-primary-container/10 p-4 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div>
                   <h3 className="font-bold text-primary text-[13px] flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">palette</span> Tema Desain Instan</h3>
                   <p className="text-[10px] text-on-surface-variant font-medium mt-1 leading-snug pr-4">20 kombinasi warna eksklusif yang dijamin enak dibaca dan terlihat estetik.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto hide-scrollbar pr-1 pt-1 relative z-10">
                 {PRESET_THEMES.map((theme) => (
                    <button 
                       key={theme.id}
                       onClick={() => {
                          store.applyTheme(theme.config);
                       }}
                       className={`group relative h-14 flex flex-col justify-between overflow-hidden rounded-xl border transition-all active:scale-95 shadow-sm text-left ${store.profile.bgColor === theme.config.bgColor && store.profile.buttonStyle === theme.config.buttonStyle ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/30 hover:border-primary/50'}`}
                       style={{ backgroundColor: theme.config.bgColor }}
                       title={`Tema: ${theme.name}`}
                    >
                       {(theme.config.bgPattern && theme.config.bgPattern !== 'none') && (
                          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: CSS_PATTERNS.find(p => p.id === theme.config.bgPattern)?.css, backgroundSize: CSS_PATTERNS.find(p => p.id === theme.config.bgPattern)?.backgroundSize }}></div>
                       )}
                       <div className="w-full flex font-bold tracking-tight text-[10px] px-2.5 pt-2 items-center justify-between relative z-10" style={{ color: theme.config.profileTitleColor || '#000' }}>
                          <span className="truncate w-[85%]">{theme.name}</span>
                          {store.profile.bgColor === theme.config.bgColor && store.profile.buttonStyle === theme.config.buttonStyle && (
                            <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          )}
                       </div>
                       
                       <div className="w-full h-2.5 flex relative z-10 mt-auto opacity-90">
                          <div className="flex-1" style={{ backgroundColor: theme.config.shopButtonColor }}></div>
                          <div className="flex-1" style={{ backgroundColor: theme.config.linkButtonColor }}></div>
                          <div className="flex-1" style={{ backgroundColor: theme.config.promoBgColor }}></div>
                       </div>
                    </button>
                 ))}
                 <div className="col-span-2 mt-1">
                    <p className="text-[9px] text-gray-400 font-medium text-center">Anda juga bisa memodifikasi warna satu-per-satu di bawah ini ↓</p>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            </section>

            {/* Latar Belakang */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-on-surface text-sm">Latar Belakang</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {/* Transparan base layer, kemudian warna, dikontrol di StorefrontUI */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[11px] font-bold text-on-surface-variant mb-1.5 block">Warna Dasar</label>
                    <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/30">
                      <input 
                        type="color" 
                        value={store.profile.bgColor}
                        onChange={(e) => store.setProfileField('bgColor', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                      />
                      <span className="text-xs font-mono uppercase text-on-surface-variant font-medium">{store.profile.bgColor}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-[11px] font-bold text-on-surface-variant mb-1.5 block">Gambar Background</label>
                    <div className="relative group w-full h-[46px] rounded-xl bg-surface-container-low border border-dashed border-outline-variant/50 flex flex-col items-center justify-center shrink-0 cursor-pointer hover:border-primary transition-colors overflow-hidden">
                       {store.profile.bgImage ? (
                          <>
                            <Image src={store.profile.bgImage} fill className="object-cover" alt="Background" unoptimized />
                            <button onClick={(e) => { e.preventDefault(); store.setProfileField('bgImage', ''); }} className="absolute z-10 top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="material-symbols-outlined text-[12px]">close</span>
                            </button>
                          </>
                       ) : (
                          <div className="flex items-center gap-1.5 text-on-surface-variant">
                            <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                            <span className="text-[10px] font-bold">Upload (Opsional)</span>
                          </div>
                       )}
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" title="Upload Background" onChange={(e)=>{
                          if (e.target.files && e.target.files[0]) {
                             store.setProfileField('bgImage', URL.createObjectURL(e.target.files[0]));
                          }
                       }} />
                    </div>
                  </div>
                </div>

                <div>
                   <div className="flex items-center justify-between mb-1.5">
                     <label className="text-[11px] font-bold text-on-surface-variant block">Layer Pattern (Pola CSS)</label>
                     <div className="flex items-center gap-1.5">
                       <input 
                         type="color" 
                         value={store.profile.patternColor?.length === 7 ? store.profile.patternColor : '#000000'}
                         onChange={(e) => store.setProfileField('patternColor', e.target.value)}
                         className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                         title="Warna Pola"
                       />
                       <span className="text-[9px] font-medium text-on-surface-variant">Warna Pola</span>
                     </div>
                   </div>
                   <div className="grid grid-cols-4 gap-2">
                     {CSS_PATTERNS.slice(0, 8).map((pattern) => (
                       <button 
                         key={pattern.id}
                         onClick={() => store.setProfileField('bgPattern', pattern.id)}
                         className={`h-14 rounded-xl border flex items-center justify-center overflow-hidden transition-all relative ${store.profile.bgPattern === pattern.id ? 'border-[#4f46e5] ring-2 ring-[#4f46e5]/20 shadow-sm' : 'border-outline-variant/30 hover:border-outline-variant/80'}`}
                         title={pattern.label}
                       >
                         <div className="absolute inset-0 bg-white"></div>
                         {pattern.id !== 'none' && (
                           <div className="absolute inset-0 opacity-40" style={{ backgroundImage: pattern.css.replace(/#000000/g, store.profile.patternColor || '#000000').replace(/#000/g, store.profile.patternColor || '#000'), backgroundSize: pattern.backgroundSize || '20px 20px', backgroundPosition: (pattern as any).backgroundPosition || '0 0' }}></div>
                         )}
                         {pattern.id === 'none' && <span className="relative z-10 text-[10px] font-bold text-gray-500">Polos</span>}
                       </button>
                     ))}
                   </div>
                   <div className="grid grid-cols-3 gap-2 mt-2">
                     {CSS_PATTERNS.slice(8).map((pattern) => (
                       <button 
                         key={pattern.id}
                         onClick={() => store.setProfileField('bgPattern', pattern.id)}
                         className={`h-14 rounded-xl border flex items-center justify-center overflow-hidden transition-all relative ${store.profile.bgPattern === pattern.id ? 'border-[#4f46e5] ring-2 ring-[#4f46e5]/20 shadow-sm' : 'border-outline-variant/30 hover:border-outline-variant/80'}`}
                         title={pattern.label}
                       >
                         <div className="absolute inset-0 bg-white"></div>
                         <div className="absolute inset-0 opacity-40" style={{ backgroundImage: pattern.css.replace(/#000000/g, store.profile.patternColor || '#000000').replace(/#000/g, store.profile.patternColor || '#000'), backgroundSize: pattern.backgroundSize || '20px 20px', backgroundPosition: (pattern as any).backgroundPosition || '0 0' }}></div>
                         <span className="text-[9px] font-bold text-gray-600 relative z-10 bg-white/80 px-1.5 py-0.5 rounded backdrop-blur-sm">{pattern.label}</span>
                       </button>
                     ))}
                   </div>
                   
                   {/* Pattern Opacity Slider */}
                   <div className="mt-4 flex flex-col gap-1.5 bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-on-surface-variant">Ketebalan / Opacity Pola</span>
                         <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-outline-variant/20">{store.profile.patternOpacity ?? 20}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={store.profile.patternOpacity ?? 20} 
                        onChange={(e) => store.setProfileField('patternOpacity', parseInt(e.target.value))} 
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                   </div>

                </div>
              </div>
            </section>

            <hr className="my-6 border-dashed border-outline-variant/40" />

            {/* Typography Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-on-surface text-sm">Tipografi</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="relative" ref={dropdownRef}>
                  <label className="text-[11px] font-bold text-on-surface-variant mb-1.5 block">Keluarga Font</label>
                  <button 
                    onClick={() => setShowFontDropdown(!showFontDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-bold text-on-surface hover:border-primary transition-colors"
                  >
                    <span>{store.profile.fontFamily}</span>
                    <span className="material-symbols-outlined text-[18px] text-gray-400">expand_more</span>
                  </button>

                  {showFontDropdown && (
                    <div className="absolute top-[60px] left-0 right-0 bg-white border border-outline-variant/20 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-50 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-outline-variant/10 bg-gray-50/50">
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[16px] text-gray-400">search</span>
                          <input 
                            type="text" 
                            placeholder="Cari dari 50+ Font..."
                            value={fontSearch}
                            onChange={(e) => setFontSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 bg-white border border-outline-variant/30 rounded-lg text-xs font-medium outline-none focus:border-primary"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-[220px] overflow-y-auto hide-scrollbar p-1">
                        {GOOGLE_FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).map(font => (
                          <button
                            key={font}
                            onClick={() => { store.setProfileField('fontFamily', font); setShowFontDropdown(false); }}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${store.profile.fontFamily === font ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'}`}
                            // Inline style temporarily so they can preview the font name (requires loading via google fonts though in the preview)
                          >
                            {font}
                          </button>
                        ))}
                        {GOOGLE_FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).length === 0 && (
                           <div className="p-4 text-center text-xs text-gray-400">Font tidak ditemukan.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                   <label className="text-[11px] font-bold text-on-surface-variant mb-2 block">Profil Toko (Desain Header)</label>
                   <div className="flex gap-2 mb-3">
                     <button onClick={() => store.setProfileField('headerAlignment', 'left')} className={`flex-1 flex justify-center py-2 border rounded-l-lg transition-colors ${store.profile.headerAlignment === 'left' ? 'bg-primary border-primary text-white' : 'bg-white border-outline-variant/30 text-on-surface hover:bg-surface-container-low'}`}><span className="material-symbols-outlined text-[16px]">format_align_left</span></button>
                     <button onClick={() => store.setProfileField('headerAlignment', 'center')} className={`flex-1 flex justify-center py-2 border-y border-r transition-colors ${store.profile.headerAlignment === 'center' ? 'bg-primary border-primary text-white' : 'bg-white border-outline-variant/30 text-on-surface hover:bg-surface-container-low'}`}><span className="material-symbols-outlined text-[16px]">format_align_center</span></button>
                     <button onClick={() => store.setProfileField('headerAlignment', 'right')} className={`flex-1 flex justify-center py-2 border-y border-r rounded-r-lg transition-colors ${store.profile.headerAlignment === 'right' ? 'bg-primary border-primary text-white' : 'bg-white border-outline-variant/30 text-on-surface hover:bg-surface-container-low'}`}><span className="material-symbols-outlined text-[16px]">format_align_right</span></button>
                   </div>
                   <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-outline-variant/30">
                        <input type="color" value={store.profile.profileTitleColor} onChange={(e) => store.setProfileField('profileTitleColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                        <span className="text-[10px] font-bold text-on-surface-variant flex-1 line-clamp-1">Warna Nama</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-outline-variant/30">
                        <input type="color" value={store.profile.profileBioColor} onChange={(e) => store.setProfileField('profileBioColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                        <span className="text-[10px] font-bold text-on-surface-variant flex-1 line-clamp-1">Warna Bio</span>
                      </div>
                   </div>
                 </div>

                <div className="pt-2 border-t border-outline-variant/10">
                  <label className="text-[11px] font-bold text-on-surface-variant mb-2 block">Ukuran Huruf Khusus (px)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface-container-low p-2 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-on-surface-variant">Nama Toko</span>
                         <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-mono border border-outline-variant/20">{store.profile.nameFontSize}</span>
                      </div>
                      <input type="range" min="16" max="40" value={store.profile.nameFontSize} onChange={(e) => store.setProfileField('nameFontSize', parseInt(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1" />
                    </div>
                    <div className="bg-surface-container-low p-2 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-on-surface-variant">Deskripsi</span>
                         <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-mono border border-outline-variant/20">{store.profile.bioFontSize}</span>
                      </div>
                      <input type="range" min="10" max="24" value={store.profile.bioFontSize} onChange={(e) => store.setProfileField('bioFontSize', parseInt(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1" />
                    </div>
                    <div className="bg-surface-container-low p-2 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-on-surface-variant">Tautan (Links)</span>
                         <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-mono border border-outline-variant/20">{store.profile.linksFontSize}</span>
                      </div>
                      <input type="range" min="10" max="24" value={store.profile.linksFontSize} onChange={(e) => store.setProfileField('linksFontSize', parseInt(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1" />
                    </div>
                    <div className="bg-surface-container-low p-2 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-on-surface-variant">Judul Produk</span>
                         <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-mono border border-outline-variant/20">{store.profile.productTitleFontSize}</span>
                      </div>
                      <input type="range" min="10" max="24" value={store.profile.productTitleFontSize} onChange={(e) => store.setProfileField('productTitleFontSize', parseInt(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-6 border-dashed border-outline-variant/40" />

            {/* Button Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-on-surface text-sm">Tombol (Buttons)</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant mb-1.5 block">Gaya Bentuk Tombol</label>
                  <div className="grid grid-cols-2 gap-2.5">
                     <button onClick={() => store.setProfileField('buttonStyle', 'pill')} className={`flex flex-col items-center gap-2 py-3.5 px-3 border transition-all ${store.profile.buttonStyle === 'pill' ? 'border-[#4f46e5] bg-[#4f46e5]/5 text-[#4f46e5] shadow-sm' : 'border-outline-variant/30 hover:bg-surface-container-low text-on-surface-variant'} rounded-xl`}>
                       <div className={`w-full h-8 rounded-full border-2 ${store.profile.buttonStyle === 'pill' ? 'border-[#4f46e5]/40 bg-[#4f46e5]/10' : 'border-gray-200 bg-gray-50'}`}></div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">Pill (Bulat)</span>
                     </button>
                     <button onClick={() => store.setProfileField('buttonStyle', 'rounded')} className={`flex flex-col items-center gap-2 py-3.5 px-3 border transition-all ${store.profile.buttonStyle === 'rounded' ? 'border-[#4f46e5] bg-[#4f46e5]/5 text-[#4f46e5] shadow-sm' : 'border-outline-variant/30 hover:bg-surface-container-low text-on-surface-variant'} rounded-xl`}>
                       <div className={`w-full h-8 rounded-xl border-2 ${store.profile.buttonStyle === 'rounded' ? 'border-[#4f46e5]/40 bg-[#4f46e5]/10' : 'border-gray-200 bg-gray-50'}`}></div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">Rounded</span>
                     </button>
                     <button onClick={() => store.setProfileField('buttonStyle', 'square')} className={`flex flex-col items-center gap-2 py-3.5 px-3 border transition-all ${store.profile.buttonStyle === 'square' ? 'border-[#4f46e5] bg-[#4f46e5]/5 text-[#4f46e5] shadow-sm' : 'border-outline-variant/30 hover:bg-surface-container-low text-on-surface-variant'} rounded-xl`}>
                       <div className={`w-full h-8 rounded-none border-2 ${store.profile.buttonStyle === 'square' ? 'border-[#4f46e5]/40 bg-[#4f46e5]/10' : 'border-gray-200 bg-gray-50'}`}></div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">Square (Kotak)</span>
                     </button>
                     <button onClick={() => store.setProfileField('buttonStyle', 'neo-brutalism')} className={`flex flex-col items-center gap-2 py-3.5 px-3 border-2 border-black transition-all ${store.profile.buttonStyle === 'neo-brutalism' ? 'bg-[#c4f979] shadow-[4px_4px_0px_#000] text-black' : 'bg-white hover:bg-gray-50 shadow-[3px_3px_0px_#000] text-black'}`}>
                       <div className="w-full h-8 rounded-none border-2 border-black bg-white shadow-[2px_2px_0px_#000]"></div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">Neo-Brutalism</span>
                     </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#4f46e5]/10 to-[#191c1e]/10 border border-outline-variant/20 rounded-xl mt-3">
                     <div>
                       <label className="text-[11px] font-bold text-on-surface mb-0.5 flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#4f46e5]">blur_on</span> Efek Kaca Premium</label>
                       <p className="text-[9px] text-on-surface-variant w-[90%] mt-0.5">Background tembus pandang bergaya glassmorphism.</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer shrink-0">
                       <input type="checkbox" className="sr-only peer" checked={store.profile.glassmorphism} onChange={(e) => store.setProfileField('glassmorphism', e.target.checked)} />
                       <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4f46e5]" />
                     </label>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-1">
                  <label className="text-[11px] font-bold text-on-surface-variant block">Warna Tombol</label>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                     <span className="text-[10px] font-semibold text-on-surface-variant col-span-2 -mb-1 border-b border-outline-variant/10 pb-1.5">Tautan (Links)</span>
                     <div className="flex items-center gap-2">
                        <input type="color" value={store.profile.linkButtonColor} onChange={(e) => store.setProfileField('linkButtonColor', e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-outline-variant/30 bg-transparent p-0.5" />
                        <span className="text-[10px] text-gray-500">Background</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <input type="color" value={store.profile.linkTextColor} onChange={(e) => store.setProfileField('linkTextColor', e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-outline-variant/30 bg-transparent p-0.5" />
                        <span className="text-[10px] text-gray-500">Teks</span>
                     </div>
                     <span className="text-[10px] font-semibold text-primary col-span-2 -mb-1 border-b border-outline-variant/10 pb-1.5 mt-1">Shop / Banner</span>
                     <div className="flex items-center gap-2">
                        <input type="color" value={store.profile.shopButtonColor} onChange={(e) => store.setProfileField('shopButtonColor', e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-outline-variant/30 bg-transparent p-0.5" />
                        <span className="text-[10px] text-gray-500">Background</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <input type="color" value={store.profile.shopTextColor} onChange={(e) => store.setProfileField('shopTextColor', e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-outline-variant/30 bg-transparent p-0.5" />
                        <span className="text-[10px] text-gray-500">Teks</span>
                     </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-6 border-dashed border-outline-variant/40" />

            {/* Product Settings Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-on-surface text-sm">Tampilan Produk</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl">
                    <label className="text-[11px] font-bold text-on-surface flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility_off</span> Sembunyikan Harga</label>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" className="sr-only peer" checked={store.profile.hidePrice} onChange={(e) => store.setProfileField('hidePrice', e.target.checked)} />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4f46e5]" />
                    </label>
                  </div>

                  <div>
                     <label className="text-[11px] font-bold text-on-surface-variant mb-1.5 block">Teks Tombol Beli (CTA Produk)</label>
                     <input 
                       type="text"
                       value={store.profile.productCtaText}
                       onChange={(e) => store.setProfileField('productCtaText', e.target.value)}
                       placeholder="Kosongkan jika tidak butuh"
                       className="w-full px-3 py-2 bg-white border border-outline-variant/30 rounded-xl text-xs font-medium text-on-surface outline-none focus:border-primary"
                     />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant mb-1.5 block">Layout Etalase</label>
                  <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
                     <button onClick={() => store.setProfileField('productLayout', 'grid')} className={`flex-1 flex gap-2 justify-center items-center py-2.5 rounded-lg text-[11px] font-bold transition-all ${store.profile.productLayout === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                       <span className="material-symbols-outlined text-[16px]">grid_view</span> Grid (2 Kolom)
                     </button>
                     <button onClick={() => store.setProfileField('productLayout', 'list')} className={`flex-1 flex gap-2 justify-center items-center py-2.5 rounded-lg text-[11px] font-bold transition-all ${store.profile.productLayout === 'list' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                       <span className="material-symbols-outlined text-[16px]">view_list</span> List (1 Kolom)
                     </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant mb-1.5 block">Pinggiran Gambar Produk</label>
                  <div className="grid grid-cols-2 gap-2.5">
                     <button onClick={() => store.setProfileField('productImageStyle', 'pill')} className={`flex flex-col items-center gap-2 py-3 px-3 border transition-all ${store.profile.productImageStyle === 'pill' ? 'border-[#4f46e5] bg-[#4f46e5]/5 text-[#4f46e5] shadow-sm' : 'border-outline-variant/30 hover:bg-surface-container-low text-on-surface-variant'} rounded-xl`}>
                       <div className={`w-10 h-10 rounded-full border-2 ${store.profile.productImageStyle === 'pill' ? 'border-[#4f46e5]/40 bg-[#4f46e5]/10' : 'border-gray-200 bg-gray-50'}`}></div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">Pill (Bulat)</span>
                     </button>
                     <button onClick={() => store.setProfileField('productImageStyle', 'rounded')} className={`flex flex-col items-center gap-2 py-3 px-3 border transition-all ${store.profile.productImageStyle === 'rounded' ? 'border-[#4f46e5] bg-[#4f46e5]/5 text-[#4f46e5] shadow-sm' : 'border-outline-variant/30 hover:bg-surface-container-low text-on-surface-variant'} rounded-xl`}>
                       <div className={`w-10 h-10 rounded-xl border-2 ${store.profile.productImageStyle === 'rounded' ? 'border-[#4f46e5]/40 bg-[#4f46e5]/10' : 'border-gray-200 bg-gray-50'}`}></div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">Rounded</span>
                     </button>
                     <button onClick={() => store.setProfileField('productImageStyle', 'square')} className={`flex flex-col items-center gap-2 py-3 px-3 border transition-all ${store.profile.productImageStyle === 'square' ? 'border-[#4f46e5] bg-[#4f46e5]/5 text-[#4f46e5] shadow-sm' : 'border-outline-variant/30 hover:bg-surface-container-low text-on-surface-variant'} rounded-xl`}>
                       <div className={`w-10 h-10 rounded-none border-2 ${store.profile.productImageStyle === 'square' ? 'border-[#4f46e5]/40 bg-[#4f46e5]/10' : 'border-gray-200 bg-gray-50'}`}></div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">Square (Kotak)</span>
                     </button>
                     <button onClick={() => store.setProfileField('productImageStyle', 'neo-brutalism')} className={`flex flex-col items-center gap-2 py-3 px-3 border-2 border-black transition-all ${store.profile.productImageStyle === 'neo-brutalism' ? 'bg-[#c4f979] shadow-[4px_4px_0px_#000] text-black' : 'bg-white hover:bg-gray-50 shadow-[3px_3px_0px_#000] text-black'}`}>
                       <div className="w-10 h-10 rounded-none border-2 border-black bg-white shadow-[2px_2px_0px_#000]"></div>
                       <span className="text-[10px] font-bold uppercase tracking-wider">Neo-Brutalism</span>
                     </button>
                  </div>
                </div>
              </div>
            </section>


            {/* Tombol Simpan */}
            <section className="mt-4 border-t border-outline-variant/20 pt-6 flex flex-col gap-2">
              <button onClick={() => alert("Perubahan disimpan! (Simulasi Mode Builder)")} className="w-full py-3.5 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-colors">
                Simpan Desain
              </button>
            </section>

           </div>

      </div>

      {/* Social Modal */}
      {showSocialModal && (
        <SocialModal onClose={() => setShowSocialModal(false)} />
      )}

      {/* Icon Picker Modal */}
      {iconPickerTargetId && (
        <IconPickerModal targetId={iconPickerTargetId} onClose={() => setIconPickerTargetId(null)} />
      )}

    </div>
  );
}

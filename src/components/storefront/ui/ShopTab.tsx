import React from "react";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";
import type { StorefrontData, Product } from "@/types";

export function ShopTab({
  data,
  activeCategory,
  setActiveCategory,
  filteredProducts,
  setSelectedProduct,
  themeTextColor,
  catBtnClass
}: {
  data: StorefrontData;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  filteredProducts: Product[];
  setSelectedProduct: (p: Product) => void;
  themeTextColor: string;
  catBtnClass: string;
}) {
  return (
    <div className="animate-fade-up max-w-[620px] mx-auto">
      {/* Categories horizontal scroll */}
      <section className="mt-2 mb-6 px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: themeTextColor }}>Kategori Populer</h2>
          <button className="font-bold text-sm opacity-80 hover:opacity-100" style={{ color: data.shopButtonColor || themeTextColor }}>Lihat Semua</button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {data.categories?.map((cat: string) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 font-bold text-xs transition-colors ${catBtnClass}`}
                style={isActive ? { 
                  backgroundColor: data.shopButtonColor, 
                  color: data.shopTextColor 
                } : {
                  backgroundColor: themeTextColor === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: themeTextColor,
                  border: data.buttonStyle === 'neo-brutalism' ? '2px solid black' : 'none'
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      <section className={`px-6 pb-8 ${data.productLayout === 'list' ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-4'}`}>
        {filteredProducts.map((p: any) => {
          // Product image style mapping
          const imgRadius = data.productImageStyle === 'pill' ? 'rounded-full' : data.productImageStyle === 'rounded' ? 'rounded-xl' : 'rounded-none';
          const isNeoBrutImg = data.productImageStyle === 'neo-brutalism';
          const imgBorder = isNeoBrutImg ? 'border-2 border-black shadow-[4px_4px_0px_#000]' : 'border border-black/5';
          const badgeRadius = data.productImageStyle === 'pill' ? 'rounded-full' : data.productImageStyle === 'rounded' ? 'rounded-md' : 'rounded-none';

          return (
            <div 
              key={p.id} 
              onClick={() => setSelectedProduct(p)}
              className={`${data.productLayout === 'list' ? `flex flex-row items-center gap-4 p-3 ${imgRadius} ${isNeoBrutImg ? 'border-2 border-black shadow-[4px_4px_0px_#000] bg-white' : data.glassmorphism ? 'bg-white/60 backdrop-blur-md border border-white/40 shadow-sm' : 'bg-black/5 border border-black/5 shadow-sm'}` : `col-span-1 flex flex-col gap-3 ${data.glassmorphism && !isNeoBrutImg ? 'bg-white/60 backdrop-blur-md rounded-2xl p-2.5 border border-white/40' : ''}`} group active:scale-[0.98] transition-transform cursor-pointer`}
            >
              <div className={`relative ${data.productLayout === 'list' ? 'w-24 h-24 shrink-0' : 'aspect-[4/5] w-full'} overflow-hidden bg-white/50 ${imgRadius} ${imgBorder}`}>
                <Image fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} src={p.img} unoptimized />
                {p.badge && data.productLayout !== 'list' && (
                  <span className={`absolute top-2 right-2 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm ${badgeRadius}`}>
                    {p.badge}
                  </span>
                )}
              </div>
              <div className={data.productLayout === 'list' ? 'flex-1' : ''}>
                {p.badge && data.productLayout === 'list' && (
                  <span className={`inline-block mb-1 border border-black/10 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm bg-white/50 ${badgeRadius}`} style={{ color: themeTextColor }}>
                    {p.badge}
                  </span>
                )}
                <h3 className="font-bold leading-tight line-clamp-2" style={{ fontSize: `${data.productTitleFontSize || 14}px`, color: themeTextColor }}>{p.name}</h3>
                {!data.hidePrice && (
                  <p className="font-extrabold mt-1.5 text-sm opacity-90" style={{ color: data.shopButtonColor || themeTextColor }}>{formatRupiah(p.price)}</p>
                )}
                {data.productCtaText && (
                  <div className={`mt-2 ${data.productLayout === 'list' ? '' : 'w-full'}`}>
                    <span 
                      className={`inline-block w-full text-center px-3 py-1.5 text-[11px] font-bold transition-all ${data.buttonStyle === 'pill' ? 'rounded-full' : data.buttonStyle === 'rounded' ? 'rounded-lg' : 'rounded-none'}`}
                      style={{ 
                        backgroundColor: data.shopButtonColor || themeTextColor, 
                        color: data.shopTextColor || '#ffffff',
                        boxShadow: data.buttonStyle === 'neo-brutalism' ? '2px 2px 0px rgba(0,0,0,1)' : 'none',
                        border: data.buttonStyle === 'neo-brutalism' ? '1.5px solid black' : 'none'
                        }}
                    >
                      {data.productCtaText}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {data.promoEnabled && (
        <section className="px-6 mt-8 mb-12">
          <div className="p-6 rounded-xl relative overflow-hidden flex flex-col justify-center min-h-[160px] shadow-lg" style={{ backgroundColor: data.promoBgColor }}>
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm" style={{ color: data.promoTextColor }}>{data.promoLabel}</span>
              <h3 className="font-extrabold mt-2 leading-tight whitespace-pre-line" style={{ color: data.promoTextColor, fontSize: `${data.promoTitleFontSize || 24}px` }}>{data.promoTitle}</h3>
              <button 
                className={`mt-4 px-5 py-2 font-bold text-sm w-fit active:scale-95 transition-transform ${data.buttonStyle === 'pill' ? 'rounded-full' : data.buttonStyle === 'rounded' ? 'rounded-xl' : 'rounded-none'}`} 
                style={{ 
                  backgroundColor: data.promoBtnBgColor, 
                  color: data.promoBtnTextColor,
                  boxShadow: data.buttonStyle === 'neo-brutalism' ? '4px 4px 0px rgba(0,0,0,1)' : '0 1px 3px rgba(0,0,0,0.1)',
                  border: data.buttonStyle === 'neo-brutalism' ? '2px solid black' : 'none'
                }}>
                {data.promoButtonText}
              </button>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl pointer-events-none"></div>
          </div>
        </section>
      )}
    </div>
  );
}

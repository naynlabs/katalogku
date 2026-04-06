"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { Icon } from "@iconify/react";
import { CSS_PATTERNS } from "@/lib/designConstants";
import Image from "next/image";

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID").replace(/,/g, '.');
}

export default function StorefrontUI({ data, disableCheckout = false }: { data: any, disableCheckout?: boolean }) {
  const [activeTab, setActiveTab] = useState<"Links" | "Shop">("Shop");
  const [activeCategory, setActiveCategory] = useState("Semua Kue"); // This should probably be dynamic based on data later, but okay for static
  
  // Calculate best text color based on bg color
  const getContrastColor = (hexColor: string) => {
    if (!hexColor || !hexColor.startsWith('#')) return '#191c1e';
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 255;
    const g = parseInt(hex.substring(2, 4), 16) || 255;
    const b = parseInt(hex.substring(4, 6), 16) || 255;
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#191c1e' : '#ffffff';
  };
  
  // E-commerce State
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [checkoutForm, setCheckoutForm] = useState({ name: "", phone: "", address: "", notes: "" });

  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Fallback products if none exist
  const products = data.products || [];

  const filteredProducts = activeCategory === "Semua Kue"
    ? products
    : products.filter((p: any) => p.cat === activeCategory);

  const cartItems = cart.map((c) => {
    const product = products.find((p: any) => p.id === c.id)!;
    return { ...product, qty: c.qty };
  });
  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const totalPrice = cartItems.reduce((sum, c) => sum + c.price * c.qty, 0);

  function addToCart(id: number) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, qty: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  function checkoutToWA() {
    if (disableCheckout) return alert("Checkout dinonaktifkan di mode Preview Builder.");
    if (totalItems === 0) return;
    const { name, phone, address, notes } = checkoutForm;
    const lines = cartItems.map((c: any) => `• ${c.name} x${c.qty} = ${formatRupiah(c.price * c.qty)}`);
    const buyerInfo = `\n👤 *Info Pemesan:*\n- Nama: ${name || '-'}\n- No. HP: ${phone || '-'}\n- Alamat: ${address || '-'}\n- Catatan: ${notes || '-'}`;
    const msg = `Halo ${data.name}! 🛍️\nSaya ingin memesan:\n${lines.join("\n")}\n\n*Total Tagihan: ${formatRupiah(totalPrice)}*\n${buyerInfo}\n\nTerima kasih!`;
    const url = `https://wa.me/${data.wa.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  // --- Theme Mapping Logic ---
  const activePattern = CSS_PATTERNS.find(p => p.id === data.bgPattern) || CSS_PATTERNS[0];
  
  // Button Shape Mapping
  let baseBtnClass = "rounded-xl"; // default rounded
  if (data.buttonStyle === 'pill') baseBtnClass = "rounded-full";
  if (data.buttonStyle === 'square') baseBtnClass = "rounded-none";
  if (data.buttonStyle === 'neo-brutalism') baseBtnClass = "rounded-md border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all";

  // Category Shape Mapping (slightly smaller borders/shadows for categories)
  let catBtnClass = "rounded-lg";
  if (data.buttonStyle === 'pill') catBtnClass = "rounded-full";
  if (data.buttonStyle === 'square') catBtnClass = "rounded-none";
  if (data.buttonStyle === 'neo-brutalism') catBtnClass = "rounded-md border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-black transition-all text-black hover:text-white bg-white";

  // Base background (used for solid color, underlying everything)
  const wrapperBgColor = data.bgColor || '#f8f9fb';
  // If we have an image, we use it. We blend it with a dark overlay to ensure readability.
  const hasBgImage = !!data.bgImage;

  const themeTextColor = hasBgImage ? '#ffffff' : getContrastColor(wrapperBgColor);
  const themeTextMuted = hasBgImage ? 'rgba(255,255,255,0.8)' : (themeTextColor === '#ffffff' ? 'rgba(255,255,255,0.8)' : '#464555');

  return (
    <div 
      className="relative min-h-full w-full h-full sm:pb-8 sm:py-0 overflow-y-auto hide-scrollbar bg-white"
    >
      {/* Dynamic Font Injection */}
      <link 
        rel="stylesheet" 
        href={`https://fonts.googleapis.com/css2?family=${(data.fontFamily || 'Inter').replace(/ /g, '+')}:wght@400;500;700;800&display=swap`} 
      />

      {/* Main Center Card (Wrapper) */}
      <div 
        className="relative w-full max-w-md mx-auto min-h-screen pb-32 sm:border-x sm:border-b sm:border-black/5 overflow-x-hidden transition-all duration-300"
        style={{ 
          fontFamily: `'${data.fontFamily || 'Inter'}', sans-serif`,
          backgroundColor: wrapperBgColor
        }}
      >
        
        {/* Layer 1: Background Image if any */}
        {hasBgImage && (
           <>
             <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.bgImage})` }}></div>
             <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-3xl"></div>
           </>
        )}

        {/* Layer 2: CSS Pattern Overlay */}
        {activePattern.id !== 'none' && !hasBgImage && (
           <div 
             className="absolute inset-0 z-0 pointer-events-none" 
             style={{ 
               backgroundImage: activePattern.css.replace(/#000000/g, data.patternColor || '#000000').replace(/#000/g, data.patternColor || '#000'), 
               backgroundSize: activePattern.backgroundSize, 
               backgroundPosition: activePattern.backgroundPosition,
               opacity: data.patternOpacity !== undefined ? data.patternOpacity / 100 : 0.2
             }}
           ></div>
        )}
        
        {/* Floating Top Navigation */}
        <header className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none sticky-header">
           <div className="flex items-center gap-3 w-full justify-between pointer-events-auto">
            <button className={`${data.buttonStyle === 'neo-brutalism' ? 'border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]' : 'shadow-lg outline outline-1 outline-white/50'} w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white active:scale-95 transition-all overflow-hidden`}>
              <Image src="/logo-katalogku.svg" alt="Katalogku" width={28} height={28} className="object-contain" unoptimized />
            </button>
            <div className="flex gap-3 text-black">
              <button onClick={() => setShowSubscribeModal(true)} className={`${data.buttonStyle === 'neo-brutalism' ? 'border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]' : 'shadow-lg outline outline-1 outline-white/50'} w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white active:scale-95 transition-all`}>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
              </button>
              <button onClick={() => setShowShareModal(true)} className={`${data.buttonStyle === 'neo-brutalism' ? 'border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]' : 'shadow-lg outline outline-1 outline-white/50'} w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white active:scale-95 transition-all`}>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>ios_share</span>
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative h-48 md:h-64 w-full overflow-hidden">
            <Image alt="Hero Banner" fill className="object-cover" src={data.banner} unoptimized />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          </section>

          {/* Profile Header */}
          <section className={`px-6 -mt-16 relative z-10 flex flex-col ${data.headerAlignment === 'left' ? 'items-start text-left' : data.headerAlignment === 'right' ? 'items-end text-right' : 'items-center text-center'}`}>
            <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-full shadow-lg">
              <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-white">
                <Image alt="Profile" fill className="object-cover" src={data.profile} unoptimized />
              </div>
            </div>
            <div className={`mt-4 flex items-center gap-1.5 ${data.headerAlignment === 'left' ? 'justify-start' : data.headerAlignment === 'right' ? 'justify-end' : 'justify-center'}`}>
              <h2 className="font-extrabold tracking-tight" style={{ fontSize: `${data.nameFontSize || 24}px`, color: data.profileTitleColor || themeTextColor }}>{data.name}</h2>
              {data.isVerified !== false && (
                <span className="material-symbols-outlined text-[22px] text-[#2970ff]" style={{ fontVariationSettings: "'FILL' 1" }} title="Verified Official">verified</span>
              )}
            </div>
            <p className={`font-medium mt-1 max-w-[280px] ${data.headerAlignment === 'left' ? 'mr-auto' : data.headerAlignment === 'right' ? 'ml-auto' : 'mx-auto'}`} style={{ fontSize: `${data.bioFontSize || 14}px`, color: data.profileBioColor || themeTextMuted }}>{data.tagline}</p>
            
            {/* Social Media Links (Dribbble Ref) */}
            <div className={`flex flex-wrap items-center gap-4 mt-5 max-w-[190px] ${data.headerAlignment === 'left' ? 'justify-start mr-auto' : data.headerAlignment === 'right' ? 'justify-end ml-auto' : 'justify-center mx-auto'}`} style={{ color: data.profileBioColor || themeTextMuted }}>
              {data.socials?.map((social: any) => {
                const p = social.platform.toLowerCase();
                let icon = <Icon icon="lucide:globe" className="w-[20px] h-[20px] text-gray-500" />;
                if (p.includes('instagram')) icon = <Icon icon="skill-icons:instagram" className="w-[22px] h-[22px]" />;
                if (p.includes('tiktok')) icon = <Icon icon="logos:tiktok-icon" className="w-5 h-5 mx-0.5" />;
                if (p.includes('whatsapp') || p.includes('wa')) icon = <Icon icon="logos:whatsapp-icon" className="w-[22px] h-[22px]" />;
                if (p.includes('twitter') || p === 'x') icon = <div className="bg-[#191c1e] w-[22px] h-[22px] min-w-[22px] min-h-[22px] shrink-0 rounded-full flex items-center justify-center text-white"><Icon icon="ri:twitter-x-fill" className="w-3.5 h-3.5" /></div>;
                if (p.includes('threads')) icon = <div className="bg-[#191c1e] w-[22px] h-[22px] min-w-[22px] min-h-[22px] shrink-0 rounded-full flex items-center justify-center text-white"><Icon icon="simple-icons:threads" className="w-3.5 h-3.5" /></div>;
                if (p.includes('youtube')) icon = <Icon icon="logos:youtube-icon" className="w-[22px] h-[22px]" />;
                if (p.includes('facebook') || p.includes('fb')) icon = <Icon icon="logos:facebook" className="w-[22px] h-[22px]" />;
                if (p.includes('messenger')) icon = <Icon icon="logos:messenger" className="w-[22px] h-[22px]" />;
                if (p.includes('telegram') || p.includes('tg')) icon = <Icon icon="logos:telegram" className="w-[22px] h-[22px]" />;
                if (p.includes('discord') || p.includes('dc')) icon = <Icon icon="logos:discord-icon" className="w-[22px] h-[22px]" />;
                if (p.includes('pinterest') || p.includes('pin')) icon = <Icon icon="logos:pinterest" className="w-[22px] h-[22px]" />;
                if (p.includes('linkedin')) icon = <Icon icon="logos:linkedin-icon" className="w-[22px] h-[22px]" />;
                if (p.includes('github') || p.includes('git')) icon = <Icon icon="logos:github-icon" className="w-[22px] h-[22px]" />;

                return (
                  <a 
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-80 transition-all hover:scale-110 active:scale-95"
                    title={social.platform}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </section>

          <nav className="mt-8 px-6 mb-8 max-w-sm mx-auto w-full">
            <div className={`p-1 px-1.5 flex gap-1 w-full ${data.buttonStyle === 'pill' ? 'rounded-full' : data.buttonStyle === 'rounded' ? 'rounded-2xl' : data.buttonStyle === 'neo-brutalism' ? 'rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_#000]' : 'rounded-lg'}`} style={{ backgroundColor: data.buttonStyle === 'neo-brutalism' ? 'white' : 'rgba(0,0,0,0.05)' }}>
              <button 
                onClick={() => setActiveTab("Shop")}
                className={`flex-1 py-1.5 font-bold text-sm transition-all ${data.buttonStyle === 'pill' ? 'rounded-full' : data.buttonStyle === 'rounded' ? 'rounded-xl' : 'rounded-none'}`}
                style={{ 
                  backgroundColor: activeTab === "Shop" ? data.shopButtonColor : 'transparent',
                  color: activeTab === "Shop" ? data.shopTextColor : themeTextMuted,
                  boxShadow: activeTab === "Shop" && data.buttonStyle !== 'neo-brutalism' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Shop
              </button>
              <button 
                onClick={() => setActiveTab("Links")}
                className={`flex-1 py-1.5 font-bold text-sm transition-all ${data.buttonStyle === 'pill' ? 'rounded-full' : data.buttonStyle === 'rounded' ? 'rounded-xl' : 'rounded-none'}`}
                style={{ 
                  backgroundColor: activeTab === "Links" ? data.shopButtonColor : 'transparent',
                  color: activeTab === "Links" ? data.shopTextColor : themeTextMuted,
                  boxShadow: activeTab === "Links" && data.buttonStyle !== 'neo-brutalism' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Links
              </button>
            </div>
          </nav>

          {/* --- LINKS TAB CONTENT --- */}
          {activeTab === "Links" && (
            <div className="animate-fade-up">
              <div className="px-6 flex flex-col gap-4 max-w-md mx-auto">
                {data.links?.filter((l: any) => l.isVisible !== false).map((link: any, i: number) => (
                  <a 
                    key={i} 
                    className={`group flex items-center p-2.5 ${baseBtnClass} ${data.glassmorphism && data.buttonStyle !== 'neo-brutalism' ? 'backdrop-blur-md bg-opacity-80' : ''}`} 
                    style={{ 
                       backgroundColor: data.linkButtonColor, 
                       color: data.linkTextColor,
                       boxShadow: data.buttonStyle === 'neo-brutalism' ? '4px 4px 0px rgba(0,0,0,1)' : '0px 10px 30px rgba(0,0,0,0.05)'
                    }}
                    href={link.url}
                    target={link.openInNewTab ? "_blank" : "_self"}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  >
                    <div className={`relative w-11 h-11 ${baseBtnClass} overflow-hidden flex-shrink-0 flex items-center justify-center bg-black/5`}>
                      {link.type === 'image' && link.image ? (
                        <Image alt={link.label} fill className="object-cover" src={link.image} unoptimized />
                      ) : link.type === 'icon' && link.icon ? (
                        <Icon icon={link.icon} className="text-[20px] w-5 h-5 opacity-80" />
                      ) : (
                         <Icon icon="lucide:link" className="text-gray-400 w-5 h-5" />
                      )}
                    </div>
                    <span className="ml-4 flex-grow font-bold truncate" style={{ fontSize: `${data.linksFontSize || 14}px` }}>{link.label}</span>
                    <div className="mr-2 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 group-hover:bg-black/10 transition-colors">
                      <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </div>
                  </a>
                ))}
                {(!data.links || data.links.length === 0) && (
                   <p className="text-center text-sm text-gray-400 my-4">Belum ada tautan</p>
                )}
              </div>
            </div>
          )}

          {/* --- SHOP TAB CONTENT --- */}
          {activeTab === "Shop" && (
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
          )}

        </main>

        {/* Floating Cart Access */}
        {totalItems > 0 && (
          <button 
            onClick={() => setShowCheckout(true)}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3.5 ${baseBtnClass} font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 animate-fade-up`}
            style={{ backgroundColor: data.shopButtonColor, color: data.shopTextColor }}
          >
            <span className="material-symbols-outlined flex items-center justify-center">shopping_cart</span>
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[10px] opacity-80 mb-0.5 tracking-wider uppercase">Lihat Keranjang</span>
              <span className="text-sm font-black tracking-tight">{totalItems} Pcs • {formatRupiah(totalPrice)}</span>
            </div>
          </button>
        )}

      </div> 
    </div>
  );
}

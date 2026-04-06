"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";

const storeData = {
  name: "Toko Kue Bunda",
  tagline: "Cita Rasa Rumah di Setiap Gigitan ✨",
  wa: "+6281234567890",
  banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPDXUeurpWEUqXJgo4d9clRn2JoNqe2BjHD7bOj-skDh4SHeocrMThWPcfApfyR1-yUhCGz2fN0KHedxEAiedwO1wz10nUiNDgb2427We9uMMBm2kAGADzki4o4Eky7ECWdaHBV8fg-7pKTuLhfQbm_Yfg1qpsxfPmjFfBaEgg4OyzNqT2sue4yDLLhtN8Zh9CMk9pRZ3CL7kyqbeZMLHXJkp2kWRdnxYR1KvSN0ZcBnEAO0vO5N4w1d2yNJIiXLxowWGwwMuu_6se",
  profile: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7MTx8jdW1SBBJwO_1lqJmAi4Cc7xNeRDxfqrNbf0yDiLwGgn1a1FnOSJ8khAZHFjp-PPOlam98RxpVs2RIOwkfsw7sbFyA9QTZv-I1skMV9GVqL0dpMcLhfV6a8Pfrs70o3HCL8rglmyLMIhLXxYMuuwdDIvmqiV96Tdz35zmgqwcJyLoRi9HM_MyimZtwdBn2L2R78ktu14JqpRLe2A8UtEPy41m8j8oEJwudj-1fmBCV4ZftyNSJoK_a6cIDdzwOYe4TjELuhJs",
  categories: ["Semua Kue", "Brownies", "Roti Manis", "Hampers"],
  links: [
    { type: "image", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpCLXs2Q0wzKqnJx1D-lFNMFWSyM5ZKs5l62fUj3_juJVuU2ihth8bn-ZwVbkECZa41wzKerQ_HRDZgZeq32YlxMWU5tC97A7J8xa4U2JAqygjGEP2qR4XDTUN83tUaxvxuIRa88yluuboraJi7kGzcHmCG-rmiIXQCnzjb9FeiIHFNhi75sUCcjmvAR4gRvg_F8821Q6IEd_XTfQOZ2CxDWv7Ff0COWlqs-OE3mLEoL9Wez_Ayo6k6KK2SylLa7xWBIfb-94ldxws", label: "Pesan Hampers Lebaran", url: "#" },
    { type: "image", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqritIlcfHbbpOPYcMGoGzY2Vzf_s0xSC5sPj-vSaOMWaQlBI-nbJhynLVrtvzjRahAdV0DuiJjro3gM6BpbFeNZv7Jy9qMytmpHb1DVizmbzvos-xTxehxb7no1xu5MASR8l0iB1HiTb7Rj0A5mTWXY7hIpHwz27CWfiVv1GuHX0utHadvPkGgo631JdEsKukyJHIE5s5wJPaedkGNxG1n9IYZY6q5PhDLmD-KDrlpgoBZ5j5uxcL0eMHnef6nWwaFbsTNr7015Ln", label: "Katalog Ulang Tahun", url: "#" },
    { type: "icon", icon: "chat", iconBg: "bg-primary/10", iconColor: "text-primary", label: "Chat Admin (Tanya Stok)", url: "#" },
    { type: "image", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC5HGkrKiRP6cnl0hkojnW6vnESuDhlI7Nckr9fFTHNvNc3tkNeRpqUPJbBY0_EzaD0FAHigPtEO8Fh3FGJCLXRAJGvC2rvvXwP3z43z9U1-1w_YrFTPi2ZKUVXev2gunL5kpeaLx-TwRlT4t5NPeMZ_cWuHlOiPlE79K3WIMXAiBiaiCDWVAh_Y95aaw3gzdQDc52KK4ZdFtGQEcT6k7gqcn4bu0P_RktvHYQalOOzwjazVLQtyYtMNbUv21eclmTD2gBMXBLqQ6_", label: "Lokasi Toko Offline", url: "#" },
    { type: "icon", icon: "star_half", iconBg: "bg-[#9ef65c]/20", iconColor: "text-[#346b00]", label: "Review Pelanggan", url: "#" },
  ],
  products: [
    { id: 1, name: "Cokelat Klasik Bunda", price: 45000, cat: "Brownies", badge: "Terlaris", badgeColor: "bg-[#e2dfff] text-[#0f0069]", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVmbwZvBGxgLftpiMFTdkyuNFY5I38vhOye0Btb6dqPps91uwFtWWp2K8-RehVts14PesFlL7vbOEo7VV4mArNGnVCLNOMNRswyePO_zNqmlVeSGdwEUa_BsDwLNbv6IzZRBiMdaxhb1TrSMYaiep0rIi8H8CaBb4ERGBT2a69bMv_UcQDifxHpVm-C6dzWulA0hBY4VM2FucZNWPA2Jy4PtIXdgI6aNwXJ2mh-xbN-iF4n4PLL6ROzYy3RO9PKEtyPx6QAfLfJ6bE" },
    { id: 2, name: "Strawberry Cheesecake", price: 55000, cat: "Semua Kue", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3E4FDuCXzrfS21Z3O8UCmSIpU9aP6NaZ-CaqfTkJKPPQRejdaKohb76TM4Emq-eoY7IT60kZYSEI9pr7w5NgU66VweBmFGv0nhcuzLKU17gK-BhpuEYuEZNUlZ-lLdNHbY2y6q5nlHsKXNzerIVrgjyQDXS3xJ3Io4b2z4zyVqsr0I4QzIviVZdT6Jz-AJQaBwpE-mhNkWk91ZJYmag1nQCQnOCWkcND5hmRVftYKqxPK6Z5h0eBzAZVtAZnbKZ6-UF4zPLU3kZIm" },
    { id: 3, name: "Set Cupcake Pelangi", price: 85000, cat: "Semua Kue", badge: "Baru", badgeColor: "bg-[#a1f95e] text-[#0b2000]", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6QgwHhHCIkk7nkn6btfm-uHeDolKmQ9DFcaNDnvO-poXu5f_pkJILAocqa60v5miMihGRe7yt8YtWfLkf9OwiYNP7l2eMS-TpbZXcIakqLirpNujpcWE88TKLu98qlp97-VHl3xYzrooGvamlkyK944-GMar9rcqQIAy7Q3hN4bYPk0pnhE56woTwwYrJeb1mGIMcXtBiAyY1G4uE98cti3fMDlaDF5b-XVCOh-gw9o9tXh6ITSS2Wg_iOx5IwVo1hXyS1NZqSJMT" },
    { id: 4, name: "Tarte aux Fruits", price: 38000, cat: "Semua Kue", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxOEtQgjpT_TJizWDCCUFcx3Mfxfy63tsogHpXBAdRZ_ngl_AJfXKa35KzHo0momunwW_eHu1aAjJLwyXYCtwYE30dbKNRAWQvEfyuBD-DsXPL7uJtTL9fO3OVJ7d7WqAuUbfApGTsPWY7V6erqpK5txufjYKFH8rGzwD_WY5KSdD9XPmTZ4TA9pFRoAKGMnS-s3-8hKeOqaetxC8pEl7h_lVCTOk4Sk0J1p-pZv4pVQD9NSRp_uyDGhebrFMQmeGUYnrj5p0a6--G" },
  ]
};

// formatRupiah imported from @/lib/utils

export default function StorefrontPage(props: { params: Promise<{ username: string }> }) {
  const params = use(props.params);
  const [activeTab, setActiveTab] = useState<"Links" | "Shop">("Shop");
  const [activeCategory, setActiveCategory] = useState("Semua Kue");
  
  // E-commerce State
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof storeData.products[number] | null>(null);
  const [checkoutForm, setCheckoutForm] = useState({ name: "", phone: "", address: "", notes: "" });

  // Modal State
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Clean UI inside iframe mockup
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("mode=iframe")) {
      const style = document.createElement("style");
      style.innerHTML = `
        nextjs-portal { display: none !important; }
        ::-webkit-scrollbar { display: none !important; width: 0 !important; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const filteredProducts = activeCategory === "Semua Kue"
    ? storeData.products
    : storeData.products.filter((p) => p.cat === activeCategory);

  const cartItems = cart
    .map((c) => {
      const product = storeData.products.find((p) => p.id === c.id);
      if (!product) return null;
      return { ...product, qty: c.qty };
    })
    .filter((item): item is typeof storeData.products[number] & { qty: number } => item !== null);
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
    if (totalItems === 0) return;
    const { name, phone, address, notes } = checkoutForm;
    const lines = cartItems.map((c) => `• ${c.name} x${c.qty} = ${formatRupiah(c.price * c.qty)}`);
    const buyerInfo = `\n👤 *Info Pemesan:*\n- Nama: ${name || '-'}\n- No. HP: ${phone || '-'}\n- Alamat: ${address || '-'}\n- Catatan: ${notes || '-'}`;
    const msg = `Halo ${storeData.name}! 🛍️\nSaya ingin memesan:\n${lines.join("\n")}\n\n*Total Tagihan: ${formatRupiah(totalPrice)}*\n${buyerInfo}\n\nTerima kasih!`;
    const url = `https://wa.me/${storeData.wa.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="relative min-h-screen w-full sm:py-8 sm:px-4">
      {/* Fixed Background to avoid white space on scroll */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${storeData.banner})` }}></div>
      {/* Dynamic blurred background overlay */}
      <div className="fixed inset-0 -z-10 backdrop-blur-3xl bg-black/40"></div>
      
      {/* Main Center Card (Mobile Interface) */}
      <div className="relative w-full max-w-md mx-auto bg-[#f8f9fb] text-[#191c1e] min-h-screen sm:min-h-[calc(100vh-4rem)] pb-32 shadow-2xl sm:border sm:rounded-[2.5rem] border-white/20 overflow-x-hidden">
        
        {/* Floating Top Navigation (Linktree Style) */}
        <header className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 w-full justify-between pointer-events-auto">
            <button onClick={() => setShowPromoModal(true)} className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all outline outline-1 outline-white/50 overflow-hidden">
              <Image src="/logo-katalogku.svg" alt="Katalogku" width={28} height={28} className="object-contain" unoptimized />
            </button>
            <div className="flex gap-3">
              <button onClick={() => setShowSubscribeModal(true)} className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-[#4f46e5] shadow-lg hover:bg-white active:scale-95 transition-all outline outline-1 outline-white/50">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
              </button>
              <button onClick={() => setShowShareModal(true)} className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-[#4f46e5] shadow-lg hover:bg-white active:scale-95 transition-all outline outline-1 outline-white/50">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>ios_share</span>
              </button>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative h-48 md:h-64 w-full overflow-hidden">
            <Image alt="Hero Banner" fill className="object-cover" src={storeData.banner} unoptimized />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f8f9fb]"></div>
          </section>

          {/* Profile Header */}
          <section className="px-6 -mt-16 relative z-10 flex flex-col items-center text-center">
            <div className="p-1 bg-[#f8f9fb] rounded-full">
              <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <Image alt="Profile" fill className="object-cover" src={storeData.profile} unoptimized />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#191c1e]">{storeData.name}</h2>
            <p className="text-[#464555] font-medium text-sm mt-1">{storeData.tagline}</p>
            
            <div className="flex gap-3 mt-4">
              <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm text-primary">star</span>
                <span className="text-xs font-bold">4.9 (2k+)</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm text-[#346b00]">verified</span>
                <span className="text-xs font-bold text-[#367000]">Official</span>
              </div>
            </div>

            <button 
              onClick={() => {
                const url = `https://wa.me/${storeData.wa.replace(/\D/g, "")}`;
                window.open(url, "_blank");
              }}
              className="mt-6 bg-[#9ef65c] text-[#367000] px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-[0px_10px_20px_rgba(54,112,0,0.1)] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              Order WhatsApp
            </button>
          </section>

          {/* Tab Toggle Navigation */}
          <nav className="mt-8 px-6 mb-8 max-w-sm mx-auto w-full">
            <div className="bg-surface-container-low p-1.5 rounded-full flex gap-1 w-full">
              <button 
                onClick={() => setActiveTab("Shop")}
                className={`flex-1 py-2 rounded-full font-bold text-sm transition-all ${
                  activeTab === "Shop" ? "bg-white text-primary shadow-sm" : "text-[#464555] hover:bg-gray-200/50"
                }`}
              >
                Shop
              </button>
              <button 
                onClick={() => setActiveTab("Links")}
                className={`flex-1 py-2 rounded-full font-bold text-sm transition-all ${
                  activeTab === "Links" ? "bg-white text-primary shadow-sm" : "text-[#464555] hover:bg-gray-200/50"
                }`}
              >
                Links
              </button>
            </div>
          </nav>

          {/* --- LINKS TAB CONTENT --- */}
          {activeTab === "Links" && (
            <div className="animate-fade-up">
              <div className="px-6 flex flex-col gap-4 max-w-md mx-auto">
                {storeData.links.map((link, i) => (
                  <a key={i} className="group flex items-center bg-white p-2 rounded-full shadow-[0px_20px_40px_rgba(77,68,227,0.06)] border border-outline-variant/10 hover:scale-[1.02] transition-transform active:scale-95" href={link.url}>
                    <div className={`relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center ${link.iconBg || ''}`}>
                      {link.type === 'image' ? (
                        <Image alt={link.label} fill className="object-cover" src={link.image || ''} unoptimized />
                      ) : (
                        <span className={`material-symbols-outlined ${link.iconColor}`}>{link.icon}</span>
                      )}
                    </div>
                    <span className="ml-4 flex-grow font-bold text-[#191c1e] group-hover:text-primary transition-colors text-sm">{link.label}</span>
                    <div className="mr-2 w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-lg">chevron_right</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-12 px-10 text-center pb-8">
                <p className="text-sm text-[#464555] leading-relaxed">Nikmati kelezatan kue buatan rumah dengan bahan premium pilihan. Kami melayani pengiriman area Jabodetabek.</p>
              </div>
            </div>
          )}

          {/* --- SHOP TAB CONTENT --- */}
          {activeTab === "Shop" && (
            <div className="animate-fade-up max-w-[620px] mx-auto">
              
              {/* Categories horizontal scroll */}
              <section className="mt-2 mb-6 px-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Kategori Populer</h2>
                  <button className="text-primary font-bold text-sm">Lihat Semua</button>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {storeData.categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-xs transition-colors ${
                        activeCategory === cat 
                          ? "bg-[#a1f95e] text-[#0b2000] shadow-sm" 
                          : "bg-surface-container-high text-[#464555] hover:bg-gray-300/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Product Grid (2 Columns) */}
              <section className="px-6 grid grid-cols-2 gap-4">
                {filteredProducts.map((p, i) => (
                  <div 
                    key={p.id} 
                    onClick={() => setSelectedProduct(p)}
                    className="col-span-1 flex flex-col gap-3 group active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low shadow-sm ring-1 ring-outline-variant/10">
                      <Image fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} src={p.img} unoptimized />
                      {p.badge && (
                        <span className={`absolute top-3 right-3 ${p.badgeColor} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm bg-opacity-90`}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#191c1e] leading-tight text-sm line-clamp-2">{p.name}</h3>
                      <p className="text-primary font-extrabold mt-1 text-sm">{formatRupiah(p.price)}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* Promotional Banner */}
              <section className="px-6 mt-8 mb-12">
                <div className="bg-primary p-6 rounded-xl relative overflow-hidden flex flex-col justify-center min-h-[160px] shadow-lg shadow-primary/20">
                  <div className="relative z-10">
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">Promo Akhir Pekan</span>
                    <h3 className="text-white text-2xl font-extrabold mt-2 leading-tight">Diskon 15% Untuk<br/>Hampers Keluarga</h3>
                    <button className="mt-4 bg-white text-primary px-5 py-2 rounded-full font-bold text-sm w-fit active:scale-95 transition-transform shadow-sm">
                      Klaim Sekarang
                    </button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#4f46e5] rounded-full opacity-50 blur-3xl"></div>
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#9ef65c]/20 rounded-full blur-2xl"></div>
                </div>
              </section>
            </div>
          )}

        </main>

        {/* Product Detail Quick View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center" onClick={() => setSelectedProduct(null)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-100 transition-opacity" />
            <div
              className="relative w-full max-w-md mx-auto bg-white sm:rounded-[2rem] rounded-t-[2rem] p-0 animate-fade-up overflow-hidden max-h-[90vh] flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-64 bg-surface-container-high flex shrink-0 items-center justify-center overflow-hidden">
                <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" unoptimized />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-black text-[#191c1e] leading-tight mb-1">{selectedProduct.name}</h2>
                    <span className="inline-block bg-surface-container-high text-[#464555] text-xs px-2 py-0.5 rounded-full font-medium">{selectedProduct.cat}</span>
                  </div>
                  <p className="text-2xl font-black text-primary ml-4">{formatRupiah(selectedProduct.price)}</p>
                </div>
                <div className="w-full h-px bg-outline-variant/20 mb-4"></div>
                <p className="text-sm text-[#464555] leading-relaxed">
                  Produk spesial dari Kue Bunda dengan bahan-bahan premium dan resep rahasia keluarga. Cocok untuk dinikmati bersama secangkir teh hangat atau sebagai bingkisan manis untuk orang tersayang.
                </p>
              </div>
              
              <div className="p-4 border-t border-outline-variant/20 bg-white shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
                <button 
                  onClick={() => {
                    addToCart(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center" onClick={() => setShowCheckout(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-md mx-auto bg-white sm:rounded-[2rem] rounded-t-[2rem] p-6 pb-10 animate-fade-up max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex justify-center mb-6 shrink-0">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between mb-6 shrink-0">
                  <h3 className="text-xl font-extrabold text-[#191c1e] tracking-tight">Checkout Pesanan</h3>
                  <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-black">
                      <span className="material-symbols-outlined">close</span>
                  </button>
              </div>

              {cartItems.length === 0 ? (
                  <div className="text-center py-10 opacity-60">
                      <span className="material-symbols-outlined text-5xl mb-2">production_quantity_limits</span>
                      <p className="font-medium text-sm">Keranjang Anda masih kosong</p>
                  </div>
              ) : (
                  <>
                  <div className="overflow-y-auto pr-2 hide-scrollbar flex-1 mb-2">
                    <h4 className="font-bold text-[13px] text-gray-500 mb-3 uppercase tracking-wider">Daftar Item</h4>
                    <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image src={item.img} width={48} height={48} className="rounded-lg object-cover shrink-0" alt={item.name} unoptimized />
                            <div>
                                <p className="font-bold text-sm text-[#191c1e] line-clamp-1">{item.name}</p>
                                <p className="text-xs text-[#464555]">{formatRupiah(item.price)} <span className="font-bold text-primary">× {item.qty}</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 ml-2">
                            <span className="font-bold text-sm text-[#191c1e]">{formatRupiah(item.price * item.qty)}</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-error bg-error/10 w-6 h-6 rounded-full flex items-center justify-center hover:bg-error/20 transition-colors">
                            <span className="material-symbols-outlined text-[14px]">remove</span>
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>

                    <h4 className="font-bold text-[13px] text-gray-500 mb-3 uppercase tracking-wider">Informasi Pengiriman</h4>
                    <div className="space-y-3 mb-4">
                        <input type="text" placeholder="Nama Lengkap *" value={checkoutForm.name} onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-[#191c1e] transition-all" />
                        <input type="tel" placeholder="Nomor WhatsApp *" value={checkoutForm.phone} onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-[#191c1e] transition-all" />
                        <textarea placeholder="Alamat Pengiriman Lengkap *" rows={2} value={checkoutForm.address} onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-[#191c1e] transition-all resize-none"></textarea>
                        <input type="text" placeholder="Catatan (Opsional)" value={checkoutForm.notes} onChange={e => setCheckoutForm({...checkoutForm, notes: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-[#191c1e] transition-all" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-4 border-t border-outline-variant/20 mb-4 shrink-0 mt-2">
                  <span className="font-bold text-[#191c1e]">Total Bayar</span>
                  <span className="text-xl font-black text-primary">{formatRupiah(totalPrice)}</span>
                  </div>
                  <button
                  onClick={checkoutToWA}
                  className="w-full bg-[#128C7E] text-white py-4 rounded-full font-extrabold text-[15px] shadow-xl shadow-[#128C7E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
                  disabled={!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address}
                  >
                  <WhatsAppIcon className="w-5 h-5" />
                  Checkout via WhatsApp
                  </button>
                  <p className="text-center text-xs text-[#464555] mt-4 shrink-0">
                  Pesanan beserta info pengiriman akan otomatis dikirim ke WhatsApp toko
                  </p>
                  </>
              )}
            </div>
          </div>
        )}

        {/* Promo Modal (Asterisk) */}
        {showPromoModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowPromoModal(false)}></div>
            <div className="relative w-full max-w-[400px] bg-white rounded-[2rem] p-8 text-[#191c1e] shadow-2xl animate-fade-down z-10 overflow-hidden border border-outline-variant/20">
              <button onClick={() => setShowPromoModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black z-20">
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="w-12 h-12 mb-5 rounded-xl bg-surface-container-low flex items-center justify-center shadow-sm">
                <Image src="/logo-katalogku.svg" alt="Katalogku" width={28} height={28} className="object-contain" unoptimized />
              </div>
              <h2 className="text-[28px] font-black leading-tight mb-3 text-[#191c1e] tracking-tight">
                Satu Link Bio untuk Katalog UMKM.
              </h2>
              <p className="font-medium text-[13px] text-gray-500 mb-6 leading-relaxed">Satu link untuk membagikan, mengkurasi, dan menjual produk Anda di Instagram, TikTok, dan seluruh jaringan sosial Anda.</p>
              <div className="flex bg-surface-container-low rounded-xl p-2 mb-4 ring-1 ring-outline-variant/30 relative z-20 focus-within:ring-2 focus-within:ring-[#4f46e5] transition-all">
                <span className="text-gray-400 pl-3 py-2 font-medium">katalogku.com/</span>
                <input type="text" placeholder="tokamu" className="flex-1 bg-transparent px-2 font-bold focus:outline-none text-[#191c1e]" />
              </div>
              <button className="relative z-20 bg-[#4f46e5] text-white px-6 py-4 rounded-full font-bold w-full mb-8 shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex justify-center">
                Klaim Katalogku
              </button>
              <div className="text-sm font-bold space-y-3 text-gray-500 relative z-20">
                <p><button onClick={() => { setShowPromoModal(false); setShowSubscribeModal(true); }} className="hover:text-[#4f46e5] transition-colors">Berlangganan dengan @{params.username}</button></p>
                <p><a href="#" className="hover:text-[#4f46e5] transition-colors">Pelajari Katalogku lebih lanjut</a></p>
              </div>
              {/* Graphic element */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>
        )}

        {/* Subscribe Modal */}
        {showSubscribeModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowSubscribeModal(false)} />
            <div className="relative w-full max-w-md bg-white rounded-[2rem] p-8 animate-fade-down z-10 flex flex-col items-center text-center shadow-2xl">
              <button onClick={() => setShowSubscribeModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                <span className="material-symbols-outlined">close</span>
              </button>
              <Image src={storeData.profile} width={80} height={80} className="rounded-full border-4 border-white shadow-xl mb-4 object-cover" alt="Profile" unoptimized />
              <h2 className="text-2xl font-black mb-2 text-[#191c1e]">Langganan ke {storeData.name}</h2>
              <p className="text-gray-500 text-sm mb-8 px-4 leading-relaxed">Anda akan diberitahu ketika {storeData.name} membagikan produk atau penawaran terbaru.</p>
              
              <div className="w-full bg-surface-container-high rounded-xl p-2 mb-4 ring-1 ring-outline-variant/30 focus-within:ring-2 focus-within:ring-primary transition-all">
                <input type="email" placeholder="Email Anda" className="w-full bg-transparent px-4 py-3 outline-none font-medium text-center" />
              </div>
              
              <div className="flex items-start gap-3 w-full mb-8 text-left mt-2 px-1">
                <input type="checkbox" className="mt-1 w-4 h-4 cursor-pointer accent-black" id="subscribe-check" />
                <label htmlFor="subscribe-check" className="text-xs text-gray-500 leading-tight flex-1 cursor-pointer">
                  Saya setuju detail kontak saya dibagikan dengan {storeData.name}, yang mungkin menghubungi saya mengenai promo. (Opsional)
                </label>
              </div>
              <button className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                Langganan
              </button>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowShareModal(false)} />
            <div className="relative w-full max-w-[440px] bg-white rounded-[2rem] p-8 animate-fade-down z-10 flex flex-col items-center shadow-2xl">
              <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                <span className="material-symbols-outlined">close</span>
              </button>
              <h3 className="font-extrabold mb-8 text-[#191c1e] tracking-tight">Bagikan Katalogku</h3>
              
              <div className="bg-surface-container-low w-full rounded-3xl p-6 flex flex-col justify-center items-center mb-8 shadow-inner ring-1 ring-outline-variant/20 relative overflow-hidden">
                 <Image src={storeData.profile} width={96} height={96} className="rounded-full border-4 border-white shadow-xl mb-4 object-cover relative z-10" alt="Profile" unoptimized />
                 <h2 className="text-2xl font-black mb-1 text-[#191c1e] relative z-10">@{params.username}</h2>
                 <p className="text-xs font-bold text-gray-500 bg-white px-4 py-2 mt-2 rounded-full ring-1 ring-outline-variant/20 shadow-sm flex items-center gap-1.5 relative z-10">
                   <Image src="/logo-katalogku.svg" alt="Katalogku" width={14} height={14} className="object-contain" unoptimized /> katalogku.com/{params.username}
                 </p>
                 <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
              </div>
              
              <div className="flex gap-4 w-full justify-center overflow-x-auto pb-2 hide-scrollbar">
                {[
                  { id: 'copy', label: 'Salin Link', color: 'bg-gray-100 text-[#191c1e] hover:bg-gray-200 ring-1 ring-gray-200', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> },
                  { id: 'wa', label: 'WhatsApp', color: 'bg-[#25D366] text-white hover:bg-[#20b858]', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01h-.002c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.994 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.277c-1.571 0-3.111-.408-4.464-1.183l-.32-.184-3.32.871.886-3.235-.202-.322A8.258 8.258 0 0 1 3.717 12a8.277 8.277 0 1 1 8.277 8.277z"/></svg> },
                  { id: 'fb', label: 'Facebook', color: 'bg-[#1877F2] text-white hover:bg-[#166fe5]', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                  { id: 'x', label: 'X', color: 'bg-black text-white hover:bg-gray-900', svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                ].map(btn => (
                  <button key={btn.id} className="flex flex-col items-center gap-3 min-w-[70px] group">
                    <div className={`w-14 h-14 ${btn.color} rounded-full flex items-center justify-center shadow-lg group-active:scale-95 transition-all`}>
                      {btn.svg}
                    </div>
                    <span className="text-xs font-bold text-gray-600 group-hover:text-black">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating Cart Access */}
        {totalItems > 0 && (
          <button 
            onClick={() => setShowCheckout(true)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white pl-5 pr-6 py-3.5 rounded-full font-bold shadow-[0px_20px_40px_rgba(77,68,227,0.3)] hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 animate-fade-up"
          >
            <span className="material-symbols-outlined rounded-full flex items-center justify-center">shopping_cart</span>
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[10px] opacity-80 mb-0.5 tracking-wider uppercase">Lihat Pesanan</span>
              <span className="text-sm font-black tracking-tight">{totalItems} Item • {formatRupiah(totalPrice)}</span>
            </div>
          </button>
        )}

      </div> {/* End Center Card Container */}

    </div> /* End Screen Wrapper */
  );
}

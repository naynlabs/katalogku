"use client";

import { useState } from "react";
import Link from "next/link";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons";

const storeData = {
  name: "Butik Clarissa",
  tagline: "Fashion & Lifestyle Modern untuk Wanita Indonesia",
  wa: "+6281234567890",
  links: [
    { icon: <InstagramIcon className="w-5 h-5" />, label: "Follow Instagram", url: "#" },
    { icon: <TikTokIcon className="w-5 h-5" />, label: "TikTok Kami", url: "#" },
    { icon: "local_shipping", label: "Info Pengiriman", url: "#" },
  ],
  categories: ["Semua", "Fashion", "Aksesoris", "Kecantikan"],
  products: [
    { id: 1, name: "Summer Oversized Tee", price: 189000, cat: "Fashion" },
    { id: 2, name: "Nordic Minimalist Watch", price: 725000, cat: "Aksesoris" },
    { id: 3, name: "Glow Essentials Set", price: 450000, cat: "Kecantikan" },
    { id: 4, name: "Air Speed Runner X", price: 1200000, cat: "Fashion" },
    { id: 5, name: "Beige Blazer Pro", price: 512000, cat: "Fashion" },
    { id: 6, name: "Rose Gold Earrings", price: 195000, cat: "Aksesoris" },
  ],
};

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function StorefrontPage({ params }: { params: { username: string } }) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filtered = activeCategory === "Semua"
    ? storeData.products
    : storeData.products.filter((p) => p.cat === activeCategory);

  const cartItems = cart.map((c) => {
    const product = storeData.products.find((p) => p.id === c.id)!;
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
    const lines = cartItems.map((c) => `• ${c.name} x${c.qty} = ${formatRupiah(c.price * c.qty)}`);
    const msg = `Halo ${storeData.name}! 🛍️\n\nSaya ingin memesan:\n${lines.join("\n")}\n\n*Total: ${formatRupiah(totalPrice)}*\n\nTerima kasih!`;
    const url = `https://wa.me/${storeData.wa.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Store Header */}
      <div className="bg-gradient-to-br from-primary to-primary-container pt-12 pb-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <Link href="/" className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4 block">
          Katalogku
        </Link>
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mx-auto mb-4 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-4xl">storefront</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">{storeData.name}</h1>
        <p className="text-white/80 text-sm mt-1 max-w-xs mx-auto">{storeData.tagline}</p>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-10 relative z-10">
        {/* Link Buttons */}
        <div className="space-y-3 mb-8">
          {storeData.links.map((link) => (
            <a key={link.label} href={link.url} className="flex items-center gap-3 bg-surface-container-lowest p-4 rounded-2xl ghost-border shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {typeof link.icon === "string" ? <span className="material-symbols-outlined text-xl">{link.icon}</span> : link.icon}
              </div>
              <span className="font-bold text-on-surface text-sm">{link.label}</span>
              <span className="material-symbols-outlined text-on-surface-variant ml-auto text-xl">arrow_forward</span>
            </a>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-6">
          {storeData.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid (2 cols on mobile) */}
        <div className="grid grid-cols-2 gap-4 mb-32">
          {filtered.map((p) => {
            const inCart = cart.find((c) => c.id === p.id);
            return (
              <div key={p.id} className="bg-surface-container-lowest rounded-2xl ghost-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer" onClick={() => setSelectedProduct(p)}>
                <div className="relative focus:outline-none focus:ring-2 focus:ring-primary rounded-t-2xl">
                  <div className="aspect-square bg-surface-container-low flex items-center justify-center overflow-hidden">
                    <span className="material-symbols-outlined text-outline/30 text-5xl group-hover:scale-110 transition-transform duration-500">image</span>
                  </div>
                  <div className="p-3 pb-1">
                    <h3 className="font-bold text-sm text-on-surface leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-primary font-extrabold text-sm mb-2">{formatRupiah(p.price)}</p>
                  </div>
                </div>
                <div className="px-3 pb-3 mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p.id);
                    }}
                    className={`w-full py-2 rounded-full text-xs font-bold transition-all ${
                      inCart
                        ? "bg-secondary-container text-on-secondary-container"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {inCart ? `✓ Ditambahkan (${inCart.qty})` : "Tambah"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-4 z-50">
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full max-w-md mx-auto flex items-center justify-between bg-primary-gradient text-white py-4 px-6 rounded-full font-bold shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-black">
                {totalItems}
              </div>
              <span>Lihat Keranjang</span>
            </div>
            <span className="font-extrabold">{formatRupiah(totalPrice)}</span>
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center" onClick={() => setShowCheckout(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-surface-container-lowest rounded-t-[2rem] p-6 pb-10 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-outline-variant/50 rounded-full mx-auto mb-6" />
            <h3 className="text-xl font-extrabold text-on-surface mb-6">Ringkasan Pesanan</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-on-surface">{item.name}</p>
                    <p className="text-xs text-on-surface-variant">{formatRupiah(item.price)} × {item.qty}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">{formatRupiah(item.price * item.qty)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-error">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center py-4 border-t border-outline-variant/20 mb-6">
              <span className="font-bold text-on-surface">Total</span>
              <span className="text-xl font-black text-primary">{formatRupiah(totalPrice)}</span>
            </div>
            <button
              onClick={checkoutToWA}
              className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-full font-extrabold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Pesan via WhatsApp
            </button>
            <p className="text-center text-xs text-on-surface-variant mt-4">
              Pesanan akan dikirim langsung ke WhatsApp penjual
            </p>
          </div>
        </div>
      )}

      {/* Product Detail Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center" onClick={() => setSelectedProduct(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-white sm:rounded-[2rem] rounded-t-[2rem] p-0 animate-fade-up overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-square bg-surface-container-high flex shrink-0 items-center justify-center">
              <span className="material-symbols-outlined text-outline/30 text-6xl">image</span>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-4">
                <h2 className="text-xl font-black text-on-surface leading-tight mb-2">{selectedProduct.name}</h2>
                <p className="text-2xl font-black text-primary">{formatRupiah(selectedProduct.price)}</p>
              </div>
              <div className="w-full h-px bg-outline-variant/20 mb-4"></div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Detail produk lengkap dan gambar-gambar menarik akan muncul di sini. 
                Produk ini termasuk dalam kategori <b>{selectedProduct.cat}</b> dan merupakan salah satu produk terbaik kami.
              </p>
            </div>
            
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest shrink-0">
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
    </div>
  );
}

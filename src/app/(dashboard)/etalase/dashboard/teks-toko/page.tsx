"use client";

import { useState } from "react";

export default function TeksTokoPage() {
  const [waTemplate, setWaTemplate] = useState(
    "Halo {{nama_toko}}! 🛍️\n\nSaya tertarik dan ingin memesan:\n{{daftar_produk}}\n\n*Total Belanja: {{total_harga}}*\n\nApakah stoknya masih tersedia? Terima kasih!"
  );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Teks & Copywriting
          </h2>
          <p className="text-on-surface-variant text-sm">
            Kustomisasi setiap kata, tombol, dan templat WhatsApp yang dilihat oleh pelanggan Anda.
          </p>
        </div>
        <button className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-transform flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">save</span>
          Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
        
        {/* Kolom Kiri: Form Editor */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Section 1: Template WhatsApp */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-green-500 text-3xl">mark_chat_read</span>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Templat Pesan WhatsApp</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Pesan otomatis yang akan dikirim pembeli ke WA Anda saat mereka menekan tombol Checkout.</p>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Editor Format Pesan</label>
              <textarea 
                value={waTemplate}
                onChange={(e) => setWaTemplate(e.target.value)}
                rows={7} 
                className="w-full bg-surface-container-low border-2 border-transparent focus:bg-white focus:border-green-500 rounded-xl px-4 py-3 text-on-surface text-sm transition-colors outline-none resize-y"
              ></textarea>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
              <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">code</span>
                Parameter Dinamis (Bisa diselipkan ke dalam teks)
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white border border-green-200 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-md cursor-help transition-colors">{`{{nama_toko}}`}</span>
                <span className="bg-white border border-green-200 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-md cursor-help transition-colors">{`{{daftar_produk}}`}</span>
                <span className="bg-white border border-green-200 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-md cursor-help transition-colors">{`{{total_harga}}`}</span>
                <span className="bg-white border border-green-200 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-md cursor-help transition-colors">{`{{total_barang}}`}</span>
              </div>
            </div>
          </section>

          {/* Section 2: Copywriting Tombol-tombol */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">smart_button</span>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Bahasa Antarmuka (Tombol)</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Ubah ajakan bertindak (CTA) pada toko Anda agar lebih personal.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2">Tombol "Tambah Produk"</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">add_shopping_cart</span>
                  <input type="text" defaultValue="Tambah" className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary rounded-xl pl-10 pr-4 py-3 min-h-[48px] text-sm font-bold text-on-surface transition-colors outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2">Tombol "Produk Sudah Masuk"</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">check_circle</span>
                  <input type="text" defaultValue="✓ Ditambahkan" className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary rounded-xl pl-10 pr-4 py-3 min-h-[48px] text-sm font-bold text-on-surface transition-colors outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2">Teks Floating Cart (Penuh)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">shopping_bag</span>
                  <input type="text" defaultValue="Lihat Keranjang" className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary rounded-xl pl-10 pr-4 py-3 min-h-[48px] text-sm font-bold text-on-surface transition-colors outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2">Tombol Pemesanan Terakhir</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">send</span>
                  <input type="text" defaultValue="Pesan via WhatsApp" className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary rounded-xl pl-10 pr-4 py-3 min-h-[48px] text-sm font-bold text-on-surface transition-colors outline-none" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Teks Kosong & Footer */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-warning text-3xl">info</span>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Pesan Singkat Lainnya</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Teks kecil namun krusial di seluruh pengalaman belanja pelanggan.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2">Catatan Keranjang Belanja</label>
                <input type="text" defaultValue="Pesanan akan dikirim langsung ke WhatsApp penjual" className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary rounded-xl px-4 py-3 min-h-[48px] text-sm font-medium text-on-surface transition-colors outline-none" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2">Detail Kosong (Placeholder)</label>
                <input type="text" defaultValue="Belanjaan belum ada, mulai tambahkan keranjang Anda." className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary rounded-xl px-4 py-3 min-h-[48px] text-sm font-medium text-on-surface transition-colors outline-none" />
              </div>
            </div>
          </section>

        </div>

        {/* Kolom Kanan: Pratinjau Teks (Live Preview Chat) */}
        <div className="xl:col-span-4 lg:hidden xl:block">
          <div className="sticky top-8">
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20 tonal-depth mb-6">
              <h4 className="font-bold text-on-surface text-sm mb-4">Pratinjau Hasil Tatanan Tombol</h4>
              <button className="w-full bg-primary text-white py-3 rounded-full font-bold shadow-md shadow-primary/20 flex items-center justify-center gap-2 mb-3 text-sm">
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                Tambah
              </button>
              <button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-full font-bold shadow-sm shadow-secondary-container/20 flex items-center justify-center gap-2 text-sm">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                ✓ Ditambahkan
              </button>
            </div>

            <p className="text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Pratinjau Ke Ponsel Pelanggan</p>
            <div className="border-[6px] border-[#128C7E] rounded-[2.5rem] w-[320px] h-[480px] bg-[#E5DDD5] mx-auto overflow-hidden shadow-2xl relative flex flex-col">
              
              {/* WA Header */}
              <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shadow-md z-10">
                <span className="material-symbols-outlined text-white/90">arrow_back</span>
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[20px]">store</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-sm truncate leading-tight">Admin Butik Clarissa</h4>
                  <p className="text-[10px] text-white/80">Online</p>
                </div>
              </div>
              
              {/* Chat Canvas */}
              <div className="flex-1 p-4 overflow-y-auto bg-[url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')] bg-cover relative">
                 <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
                 {/* Chat Bubble (User) */}
                 <div className="relative z-10 mb-4 flex justify-end animate-fade-up">
                    <div className="bg-[#DCF8C6] text-[#303030] p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-[13px] leading-relaxed relative">
                      {/* Tanda Ekor Bubble */}
                      <svg viewBox="0 0 8 13" width="8" height="13" className="absolute top-0 -right-[7px] text-[#DCF8C6] fill-current">
                          <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
                          <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
                      </svg>
                      {/* Isi Pesan (Simulasi) */}
                      <div className="whitespace-pre-wrap font-medium">
                        {waTemplate
                          .replace("{{nama_toko}}", "Butik Clarissa")
                          .replace("{{daftar_produk}}", "• 1x Glow Essentials (Rp 450.000)\n• 2x Summer Tee (Rp 378.000)")
                          .replace("{{total_harga}}", "Rp 828.000")
                          .replace("{{total_barang}}", "3 Barang")}
                      </div>
                      <div className="text-[10px] text-gray-500 text-right mt-1.5 flex justify-end items-center gap-1">
                        10:45 <span className="material-symbols-outlined text-[14px] text-blue-500">done_all</span>
                      </div>
                    </div>
                 </div>
              </div>

              {/* WA Input Bar */}
              <div className="bg-[#F0F0F0] p-2 py-3 flex items-center gap-2 relative z-10">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                </div>
                <div className="flex-1 bg-white rounded-full px-4 py-2 text-[13px] text-gray-400 font-medium">
                  Ketik pesan
                </div>
                <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[18px]">mic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

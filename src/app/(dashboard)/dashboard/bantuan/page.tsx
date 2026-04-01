"use client";

import { useState } from "react";

export default function BantuanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { 
      q: "Bagaimana cara menambahkan produk ke katalog?", 
      a: "Buka menu 'Katalog', lalu klik tombol biru 'Tambah Produk' di sebelah pojok kanan atas. Isi nama produk, unggah foto, pasang harga, lalu tekan Simpan. Secara otomatis, tautan produk tersebut akan langsung terbentuk di halaman Link-in-Bio Anda." 
    },
    { 
      q: "Apakah pelanggan bisa langsung checkout/membayar di website?", 
      a: "Saat ini, Katalogku dikhususkan sebagai kurator digital (Micro-storefront). Pelanggan Anda tidak bertransaksi memakai saldo/kartu kredit di aplikasi kami, melainkan akan diarahkan langsung menuju nomor WhatsApp Anda saat menekan tombol pesan agar Anda terbebas dari potongan biaya admin platform." 
    },
    { 
      q: "Cara mengganti foto profil toko?", 
      a: "Silakan buka menu 'Tampilan' pada Sidebar sebelah kiri. Di sana, Anda akan menemukan bagian 'Profil Halaman (Header)'. Anda bebas mengunggah Logo yang akan ditampilkan secara publik." 
    },
    { 
      q: "Apakah link Katalogku bisa dipasang di Instagram dan TikTok?", 
      a: "Sangat Bisa! Cukup salin tautan toko Anda (contoh: katalogku.com/tokosaya) dan tempel ke kolom 'Website' saat mengedit profil di Instagram, TikTok, Twitter, maupun status WhatsApp." 
    },
    { 
      q: "Bagaimana cara membaca laporan Analitik Toko?", 
      a: "Navigasi ke menu 'Analitik'. Grafik akan menampilkan arus lalu lintas kunjungan toko Anda per hari. Anda bisa tahu produk mana saja yang paling banyak di-klik menuju WhatsApp melalui laporan produk terlaris." 
    }
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Pusat Bantuan
          </h2>
          <p className="text-on-surface-variant text-sm">
            Kendala atau butuh panduan? Kami hadir untuk membantu kesuksesan toko Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Main FAQ & Help Guides */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Pencarian Cepat */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant text-[28px]">search</span>
            <input 
              type="text" 
              placeholder="Cari solusi masalah Anda di sini (mis: Cara ganti harga)..." 
              className="w-full bg-white border-2 border-outline-variant/30 focus:border-primary rounded-full pl-16 pr-6 py-5 text-on-surface font-medium outline-none shadow-[0px_10px_30px_rgba(0,0,0,0.03)] transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm">Cari</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform">rocket_launch</span>
              <h4 className="font-bold text-on-surface mb-1">Memulai</h4>
              <p className="text-xs text-on-surface-variant">Panduan dasar mengatur toko pertama Anda.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform">inventory_2</span>
              <h4 className="font-bold text-on-surface mb-1">Manajemen Produk</h4>
              <p className="text-xs text-on-surface-variant">Cara edit, hapus, dan atur katalog harga.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform">support</span>
              <h4 className="font-bold text-on-surface mb-1">Kendala Teknis</h4>
              <p className="text-xs text-on-surface-variant">Solusi saat website lambat atau error.</p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <section className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/20 tonal-depth">
            <h3 className="text-xl font-black text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">forum</span>
              Pertanyaan Sering Diajukan
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border-2 rounded-2xl transition-all duration-300 overflow-hidden ${
                    openFaq === index ? "border-primary bg-primary/5 shadow-md" : "border-outline-variant/20 bg-white hover:border-outline-variant/50"
                  }`}
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center p-5 text-left"
                  >
                    <span className="font-bold text-on-surface text-[15px]">{faq.q}</span>
                    <span className={`material-symbols-outlined text-outline transition-transform duration-300 ${openFaq === index ? "rotate-180 text-primary" : ""}`}>
                      keyboard_arrow_down
                    </span>
                  </button>
                  <div 
                    className={`px-5 overflow-hidden transition-all duration-300 ${openFaq === index ? "pb-5 max-h-40 opacity-100" : "max-h-0 pb-0 opacity-0"}`}
                  >
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Kolom Kanan: Bantuan Langsung */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-primary to-primary-container text-white p-8 rounded-3xl shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-white/10">
                <span className="material-symbols-outlined text-white text-3xl">headset_mic</span>
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">Butuh Bantuan Cepat?</h3>
              <p className="text-primary-fixed text-sm mb-6 leading-relaxed">
                Tim Support kami bersedia membalas obrolan maupun email di jam operasional (09.00 - 18.00 WIB).
              </p>
              <button className="w-full py-3.5 bg-white text-primary rounded-full font-bold shadow-lg hover:bg-surface-container-lowest hover:scale-[1.02] active:scale-95 transition-all text-sm mb-3 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">chat</span> Chat Tim Kami (WA)
              </button>
              <button className="w-full py-3.5 bg-primary-fixed/20 text-white border border-white/20 rounded-full font-bold hover:bg-primary-fixed/30 transition-all text-sm flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">mail</span> Kirim Email
              </button>
            </div>
            
            {/* Dekorasi Air Mancur Latar */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4"></div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 tonal-depth text-center">
            <span className="material-symbols-outlined text-outline mb-2 text-3xl">library_books</span>
            <h4 className="font-bold text-on-surface mb-2">Baca Panduan Lengkap</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">Jelajahi dokumentasi lengkap kami tentang fitur Pro, Integrasi Piksel, hingga Custom Domain.</p>
            <button className="text-primary font-bold text-sm bg-primary/10 px-6 py-2.5 rounded-full hover:bg-primary/20 transition-colors w-full">
              Buka Dokumentasi &rarr;
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

import React from "react";

export default function PengaturanPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Pengaturan Toko
          </h2>
          <p className="text-on-surface-variant text-sm">
            Kelola identitas, pembatasan konten, SEO, dan pelacakan Analytics.
          </p>
        </div>
        <button className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-transform flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">save</span>
          Simpan Semua
        </button>
      </div>

      <div className="space-y-8 pb-10">
        {/* 1. Profil Toko */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-3xl">account_circle</span>
              <h3 className="text-xl font-bold">Profil Toko</h3>
            </div>
            <p className="text-on-surface-variant text-sm pr-4">
              Informasi ini akan ditampilkan ke ranah publik secara langsung.
              Harap berhati-hati atas apa yang Anda bagikan.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2">
                Nama Toko / Etalase
              </label>
              <input
                type="text"
                defaultValue="NaynLabs"
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white rounded-full px-6 py-3.5 text-on-surface font-medium transition-all outline-none"
              />
              <p className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-2 px-2">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Mengubah nama tampilan di bio, tapi URL kamu tetap <span className="font-bold">katalogku.id/...</span>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2">
                Bio / Keterangan Singkat
              </label>
              <textarea
                placeholder="Ceritakan singkat tentang brand Anda..."
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white rounded-[2rem] px-6 py-4 text-on-surface font-medium transition-all outline-none h-28 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2">
                Logo / Foto Profil
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border-2 border-outline-variant/20 overflow-hidden relative group cursor-pointer">
                  <span className="material-symbols-outlined text-outline-variant text-3xl group-hover:hidden">image</span>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center hidden group-hover:flex">
                    <span className="material-symbols-outlined text-white text-xl">upload</span>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-surface-container-low hover:bg-surface-container-high rounded-full font-bold text-sm text-on-surface-variant transition-colors group flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  Pilih Foto
                </button>
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-6 space-y-4">
              <div className="bg-surface-container-low p-4 rounded-full flex items-center justify-between group overflow-hidden relative border border-transparent hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 relative z-10 px-2 opacity-80">
                  <span className="font-bold text-sm text-on-surface">Tampilkan lencana verifikasi</span>
                  <span className="material-symbols-outlined text-blue-500 text-[18px]">verified</span>
                </div>
                <button className="relative z-10 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  Upgrade Pro
                </button>
              </div>
              <div className="bg-surface-container-low p-4 rounded-full flex items-center justify-between group overflow-hidden relative border border-transparent hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 relative z-10 px-2 opacity-80">
                  <span className="font-bold text-sm text-on-surface">Hilangkan *watermark* Katalogku</span>
                </div>
                <button className="relative z-10 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  Upgrade Pro
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Konten Sensitif */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-3xl text-warning">gpp_maybe</span>
              <h3 className="text-xl font-bold">Peringatan Konten</h3>
            </div>
            <p className="text-on-surface-variant text-sm pr-4">
              Aktifkan opsi ini untuk menyembunyikan etalase dibalik layar peringatan 18+. Berguna jika Anda menjual produk untuk kalangan dewasa.
            </p>
          </div>
          <div className="lg:col-span-8">
            <label className="block text-xs font-bold text-on-surface-variant mb-2">
              Jenis Konten Etalase
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white rounded-full px-6 py-3.5 text-on-surface font-medium transition-all outline-none cursor-pointer">
                <option value="none">Tidak ada (Aman untuk Semua Umur)</option>
                <option value="adult">Usia 18+ (Kategori Dewasa)</option>
                <option value="sensitive">Materi Sensitif & Graphic</option>
              </select>
              <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                keyboard_arrow_down
              </span>
            </div>
          </div>
        </section>

        {/* 3. SEO Content */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-3xl">travel_explore</span>
              <h3 className="text-xl font-bold">Optimasi SEO</h3>
            </div>
            <p className="text-on-surface-variant text-sm pr-4">
              Data ini digunakan untuk mendongkrak peringkat etalase Anda di Google dan platform sosial media.
            </p>
          </div>
          <div className="lg:col-span-8 relative">
            <div className="relative bg-surface p-6 rounded-[2rem] border border-outline-variant/10 overflow-hidden">
              <div className="opacity-20 pointer-events-none blur-[2px] space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2">Judul Halaman Pribadi</label>
                  <input type="text" disabled className="w-full bg-surface-container-low rounded-full px-6 py-3.5" value="Katalog Utama NaynLabs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2">Meta Deskripsi Spesifik</label>
                  <textarea disabled className="w-full bg-surface-container-low rounded-xl px-6 py-3.5 h-20"></textarea>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white/30 to-white/90 backdrop-blur-[1px]">
                <div className="bg-white p-3 rounded-full mb-3 shadow-md">
                  <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                </div>
                <h4 className="font-bold text-on-surface mb-1">Khusus Tipe Pro</h4>
                <p className="text-xs text-on-surface-variant mb-4 text-center">Fitur SEO kustom hanya tersedia di paket berbayar.</p>
                <button className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  Upgrade & Buka Fitur
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Eksternal Pixel Trackers */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/20 tonal-depth grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-3xl">analytics</span>
              <h3 className="text-xl font-bold">Pelacak Pixel</h3>
            </div>
            <p className="text-on-surface-variant text-sm pr-4">
              Amati perilaku pengunjung untuk konversi iklan spesifik pada retargeting kampanye Anda.
            </p>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Google Analytics */}
            <div className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="flex items-center gap-4 opacity-50 relative z-10 w-full md:w-auto">
                <span className="material-symbols-outlined text-4xl">pie_chart</span>
                <div>
                  <h4 className="font-bold text-on-surface">Google Analytics 4</h4>
                  <p className="text-xs text-on-surface-variant">Lacak kunjungan harian & flow demografi.</p>
                </div>
              </div>
              <button className="w-full md:w-auto shrink-0 relative z-10 bg-primary/90 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow hover:bg-primary transition-colors flex justify-center items-center gap-2 border border-primary-container/20">
                <span className="material-symbols-outlined text-[16px]">lock_open</span> Buka Pro
              </button>
            </div>

            {/* TikTok Pixel */}
            <div className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="flex items-center gap-4 opacity-50 relative z-10 w-full md:w-auto">
                <span className="material-symbols-outlined text-4xl">smart_display</span>
                <div>
                  <h4 className="font-bold text-on-surface">TikTok Pixel</h4>
                  <p className="text-xs text-on-surface-variant">Sinkronisasi konversi *Ads Manager* TikTok.</p>
                </div>
              </div>
              <button className="w-full md:w-auto shrink-0 relative z-10 bg-primary/90 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow hover:bg-primary transition-colors flex justify-center items-center gap-2 border border-primary-container/20">
                <span className="material-symbols-outlined text-[16px]">lock_open</span> Buka Pro
              </button>
            </div>

            {/* Meta Pixel */}
            <div className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="flex items-center gap-4 opacity-50 relative z-10 w-full md:w-auto">
                <span className="material-symbols-outlined text-4xl">all_inclusive</span>
                <div>
                  <h4 className="font-bold text-on-surface">Meta Pixel</h4>
                  <p className="text-xs text-on-surface-variant">Optimalisasi penargetan FB, Instagram & WA.</p>
                </div>
              </div>
              <button className="w-full md:w-auto shrink-0 relative z-10 bg-primary/90 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow hover:bg-primary transition-colors flex justify-center items-center gap-2 border border-primary-container/20">
                <span className="material-symbols-outlined text-[16px]">lock_open</span> Buka Pro
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

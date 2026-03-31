import Link from "next/link";

export default function TambahProdukPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/katalog"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </Link>
        <div>
          <h2 className="text-xl font-extrabold text-on-surface font-headline tracking-tight">
            Tambah Produk Baru
          </h2>
          <nav className="hidden md:flex gap-2 text-xs text-on-surface-variant font-medium mt-1">
            <Link href="/dashboard/katalog" className="hover:underline">
              Produk Saya
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">Entry Baru</span>
          </nav>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Media Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">
              Media Produk
            </h3>
            <div className="aspect-square rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-primary/5 transition-all group">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">
                  cloud_upload
                </span>
              </div>
              <p className="text-sm font-bold text-on-surface mb-1">Tarik foto ke sini</p>
              <p className="text-xs text-on-surface-variant">
                atau klik untuk memilih file dari perangkat Anda
              </p>
              <p className="mt-4 text-[10px] uppercase font-bold text-outline-variant px-3 py-1 bg-white rounded-full">
                JPG, PNG up to 10MB
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="aspect-square rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-outline-variant">add_a_photo</span>
              </div>
              <div className="aspect-square rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-outline-variant">add_a_photo</span>
              </div>
              <div className="aspect-square rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-outline-variant">add_a_photo</span>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">inventory_2</span>
                <span className="text-sm font-bold">Status Stok</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
            <p className="text-xs text-on-surface-variant">
              Nonaktifkan jika produk sedang tidak tersedia untuk sementara waktu.
            </p>
          </div>
        </div>

        {/* Right: Form Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Informasi Utama
            </h3>
            
            {/* Nama Produk */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant ml-1">Nama Produk</label>
              <input
                type="text"
                placeholder="Contoh: Kopi Susu Gula Aren 500ml"
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 placeholder:text-outline/60 text-sm font-medium outline-none"
              />
            </div>

            {/* Kategori & Harga Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Kategori</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-sm font-medium outline-none text-on-surface-variant">
                    <option>Pilih Kategori</option>
                    <option>Fashion</option>
                    <option>Aksesoris</option>
                    <option>Digital</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Harga Satuan</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-primary">Rp</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/40 placeholder:text-outline/60 text-sm font-bold outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant ml-1">Deskripsi Produk</label>
              <textarea
                placeholder="Ceritakan mengapa pelanggan harus membeli produk Anda..."
                rows={5}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 placeholder:text-outline/60 text-sm font-medium outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
            <div className="flex items-center gap-4 p-4 bg-secondary-container/20 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-secondary-container">
                  auto_awesome
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-secondary-container">
                  Tampilkan di Etalase Utama?
                </p>
                <p className="text-xs text-on-secondary-fixed-variant mt-1">
                  Produk unggulan akan disematkan di baris teratas etalase link bio Anda.
                </p>
              </div>
              <div className="ml-auto">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-secondary text-secondary focus:ring-secondary"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white/90 backdrop-blur-xl border-t border-outline-variant/10 px-6 py-4 flex items-center justify-between z-40">
        <Link
          href="/dashboard/katalog"
          className="px-6 py-3 text-sm font-bold text-on-surface-variant hover:text-error transition-colors"
        >
          Batal
        </Link>
        <div className="flex gap-4">
          <button className="hidden sm:block px-8 py-3 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-bold hover:bg-surface-container-highest transition-all">
            Simpan Sebagai Draft
          </button>
          <button className="px-10 py-3 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            Simpan Produk
          </button>
        </div>
      </div>
    </div>
  );
}

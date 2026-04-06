import Link from "next/link";

export default async function AdminProductViewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="space-y-8 pb-12">
      {/* Header & Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant font-medium mb-4">
        <Link href="/etalase/dashboard/katalog" className="hover:text-primary transition-colors">
          Produk Saya
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface">Detail Produk</span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface">
              Kursi Minimalis Scandi
            </h1>
            <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Aktif
            </span>
          </div>
          <p className="text-on-surface-variant font-medium">
            SKU: FUR-2024-001 • Terakhir diupdate 2 jam yang lalu
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none px-6 py-3 rounded-full border-2 border-outline-variant text-primary font-bold hover:bg-surface-container-low hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">visibility</span>
            Lihat Sebagai Pembeli
          </button>
          <Link
            href={`/etalase/dashboard/katalog/${params.id}/edit`}
            className="flex-1 md:flex-none px-8 py-3 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">edit</span>
            Edit Produk
          </Link>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Product Image & Stats */}
        <div className="lg:col-span-7 space-y-8">
          {/* Image Card */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] group ghost-border">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkWswVuhiLZx8K0ap9yQ3BpD6A7gOBuXlyTVvnpx6WYt0N8ztkMSdWzcl0NuuvZYP2oSZtbs9cr8QJlXY7l5nNSVoL6Y93S7VsPLHwZfbXx10CW8eLtQk_zxmSVZOxPDcyTEzgfF0bR0UJkwWpNZW5tDxqgQi_hbuE2nXgPqkBtRdfs7PrYVDkmxOBlD2vk3u9JpulbnZCwUvOn_PatLVihyDWdqks_XdHVP3BVnLgammsJyudXzxwGdCDvZ1LI8oLQrZSWP3v4-8t"
                alt="Product Main View"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-primary hover:bg-white hover:scale-110 transition-all">
                  <span className="material-symbols-outlined">zoom_in</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mini Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border p-6 rounded-xl flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary text-2xl">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Views</p>
                <p className="text-3xl font-black">1,284</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border p-6 rounded-xl flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary-fixed-variant text-2xl">
                <span className="material-symbols-outlined shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Klik Link</p>
                <p className="text-3xl font-black">42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Price & Category Card */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border space-y-8">
            <div>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-2">Harga Jual</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary">Rp 1.450.000</span>
                <span className="text-on-surface-variant line-through font-bold text-lg">Rp 1.800.000</span>
              </div>
            </div>
            <div className="h-px bg-outline-variant/20 w-full"></div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Kategori</p>
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-4 py-1 rounded-full text-xs font-extrabold hover:scale-105 transition-transform cursor-pointer">
                  Furniture
                </span>
              </div>
              <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Stok Saat Ini</p>
                <span className="text-on-surface font-black">12 Unit</span>
              </div>
              <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Aksi Tambahan</p>
                <button className="text-primary hover:underline font-bold text-sm">Lihat Analitik Detail</button>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
            <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span>
              Deskripsi Produk
            </h3>
            <div className="text-on-surface-variant leading-relaxed font-medium">
              <p>
                Kursi Scandi minimalis yang dirancang untuk kenyamanan maksimal dan estetika ruang tamu modern. Menggunakan kayu jati solid dengan finishing matte yang halus.
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Material: Kayu Jati Solid Grade A</li>
                <li>Busa: High Density Foam</li>
                <li>Kain: Fabric Polyester Premium</li>
                <li>Dimensi: 60 x 65 x 85 cm</li>
              </ul>
            </div>
          </div>

          {/* Marketing Insights */}
          <div className="bg-primary-container p-6 rounded-xl border-2 border-primary/10 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-bold text-on-primary-container flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined">auto_awesome</span>
                Tips Kurator
              </h4>
              <p className="text-sm font-medium text-on-primary-container/90 leading-relaxed">
                Produk ini sering dilihat bersama "Meja Kopi Minimalis". Coba buat promo bundling untuk meningkatkan penjualan.
              </p>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-white/20 rotate-12 group-hover:rotate-0 transition-transform duration-500 pointer-events-none">
              lightbulb
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

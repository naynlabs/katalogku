export default function KatalogPage() {
  const categories = ["Semua", "Fashion", "Elektronik", "Kecantikan", "Aksesoris"];
  const products = [
    { name: "Summer Oversized Tee", price: "Rp 189.000", cat: "Fashion" },
    { name: "SonicPro Wireless V2", price: "Rp 2.450.000", cat: "Elektronik" },
    { name: "Nordic Minimalist Watch", price: "Rp 725.000", cat: "Aksesoris" },
    { name: "Glow Essentials Set", price: "Rp 450.000", cat: "Kecantikan" },
    { name: "Air Speed Runner X", price: "Rp 1.200.000", cat: "Fashion" },
  ];

  return (
    <>
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 mt-4">
        <div>
          <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Katalog Produk</h2>
          <p className="text-on-surface-variant">Kelola koleksi terbaik toko Anda hari ini.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-full ring-1 ring-outline-variant/15 focus:ring-primary/40 focus:ring-2 shadow-sm transition-all text-sm outline-none" placeholder="Cari nama produk..." type="text" />
          </div>
          <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Tambah Produk
          </button>
        </div>
      </section>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            i === 0
              ? "bg-secondary-fixed text-on-secondary-fixed font-bold shadow-sm"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p) => (
          <div key={p.name} className="group bg-surface-container-lowest rounded-xl p-4 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
            <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4 bg-surface-container-low flex items-center justify-center">
              <span className="material-symbols-outlined text-outline/30 text-6xl group-hover:scale-110 transition-transform duration-500">image</span>
              <span className="absolute top-3 right-3 bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {p.cat}
              </span>
            </div>
            <h3 className="font-bold text-lg text-on-surface leading-tight mb-1">{p.name}</h3>
            <p className="text-primary font-bold text-xl mb-4">{p.price}</p>
            <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/10">
              <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-surface-container-low text-on-surface-variant rounded-full text-xs font-bold hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-sm">edit</span> Edit
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-error-container/30 text-error rounded-full hover:bg-error-container transition-colors">
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Add */}
        <div className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-8 text-center bg-surface-container-low/30 hover:bg-surface-container-low transition-colors cursor-pointer group h-[400px]">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl">add_circle</span>
          </div>
          <h3 className="font-bold text-on-surface-variant mb-1">Produk Baru</h3>
          <p className="text-sm text-outline px-4">Mulai tambahkan produk unggulan Anda di sini</p>
        </div>
      </div>
    </>
  );
}

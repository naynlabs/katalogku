export default function FeaturesSection() {
  const features = [
    { icon: "shopping_cart_checkout", title: "Checkout Instan", desc: "Pesanan kilat langsung terkirim ke WhatsApp kamu dengan rapi." },
    { icon: "bolt", title: "Toko Siap 3 Menit", desc: "Tanpa setup membingungkan. Daftar, upload, langsung bisa jualan." },
    { icon: "money_off", title: "Tanpa Potongan Admin", desc: "Keuntungan 100% milik kamu. Kami tidak mengambil komisi per transaksi." },
    { icon: "link", title: "1 Link untuk Semua", desc: "Satu link sakti untuk seluruh katalog produk yang kamu tawarkan." },
    { icon: "smartphone", title: "Mobile-First", desc: "Tampilan yang dioptimalkan sempurna untuk layar smartphone pembeli." },
    { icon: "inventory", title: "Kelola Mudah", desc: "Update stok, harga, dan koleksi dalam satu dashboard yang sangat simpel." },
  ];

  return (
    <section id="fitur" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-16 text-center">
          Semua yang Kamu Butuhkan untuk Mulai Jualan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="feature-card bg-surface-container-lowest p-8 rounded-[2rem] ghost-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <div className="w-14 h-14 rounded-[1.2rem] bg-primary/10 flex items-center justify-center mb-6 text-primary icon-rotate transition-transform">
                <span className="material-symbols-outlined text-3xl">{f.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-on-surface-variant text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  const steps = [
    { num: "01", icon: "storefront", title: "1. Buat toko", desc: "Daftar akun gratis dan sesuaikan identitas toko kamu sendiri." },
    { num: "02", icon: "add_shopping_cart", title: "2. Tambah produk", desc: "Upload foto, tulis deskripsi, dan tentukan harga jualan kamu." },
    { num: "03", icon: "share", title: "3. Share link", desc: "Pasang link di bio Instagram/TikTok dan mulai terima pesanan!" },
  ];

  return (
    <section id="cara-kerja" className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-16 text-center">
          Jualan Lancar dalam 3 Langkah
        </h2>
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar scroll-smooth">
          {steps.map((s) => (
            <div key={s.num} className="min-w-[280px] flex-shrink-0 snap-center bg-surface-container-lowest p-10 rounded-[2.5rem] elevation-tonal relative overflow-hidden group">
              <div className="text-6xl font-black text-primary/5 absolute -top-2 -left-2 select-none">{s.num}</div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 text-primary">
                  <span className="material-symbols-outlined text-4xl">{s.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-on-surface-variant">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

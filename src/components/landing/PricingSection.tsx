import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      name: "FREE", price: "Rp 0", period: "", desc: "Untuk mulai jualan",
      features: ["Maks 10 produk", "Link bio toko", "Checkout WA"],
      cta: "Mulai Gratis", href: "/register", popular: false, outline: true,
    },
    {
      name: "STARTER", price: "Rp 29rb", period: "/bln", desc: "Untuk mulai serius",
      features: ["Maks 50 produk", "Tanpa watermark", "Statistik dasar"],
      cta: "Pilih Starter", href: "/register", popular: false, outline: true,
    },
    {
      name: "GROWTH", price: "Rp 59rb", period: "/bln", desc: "Untuk scale penjualan",
      features: ["Produk unlimited", "Custom domain", "Integrasi Social Media", "Analytics lengkap"],
      cta: "Gunakan Paket Growth", href: "/register", popular: true, outline: false,
    },
    {
      name: "PRO", price: "Rp 99rb", period: "/bln", desc: "Untuk bisnis berkembang",
      features: ["Semua fitur Growth", "Multi admin", "Prioritas support"],
      cta: "Upgrade ke Pro", href: "/register", popular: false, outline: true,
    },
  ];

  return (
    <section id="harga" className="py-24 bg-surface-container-low/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Mulai Gratis, Upgrade Saat Penjualan Kamu Bertumbuh
        </h2>
        <p className="text-on-surface-variant mb-16">Investasi terbaik untuk bisnis yang lebih profesional.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`bg-surface-container-lowest flex flex-col items-center transition-all duration-300 hover:scale-[1.02] ${
                p.popular
                  ? "p-10 rounded-[2.5rem] border-4 border-primary relative shadow-2xl shadow-primary/20 scale-105 z-10"
                  : "p-8 rounded-[2.5rem] ghost-border"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-5 bg-primary text-white px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-lg shadow-primary/30">
                  🔥 PALING POPULER
                </div>
              )}
              <h3 className="font-bold text-xl mb-2">{p.name}</h3>
              <div className="mb-6">
                <span className={`font-extrabold ${p.popular ? "text-4xl font-black text-primary" : "text-3xl"}`}>
                  {p.price}
                </span>
                {p.period && <span className="text-sm">{p.period}</span>}
              </div>
              <ul className="text-sm text-on-surface-variant space-y-4 mb-8 text-left w-full">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-sm text-primary`}>
                      {p.popular ? "check_circle" : "check"}
                    </span>
                    <span className={p.popular && j === 0 ? "font-bold text-on-surface" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className={`w-full py-4 rounded-full font-bold text-center block ${
                  p.popular
                    ? "bg-primary-gradient text-white font-extrabold shadow-lg shadow-primary/30 hover:scale-105 transition-transform active:scale-95"
                    : "border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

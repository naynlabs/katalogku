export default function FaqSection() {
  const faqs = [
    { q: "Apakah benar-benar gratis?", a: "Tentu saja! Kamu bisa mulai dengan paket Free selamanya untuk maksimal 10 produk. Upgrade hanya jika kamu butuh fitur lebih lanjut." },
    { q: "Apakah sulit digunakan?", a: "Sangat mudah! Kami mendesain Katalogku agar bisa dioperasikan oleh siapa saja, bahkan bagi pemula sekalipun." },
    { q: "Apakah perlu skill teknis?", a: "Sama sekali tidak. Tidak ada coding atau setup server yang membosankan. Semua sudah otomatis kami siapkan." },
    { q: "Bisa dipakai dari HP?", a: "Sangat bisa! Katalogku dioptimalkan untuk penggunaan mobile, sehingga kamu bisa mengelola toko langsung dari genggaman." },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-center">
          Masih Ragu? Ini Jawabannya
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-surface-container-lowest rounded-2xl ghost-border overflow-hidden transition-all duration-300">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 md:pt-28 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10 text-center lg:text-left">
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-extrabold tracking-widest uppercase mb-6">
            Mulai Jualan Pro
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-[15ch] mx-auto lg:mx-0">
            Mulai Jualan Lebih Rapi &amp; Profesional Hari Ini
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Tanpa setup ribet. Tanpa skill teknis. Langsung bisa dipakai. Ubah link bio kamu jadi mesin uang otomatis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-4">
            <Link
              href="/register"
              className="bg-primary-gradient text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:scale-105 transition-transform active:scale-95"
            >
              Mulai Gratis Sekarang
            </Link>
            <Link
              href="/kue-bunda"
              className="bg-surface-container-lowest text-on-surface px-8 py-4 rounded-full font-bold text-lg ghost-border hover:bg-surface-container-low transition-colors"
            >
              👉 Lihat Contoh Toko
            </Link>
          </div>
          <p className="text-sm font-medium text-on-surface-variant/70 italic">
            Tanpa biaya • Langsung aktif
          </p>
        </div>
        <div className="relative flex justify-center items-center lg:justify-end animate-scale-in">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] transform scale-125" />
          <div className="relative bg-surface-container-lowest p-3 rounded-[3rem] shadow-2xl w-full max-w-[300px] ghost-border border-4 border-white/50">
            <div className="rounded-[2.5rem] w-full aspect-[9/19] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary/30 text-8xl">storefront</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

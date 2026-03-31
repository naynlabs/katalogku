import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-primary-gradient rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(79,70,229,0.4)]">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-tight">
              Berhenti Jualan Manual.<br />Mulai Jualan Lebih Profesional.
            </h2>
            <p className="text-xl text-on-primary-container mb-12 max-w-xl mx-auto opacity-90">
              Jangan biarkan calon pembeli kamu hilang karena proses yang ribet. Aktifkan toko kamu sekarang!
            </p>
            <Link
              href="/register"
              className="inline-block bg-white text-primary px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-105 transition-transform pulse-effect"
            >
              Buat Toko Online Gratis Sekarang
            </Link>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-bold opacity-80">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">verified</span> Tanpa Kartu Kredit
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">rocket_launch</span> Langsung Aktif
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">celebration</span> Gratis Selamanya
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProblemSection() {
  const problems = [
    "Capek balas satu-satu",
    "Order sering ketumpuk & kelewat",
    "Customer kabur sebelum beli",
    "Terlihat kurang profesional",
  ];

  return (
    <section className="py-24 bg-surface-container-low/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Masih Jualan Manual di Chat &amp; DM?
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Hentikan kebiasaan lama yang menghambat pertumbuhan bisnis kamu.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className={`bg-surface-container-lowest p-8 rounded-[2rem] ghost-border flex flex-col items-center text-center opacity-0 animate-fade-up stagger-${i + 1}`}
            >
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-error">close</span>
              </div>
              <p className="font-bold text-on-surface">{problem}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg font-bold text-error px-8 py-4 bg-error-container/30 rounded-full inline-block">
            👉 Setiap chat yang tidak terbalas = peluang penjualan yang hilang
          </p>
        </div>
      </div>
    </section>
  );
}

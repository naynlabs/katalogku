export default function SolutionSection() {
  const solutions = [
    "Etalase jualan profesional",
    "Checkout instan ke WhatsApp",
    "Tampilan seperti toko online",
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex justify-center animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-gradient opacity-10 rounded-[2rem] blur-xl" />
              <div className="relative z-10 bg-surface-container-lowest rounded-[2rem] shadow-2xl p-12 flex items-center justify-center aspect-square max-w-sm">
                <span className="material-symbols-outlined text-primary/20 text-[120px]">smartphone</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Sekarang, Semua Bisa Otomatis dalam 1 Link
            </h2>
            <p className="text-xl text-on-surface-variant mb-8">
              Semua dalam 1 link sederhana di bio kamu.
            </p>
            <ul className="space-y-6">
              {solutions.map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container">check_circle</span>
                  </div>
                  <span className="text-lg font-bold text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

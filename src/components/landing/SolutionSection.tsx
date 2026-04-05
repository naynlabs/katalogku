"use client";

import Image from "next/image";

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
            <div className="relative group" style={{ perspective: "1200px" }}>
              <div className="absolute -inset-8 bg-primary-gradient opacity-15 rounded-[2rem] blur-[50px] group-hover:opacity-25 transition-opacity duration-700" />
              <div 
                className="relative z-10 rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] overflow-hidden transition-all duration-700 ease-out group-hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.35)]"
                style={{ transform: "rotateX(4deg) rotateY(-6deg)" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1.03)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "rotateX(4deg) rotateY(-6deg)"}
              >
                <Image
                  src="/images/dashboard-preview.png"
                  alt="Dashboard analitik Katalogku - pantau performa toko online kamu secara real-time"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
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

"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 md:pt-28 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
              className="bg-primary-gradient text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform active:scale-95"
            >
              Mulai Gratis Sekarang
            </Link>
            <Link
              href="/kue-bunda"
              className="bg-surface-container-lowest text-on-surface px-8 py-4 rounded-full font-bold text-lg ghost-border/20 hover:bg-surface-container-low transition-colors"
            >
              👉 Lihat Contoh Toko
            </Link>
          </div>
          <p className="text-sm font-medium text-on-surface-variant/70 italic">
            Tanpa biaya • Langsung aktif
          </p>
        </div>
        <div className="relative flex justify-center items-center lg:justify-end w-full mt-10 lg:mt-0 animate-scale-in" style={{ perspective: "1000px" }}>
          <div className="absolute inset-0 bg-primary/20 rounded-[100%] blur-[120px] transform scale-150" />
          
          {/* 3D Phone Mockup Wrapper */}
          <div 
             className="relative bg-black rounded-[3rem] shadow-[30px_40px_80px_rgba(0,0,0,0.3)] w-[300px] h-[620px] border-[8px] border-black transition-all duration-700 ease-in-out group hover:shadow-[10px_20px_50px_rgba(0,0,0,0.2)] z-10 origin-right"
             style={{ transform: "rotateX(15deg) rotateY(-20deg) rotateZ(5deg)" }}
             onMouseEnter={(e) => e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.05)"}
             onMouseLeave={(e) => e.currentTarget.style.transform = "rotateX(15deg) rotateY(-20deg) rotateZ(5deg)"}
          >
            {/* Phone Hardware Details */}
            <div className="absolute right-[-11px] top-32 w-[3px] h-12 bg-gray-800 rounded-r-md"></div>
            <div className="absolute left-[-11px] top-28 w-[3px] h-12 bg-gray-800 rounded-l-md"></div>
            <div className="absolute left-[-11px] top-44 w-[3px] h-12 bg-gray-800 rounded-l-md"></div>
            
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-[#f8f9fb] relative">
               {/* Glossy Screen Overlay */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none z-20"></div>
               
               {/* Live Native Code Mockup (Iframe Scaled for Responsive) */}
               <iframe 
                  src="/kue-bunda?mode=iframe" 
                  className="absolute top-0 left-0 border-none bg-[#f8f9fb] pointer-events-none group-hover:pointer-events-auto hide-scrollbar"
                  style={{ width: "375px", height: "800px", transform: "scale(0.7573)", transformOrigin: "top left" }}
                  title="Katalogku Storefront Preview"
                  scrolling="yes"
               />
            </div>
            
            {/* Mockup Hover Hint */}
            <div className="absolute -left-16 bottom-24 bg-white/95 text-primary font-bold text-xs py-2 px-4 rounded-xl shadow-xl opacity-100 group-hover:opacity-0 transition-opacity whitespace-nowrap animate-bounce flex items-center gap-1 border border-outline-variant/20 z-30">
              <span className="material-symbols-outlined text-[16px]">touch_app</span>
              Arahkan ke HP!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

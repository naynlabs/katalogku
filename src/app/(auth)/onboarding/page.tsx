"use client";

import { useState } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";

const stepMeta = [
  { label: "Profil", icon: "person" },
  { label: "Toko", icon: "storefront" },
  { label: "Selesai", icon: "check_circle" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-12 px-2">
      {stepMeta.map((s, i) => (
        <div key={i} className="contents">
          <div className={`flex flex-col items-center gap-2 flex-1 ${i > current ? "opacity-40" : ""}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              i <= current
                ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                : "bg-surface-container-highest text-on-surface-variant"
            }`}>
              {i < current ? (
                <span className="material-symbols-outlined text-sm">check</span>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-wider ${i <= current ? "text-primary" : "text-on-surface-variant"}`}>
              {s.label}
            </span>
          </div>
          {i < stepMeta.length - 1 && (
            <div className={`h-[2px] flex-grow mx-2 mb-6 ${i < current ? "bg-primary" : "bg-surface-container-high"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function StepProfile({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
      {/* Profile Upload */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative group cursor-pointer">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container-low border-4 border-white shadow-inner flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-outline">person</span>
          </div>
          <div className="absolute bottom-0 right-0 bg-primary-gradient p-2.5 rounded-full text-on-primary shadow-lg border-2 border-white transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-sm block">edit</span>
          </div>
        </div>
        <span className="mt-4 text-sm font-semibold text-primary">Unggah Foto Profil</span>
      </div>
      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-1 text-[11px] font-bold uppercase tracking-widest text-primary z-10">Nama Lengkap</label>
          <input className="w-full px-5 py-4 bg-white border border-outline-variant/30 rounded-lg text-on-surface placeholder:text-on-surface-variant/40 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all" placeholder="Masukkan nama anda" type="text" />
        </div>
        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-1 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/60 z-10">Peran Bisnis (Opsional)</label>
          <input className="w-full px-5 py-4 bg-white border border-outline-variant/30 rounded-lg text-on-surface placeholder:text-on-surface-variant/40 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all" placeholder="Contoh: Pemilik Usaha" type="text" />
        </div>
        <div className="pt-4 flex flex-col gap-4">
          <button type="submit" className="w-full py-4 px-6 bg-primary-gradient text-on-primary rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Lanjut ke Langkah 2
          </button>
        </div>
      </form>
    </div>
  );
}

function StepStore({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-4xl">storefront</span>
        </div>
      </div>
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-1 text-[11px] font-bold uppercase tracking-widest text-primary z-10">Nama Toko</label>
          <input className="w-full px-5 py-4 bg-white border border-outline-variant/30 rounded-lg text-on-surface placeholder:text-on-surface-variant/40 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all" placeholder="Contoh: Butik Clarissa" type="text" />
        </div>
        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-1 text-[11px] font-bold uppercase tracking-widest text-primary z-10">URL Toko</label>
          <div className="flex items-center bg-white border border-outline-variant/30 rounded-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary transition-all">
            <span className="pl-5 text-on-surface-variant text-sm font-medium whitespace-nowrap">katalogku.id/</span>
            <input className="flex-1 px-1 py-4 bg-transparent border-none text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-0" placeholder="butik-clarissa" type="text" />
          </div>
        </div>
        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-1 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/60 z-10">Kategori (Opsional)</label>
          <select className="w-full px-5 py-4 bg-white border border-outline-variant/30 rounded-lg text-on-surface appearance-none cursor-pointer focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all">
            <option>Fashion</option>
            <option>Elektronik</option>
            <option>Kecantikan</option>
            <option>Makanan</option>
            <option>Lainnya</option>
          </select>
        </div>
        <div className="pt-4 flex flex-col gap-4">
          <button type="submit" className="w-full py-4 px-6 bg-primary-gradient text-on-primary rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Lanjut ke Langkah 3
          </button>
        </div>
      </form>
    </div>
  );
}

function StepWhatsapp({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full bg-secondary-container/50 flex items-center justify-center">
          <WhatsAppIcon className="text-on-secondary-container w-10 h-10" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-on-surface">Nomor WhatsApp</h3>
        <p className="text-sm text-on-surface-variant text-center mt-1">Pesanan customer akan dikirim langsung ke nomor ini.</p>
      </div>
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onFinish(); }}>
        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-1 text-[11px] font-bold uppercase tracking-widest text-primary z-10">Nomor WhatsApp</label>
          <div className="flex items-center bg-white border border-outline-variant/30 rounded-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary transition-all">
            <span className="pl-5 text-on-surface-variant text-sm font-medium">+62</span>
            <input className="flex-1 px-2 py-4 bg-transparent border-none text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-0" placeholder="812 3456 7890" type="tel" />
          </div>
        </div>
        <div className="pt-4 flex flex-col gap-4">
          <button type="submit" className="w-full py-4 px-6 bg-primary-gradient text-on-primary rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            🎉 Selesai! Buka Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);

  const titles = [
    { h: "Mari mulai membangun etalase digital kamu.", p: "Lengkapi profil anda agar pembeli mengenal brand dan diri anda lebih dekat." },
    { h: "Atur identitas toko kamu.", p: "Nama dan URL toko akan menjadi alamat utama etalase kamu di internet." },
    { h: "Satu langkah lagi!", p: "Hubungkan WhatsApp agar pesanan customer bisa langsung masuk ke HP kamu." },
  ];

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-3">
            {titles[step].h}
          </h1>
          <p className="text-on-surface-variant max-w-md mx-auto">{titles[step].p}</p>
        </div>

        <StepIndicator current={step} />

        {step === 0 && <StepProfile onNext={() => setStep(1)} />}
        {step === 1 && <StepStore onNext={() => setStep(2)} />}
        {step === 2 && (
          <StepWhatsapp onFinish={() => {
            window.location.href = "/dashboard";
          }} />
        )}

        <footer className="mt-12 text-center">
          <p className="text-on-surface-variant text-sm flex items-center justify-center gap-1">
            Butuh bantuan?{" "}
            <a className="text-primary font-bold hover:underline decoration-2 underline-offset-4" href="#">Hubungi Support</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

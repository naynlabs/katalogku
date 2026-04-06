"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register: reg,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeToTerms: false },
  });

  const onSubmit = async (data: RegisterFormData) => {
    // TODO: Connect to Better Auth
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = "/onboarding";
  };

  return (
    <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container rounded-xl mb-6 shadow-xl shadow-primary/10">
            <span className="material-symbols-outlined text-white text-3xl">storefront</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Buat akun gratis sekarang</h1>
          <p className="text-on-surface-variant">Mulai jualan dalam hitungan menit. Tanpa biaya, tanpa ribet.</p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] relative overflow-hidden">
          <div className="flex bg-surface-container-low p-1 rounded-full mb-8">
            <Link href="/login" className="flex-1 py-2 text-sm font-semibold rounded-full text-on-surface-variant hover:text-on-surface transition-all text-center">Masuk</Link>
            <span className="flex-1 py-2 text-sm font-semibold rounded-full bg-white text-primary shadow-sm text-center">Daftar</span>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-outline-variant bg-white hover:bg-surface-container-low transition-colors mb-6 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span className="text-sm font-semibold text-on-surface">Daftar dengan Google</span>
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-outline-variant/30" />
            <span className="flex-shrink mx-4 text-xs font-medium text-outline uppercase tracking-widest">Atau gunakan email</span>
            <div className="flex-grow border-t border-outline-variant/30" />
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">Nama Lengkap</label>
              <div className="relative">
                <input {...reg("name")} className={`w-full bg-surface-container-low border-none rounded-lg px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none ${errors.name ? 'ring-2 ring-error/50' : ''}`} placeholder="Nama kamu" type="text" />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline text-xl">person</span>
              </div>
              {errors.name && <p className="text-xs text-error font-medium ml-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">Alamat Email</label>
              <div className="relative">
                <input {...reg("email")} className={`w-full bg-surface-container-low border-none rounded-lg px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none ${errors.email ? 'ring-2 ring-error/50' : ''}`} placeholder="nama@toko.id" type="email" />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline text-xl">mail</span>
              </div>
              {errors.email && <p className="text-xs text-error font-medium ml-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">Kata Sandi</label>
              <div className="relative">
                <input {...reg("password")} className={`w-full bg-surface-container-low border-none rounded-lg px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none ${errors.password ? 'ring-2 ring-error/50' : ''}`} placeholder="Min. 8 karakter" type={showPassword ? "text" : "password"} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline text-xl">
                  <span className="material-symbols-outlined">{showPassword ? "visibility" : "visibility_off"}</span>
                </button>
              </div>
              {errors.password && <p className="text-xs text-error font-medium ml-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{errors.password.message}</p>}
            </div>
            <div className="flex items-start gap-3">
              <input {...reg("agreeToTerms")} type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/40 cursor-pointer" />
              <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer">
                Saya menyetujui <Link href="/terms" className="text-primary font-bold hover:underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-primary font-bold hover:underline">Kebijakan Privasi</Link> Katalogku.
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-xs text-error font-medium ml-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{errors.agreeToTerms.message}</p>}
            <div className="pt-2">
              <button type="submit" disabled={isSubmitting} className="block w-full bg-gradient-to-br from-primary to-primary-container text-white font-bold py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform text-center disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-on-surface-variant">
          Sudah punya akun?{" "}
          <Link className="text-primary font-bold hover:underline" href="/login">Masuk di sini</Link>
        </p>
      </div>
    </main>
  );
}

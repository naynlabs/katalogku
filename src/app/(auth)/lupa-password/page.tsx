"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/lib/validations";
import { authClient } from "@/lib/auth-client";

export default function LupaPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const { data: res, error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
      });

      if (error) {
        alert(error.message || "Gagal memproses permintaan");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (err: any) {
      alert("Terjadi masalah pada server. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] flex flex-col items-center text-center">
          
          {/* Lock Icon Component */}
          <div className="w-24 h-24 bg-primary-fixed/30 rounded-full flex items-center justify-center mb-8 ring-8 ring-primary-fixed/10">
            <span
              className="material-symbols-outlined text-primary text-5xl shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isSuccess ? 'mark_email_read' : 'lock_reset'}
            </span>
          </div>

          {/* Header Content */}
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-3">
            {isSuccess ? "Cek Email Anda" : "Lupa Kata Sandi?"}
          </h1>
          <p className="text-on-surface-variant text-base leading-relaxed mb-10">
            {isSuccess 
              ? "Kami telah mengirimkan tautan pemulihan kata sandi. Silakan periksa inbox atau folder spam Anda." 
              : "Jangan khawatir! Masukkan alamat email Anda di bawah ini dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda."}
          </p>

          {/* Form */}
          {!isSuccess && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
              <div className="relative text-left">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 mb-2 block"
                >
                  Alamat Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="admin@katalogku.com"
                    className={`w-full bg-surface-container-low border ${errors.email ? 'border-error' : 'border-transparent'} rounded-lg px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none`}
                    {...register("email")}
                    disabled={isLoading}
                  />
                  <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-xl ${errors.email ? 'text-error' : 'text-outline'}`}>
                    mail
                  </span>
                </div>
                {errors.email && (
                  <p className="text-error text-xs font-bold mt-2 ml-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Primary CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:active:scale-100 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  "Kirim Tautan Pemulihan"
                )}
              </button>
            </form>
          )}

          {/* Footer Link */}
          <div className="mt-10">
            <Link
              href="/login"
              className="group flex items-center justify-center gap-2 text-sm font-bold text-primary transition-all hover:opacity-80"
            >
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

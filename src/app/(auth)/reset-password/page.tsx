"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormData } from "@/lib/validations";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    
    try {
      const { data: res, error } = await authClient.resetPassword({
        newPassword: data.password,
      });

      if (error) {
        alert(error.message || "Gagal mengatur ulang sandi. Tautan mungkin kadaluarsa.");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        router.push("/login?reset=success");
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
          
          {/* Key Icon Component */}
          <div className="w-24 h-24 bg-primary-fixed/30 rounded-full flex items-center justify-center mb-8 ring-8 ring-primary-fixed/10">
            <span
              className="material-symbols-outlined text-primary text-5xl shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              key
            </span>
          </div>

          {/* Header Content */}
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-3">
            Reset Kata Sandi
          </h1>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-10">
            Silakan buat kata sandi baru untuk akun Anda. Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            <div className="space-y-2 text-left">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
              >
                Kata Sandi Baru
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`w-full bg-surface-container-low border ${errors.password ? 'border-error' : 'border-transparent'} rounded-lg px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none`}
                  {...register("password")}
                  disabled={isLoading}
                />
                <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-xl ${errors.password ? 'text-error' : 'text-outline'}`}>
                  lock
                </span>
              </div>
              {errors.password && (
                <p className="text-error text-xs font-bold mt-1 ml-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2 text-left">
              <label
                htmlFor="confirm-password"
                className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
              >
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={`w-full bg-surface-container-low border ${errors.confirmPassword ? 'border-error' : 'border-transparent'} rounded-lg px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all outline-none`}
                  {...register("confirmPassword")}
                  disabled={isLoading}
                />
                <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-xl ${errors.confirmPassword ? 'text-error' : 'text-outline'}`}>
                  lock_reset
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-error text-xs font-bold mt-1 ml-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Primary CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:active:scale-100 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  "Perbarui Kata Sandi"
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8">
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

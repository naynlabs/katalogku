import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Blurred Elements (The "Digital Curator" Texture) */}
      <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-primary-fixed opacity-20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-secondary-fixed opacity-20 blur-[100px] rounded-full -z-10"></div>

      <main className="w-full max-w-md z-10 flex flex-col justify-center">
        {/* Auth Card */}
        <div className="bg-surface-container-lowest/80 backdrop-blur-xl rounded-xl p-8 md:p-12 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] flex flex-col items-center text-center ghost-border">
          
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
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-3">
            Reset Kata Sandi
          </h1>
          <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-10">
            Silakan buat kata sandi baru untuk akun Anda. Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.
          </p>

          {/* Form */}
          <form className="w-full space-y-6">
            <div className="relative text-left">
              <label
                htmlFor="password"
                className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-4 mb-2 block"
              >
                Kata Sandi Baru
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline">
                  lock
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full bg-surface-container-low border-0 outline-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary/40 rounded-full py-4 pl-14 pr-6 font-body text-on-surface placeholder:text-outline transition-all"
                  required
                />
              </div>
            </div>

            <div className="relative text-left">
              <label
                htmlFor="confirm-password"
                className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-4 mb-2 block"
              >
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline">
                  lock_reset
                </span>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="w-full bg-surface-container-low border-0 outline-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary/40 rounded-full py-4 pl-14 pr-6 font-body text-on-surface placeholder:text-outline transition-all"
                  required
                />
              </div>
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 mt-4"
            >
              Perbarui Kata Sandi
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8">
            <Link
              href="/login"
              className="font-label text-sm font-bold text-on-surface-variant transition-all hover:text-primary hover:underline hover:underline-offset-4"
            >
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </div>

        {/* Brand Footer Anchor */}
        <div className="mt-8 text-center">
          <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-outline-variant">
            © 2026 Katalogku Premium Curator
          </p>
        </div>
      </main>
    </div>
  );
}

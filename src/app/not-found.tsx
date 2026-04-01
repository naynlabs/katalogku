import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Top Nav (Auth Style) */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto glass-header">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo-baru.png" alt="Logo Katalogku" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
          <span className="text-xl font-bold tracking-tight text-slate-900">Katalogku</span>
        </a>
        <Link href="/" className="font-medium text-sm text-primary hover:opacity-80 transition-opacity">
          Kembali ke Beranda
        </Link>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 mt-16 relative">
      {/* Background Ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-error-container opacity-20 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary-fixed opacity-20 blur-[100px] rounded-full -z-10"></div>

      <div className="text-center max-w-2xl z-10 flex flex-col items-center">
        {/* 404 Giant Text */}
        <h1 className="text-[120px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-outline-variant to-surface-container-highest tracking-tighter leading-none select-none">
          404
        </h1>
        
        {/* Eye/Face emotional element */}
        <div className="-mt-12 md:-mt-20 mb-8 bg-surface-container-lowest p-4 rounded-full shadow-[0px_20px_40px_rgba(0,0,0,0.05)] ring-4 ring-white/50 backdrop-blur-xl">
          <span className="material-symbols-outlined text-6xl text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
            sentiment_dissatisfied
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
          Waduh! Toko Tidak Ditemukan.
        </h2>
        
        <p className="text-base md:text-lg text-on-surface-variant font-medium mb-10 max-w-lg mx-auto">
          Toko atau tautan yang Anda cari mungkin salah ketik, sudah dihapus, atau sedang bersembunyi di dimensi lain. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-surface-container-high text-on-surface font-bold rounded-full hover:bg-surface-container-highest transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="material-symbols-outlined">home</span>
            Kembali ke Beranda
          </Link>
          
          <Link
            href="/register"
            className="px-8 py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto justify-center flex items-center gap-2"
          >
            <span className="material-symbols-outlined">storefront</span>
            Buat Tokomu Sendiri (Gratis!)
          </Link>
        </div>
      </div>
      
      </div>
      
      {/* Footer Anchors */}
      <footer className="w-full py-8 px-8 border-t border-outline-variant/10 mt-auto bg-surface relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-outline font-medium">© 2026 Katalogku Indonesia. Digital Curator for Small Business.</p>
          <div className="flex gap-6">
            <Link className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors" href="/terms">Syarat &amp; Ketentuan</Link>
            <Link className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors" href="/privacy">Kebijakan Privasi</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

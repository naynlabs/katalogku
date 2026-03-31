import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-on-surface">
          Katalogku
        </Link>
        <div className="hidden md:flex gap-8 items-center font-medium tracking-tight text-sm">
          <a className="text-primary font-semibold" href="#fitur">Fitur</a>
          <a className="text-slate-600 hover:text-primary transition-colors" href="#cara-kerja">Cara Kerja</a>
          <a className="text-slate-600 hover:text-primary transition-colors" href="#harga">Harga</a>
          <a className="text-slate-600 hover:text-primary transition-colors" href="#faq">FAQ</a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-block text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="bg-primary-gradient text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-lg shadow-primary/20"
          >
            Mulai Gratis
          </Link>
        </div>
      </nav>
    </header>
  );
}

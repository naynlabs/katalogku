import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto glass-header">
        <a href="/" className="flex items-center gap-3">
          <Image src="/logo-katalogku.svg" alt="Logo Katalogku" width={32} height={32} className="object-contain shadow-sm" />
          <span className="text-xl font-bold tracking-tight text-slate-900">Katalogku</span>
        </a>
        <button className="font-medium text-sm text-primary hover:opacity-80 transition-opacity">
          Butuh Bantuan?
        </button>
      </nav>

      {/* Content */}
      {children}

      {/* Background Deco */}
      <div className="fixed top-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px] -z-10" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-primary-fixed/30 rounded-full blur-[80px] -z-10" />

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-outline-variant/10 mt-auto">
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

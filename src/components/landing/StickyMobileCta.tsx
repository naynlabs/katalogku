import Link from "next/link";

export default function StickyMobileCta() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-lg border-t border-outline-variant/10 z-[60] shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      <Link
        href="/register"
        className="block w-full bg-primary-gradient text-white py-4 rounded-full font-black text-lg shadow-xl shadow-primary/25 active:scale-95 transition-transform text-center"
      >
        Mulai Gratis
      </Link>
    </div>
  );
}

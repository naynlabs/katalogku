import Link from "next/link";
import { InstagramIcon, TikTokIcon, XIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low pt-24 pb-12 rounded-t-[4rem]">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="text-2xl font-black mb-6 tracking-tighter">Katalogku</div>
          <p className="text-on-surface-variant leading-relaxed font-medium">
            Digital Curator for Small Business. Membantu ribuan UMKM Indonesia go digital dengan cara paling simpel dan profesional.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-on-surface">Produk</h4>
          <ul className="space-y-4 text-on-surface-variant font-medium">
            <li><a className="hover:text-primary transition-colors" href="#fitur">Fitur Utama</a></li>
            <li><a className="hover:text-primary transition-colors" href="#harga">Pricing</a></li>
            <li><Link className="hover:text-primary transition-colors" href="/kue-bunda">Demo Toko</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-on-surface">Perusahaan</h4>
          <ul className="space-y-4 text-on-surface-variant font-medium">
            <li><a className="hover:text-primary transition-colors" href="#">Tentang Kami</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Blog Jualan</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Karir</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-on-surface">Bantuan</h4>
          <ul className="space-y-4 text-on-surface-variant font-medium">
            <li><a className="hover:text-primary transition-colors" href="#">Pusat Bantuan</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Kebijakan Privasi</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Syarat Penggunaan</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-on-surface-variant font-bold">
        <p>© 2025 Katalogku. Kreasi Bangsa.</p>
        <div className="flex gap-8">
          <a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><InstagramIcon /> Instagram</a>
          <a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><TikTokIcon /> TikTok</a>
          <a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><XIcon /> Twitter</a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const navItems = [
  { icon: "dashboard", label: "Overview", href: "/dashboard" },
  { icon: "receipt_long", label: "Pesanan", href: "/dashboard/pesanan" },
  { icon: "analytics", label: "Analitik", href: "/dashboard/analytics" },
  { icon: "inventory_2", label: "Katalog", href: "/dashboard/katalog" },
  { icon: "category", label: "Kategori", href: "/dashboard/kategori" },
  { icon: "link", label: "Links", href: "/dashboard/links" },
  { icon: "palette", label: "Tampilan", href: "/dashboard/tampilan" },
  { icon: "text_fields", label: "Teks & Konten", href: "/dashboard/teks-toko" },
  { icon: "settings", label: "Pengaturan Toko", href: "/dashboard/pengaturan" },
  { icon: "security", label: "Keamanan Akun", href: "/dashboard/akun" },
  { icon: "credit_card", label: "Langganan", href: "/dashboard/billing" },
  { icon: "support_agent", label: "Bantuan", href: "/dashboard/bantuan" },
];

const Sidebar = memo(function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen py-8 px-4 bg-surface-container-lowest w-64 border-r border-outline-variant/20 z-50">
      <div className="mb-10 px-4">
        <Link href="/">
          <div className="flex items-center gap-3 mb-1 group">
            <img src="/logo-baru.png" alt="Logo Katalogku" className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" />
            <h1 className="text-2xl font-black tracking-tight text-primary">Katalogku</h1>
          </div>
        </Link>
        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest pl-[60px]">Digital Curator</p>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-[2rem] transition-all duration-200 ${
                isActive
                  ? "bg-primary text-on-primary font-bold shadow-md hover:scale-[1.02]"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-medium"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2 pb-4">
        <Link
          href="/dashboard/katalog"
          className="block w-full text-center bg-gradient-to-br from-primary to-primary-container text-white py-3.5 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Tambah Produk
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors font-medium mt-2"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
});

export default Sidebar;

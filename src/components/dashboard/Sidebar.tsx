"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "dashboard", label: "Overview", href: "/dashboard" },
  { icon: "analytics", label: "Analitik", href: "/dashboard/analytics" },
  { icon: "inventory_2", label: "Katalog", href: "/dashboard/katalog" },
  { icon: "link", label: "Links", href: "/dashboard/links" },
  { icon: "settings", label: "Pengaturan", href: "/dashboard/pengaturan" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen py-8 px-4 bg-surface-container-lowest w-64 border-r border-outline-variant/20 z-50">
      <div className="mb-10 px-4">
        <Link href="/">
          <h1 className="text-2xl font-black tracking-tight text-primary">Katalogku</h1>
        </Link>
        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Digital Curator</p>
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
}

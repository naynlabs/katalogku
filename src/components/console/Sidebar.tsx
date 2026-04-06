"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const consoleNavItems = [
  { icon: "dashboard", label: "Ikhtisar", href: "/x-control/console" },
  { icon: "group", label: "Pengguna & Toko", href: "/x-control/console/pengguna" },
  { icon: "monitoring", label: "Finansial", href: "/x-control/console/keuangan" },
  { icon: "sell", label: "Paket & Harga", href: "/x-control/console/paket" },
  { icon: "confirmation_number", label: "Kupon & Promo", href: "/x-control/console/promo" },
  { icon: "palette", label: "Pustaka Tema", href: "/x-control/console/tema" },
  { icon: "bug_report", label: "Laporan Bug", href: "/x-control/console/feedback" },
  { icon: "dns", label: "Sistem & Server", href: "/x-control/console/pengaturan" },
];

export default function ConsoleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-surface border-r border-outline-variant/30 h-screen sticky top-0 hidden md:flex">
      <div className="p-6 pb-2">
        <Link href="/x-control/console" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-on-surface text-surface flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-on-surface">Katalogku HQ</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        <div className="text-xs font-bold tracking-wider text-on-surface-variant/50 uppercase mb-4 px-2">
          Menu Kontrol
        </div>
        {consoleNavItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/x-control/console");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-on-surface text-surface font-bold shadow-md"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium"
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? "text-surface" : ""}`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-outline-variant/30">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-error hover:bg-error/10 transition-colors font-medium">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm">Keluar Sistem</span>
        </button>
      </div>
    </aside>
  );
}

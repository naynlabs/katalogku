"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { memo } from "react";

const mainNavItems = [
  { icon: "dashboard", label: "Overview", href: "/etalase/dashboard" },
  { icon: "receipt_long", label: "Pesanan", href: "/etalase/dashboard/pesanan" },
  { icon: "group", label: "Audiens", href: "/etalase/dashboard/audiens" },
  { icon: "analytics", label: "Analitik", href: "/etalase/dashboard/analytics" },
];

const storeNavItems = [
  { icon: "inventory_2", label: "Katalog", href: "/etalase/dashboard/katalog" },
  { icon: "category", label: "Kategori", href: "/etalase/dashboard/kategori" },
  { icon: "link", label: "Links", href: "/etalase/dashboard/links" },
];

function NavSection({ title, items, pathname }: { title: string; items: typeof mainNavItems; pathname: string }) {
  return (
    <div className="mb-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 px-4 mb-2">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-[2rem] transition-all duration-200 ${
                isActive
                  ? "bg-primary text-on-primary font-bold shadow-md hover:scale-[1.02]"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-medium"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const Sidebar = memo(function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen py-6 px-3 bg-surface-container-lowest w-64 border-r border-outline-variant/20 z-50 overflow-y-auto hide-scrollbar">
      <div className="mb-6 px-4">
        <Link href="/">
          <div className="flex items-center gap-3 mb-1 group">
            <Image src="/logo-katalogku.svg" alt="Logo Katalogku" width={40} height={40} className="object-contain shadow-sm group-hover:scale-110 transition-transform" />
            <h1 className="text-xl font-black tracking-tight text-primary">Katalogku</h1>
          </div>
        </Link>
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest pl-[52px]">Digital Curator</p>
      </div>

      <nav className="flex-1 space-y-4">
        <NavSection title="Utama" items={mainNavItems} pathname={pathname} />
        <NavSection title="Kelola Toko" items={storeNavItems} pathname={pathname} />
      </nav>

      <div className="mt-auto space-y-2 pb-4 pt-4 border-t border-outline-variant/10">
        <Link
          href="/toko-saya" // TODO: Replace with dynamic user store slug from auth context
          target="_blank"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          Lihat Toko Publik
        </Link>
      </div>
    </aside>
  );
});

export default Sidebar;

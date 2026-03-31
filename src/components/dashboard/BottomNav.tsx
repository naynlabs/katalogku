"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "grid_view", label: "Home", href: "/dashboard" },
  { icon: "inventory_2", label: "Katalog", href: "/dashboard/katalog" },
  { icon: "link", label: "Links", href: "/dashboard/links" },
  { icon: "settings", label: "Settings", href: "/dashboard/pengaturan" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 md:hidden bg-white/90 backdrop-blur-lg rounded-t-[3rem] shadow-[0px_-10px_30px_rgba(79,70,229,0.08)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center px-6 py-2 transition-all ${
              isActive
                ? "bg-indigo-50 text-indigo-700 rounded-full scale-110"
                : "text-slate-400 active:bg-slate-100"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] uppercase tracking-widest mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

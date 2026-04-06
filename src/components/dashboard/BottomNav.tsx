"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primaryNavItems = [
  { icon: "grid_view", label: "Home", href: "/dashboard" },
  { icon: "inventory_2", label: "Katalog", href: "/dashboard/katalog" },
  { icon: "link", label: "Links", href: "/dashboard/links" },
  { icon: "receipt_long", label: "Pesanan", href: "/dashboard/pesanan" },
];

const moreMenuItems = [
  { icon: "analytics", label: "Analitik", href: "/dashboard/analytics" },
  { icon: "category", label: "Kategori", href: "/dashboard/kategori" },
  { icon: "palette", label: "Tampilan", href: "/dashboard/tampilan" },
  { icon: "text_fields", label: "Teks & Konten", href: "/dashboard/teks-toko" },
  { icon: "settings", label: "Pengaturan", href: "/dashboard/pengaturan" },
  { icon: "security", label: "Keamanan Akun", href: "/dashboard/akun" },
  { icon: "credit_card", label: "Langganan", href: "/dashboard/billing" },
  { icon: "support_agent", label: "Bantuan", href: "/dashboard/bantuan" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const isMoreActive = moreMenuItems.some((item) => pathname === item.href);

  return (
    <>
      {/* More Menu Overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setShowMore(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="absolute bottom-[5.5rem] left-4 right-4 bg-white rounded-3xl shadow-2xl p-4 z-50 animate-scale-in">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-2 mb-3">Menu Lainnya</p>
            <div className="grid grid-cols-4 gap-2">
              {moreMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMore(false)}
                    className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    <span className="text-[9px] font-bold mt-1 text-center leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-6 pt-3 md:hidden bg-white/90 backdrop-blur-lg rounded-t-[3rem] shadow-[0px_-10px_30px_rgba(79,70,229,0.08)]">
        {primaryNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center px-4 py-2 transition-all ${
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
        
        {/* More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className={`flex flex-col items-center justify-center px-4 py-2 transition-all ${
            isMoreActive || showMore
              ? "bg-indigo-50 text-indigo-700 rounded-full scale-110"
              : "text-slate-400 active:bg-slate-100"
          }`}
        >
          <span className="material-symbols-outlined">{showMore ? "close" : "more_horiz"}</span>
          <span className="text-[10px] uppercase tracking-widest mt-1">Lainnya</span>
        </button>
      </nav>
    </>
  );
}

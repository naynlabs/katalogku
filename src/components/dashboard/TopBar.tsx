"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function TopBar({
  userName,
  storeName,
  userImage,
}: {
  userName: string;
  storeName: string;
  userImage: string | null;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { icon: "text_fields", label: "Teks & Konten", href: "/etalase/dashboard/teks-toko" },
    { icon: "settings", label: "Pengaturan Toko", href: "/etalase/dashboard/pengaturan" },
    { icon: "security", label: "Keamanan Akun", href: "/etalase/dashboard/akun" },
    { icon: "credit_card", label: "Langganan", href: "/etalase/dashboard/billing" },
    { icon: "support_agent", label: "Bantuan", href: "/etalase/dashboard/bantuan" },
  ];

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <header className="flex justify-between items-center w-full px-4 lg:px-8 py-4 z-40 bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 border-b border-outline-variant/10 text-sm font-medium">
      <div className="flex items-center gap-4">
        <span className="text-xl font-black text-slate-900 md:hidden">Katalogku</span>
        <div className="hidden md:flex flex-col">
          <span className="text-on-surface-variant text-xs">Selamat Datang,</span>
          <span className="font-bold text-lg text-on-surface">{storeName}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 outline-none" placeholder="Cari pesanan..." type="text" />
        </div>
        <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container/20 bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {userImage ? (
              <Image src={userImage} alt={userName} width={40} height={40} className="object-cover" unoptimized />
            ) : (
              <span className="material-symbols-outlined text-primary text-xl">person</span>
            )}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-outline-variant/10 py-2 z-50 animate-fade-in-down origin-top-right">
              <div className="px-4 py-3 border-b border-outline-variant/10 mb-2">
                <span className="font-bold text-sm text-on-surface block truncate">{userName}</span>
                <span className="text-on-surface-variant text-xs block truncate">{storeName}</span>
              </div>

              <div className="px-2 flex flex-col gap-0.5">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMenu(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-medium"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="px-2 mt-2 pt-2 border-t border-outline-variant/10">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 text-error hover:bg-error-container/50 rounded-xl transition-colors font-medium w-full text-left"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

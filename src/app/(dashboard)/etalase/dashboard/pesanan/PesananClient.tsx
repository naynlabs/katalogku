"use client";

import { useState, useEffect, useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions";
import { formatRupiah } from "@/lib/utils";

// ── Types ───────────────────────────────────────────────────────────────────
type OrderItem = {
  id: number;
  invoiceId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  itemsSummary: string;
};

type Props = {
  orders: OrderItem[];
  totalOrders: number;
};

// ── Status Config ───────────────────────────────────────────────────────────
const STATUS_TABS: { key: string; dbValues: string[] }[] = [
  { key: "Semua", dbValues: [] },
  { key: "Menunggu", dbValues: ["PENDING"] },
  { key: "Diproses", dbValues: ["PROCESSING"] },
  { key: "Selesai", dbValues: ["COMPLETED"] },
  { key: "Batal", dbValues: ["CANCELLED"] },
];

const STATUS_OPTIONS: { label: string; value: OrderItem["status"] }[] = [
  { label: "Menunggu", value: "PENDING" },
  { label: "Diproses", value: "PROCESSING" },
  { label: "Selesai", value: "COMPLETED" },
  { label: "Batal", value: "CANCELLED" },
];

const STATUS_DISPLAY: Record<string, { label: string; badgeClass: string; dotColor: string }> = {
  PENDING: { label: "Menunggu", badgeClass: "bg-white text-on-surface border-2 border-outline-variant/30 font-bold hover:bg-surface-container-low", dotColor: "" },
  PROCESSING: { label: "Diproses", badgeClass: "bg-primary/10 text-primary border-2 border-transparent font-bold hover:bg-primary/20", dotColor: "bg-primary" },
  COMPLETED: { label: "Selesai", badgeClass: "bg-green-100 text-green-700 border-2 border-transparent font-bold hover:bg-green-200", dotColor: "bg-green-500" },
  CANCELLED: { label: "Batal", badgeClass: "bg-error-container text-error border-2 border-transparent font-bold hover:bg-red-200", dotColor: "bg-error" },
};

// ── Component ───────────────────────────────────────────────────────────────
export default function PesananClient({ orders, totalOrders }: Props) {
  const [activeTab, setActiveTab] = useState("Semua");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".status-dropdown-container")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOrders = activeTab === "Semua"
    ? orders
    : orders.filter((o) => STATUS_TABS.find((t) => t.key === activeTab)?.dbValues.includes(o.status));

  const completedCount = orders.filter((o) => o.status === "COMPLETED").length;
  const pendingCount = orders.filter((o) => o.status === "PENDING" || o.status === "PROCESSING").length;

  const changeStatus = (orderId: number, newStatus: OrderItem["status"]) => {
    setOpenDropdownId(null);
    startTransition(async () => {
      await updateOrderStatus(orderId, newStatus);
    });
  };

  const handleChat = (phone: string, name: string) => {
    const msg = encodeURIComponent(`Halo Kak ${name},\nTerima kasih atas pesanan Anda di Katalogku.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Pesanan & Prospek
          </h2>
          <p className="text-on-surface-variant text-sm">
            Lacak prospek pelanggan yang beralih ke WhatsApp dan ubah status pesanannya.
          </p>
        </div>
      </div>

      {/* Rangkuman Metrik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl p-6 shadow-xl shadow-primary/20 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-3xl opacity-80">touch_app</span>
          </div>
          <div>
            <p className="text-primary-fixed leading-tight font-medium mb-1">Total Pesanan</p>
            <h3 className="text-4xl font-black">{totalOrders.toLocaleString("id-ID")}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 shadow-sm flex flex-col justify-between tonal-depth w-full overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant font-medium mb-1 truncate">Pesanan Selesai</p>
            <h3 className="text-3xl font-black text-on-surface flex items-baseline gap-1">
              {completedCount}
              <span className="text-sm font-medium text-outline whitespace-nowrap hidden sm:inline">/ dari {orders.length} total</span>
            </h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 shadow-sm flex flex-col justify-between tonal-depth w-full overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-warning-container flex items-center justify-center">
              <span className="material-symbols-outlined text-warning">local_shipping</span>
            </div>
            {pendingCount > 0 && (
              <span className="bg-surface-container text-on-surface-variant text-xs font-bold px-2 py-1 rounded-md mb-2 shrink-0">Butuh Aksi</span>
            )}
          </div>
          <div>
            <p className="text-on-surface-variant font-medium mb-1 truncate">Sedang Diproses/Menunggu</p>
            <h3 className="text-3xl font-black text-on-surface flex items-baseline gap-1">
              {pendingCount}
              <span className="text-sm font-medium text-outline hidden sm:inline">Pesanan</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Filter Status */}
      <div className="bg-surface-container-lowest p-2 rounded-2xl flex gap-1 mb-6 border border-outline-variant/20 box-border overflow-x-auto hide-scrollbar">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-white shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            {tab.key}
          </button>
        ))}
      </div>

      {/* Tabel Pesanan */}
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl shadow-sm overflow-hidden tonal-depth min-h-[300px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low/50 text-on-surface-variant text-xs uppercase tracking-widest font-bold border-b border-outline-variant/20">
                <th className="p-5 font-bold w-[120px]">ID Pesanan</th>
                <th className="p-5 font-bold w-[200px]">Pelanggan</th>
                <th className="p-5 font-bold">Ringkasan Produk</th>
                <th className="p-5 font-bold w-[160px]">Status</th>
                <th className="p-5 font-bold text-center w-[100px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusInfo = STATUS_DISPLAY[order.status] || STATUS_DISPLAY.PENDING;
                  return (
                    <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors bg-white">
                      <td className="p-5">
                        <div className="font-bold text-on-surface">{order.invoiceId}</div>
                        <div className="text-xs text-on-surface-variant font-medium mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      </td>
                      <td className="p-5 font-bold text-on-surface">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface shrink-0">
                            {order.customerName.charAt(0)}
                          </div>
                          <div className="truncate">
                            <div>{order.customerName}</div>
                            <div className="text-xs font-medium text-on-surface-variant mt-0.5">{order.customerPhone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="font-medium text-on-surface max-w-[200px] truncate">{order.itemsSummary}</div>
                        <div className="text-primary font-bold mt-0.5">{formatRupiah(Number(order.totalAmount))}</div>
                      </td>
                      <td className="p-5">
                        {/* Status Dropdown */}
                        <div className="relative status-dropdown-container">
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === order.id ? null : order.id)}
                            disabled={isPending}
                            className={`w-full max-w-[140px] px-4 py-2 rounded-full text-sm transition-colors flex items-center justify-between ${statusInfo.badgeClass} disabled:opacity-50`}
                          >
                            <span className="flex items-center">
                              {statusInfo.dotColor && <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor} inline-block mr-1.5`}></span>}
                              {statusInfo.label}
                            </span>
                            <span className="material-symbols-outlined text-[16px] opacity-70">expand_more</span>
                          </button>

                          {openDropdownId === order.id && (
                            <div className="absolute top-12 left-0 w-[140px] bg-white border border-outline-variant/20 shadow-xl rounded-2xl py-2 z-50 animate-fade-in">
                              {STATUS_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => changeStatus(order.id, opt.value)}
                                  className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors flex items-center ${
                                    order.status === opt.value
                                      ? "bg-primary/5 text-primary"
                                      : "text-on-surface hover:bg-surface-container-low"
                                  }`}
                                >
                                  {STATUS_DISPLAY[opt.value]?.dotColor && (
                                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DISPLAY[opt.value].dotColor} inline-block mr-1.5`}></span>
                                  )}
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleChat(order.customerPhone, order.customerName)}
                            className="w-10 h-10 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors flex items-center justify-center group"
                            title="Chat WhatsApp"
                          >
                            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">chat</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">inbox</span>
                    <p className="font-bold">Tidak ada pesanan.</p>
                    <p className="text-xs">Ubah saringan status Anda atau tunggu pelanggan memencet tombol WA.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";

export default function PesananPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  
  const [orders, setOrders] = useState([
    { id: "ORD-001", date: "15 Apr 2025", user: "Budi Santoso", phone: "628123456789", product: "Glow Essentials Set", amount: "Rp 450.000", status: "Menunggu" },
    { id: "ORD-002", date: "14 Apr 2025", user: "Siti Aminah", phone: "628987654321", product: "Summer Oversized Tee, +2 lainnya", amount: "Rp 850.000", status: "Diproses" },
    { id: "ORD-003", date: "12 Apr 2025", user: "Ahmad Dahlan", phone: "628112233445", product: "SonicPro Wireless V2", amount: "Rp 2.450.000", status: "Selesai" },
    { id: "ORD-004", date: "10 Apr 2025", user: "Ratna Sari", phone: "628556677889", product: "Nordic Minimalist Watch", amount: "Rp 725.000", status: "Batal" },
    { id: "ORD-005", date: "09 Apr 2025", user: "Dimas Anggara", phone: "628443322110", product: "Air Speed Runner X", amount: "Rp 1.200.000", status: "Selesai" },
  ]);

  const tabs = ["Semua", "Menunggu", "Diproses", "Selesai", "Batal"];
  const statusOptions = ["Menunggu", "Diproses", "Selesai", "Batal"];

  const filteredOrders = activeTab === "Semua" ? orders : orders.filter(o => o.status === activeTab);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.status-dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    setOpenDropdownId(null);
  };

  const handleChat = (phone: string, name: string) => {
    // Membuka WhatsApp menuju pelanggan
    const msg = encodeURIComponent(`Halo Kak ${name},\nTerima kasih atas pesanan Anda di Katalogku.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Menunggu":
        return "bg-white text-on-surface border-2 border-outline-variant/30 font-bold hover:bg-surface-container-low";
      case "Diproses":
        return "bg-primary/10 text-primary border-2 border-transparent font-bold hover:bg-primary/20";
      case "Selesai":
        return "bg-green-100 text-green-700 border-2 border-transparent font-bold hover:bg-green-200";
      case "Batal":
        return "bg-error-container text-error border-2 border-transparent font-bold hover:bg-red-200";
      default:
        return "bg-surface-container text-on-surface";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Menunggu": return null;
      case "Diproses": return <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block mr-1.5"></span>;
      case "Selesai": return <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block mr-1.5"></span>;
      case "Batal": return <span className="w-1.5 h-1.5 rounded-full bg-error inline-block mr-1.5"></span>;
      default: return null;
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if(editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? editingOrder : o));
      setEditingOrder(null);
    }
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
        <button className="px-6 py-3 bg-white text-on-surface border border-outline-variant/30 rounded-full font-bold shadow-sm hover:bg-surface-container-low transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Ekspor CSV
        </button>
      </div>

      {/* Rangkuman Metrik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl p-6 shadow-xl shadow-primary/20 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-3xl opacity-80">touch_app</span>
            <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-md mb-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 24%</span>
          </div>
          <div>
            <p className="text-primary-fixed leading-tight font-medium mb-1">Total Klik ke WA</p>
            <h3 className="text-4xl font-black">1,402</h3>
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
              {orders.filter(o => o.status === "Selesai").length} 
              <span className="text-sm font-medium text-outline whitespace-nowrap hidden sm:inline">/ dari {orders.length} total</span>
            </h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 shadow-sm flex flex-col justify-between tonal-depth w-full overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-warning-container flex items-center justify-center">
              <span className="material-symbols-outlined text-warning">local_shipping</span>
            </div>
            <span className="bg-surface-container text-on-surface-variant text-xs font-bold px-2 py-1 rounded-md mb-2 shrink-0">Butuh Aksi</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-medium mb-1 truncate">Sedang Diproses/Menunggu</p>
            <h3 className="text-3xl font-black text-on-surface flex items-baseline gap-1">
              {orders.filter(o => o.status === "Diproses" || o.status === "Menunggu").length} 
              <span className="text-sm font-medium text-outline hidden sm:inline">Paket</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Filter Status */}
      <div className="bg-surface-container-lowest p-2 rounded-2xl flex gap-1 mb-6 border border-outline-variant/20 box-border overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? "bg-primary text-white shadow-sm" 
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            {tab}
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
                <th className="p-5 font-bold text-center w-[120px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors bg-white">
                    <td className="p-5">
                      <div className="font-bold text-on-surface">{order.id}</div>
                      <div className="text-xs text-on-surface-variant font-medium mt-0.5">{order.date}</div>
                    </td>
                    <td className="p-5 font-bold text-on-surface">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface shrink-0">
                          {order.user.charAt(0)}
                        </div>
                        <div className="truncate">
                          <div>{order.user}</div>
                          <div className="text-xs font-medium text-on-surface-variant mt-0.5">{order.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="font-medium text-on-surface max-w-[200px] truncate">{order.product}</div>
                      <div className="text-primary font-bold mt-0.5">{order.amount}</div>
                    </td>
                    <td className="p-5">
                      {/* Status Dropdown */}
                      <div className="relative status-dropdown-container">
                        <button 
                          onClick={() => setOpenDropdownId(openDropdownId === order.id ? null : order.id)}
                          className={`w-full max-w-[140px] px-4 py-2 rounded-full text-sm transition-colors flex items-center justify-between ${getStatusBadgeClass(order.status)}`}
                        >
                          <span className="flex items-center">
                            {getStatusDot(order.status)}
                            {order.status}
                          </span>
                          <span className="material-symbols-outlined text-[16px] opacity-70">expand_more</span>
                        </button>
                        
                        {openDropdownId === order.id && (
                          <div className="absolute top-12 left-0 w-[140px] bg-white border border-outline-variant/20 shadow-xl rounded-2xl py-2 z-50 animate-fade-in">
                            {statusOptions.map((statusOpt) => (
                              <button
                                key={statusOpt}
                                onClick={() => changeStatus(order.id, statusOpt)}
                                className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors flex items-center ${
                                  order.status === statusOpt 
                                    ? "bg-primary/5 text-primary" 
                                    : "text-on-surface hover:bg-surface-container-low"
                                }`}
                              >
                                {getStatusDot(statusOpt)}
                                {statusOpt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleChat(order.phone, order.user)}
                          className="w-10 h-10 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors tooltip flex items-center justify-center group" 
                          title="Chat WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">chat</span>
                        </button>
                        <button 
                          onClick={() => setEditingOrder(order)}
                          className="w-10 h-10 bg-surface-container text-on-surface-variant rounded-full hover:bg-surface-container-high transition-colors tooltip flex items-center justify-center group" 
                          title="Edit Pesanan"
                        >
                          <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

      {/* Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditingOrder(null)}
          ></div>
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-[2rem] p-8 shadow-2xl relative z-10 animate-fade-in">
            <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">edit_document</span>
              Ubah Data Pesanan
            </h3>
            <form onSubmit={handleSaveEdit}>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Nama Pelanggan</label>
                  <input 
                    type="text" 
                    value={editingOrder.user}
                    onChange={(e) => setEditingOrder({...editingOrder, user: e.target.value})}
                    className="w-full border-2 border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none text-on-surface font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Nomor WA</label>
                  <input 
                    type="text" 
                    value={editingOrder.phone}
                    onChange={(e) => setEditingOrder({...editingOrder, phone: e.target.value})}
                    className="w-full border-2 border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Total Harga</label>
                  <input 
                    type="text" 
                    value={editingOrder.amount}
                    onChange={(e) => setEditingOrder({...editingOrder, amount: e.target.value})}
                    className="w-full border-2 border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none text-on-surface font-bold text-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setEditingOrder(null)}
                  className="flex-1 py-3.5 px-6 rounded-full font-bold text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3.5 px-6 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}

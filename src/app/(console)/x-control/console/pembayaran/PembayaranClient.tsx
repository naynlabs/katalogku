"use client";

import React, { useState, useTransition } from "react";
import { adminUpsertBank, adminDeleteBank, adminApproveSubscription } from "@/lib/actions";
import { formatRupiah } from "@/lib/utils";

type Bank = {
  id: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: string;
};

type Invoice = {
  id: number;
  invoiceId: string;
  amount: number;
  paymentProofUrl: string | null;
  status: string;
  createdAt: string;
  storeName: string;
  planName: string;
};

export default function PembayaranClient({ banks: initialBanks, invoices: initialInvoices }: { banks: Bank[], invoices: Invoice[] }) {
  const [banks, setBanks] = useState(initialBanks);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [activeTab, setActiveTab] = useState<"BANK" | "INVOICE">("BANK");

  const [showForm, setShowForm] = useState(false);
  const [currentBank, setCurrentBank] = useState<Bank | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const openForm = (bank?: Bank) => {
    if (bank) {
      setCurrentBank(bank);
      setBankName(bank.bankName);
      setAccountNumber(bank.accountNumber);
      setAccountName(bank.accountName);
      setLogoUrl(bank.logoUrl || "");
      setIsActive(bank.isActive);
    } else {
      setCurrentBank(null);
      setBankName("");
      setAccountNumber("");
      setAccountName("");
      setLogoUrl("");
      setIsActive(true);
    }
    setShowForm(true);
  };

  const handleSave = () => {
    if (!bankName || !accountNumber || !accountName) return;
    
    startTransition(async () => {
      await adminUpsertBank({
        id: currentBank?.id,
        bankName,
        accountNumber,
        accountName,
        logoUrl: logoUrl || undefined,
        isActive,
      });

      setShowForm(false);
      window.location.reload(); 
    });
  };

  const handleDelete = (id: number) => {
    if(!confirm("Yakin ingin menghapus bank ini?")) return;
    startTransition(async () => {
      await adminDeleteBank(id);
      window.location.reload();
    });
  };

  const handleApprove = (invoiceId: string) => {
    if(!confirm("Setujui pembayaran ini dan aktifkan paket toko?")) return;
    startTransition(async () => {
      await adminApproveSubscription(invoiceId);
      window.location.reload();
    });
  };

  const waitingCount = invoices.filter(i => i.status === "WAITING_CONFIRMATION").length;

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Pembayaran Manual</h1>
          <p className="text-on-surface-variant mt-1">Atur rekening platform & verifikasi struk transfer dari toko.</p>
        </div>
        <button 
          onClick={() => { setActiveTab("BANK"); openForm(); }}
          className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all whitespace-nowrap"
        >
          + Tambah Rekening
        </button>
      </div>

      <div className="flex bg-surface-container rounded-xl p-1 gap-1 max-w-sm">
        <button 
          onClick={() => setActiveTab("BANK")} 
          className={`flex-1 py-2 font-bold text-sm rounded-lg transition-all ${activeTab === "BANK" ? "bg-surface shadow-sm text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
        >
          Rekening Platform
        </button>
        <button 
          onClick={() => setActiveTab("INVOICE")} 
          className={`flex-1 py-2 font-bold text-sm rounded-lg transition-all flex justify-center items-center gap-2 ${activeTab === "INVOICE" ? "bg-surface shadow-sm text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
        >
          Verifikasi Tagihan
          {waitingCount > 0 && <span className="bg-amber-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{waitingCount}</span>}
        </button>
      </div>

      {activeTab === "BANK" && (
        <>
          {showForm && (
        <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold text-on-surface">{currentBank ? "Edit Rekening" : "Tambah Rekening Baru"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Nama Bank / E-Wallet</label>
              <input value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="BCA / GoPay" className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">No. Rekening / No. HP</label>
              <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="0821xxxx / 812xxxx" className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Atas Nama</label>
              <input value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="PT Katalogku / Budi" className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Logo URL (Icon)</label>
              <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Status</label>
              <div className="flex items-center gap-3 h-10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={isActive} onChange={() => setIsActive(true)} className="text-primary focus:ring-primary" />
                  <span className="text-sm font-medium">Aktif</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!isActive} onChange={() => setIsActive(false)} className="text-primary focus:ring-primary" />
                  <span className="text-sm font-medium">Nonaktif</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 justify-end">
            <button onClick={() => setShowForm(false)} className="px-5 py-2 hover:bg-surface-container rounded-xl font-bold text-sm transition-colors text-on-surface">Batal</button>
            <button onClick={handleSave} disabled={isPending || !bankName || !accountNumber || !accountName} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50">
              {isPending ? "Menyimpan..." : "Simpan Rekening"}
            </button>
          </div>
        </div>
      )}

      {banks.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm p-12 text-center text-on-surface-variant">
           <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">account_balance</span>
           <h2 className="text-xl font-bold mb-2 text-on-surface">Belum Ada Rekening</h2>
           <p className="max-w-md mx-auto">Tambahkan rekening Bank atau E-Wallet untuk menerima transfer manual dari Merchant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banks.map((bank) => (
            <div key={bank.id} className={`bg-gradient-to-br from-surface to-surface-container-lowest rounded-3xl p-6 border shadow-sm relative overflow-hidden group ${bank.isActive ? "border-outline-variant/30" : "border-outline-variant/20 opacity-70"}`}>
               {!bank.isActive && (
                  <div className="absolute top-4 right-4 bg-surface-container-highest text-on-surface px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">Nonaktif</div>
               )}
               
               <div className="flex items-center gap-4 mb-6">
                 {bank.logoUrl ? (
                   <img src={bank.logoUrl} alt={bank.bankName} className="w-12 h-12 rounded-xl object-contain bg-white p-1 shadow-sm" />
                 ) : (
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                     {bank.bankName.charAt(0)}
                   </div>
                 )}
                 <div>
                   <h3 className="font-extrabold text-lg text-on-surface">{bank.bankName}</h3>
                   <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide">Manual Transfer</p>
                 </div>
               </div>

               <div className="space-y-4 mb-6">
                 <div>
                   <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Nomor Rekening</p>
                   <p className="font-mono text-xl text-on-surface tracking-wider font-extrabold">{bank.accountNumber}</p>
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Atas Nama</p>
                   <p className="font-bold text-on-surface text-sm uppercase">{bank.accountName}</p>
                 </div>
               </div>

               <div className="flex gap-2 pt-4 border-t border-outline-variant/10">
                 <button onClick={() => openForm(bank)} className="flex-1 py-2 text-sm font-bold text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors">Edit</button>
                 <button onClick={() => handleDelete(bank.id)} className="w-10 flex items-center justify-center text-error bg-error/10 rounded-xl hover:bg-error/20 transition-colors">
                   <span className="material-symbols-outlined text-[18px]">delete</span>
                 </button>
               </div>
            </div>
          ))}
        </div>
      )}
      </>
      )}
      {activeTab === "INVOICE" && (
        <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-surface-container-lowest text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/15">
                <tr>
                  <th className="py-4 px-6 font-bold">Invoice</th>
                  <th className="py-4 px-6 font-bold">Toko & Paket</th>
                  <th className="py-4 px-6 font-bold">Total Pembayaran</th>
                  <th className="py-4 px-6 font-bold">Bukti Transfer</th>
                  <th className="py-4 px-6 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl mb-2 opacity-30 block">receipt_long</span>
                      <p className="font-medium">Tidak ada tagihan yang menunggu verifikasi saat ini.</p>
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono font-bold text-on-surface block">{inv.invoiceId}</span>
                        <span className={`inline-flex mt-1 items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          inv.status === "WAITING_CONFIRMATION" ? "bg-amber-100 text-amber-700" : "bg-surface-container-high text-on-surface-variant"
                        }`}>
                          {inv.status === "WAITING_CONFIRMATION" ? "Menunggu ACC" : "Belum Transfer"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-on-surface">{inv.storeName}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">Paket: {inv.planName}</p>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-on-surface text-lg">
                        {formatRupiah(inv.amount)}
                      </td>
                      <td className="py-4 px-6">
                        {inv.paymentProofUrl ? (
                          <a href={inv.paymentProofUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                            <span className="material-symbols-outlined text-[16px]">image</span> Cek Struk
                          </a>
                        ) : (
                          <span className="text-xs font-medium text-on-surface-variant italic">Belum ada</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleApprove(inv.invoiceId)}
                          disabled={isPending || inv.status !== "WAITING_CONFIRMATION"}
                          className="px-4 py-2 bg-green-50 text-green-700 font-bold rounded-lg text-xs hover:bg-green-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          {isPending ? "..." : "Approve Tagihan"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

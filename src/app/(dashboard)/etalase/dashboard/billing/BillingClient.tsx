"use client";

import React, { useState, useTransition } from "react";
import { formatRupiah } from "@/lib/utils";
import { merchantCheckoutSubscription, merchantConfirmPayment } from "@/lib/actions";

type Plan = {
  id: number;
  name: string;
  price: number;
  billingCycle: string;
  limitsJson: Record<string, number | boolean> | null;
};

type Bank = {
  id: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  logoUrl: string | null;
};

type PendingInvoice = {
  invoiceId: string;
  amount: number;
  status: string;
  planName: string;
} | null;

export default function BillingClient({ 
  plans, 
  banks, 
  currentPlanName,
  pendingInvoice: initialInvoice
}: { 
  plans: Plan[]; 
  banks: Bank[]; 
  currentPlanName: string;
  pendingInvoice: PendingInvoice;
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [invoice, setInvoice] = useState(initialInvoice);
  const [paymentProofUrl, setPaymentProofUrl] = useState("");

  const handleCheckout = () => {
    if (!selectedPlan) return;
    if (!confirm(`Lanjutkan berlangganan paket ${selectedPlan.name}?`)) return;

    startTransition(async () => {
      try {
        const res = await merchantCheckoutSubscription(selectedPlan.id, promoCode || null);
        window.location.reload(); // Refresh to fetch exact discounted amount from DB context
      } catch (e: any) {
        alert(e.message || "Gagal membuat tagihan. Periksa kode promo Anda.");
      }
    });
  };

  const handleConfirm = () => {
    if (!invoice) return;
    if (!confirm("Konfirmasi Anda telah melakukan transfer?")) return;

    startTransition(async () => {
      await merchantConfirmPayment(invoice.invoiceId, paymentProofUrl || null);
      setInvoice({ ...invoice, status: "WAITING_CONFIRMATION" });
    });
  };

  // State 1: WAITING CONFIRMATION FROM ADMIN
  if (invoice?.status === "WAITING_CONFIRMATION") {
    return (
      <div className="bg-surface rounded-3xl p-10 mt-10 text-center border border-outline-variant/30 shadow-sm max-w-xl mx-auto">
        <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">hourglass_empty</span>
        </div>
        <h2 className="text-2xl font-black text-on-surface mb-2">Menunggu Verifikasi Admin</h2>
        <p className="text-on-surface-variant font-medium mb-6">
          Terima kasih! Bukti transfer untuk <b>{invoice.invoiceId}</b> sedang diverifikasi oleh tim kami dalam 1x24 jam kerja.
        </p>
        <button onClick={() => window.location.reload()} className="px-6 py-2.5 font-bold text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-all">
          Refresh Status
        </button>
      </div>
    );
  }

  // State 2: PENDING PAYMENT (Needs to transfer)
  if (invoice?.status === "PENDING") {
    return (
      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden max-w-3xl mx-auto flex flex-col md:flex-row">
        {/* Left Side: Detail Tagihan */}
        <div className="p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-outline-variant/20 bg-surface-container-lowest">
          <h2 className="text-lg font-black text-on-surface mb-6">Selesaikan Pembayaran</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant font-medium">Paket</span>
              <span className="font-bold text-on-surface">{invoice.planName}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant font-medium">Invoice</span>
              <span className="font-mono font-bold text-on-surface">{invoice.invoiceId}</span>
            </div>
            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <span className="font-bold text-on-surface">Total Tagihan</span>
              <span className="text-2xl font-black text-primary">{formatRupiah(invoice.amount)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Metode Tersedia</h3>
            {banks.map(b => (
              <div key={b.id} className="p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4 bg-surface hover:border-primary/50 transition-colors">
                {b.logoUrl ? (
                   <img src={b.logoUrl} alt={b.bankName} className="w-10 h-10 object-contain" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center font-bold text-on-surface">
                    {b.bankName[0]}
                  </div>
                )}
                <div>
                  <p className="font-extrabold text-sm">{b.bankName}</p>
                  <p className="font-mono text-xs font-medium text-on-surface-variant my-0.5">{b.accountNumber}</p>
                  <p className="text-[10px] font-bold uppercase text-on-surface-variant">A.N {b.accountName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Konfirmasi */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-lg font-black text-on-surface mb-6">Konfirmasi Pembayaran</h2>
          <p className="text-sm font-medium text-on-surface-variant mb-6">
            Silakan lakukan transfer sesuai total tagihan ke salah satu rekening di samping. Harap konfirmasi setelah berhasil.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Link Bukti Transfer (Opsional)</label>
              <input 
                value={paymentProofUrl}
                onChange={e => setPaymentProofUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              />
              <p className="text-xs text-on-surface-variant mt-2 font-medium">Bisa dikosongkan jika Anda sudah transfer dengan nominal pas.</p>
            </div>
            
            <button 
              onClick={handleConfirm}
              disabled={isPending}
              className="w-full py-3.5 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {isPending ? "Memproses..." : "Ya, Saya Sudah Transfer"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // State 3: PLAN SELECTION
  return (
    <div className="space-y-10">
      <div className="inline-block bg-surface-container px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm">
        <span className="text-sm font-bold text-on-surface-variant">Plan Anda Saat Ini: </span>
        <span className="text-sm font-black text-primary px-2">{currentPlanName}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => {
          const isPro = plan.price > 0;
          const limits = plan.limitsJson || {};
          
          return (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`bg-surface rounded-3xl p-8 cursor-pointer border-2 transition-all duration-300 relative overflow-hidden ${
                selectedPlan?.id === plan.id 
                  ? "border-primary shadow-xl shadow-primary/10 ring-4 ring-primary/10 scale-[1.02]" 
                  : isPro 
                    ? "border-outline-variant/40 hover:border-primary/50 shadow-sm"
                    : "border-outline-variant/20 hover:border-outline-variant/50"
              }`}
            >
              {selectedPlan?.id === plan.id && (
                <div className="absolute top-4 right-4 text-primary bg-primary/10 rounded-full p-1.5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
              )}

              <h2 className={`text-xl font-black mb-1 ${isPro ? "text-primary" : "text-on-surface"}`}>{plan.name}</h2>
              <p className={`text-3xl font-extrabold mb-6 ${isPro ? "text-primary" : "text-on-surface"}`}>
                {plan.price === 0 ? "Gratis" : formatRupiah(plan.price).replace(",00", "")}
                {plan.price > 0 && <span className="text-sm font-medium text-on-surface-variant">/{plan.billingCycle.toLowerCase()}</span>}
              </p>

              <hr className="border-outline-variant/20 my-6" />

              <ul className="text-sm text-on-surface-variant font-medium space-y-4">
                <li className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[18px] ${isPro ? "text-primary" : "text-on-surface-variant/50"}`}>check_circle</span>
                  {limits.maxProducts === 0 ? "Produk Unlimited" : `Maksimal ${limits.maxProducts} Produk`}
                </li>
                <li className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[18px] ${limits.customDomain ? "text-primary" : "text-on-surface-variant/50"}`}>
                    {limits.customDomain ? "check_circle" : "cancel"}
                  </span>
                  Custom Domain ({limits.customDomain ? "Ya" : "Tidak"})
                </li>
                <li className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[18px] ${!limits.hasWatermark ? "text-primary" : "text-on-surface-variant/50"}`}>
                    {!limits.hasWatermark ? "check_circle" : "cancel"}
                  </span>
                  Tanpa Watermark Katalogku
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      {selectedPlan && selectedPlan.price > 0 && (
        <div className="max-w-xl mx-auto mt-12 bg-surface rounded-3xl p-8 shadow-xl border border-primary/20 text-center animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
          <h3 className="text-lg font-black text-on-surface mb-2 relative z-10">Upgrade ke {selectedPlan.name}</h3>
          <p className="text-sm font-medium text-on-surface-variant mb-6 relative z-10">Lanjutkan untuk mencetak invoice tagihan.</p>
          
          <div className="mb-6 max-w-sm mx-auto relative z-10">
             <input 
               value={promoCode}
               onChange={e => setPromoCode(e.target.value.toUpperCase())}
               placeholder="KODE PROMO (Jika ada)"
               className="w-full text-center px-4 py-3 rounded-2xl border border-outline-variant/30 bg-surface-container font-mono font-bold tracking-widest focus:ring-2 focus:ring-primary outline-none"
             />
          </div>

          <button 
            onClick={handleCheckout}
            disabled={isPending}
            className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white font-black rounded-full shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all relative z-10 disabled:opacity-50"
          >
            {isPending ? "Memproses..." : "Lanjutkan & Bayar"}
          </button>
        </div>
      )}
    </div>
  );
}

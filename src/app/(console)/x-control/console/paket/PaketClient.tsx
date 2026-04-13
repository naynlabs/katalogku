"use client";

import React, { useState, useTransition } from "react";
import { adminUpsertPlan } from "@/lib/actions";
import { formatRupiah } from "@/lib/utils";

type Plan = {
  id: number;
  name: string;
  price: number;
  billingCycle: string;
  limitsJson: Record<string, number | boolean> | null;
  isActive: boolean;
  createdAt: string;
};

export default function PaketClient({ plans: initialPlans }: { plans: Plan[] }) {
  const [plans, setPlans] = useState(initialPlans);
  const [showForm, setShowForm] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY" | "LIFETIME">("MONTHLY");
  const [isActive, setIsActive] = useState(true);
  
  // Basic Limits
  const [maxProducts, setMaxProducts] = useState("10");
  const [customDomain, setCustomDomain] = useState(false);
  const [hasWatermark, setHasWatermark] = useState(true);

  const openForm = (plan?: Plan) => {
    if (plan) {
      setCurrentPlan(plan);
      setName(plan.name);
      setPrice(String(plan.price));
      setBillingCycle(plan.billingCycle as "MONTHLY" | "YEARLY" | "LIFETIME");
      setIsActive(plan.isActive);
      
      const limits = plan.limitsJson || {};
      setMaxProducts(String(limits.maxProducts ?? 10));
      setCustomDomain(Boolean(limits.customDomain ?? false));
      setHasWatermark(Boolean(limits.hasWatermark ?? true));
    } else {
      setCurrentPlan(null);
      setName("");
      setPrice("");
      setBillingCycle("MONTHLY");
      setIsActive(true);
      setMaxProducts("10");
      setCustomDomain(false);
      setHasWatermark(true);
    }
    setShowForm(true);
  };

  const handleSave = () => {
    if (!name || !price) return;
    
    startTransition(async () => {
      const limitsJson = {
        maxProducts: Number(maxProducts) || 0,
        customDomain,
        hasWatermark,
      };

      await adminUpsertPlan({
        id: currentPlan?.id,
        name,
        price: Number(price),
        billingCycle,
        limitsJson,
        isActive,
      });

      // Optimistic UI could be added here, but revalidatePath will refresh data
      setShowForm(false);
      window.location.reload(); // Simple refresh to get the updated list
    });
  };

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Paket & Harga</h1>
          <p className="text-on-surface-variant mt-1">Konfigurasi batasan fitur (*tiering*) untuk pengguna Gratis dan Pro.</p>
        </div>
        <button 
          onClick={() => openForm()}
          className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          + Buat Paket Baru
        </button>
      </div>

      {showForm && (
        <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold text-on-surface">{currentPlan ? "Edit Paket" : "Buat Paket Baru"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Nama Paket</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="FREE, PRO, dll" className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Harga (Rp)</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="0" className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Siklus Tagihan</label>
              <select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as any)} className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none">
                <option value="MONTHLY">Bulanan</option>
                <option value="YEARLY">Tahunan</option>
                <option value="LIFETIME">Sekali Bayar (Lifetime)</option>
              </select>
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
          
          <h3 className="text-sm font-bold text-on-surface mt-6 border-b border-outline-variant/10 pb-2">Limitasi Fitur</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Maks. Produk</label>
              <input value={maxProducts} onChange={(e) => setMaxProducts(e.target.value)} type="number" placeholder="0 = Unlimited" className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="flex items-center">
               <label className="flex items-center gap-3 cursor-pointer mt-5">
                  <input type="checkbox" checked={customDomain} onChange={(e) => setCustomDomain(e.target.checked)} className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary" />
                  <span className="text-sm font-bold text-on-surface">Fitur Custom Domain</span>
               </label>
            </div>
            <div className="flex items-center">
               <label className="flex items-center gap-3 cursor-pointer mt-5">
                  <input type="checkbox" checked={hasWatermark} onChange={(e) => setHasWatermark(e.target.checked)} className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary" />
                  <span className="text-sm font-bold text-on-surface">Ada Watermark Katalogku</span>
               </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={() => setShowForm(false)} className="px-5 py-2 hover:bg-surface-container rounded-xl font-bold text-sm transition-colors text-on-surface">Batal</button>
            <button onClick={handleSave} disabled={isPending || !name || !price} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50">
              {isPending ? "Menyimpan..." : "Simpan Paket"}
            </button>
          </div>
        </div>
      )}

      {plans.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm p-12 text-center text-on-surface-variant">
           <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">price_change</span>
           <h2 className="text-xl font-bold mb-2 text-on-surface">Belum Ada Paket</h2>
           <p className="max-w-md mx-auto">Buat paket FREE dan PRO untuk mulai memonetisasi platform.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
             const isPro = plan.price > 0;
             const limits = plan.limitsJson || {};
             
             return (
              <div key={plan.id} className={`bg-surface-container-lowest rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden ${isPro ? "border-2 border-primary shadow-lg shadow-primary/10" : "border border-outline-variant/30 shadow-sm"}`}>
                {!plan.isActive && (
                  <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <span className="bg-surface-container-highest text-on-surface px-3 py-1 rounded-full font-bold text-xs">Nonaktif</span>
                  </div>
                )}
                {isPro && <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-bl-lg">Premium</div>}
                
                <h2 className={`text-lg font-black mb-1 ${isPro ? "text-primary" : "text-on-surface"}`}>{plan.name}</h2>
                <p className={`text-3xl font-extrabold mb-6 ${isPro ? "text-primary" : "text-on-surface"}`}>
                  {plan.price === 0 ? "Rp 0" : formatRupiah(plan.price).replace(",00", "")}
                  {plan.price > 0 && <span className={`text-xs font-medium ${isPro ? "text-primary/70" : "text-on-surface-variant"}`}>/{plan.billingCycle === 'MONTHLY' ? 'bln' : plan.billingCycle === 'YEARLY' ? 'thn' : 'lt'}</span>}
                </p>
                
                <ul className="text-sm text-on-surface-variant space-y-3 mb-8 w-full text-left relative z-0">
                  <li className="flex gap-2 items-center">
                    <span className={`material-symbols-outlined text-[16px] ${isPro ? "text-primary" : "text-on-surface-variant"}`}>{isPro ? "check_circle" : "check"}</span> 
                    {limits.maxProducts === 0 ? "Produk Unlimited" : `Maks ${limits.maxProducts ?? 10} produk`}
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className={`material-symbols-outlined text-[16px] ${isPro ? "text-primary" : "text-on-surface-variant"}`}>{limits.customDomain ? "check_circle" : "close"}</span> 
                    Custom domain
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className={`material-symbols-outlined text-[16px] ${isPro ? "text-primary" : "text-on-surface-variant"}`}>{limits.hasWatermark ? "close" : "check_circle"}</span> 
                    Tanpa watermark
                  </li>
                </ul>
                
                <button 
                  onClick={() => openForm(plan)}
                  className={`mt-auto w-full py-2.5 rounded-xl font-bold transition-colors text-sm relative z-20 ${
                    isPro ? "bg-primary text-white hover:bg-primary/90" : "border border-outline-variant hover:bg-surface-container"
                  }`}
                >
                  Edit Paket
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

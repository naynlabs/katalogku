"use client";

import React, { useState, useTransition } from "react";
import { adminCreatePromo, adminTogglePromo } from "@/lib/actions";
import { formatRupiah } from "@/lib/utils";

type Promo = {
  id: number;
  code: string;
  discountType: string;
  discountAmount: number;
  maxUses: number | null;
  usedCount: number;
  validUntil: string | null;
  isActive: boolean;
  createdAt: string;
};

export default function PromoClient({ promos: initialPromos }: { promos: Promo[] }) {
  const [promos, setPromos] = useState(initialPromos);
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [discountAmount, setDiscountAmount] = useState("");
  const [maxUses, setMaxUses] = useState("");

  const handleCreate = () => {
    if (!code || !discountAmount) return;
    startTransition(async () => {
      await adminCreatePromo({
        code,
        discountType,
        discountAmount: Number(discountAmount),
        maxUses: maxUses ? Number(maxUses) : undefined,
      });
      // Optimistic UI: add to list
      setPromos((prev) => [
        {
          id: Date.now(),
          code: code.toUpperCase(),
          discountType,
          discountAmount: Number(discountAmount),
          maxUses: maxUses ? Number(maxUses) : null,
          usedCount: 0,
          validUntil: null,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setCode("");
      setDiscountAmount("");
      setMaxUses("");
      setShowForm(false);
    });
  };

  const handleToggle = (promo: Promo) => {
    startTransition(async () => {
      await adminTogglePromo(promo.id, !promo.isActive);
      setPromos((prev) => prev.map((p) => (p.id === promo.id ? { ...p, isActive: !p.isActive } : p)));
    });
  };

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Kupon & Promo</h1>
          <p className="text-on-surface-variant mt-1">Buat kode diskon untuk meningkatkan konversi berlangganan.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-on-surface text-surface font-bold rounded-xl shadow-lg hover:bg-on-surface/90 transition-all flex gap-2"
        >
          <span className="material-symbols-outlined">{showForm ? "close" : "add"}</span>
          {showForm ? "Batal" : "Buat Kupon"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-on-surface">Buat Kupon Baru</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Kode</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="DISKON50"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Tipe</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as "PERCENTAGE" | "FIXED")}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="PERCENTAGE">Persentase (%)</option>
                <option value="FIXED">Nominal (Rp)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Jumlah</label>
              <input
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                placeholder={discountType === "PERCENTAGE" ? "50" : "10000"}
                type="number"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Maks. Penggunaan</label>
              <input
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                placeholder="Unlimited"
                type="number"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={isPending || !code || !discountAmount}
            className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {isPending ? "Menyimpan..." : "Simpan Kupon"}
          </button>
        </div>
      )}

      {/* Promo List */}
      {promos.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden p-8 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">confirmation_number</span>
          <h2 className="text-xl font-bold mb-2 text-on-surface">Belum Ada Kupon</h2>
          <p className="max-w-md mx-auto mb-6">Buat kupon pertama Anda, seperti &quot;DISKON50&quot;, untuk disebarkan ke audiens.</p>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-surface-container-low border-b border-outline-variant/20 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold text-on-surface-variant">Kode</th>
                  <th className="py-4 px-6 font-bold text-on-surface-variant">Diskon</th>
                  <th className="py-4 px-6 font-bold text-on-surface-variant">Penggunaan</th>
                  <th className="py-4 px-6 font-bold text-on-surface-variant">Status</th>
                  <th className="py-4 px-6 font-bold text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {promos.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-on-surface">{p.code}</td>
                    <td className="py-4 px-6 font-semibold text-on-surface">
                      {p.discountType === "PERCENTAGE" ? `${p.discountAmount}%` : formatRupiah(p.discountAmount)}
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant">
                      {p.usedCount}/{p.maxUses ?? "∞"}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        p.isActive ? "bg-green-100 text-green-700" : "bg-surface-container text-on-surface-variant"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                        {p.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleToggle(p)}
                        disabled={isPending}
                        className="text-xs font-bold text-primary hover:underline disabled:opacity-50"
                      >
                        {p.isActive ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

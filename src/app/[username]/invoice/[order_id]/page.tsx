"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Status steps for the order progress
const STATUS_STEPS = [
  { key: "created", label: "Pesanan Dibuat", icon: "receipt_long" },
  { key: "waiting", label: "Menunggu Bayar", icon: "schedule" },
  { key: "paid", label: "Sudah Bayar", icon: "check_circle" },
  { key: "shipped", label: "Dikirim", icon: "local_shipping" },
  { key: "done", label: "Selesai", icon: "verified" },
];

export default function InvoicePage({ params }: { params: { username: string; order_id: string } }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Dummy invoice data
  const invoice = {
    id: params?.order_id || "INV-20260407-001",
    date: "07 April 2026, 14:30 WIB",
    expiresAt: "08 April 2026, 14:30 WIB",
    currentStep: 1, // 0-indexed: 1 = "Menunggu Bayar"
    storeName: "Toko Kue Bunda",
    storeLogo: "/logo-baru.png",
    customer: {
      name: "Andi Saputra",
      phone: "0812-3456-7890",
      address: "Jl. Merdeka No. 45, Jakarta Selatan"
    },
    items: [
      { name: "Summer Oversized Tee", variant: "Hitam / XL", qty: 2, price: 189000 },
      { name: "Glow Essentials Set", variant: "Original", qty: 1, price: 450000 }
    ],
    shipping: 25000,
    discount: 0,
    total: 853000,
    payment: {
      bank: "BCA",
      accountNumber: "123 456 7890",
      accountName: "Clarissa Fashion Nusantara"
    }
  };

  const sellerPhone = "628123456789";
  const waConfirmMessage = encodeURIComponent(`Halo Kak, saya *${invoice.customer.name}* telah melakukan transfer sebesar *Rp ${invoice.total.toLocaleString("id-ID")}* untuk ID Pesanan *#${invoice.id}*. Berikut ini adalah bukti transfer saya:`);
  const waUrl = `https://wa.me/${sellerPhone}?text=${waConfirmMessage}`;

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text.replace(/\s/g, ''));
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = text.replace(/\s/g, '');
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const subtotal = invoice.items.reduce((s, item) => s + item.qty * item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-container-low to-surface-container flex justify-center py-6 sm:py-12 px-4">
      <main className="w-full max-w-[480px] flex flex-col gap-4">

        {/* Card 1: Invoice Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative">
          {/* Decorative top edge */}
          <div className="h-2 bg-gradient-to-r from-primary via-primary-container to-primary" />

          <div className="p-8 pb-6 flex flex-col items-center">
            {/* Store Logo */}
            <div className="w-16 h-16 rounded-2xl bg-surface-container border-2 border-outline-variant/20 overflow-hidden relative shadow-sm mb-4">
              <Image src={invoice.storeLogo} alt={invoice.storeName} fill className="object-cover" unoptimized />
            </div>
            <h1 className="text-xl font-black text-on-surface mb-1 text-center">{invoice.storeName}</h1>
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.15em]">Tagihan Pembayaran</p>
          </div>

          {/* Status stepper */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-5 left-8 right-8 h-[2px] bg-outline-variant/20 z-0" />
              <div
                className="absolute top-5 left-8 h-[2px] bg-primary z-0 transition-all duration-700"
                style={{ width: `${(invoice.currentStep / (STATUS_STEPS.length - 1)) * (100 - 16)}%` }}
              />

              {STATUS_STEPS.map((step, i) => {
                const isCompleted = i < invoice.currentStep;
                const isCurrent = i === invoice.currentStep;
                return (
                  <div key={step.key} className="flex flex-col items-center relative z-10 w-14">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : isCurrent
                        ? 'bg-primary/10 text-primary ring-2 ring-primary ring-offset-2 animate-pulse'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}>
                        {isCompleted ? 'check' : step.icon}
                      </span>
                    </div>
                    <span className={`text-[8px] font-bold uppercase tracking-wider mt-2 text-center leading-tight ${
                      isCompleted || isCurrent ? 'text-primary' : 'text-on-surface-variant'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 2: Order Details */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-6 space-y-5">
            {/* Order meta */}
            <div className="grid grid-cols-2 gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10">
              <div>
                <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">ID Pesanan</p>
                <p className="text-sm font-black text-on-surface">#{invoice.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">Tanggal</p>
                <p className="text-sm font-bold text-on-surface">{invoice.date}</p>
              </div>
            </div>

            {/* Timer / Expiration */}
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200/50 p-3.5 rounded-2xl">
              <span className="material-symbols-outlined text-amber-600 text-[20px]">timer</span>
              <div>
                <p className="text-[11px] font-bold text-amber-800">Bayar sebelum:</p>
                <p className="text-xs font-black text-amber-900">{invoice.expiresAt}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h3 className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Penagihan Kepada</h3>
              <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10">
                <p className="font-bold text-on-surface text-sm">{invoice.customer.name}</p>
                <p className="text-xs text-on-surface-variant mt-1">{invoice.customer.phone}</p>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{invoice.customer.address}</p>
              </div>
            </div>

            {/* Item List */}
            <div>
              <h3 className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">Rincian Belanja</h3>
              <div className="space-y-3">
                {invoice.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface text-sm">{item.name}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">{item.variant} • {item.qty}x</p>
                    </div>
                    <p className="font-black text-on-surface text-sm shrink-0">Rp {(item.qty * item.price).toLocaleString("id-ID")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 border-t border-dashed border-outline-variant/30 pt-4">
              <div className="flex justify-between items-center text-sm font-medium text-on-surface-variant">
                <span>Subtotal Produk</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-on-surface-variant">
                <span>Ongkos Kirim</span>
                <span>Rp {invoice.shipping.toLocaleString("id-ID")}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between items-center text-sm font-medium text-green-600">
                  <span>Diskon</span>
                  <span>- Rp {invoice.discount.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg font-black text-primary border-t border-outline-variant/20 pt-4 mt-2">
                <span>Total Tagihan</span>
                <span>Rp {invoice.total.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Payment Instructions */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance</span>
              Cara Pembayaran
            </h3>
            
            {/* Bank Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-2xl text-white relative overflow-hidden group mb-5 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-6 -mb-6" />
              
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1 relative z-10">Transfer Bank {invoice.payment.bank}</p>
              <div className="flex items-center justify-between relative z-10 mb-1">
                <h4 className="text-2xl font-black tracking-[0.15em]">{invoice.payment.accountNumber}</h4>
                <button
                  onClick={() => handleCopy(invoice.payment.accountNumber, 'account')}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors active:scale-90"
                  title="Salin Nomor Rekening"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedField === 'account' ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
              <p className="text-sm font-medium text-white/70 relative z-10">a/n {invoice.payment.accountName}</p>
              
              {copiedField === 'account' && (
                <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-fade-in shadow-lg z-20">
                  ✓ Tersalin!
                </div>
              )}
            </div>

            {/* Copy Total */}
            <button
              onClick={() => handleCopy(invoice.total.toString(), 'total')}
              className="w-full flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl mb-5 hover:bg-surface-container-low transition-colors group active:scale-[0.98]"
            >
              <div className="text-left">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total Transfer</p>
                <p className="text-lg font-black text-primary">Rp {invoice.total.toLocaleString("id-ID")}</p>
              </div>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                copiedField === 'total' ? 'bg-green-100 text-green-600' : 'bg-surface-container-high text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary'
              }`}>
                <span className="material-symbols-outlined text-[18px]">
                  {copiedField === 'total' ? 'check' : 'content_copy'}
                </span>
              </div>
            </button>

            {/* CTA WhatsApp */}
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white rounded-2xl font-black shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex justify-center items-center gap-2.5 text-[15px]"
            >
              <span className="material-symbols-outlined text-[22px]">verified</span>
              Saya Sudah Transfer
            </a>
            <p className="text-center text-[10px] text-on-surface-variant mt-3 font-medium">Klik tombol di atas untuk konfirmasi pembayaran via WhatsApp</p>
          </div>
        </div>

        {/* Growth Loop Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-primary-container/20 border border-primary/20 rounded-3xl p-6 text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-primary text-[22px]">storefront</span>
            </div>
            <h4 className="font-black text-on-surface text-sm mb-1">Mau punya Toko Online seperti ini?</h4>
            <p className="text-xs text-on-surface-variant font-medium mb-4 max-w-[280px] mx-auto leading-relaxed">
              Buat etalasemu sendiri dalam hitungan menit. Gratis selamanya, tanpa coding!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              Bikin Toko Gratis
            </Link>
          </div>
        </div>

        {/* Footer Watermark */}
        <p className="text-center text-[10px] text-on-surface-variant/50 font-bold uppercase tracking-[0.2em] py-4">
          ⚡ Powered by Katalogku
        </p>

      </main>
    </div>
  );
}

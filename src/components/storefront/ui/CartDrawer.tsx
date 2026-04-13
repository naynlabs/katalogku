import Image from "next/image";
import { formatRupiah } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons";
import type { CheckoutForm } from "@/types";

export interface CartDrawerProps {
  showCheckout: boolean;
  setShowCheckout: (show: boolean) => void;
  cartItems: any[];
  removeFromCart: (id: number) => void;
  addToCart: (id: number) => void;
  checkoutForm: CheckoutForm;
  setCheckoutForm: (form: CheckoutForm) => void;
  totalItems: number;
  totalPrice: number;
  checkoutToWA: () => void;
  checkoutLoading: boolean;
}

export function CartDrawer({
  showCheckout,
  setShowCheckout,
  cartItems,
  removeFromCart,
  addToCart,
  checkoutForm,
  setCheckoutForm,
  totalItems,
  totalPrice,
  checkoutToWA,
  checkoutLoading,
}: CartDrawerProps) {
  if (!showCheckout) return null;

  return (
    <div className="fixed inset-0 z-[999] flex justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)}></div>
      <div className="absolute bottom-0 w-full max-w-[480px] bg-white rounded-t-[2.5rem] shadow-[-10px_-10px_40px_rgba(0,0,0,0.1)] flex flex-col h-[85vh] animate-slide-up overflow-hidden">
        <div className="p-5 border-b border-black/5 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
          <h2 className="text-xl font-black text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            Keranjang
          </h2>
          <button onClick={() => setShowCheckout(false)} className="w-8 h-8 flex items-center justify-center bg-black/5 rounded-full hover:bg-black/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar">
          <div className="space-y-4">
            {cartItems.map((c: any) => (
              <div key={c.id} className="flex gap-4 items-center bg-surface-container-lowest p-3 rounded-2xl border border-black/5 group">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/5 shrink-0 border border-black/5">
                  <Image alt={c.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" src={c.img || "https://placehold.co/400x500"} unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-on-surface line-clamp-1">{c.name}</h4>
                  <p className="text-xs font-bold text-primary mt-1">{formatRupiah(c.price)}</p>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-high rounded-full p-1 shadow-inner">
                  <button onClick={() => removeFromCart(c.id)} className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm text-on-surface hover:text-error transition-colors active:scale-90">
                    <span className="material-symbols-outlined text-[16px]">remove_shopping_cart</span>
                  </button>
                  <span className="font-black text-sm w-4 text-center">{c.qty}</span>
                  <button onClick={() => addToCart(c.id)} className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm text-on-surface hover:text-primary transition-colors active:scale-90">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-black/5"></div>

          <div className="space-y-4 bg-surface-container-lowest p-5 rounded-2xl border border-black/5">
            <h3 className="font-black text-sm mb-2 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">person</span>
              Info Pengiriman
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 block pl-3">Nama Lengkap *</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-on-surface-variant/40 font-medium"
                  value={checkoutForm.name}
                  onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 block pl-3">Nomor WhatsApp *</label>
                <input 
                  type="tel" 
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-on-surface-variant/40 font-medium"
                  value={checkoutForm.phone}
                  onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 block pl-3">Alamat Lengkap</label>
                <textarea 
                  placeholder="Contoh: Jl. Merdeka No. 45, Kecamatan..."
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-on-surface-variant/40 font-medium"
                  value={checkoutForm.address}
                  onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 block pl-3">Catatan Opsional</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Tolong dikirim pakai Gojek..."
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-on-surface-variant/40 font-medium"
                  value={checkoutForm.notes}
                  onChange={e => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-black/5 bg-surface-container-lowest pb-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total Pembayaran</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{totalItems} Produk</p>
            </div>
            <p className="text-2xl font-black text-primary tracking-tight">{formatRupiah(totalPrice)}</p>
          </div>
          <button 
            onClick={checkoutToWA} 
            disabled={checkoutLoading}
            className="w-full py-4 bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white rounded-2xl font-black shadow-lg shadow-green-500/20 hover:scale-[1.01] active:scale-[0.98] transition-transform flex items-center justify-center gap-2.5 disabled:opacity-70"
          >
            {checkoutLoading ? (
              <span>Memproses Pesanan...</span>
              ) : (
                <>
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                Pesan via WhatsApp
              </>
              )}
          </button>
        </div>
      </div>
    </div>
  );
}

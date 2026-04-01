import Link from "next/link";

export default function InvoicePage({ params }: { params: { username: string, order_id: string } }) {
  // Dummy data invoice
  const invoice = {
    id: params.order_id,
    date: "01 Mei 2026, 14:30 WIB",
    status: "Menunggu Pembayaran", // Menunggu Pembayaran, Lunas, Batal
    storeName: "Katalog Fashion Clarissa",
    customer: {
      name: "Andi Saputra",
      phone: "0812-3456-7890",
      address: "Jl. Merdeka No. 45, Jakarta Selatan"
    },
    items: [
      { name: "Summer Oversized Tee", qty: 2, price: 189000 },
      { name: "Glow Essentials Set", qty: 1, price: 450000 }
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

  return (
    <div className="min-h-screen bg-surface-container-low flex justify-center py-6 sm:py-12 px-4">
      {/* Container utama berbentuk menyerupai Kertas Invoice */}
      <main className="w-full max-w-[480px] bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Dekorasi Atas (Mirip Lipatan Kertas) */}
        <div className="absolute top-0 inset-x-0 h-4 bg-primary-fixed/30 flex justify-around items-end">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-t-full bg-white"></div>
          ))}
        </div>

        {/* Header Invoice */}
        <div className="p-8 pb-6 flex flex-col items-center border-b border-dashed border-outline-variant/30 mt-4">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">receipt_long</span>
          </div>
          <h1 className="text-xl font-black text-on-surface mb-1 text-center">{invoice.storeName}</h1>
          <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Tagihan Pembayaran</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Status Badge */}
          <div className="flex flex-col items-center">
            <span className="bg-warning-container text-on-warning-container text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 mb-2 animate-pulse">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {invoice.status}
            </span>
            <p className="text-[11px] text-on-surface-variant font-medium text-center">Tunggu konfirmasi lunas dari penjual</p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20">
            <div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">ID Pesanan</p>
              <p className="text-sm font-bold text-on-surface">#{invoice.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">Tanggal</p>
              <p className="text-sm font-bold text-on-surface">{invoice.date}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Penagihan Kepada:</h3>
            <p className="font-bold text-on-surface text-sm">{invoice.customer.name}</p>
            <p className="text-sm text-on-surface-variant mt-0.5">{invoice.customer.phone}</p>
            <p className="text-sm text-on-surface-variant mt-0.5 leading-relaxed">{invoice.customer.address}</p>
          </div>

          {/* Tabel Rincian */}
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3 border-b border-outline-variant/20 pb-2">Rincian Belanja</h3>
            <div className="space-y-4">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-on-surface text-sm">{item.name}</p>
                    <p className="text-xs text-on-surface-variant font-medium">{item.qty} x Rp {item.price.toLocaleString("id-ID")}</p>
                  </div>
                  <p className="font-bold text-on-surface text-sm">Rp {(item.qty * item.price).toLocaleString("id-ID")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-dashed border-outline-variant/30 pt-4">
            <div className="flex justify-between items-center text-sm font-medium text-on-surface-variant">
              <span>Subtotal Produk</span>
              <span>Rp {(invoice.total - invoice.shipping).toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-on-surface-variant">
              <span>Ongkos Kirim / Lainnya</span>
              <span>Rp {invoice.shipping.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-black text-primary border-t border-outline-variant/20 pt-4 mt-2">
              <span>Total Tagihan</span>
              <span>Rp {invoice.total.toLocaleString("id-ID")}</span>
            </div>
          </div>

        </div>

        {/* Instruksi Pembayaran Ditekankan dengan Warna Gelap */}
        <div className="bg-surface-container-high p-8 flex-1 mt-auto">
          <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_balance</span>
            Cara Pembayaran
          </h3>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-outline-variant/20 mb-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-[40px] z-0"></div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 relative z-10">Transfer Bank {invoice.payment.bank}</p>
            <h4 className="text-2xl font-black text-on-surface tracking-widest mb-1 relative z-10">{invoice.payment.accountNumber}</h4>
            <p className="text-sm font-bold text-on-surface-variant relative z-10">a/n {invoice.payment.accountName}</p>
            
            <button className="absolute bottom-4 right-4 bg-surface-container hover:bg-surface-container-high rounded-full w-8 h-8 flex items-center justify-center transition-colors tooltip z-10" title="Salin Rekening">
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
            </button>
          </div>

          <a 
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white rounded-full font-black shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 text-[15px]"
          >
            <span className="material-symbols-outlined text-[20px]">verified</span>
            Saya Sudah Transfer
          </a>
          <p className="text-center text-[10px] text-on-surface-variant mt-4 font-bold uppercase tracking-widest">Powered by Katalogku</p>
        </div>
        
      </main>
    </div>
  );
}

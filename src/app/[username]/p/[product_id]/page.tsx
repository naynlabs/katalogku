import Link from "next/link";
import Image from "next/image";
import { getProductById, getStoreBySlug } from "@/lib/queries";
import { formatRupiah } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ProductDetailPage(props: { params: Promise<{ username: string, product_id: string }> }) {
  const params = await props.params;
  const store = await getStoreBySlug(params.username);
  
  if (!store) return notFound();

  const productData = await getProductById(Number(params.product_id));
  if (!productData || productData.storeId !== store.id) return notFound();

  const product = {
    name: productData.name,
    price: formatRupiah(Number(productData.price)),
    originalPrice: productData.originalPrice ? formatRupiah(Number(productData.originalPrice)) : null,
    description: productData.description || "Tidak ada deskripsi tersedia.",
    features: [
      productData.stockStatus === "AVAILABLE" ? "Stok Tersedia" : productData.stockStatus === "PRE_ORDER" ? "Sistem Pre-Order" : "Stok Habis"
    ],
    image: productData.imageUrl || "https://placehold.co/800x800/eeeeee/999999?text=No+Image", 
    stockLabel: productData.stockStatus === "SOLD_OUT" ? "Habis Terjual!" : "Stok Tersedia",
  };

  const sellerPhone = store.whatsappNumber || ""; 
  const waMessage = encodeURIComponent(`Halo kak, saya tertarik untuk membeli produk *${product.name}* seharga ${product.price}. Apakah masih tersedia?`);
  const waUrl = `https://wa.me/${sellerPhone}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-surface-container-low flex justify-center sm:py-8">
      {/* Container Utama Ala Handphone (Mobile-First) */}
      <main className="w-full max-w-[480px] bg-white sm:rounded-[2.5rem] sm:shadow-[0px_20px_60px_rgba(0,0,0,0.08)] relative min-h-screen flex flex-col overflow-hidden pb-24">
        
        {/* Header - Tombol Kembali */}
        <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between p-4">
          <Link 
            href={`/${params.username}`}
            className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface shadow-sm hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface shadow-sm hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </header>

        {/* Gambar Produk */}
        <div className="w-full aspect-square bg-surface-container-high relative">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
          />
          {/* Label Diskon/Stok Menipis ditaruh di atas gambar */}
          <div className="absolute bottom-4 left-4 bg-error text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            {product.stockLabel}
          </div>
        </div>

        {/* Konten Produk */}
        <div className="p-6 flex-1 bg-white relative -mt-6 rounded-t-3xl z-10">
          
          {/* Nama & Harga */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-outline-variant line-through">{product.originalPrice}</span>
              <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">Diskon</span>
            </div>
            <h1 className="text-2xl font-black text-on-surface leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-3xl font-black text-primary tracking-tight">
              {product.price}
            </p>
          </div>

          <div className="w-full h-px bg-outline-variant/20 mb-6"></div>

          {/* Rincian Fitur */}
          <div className="mb-6">
            <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
              Info Penting
            </h3>
            <ul className="space-y-2">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-[16px] text-green-500 mt-0.5">check_circle</span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-px bg-outline-variant/20 mb-6"></div>

          {/* Deskripsi */}
          <div className="mb-8">
            <h3 className="font-bold text-on-surface mb-3">Deskripsi Lengkap</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

        </div>

        {/* Footer Fix / Call To Action */}
        <div className="fixed sm:absolute bottom-0 inset-x-0 w-full max-w-[480px] mx-auto bg-white/90 backdrop-blur-xl border-t border-outline-variant/20 p-4 z-50">
          <a 
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white rounded-full font-black shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 text-[15px]"
          >
            {/* Ikon WA (pakai material symbols chat sbg pengganti) */}
            <span className="material-symbols-outlined text-[20px]">chat</span>
            Beli via WhatsApp Sekarang
          </a>
        </div>
        
      </main>
    </div>
  );
}

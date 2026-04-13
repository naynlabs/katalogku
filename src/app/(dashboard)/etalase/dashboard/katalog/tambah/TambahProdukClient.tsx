"use client";

import Link from "next/link";
import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/lib/validations";
import { createProduct, getUploadSignature } from "@/lib/actions";

type CategoryItem = { id: number; name: string };

export default function TambahProdukClient({
  categories,
}: {
  categories: CategoryItem[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(true);
  
  // Image Upload State
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", price: "", category: "", description: "", isAvailable: true },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 10MB");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Dapatkan parameter otentikasi dari backend (signature, token, expire)
      const authParams = await getUploadSignature();
      
      // 2. Siapkan payload formData untuk dikirim ke ImageKit
      const formData = new FormData();
      formData.append("file", file);
      formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "");
      formData.append("signature", authParams.signature);
      formData.append("expire", authParams.expire.toString());
      formData.append("token", authParams.token);
      formData.append("fileName", file.name);
      formData.append("folder", "/katalogku/produk");

      // 3. Eksekusi pengunggahan Peer-to-Cloud
      const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Gagal mengunggah foto");

      const uploadData = await uploadRes.json();
      setImageUrl(uploadData.url);
      
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: ProductFormData) => {
    startTransition(async () => {
      const result = await createProduct({
        name: data.name,
        price: data.price,
        description: data.description || undefined,
        categoryId: data.category ? parseInt(data.category, 10) : undefined,
        stockStatus: isActive ? "AVAILABLE" : "SOLD_OUT",
        imageUrl: imageUrl || undefined,
      });
      if (result.success) {
        router.push("/etalase/dashboard/katalog");
      }
    });
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/etalase/dashboard/katalog"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </Link>
        <div>
          <h2 className="text-xl font-extrabold text-on-surface font-headline tracking-tight">
            Tambah Produk Baru
          </h2>
          <nav className="hidden md:flex gap-2 text-xs text-on-surface-variant font-medium mt-1">
            <Link href="/etalase/dashboard/katalog" className="hover:underline">
              Produk Saya
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">Entry Baru</span>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Media Upload */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                Media Produk
              </h3>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/png, image/jpeg, image/webp" 
                className="hidden" 
              />
              
              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-primary/5 transition-all group overflow-hidden relative"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4 animate-pulse">
                    <span className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                    <p className="text-sm font-bold text-primary">Mengunggah Foto...</p>
                  </div>
                ) : imageUrl ? (
                   <img src={imageUrl} alt="Pratinjau" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface mb-1">Tarik foto ke sini</p>
                    <p className="text-xs text-on-surface-variant">
                      atau klik untuk memilih file dari perangkat Anda
                    </p>
                    <p className="mt-4 text-[10px] uppercase font-bold text-outline-variant px-3 py-1 bg-white rounded-full">
                      JPG, PNG, WEBP up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">inventory_2</span>
                  <span className="text-sm font-bold">Status Stok</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
              <p className="text-xs text-on-surface-variant">
                Nonaktifkan jika produk sedang tidak tersedia untuk sementara waktu.
              </p>
            </div>
          </div>

          {/* Right: Form Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Informasi Utama
              </h3>

              {/* Nama Produk */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Nama Produk</label>
                <input
                  type="text"
                  placeholder="Contoh: Kopi Susu Gula Aren 500ml"
                  {...register("name")}
                  className={`w-full bg-surface-container-low border-2 ${errors.name ? 'border-error' : 'border-transparent'} rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 placeholder:text-outline/60 text-sm font-medium outline-none`}
                />
                {errors.name && <p className="text-error text-xs font-bold ml-1">{errors.name.message}</p>}
              </div>

              {/* Kategori & Harga Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant ml-1">Kategori</label>
                  <div className="relative">
                    <select
                      {...register("category")}
                      className="w-full appearance-none bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-sm font-medium outline-none text-on-surface-variant"
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id.toString()}>{c.name}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant ml-1">Harga Satuan</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-sm font-bold text-primary">Rp</span>
                    </div>
                    <input
                      type="text"
                      placeholder="0"
                      {...register("price")}
                      className={`w-full bg-surface-container-low border-2 ${errors.price ? 'border-error' : 'border-transparent'} rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/40 placeholder:text-outline/60 text-sm font-bold outline-none`}
                    />
                  </div>
                  {errors.price && <p className="text-error text-xs font-bold ml-1">{errors.price.message}</p>}
                </div>
              </div>

              {/* Deskripsi */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Deskripsi Produk</label>
                <textarea
                  placeholder="Ceritakan mengapa pelanggan harus membeli produk Anda..."
                  rows={5}
                  {...register("description")}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 placeholder:text-outline/60 text-sm font-medium outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Bottom Actions */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white/90 backdrop-blur-xl border-t border-outline-variant/10 px-6 py-4 flex items-center justify-between z-40">
          <Link
            href="/etalase/dashboard/katalog"
            className="px-6 py-3 text-sm font-bold text-on-surface-variant hover:text-error transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-10 py-3 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
          >
            {isPending && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
            {isPending ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}

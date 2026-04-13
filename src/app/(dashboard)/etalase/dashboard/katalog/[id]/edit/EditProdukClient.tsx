"use client";

import Link from "next/link";
import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/lib/validations";
import { updateProduct, deleteProduct, getUploadSignature } from "@/lib/actions";

type SerializedProduct = {
  id: number;
  name: string;
  price: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  stockStatus: "AVAILABLE" | "SOLD_OUT" | "PRE_ORDER";
  categoryId: number | null;
};

type CategoryItem = {
  id: number;
  name: string;
};

export default function EditProdukClient({
  product,
  categories,
}: {
  product: SerializedProduct;
  categories: CategoryItem[];
}) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);

  // Image Upload State
  const [imageUrl, setImageUrl] = useState<string | null>(product.imageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      category: product.categoryId?.toString() ?? "",
      description: product.description ?? "",
      isAvailable: product.isActive,
    },
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
      const authParams = await getUploadSignature();
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "");
      formData.append("signature", authParams.signature);
      formData.append("expire", authParams.expire.toString());
      formData.append("token", authParams.token);
      formData.append("fileName", file.name);
      formData.append("folder", "/katalogku/produk");

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
    setActionError(null);
    startTransition(async () => {
      const result = await updateProduct(product.id, {
        name: data.name,
        price: data.price,
        description: data.description || undefined,
        categoryId: data.category ? parseInt(data.category, 10) : null,
        isActive: data.isAvailable ?? true,
        imageUrl: imageUrl || undefined,
      });
      if (result.success) {
        router.push("/etalase/dashboard/katalog");
      }
    });
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      await deleteProduct(product.id);
      router.push("/etalase/dashboard/katalog");
    });
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8 pb-12 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/etalase/dashboard/katalog"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-xl font-black text-primary font-headline tracking-tight">
              Edit Produk: {product.name}
            </h1>
            <nav className="hidden md:flex items-center gap-2 mt-1 text-sm text-on-surface-variant font-medium">
              <Link href="/etalase/dashboard/katalog" className="hover:text-primary transition-colors">
                Produk Saya
              </Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-on-surface">Edit Produk</span>
            </nav>
          </div>
        </div>

        {/* Error Banner */}
        {actionError && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-error">error</span>
            <p className="text-sm text-error font-medium">{actionError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Media & Stock */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border">
              <label className="block text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                Foto Produk
              </label>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/png, image/jpeg, image/webp" 
                className="hidden" 
              />
              
              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className="relative group cursor-pointer aspect-square rounded-lg mb-4 flex items-center justify-center overflow-hidden border-2 border-dashed hover:border-primary/50 transition-colors bg-surface-container-low"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4 animate-pulse">
                    <span className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                    <p className="text-sm font-bold text-primary">Mengunggah Foto...</p>
                  </div>
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <div className="flex flex-col items-center opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-outline text-6xl mb-2">image</span>
                    <span className="text-sm font-bold text-on-surface">Ganti Foto</span>
                  </div>
                )}
              </div>
              
              <p className="text-[10px] text-on-surface-variant mt-4 leading-relaxed uppercase font-bold tracking-wider text-center">
                Format JPG, PNG atau WebP. Maks 10MB.
              </p>
            </section>

            <section className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-on-surface">Status Persediaan</h3>
                <p className="text-sm text-on-surface-variant">Aktifkan jika stok tersedia</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register("isAvailable")} className="sr-only peer" />
                <div className="w-14 h-7 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </section>
          </div>

          {/* Right Column: Details Form */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(77,68,227,0.06)] ghost-border space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Informasi Detail
              </h2>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant ml-1">Nama Produk</label>
                <input
                  type="text"
                  placeholder="Contoh: Sepatu Lari Pro"
                  {...register("name")}
                  className={`w-full bg-surface-container-low border-2 ${errors.name ? 'border-error' : 'border-transparent'} rounded-lg px-4 py-3 focus:bg-white focus:border-primary transition-all font-medium text-on-surface outline-none`}
                />
                {errors.name && <p className="text-error text-xs font-bold mt-1 ml-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-on-surface-variant ml-1">Harga (IDR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">Rp</span>
                    <input
                      type="text"
                      {...register("price")}
                      className={`w-full bg-surface-container-low border-2 ${errors.price ? 'border-error' : 'border-transparent'} rounded-lg pl-12 pr-4 py-3 focus:bg-white focus:border-primary transition-all font-bold text-on-surface outline-none`}
                    />
                  </div>
                  {errors.price && <p className="text-error text-xs font-bold mt-1 ml-1">{errors.price.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-on-surface-variant ml-1">Kategori</label>
                  <div className="relative">
                    <select
                      {...register("category")}
                      className={`w-full bg-surface-container-low border-2 ${errors.category ? 'border-error' : 'border-transparent'} rounded-lg px-4 py-3 focus:bg-white focus:border-primary transition-all font-medium text-on-surface appearance-none outline-none`}
                    >
                      <option value="">Pilih Kategori...</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id.toString()}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                      expand_more
                    </span>
                  </div>
                  {errors.category && <p className="text-error text-xs font-bold mt-1 ml-1">{errors.category.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant ml-1">Deskripsi Produk</label>
                <textarea
                  rows={5}
                  {...register("description")}
                  className="w-full bg-surface-container-low border-2 border-transparent rounded-lg px-4 py-3 focus:bg-white focus:border-primary transition-all text-on-surface leading-relaxed outline-none resize-none"
                ></textarea>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-gradient-to-br from-primary to-primary-container text-white py-4 px-8 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:active:scale-100"
              >
                {isPending ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <span className="material-symbols-outlined">save</span>}
                {isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                type="button"
                className="sm:px-8 py-4 bg-error-container text-on-error-container rounded-full font-bold hover:bg-error/10 transition-colors flex items-center justify-center gap-2 border border-error/10 hover:scale-[1.02] active:scale-95"
              >
                <span className="material-symbols-outlined">delete_forever</span>
                Hapus Produk
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          <div className="bg-surface-container-lowest max-w-sm w-full rounded-[2rem] p-8 shadow-2xl relative z-10 animate-scale-in">
            <div className="w-16 h-16 bg-error-container/50 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="material-symbols-outlined text-error text-3xl">warning</span>
            </div>
            <h3 className="text-xl font-bold text-center text-on-surface mb-2">Hapus Produk Ini?</h3>
            <p className="text-center text-sm text-on-surface-variant mb-8 leading-relaxed">
              Anda yakin ingin menghapus <span className="font-bold text-on-surface">{product.name}</span> dari katalog? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3.5 px-6 rounded-full font-bold text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isPending}
                className="flex-1 py-3.5 px-6 rounded-full font-bold text-white bg-error hover:bg-red-700 shadow-lg shadow-error/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

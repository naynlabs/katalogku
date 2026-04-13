"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteProduct } from "@/lib/actions";
import { formatRupiah } from "@/lib/utils";

export type ProductItem = {
  id: number;
  name: string;
  price: string;
  imageUrl: string | null;
  isActive: boolean;
  category: { id: number; name: string } | null;
};

export type CategoryItem = {
  id: number;
  name: string;
};

export default function KatalogPage({
  products: initialProducts,
  categories: initialCategories,
}: {
  products: ProductItem[];
  categories: CategoryItem[];
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isPending, startTransition] = useTransition();

  const categoryNames = ["Semua", ...initialCategories.map((c) => c.name)];

  const filteredProducts = activeCategory === "Semua"
    ? initialProducts
    : initialProducts.filter((p) => p.category?.name === activeCategory);

  const handleDeleteClick = (product: { id: number; name: string }) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    startTransition(async () => {
      await deleteProduct(productToDelete.id);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    });
  };

  return (
    <>
      <div className="relative z-10">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 mt-4">
          <div>
            <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Katalog Produk</h2>
            <p className="text-on-surface-variant">Kelola koleksi terbaik toko Anda hari ini.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-full ring-1 ring-outline-variant/15 focus:ring-primary/40 focus:ring-2 shadow-sm transition-all text-sm outline-none" placeholder="Cari nama produk..." type="text" />
            </div>
            <Link 
              href="/etalase/dashboard/katalog/tambah"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Tambah Produk
            </Link>
          </div>
        </section>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-2 hide-scrollbar">
          {categoryNames.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-secondary-fixed text-on-secondary-fixed font-bold shadow-sm"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-16">
              <span className="material-symbols-outlined text-outline/30 text-6xl mb-4 block">inventory_2</span>
              <p className="font-bold text-on-surface-variant text-lg">Belum ada produk</p>
              <p className="text-sm text-outline">Tambahkan produk pertama Anda untuk mulai berjualan</p>
            </div>
          )}
          {filteredProducts.map((p) => (
            <div key={p.id} className="group bg-surface-container-lowest rounded-xl p-4 shadow-[0px_20px_40px_rgba(77,68,227,0.06)] hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden flex flex-col">
              <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4 bg-surface-container-low flex items-center justify-center">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="material-symbols-outlined text-outline/30 text-6xl group-hover:scale-110 transition-transform duration-500">image</span>
                )}
                {p.category && (
                  <span className="absolute top-3 right-3 bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {p.category.name}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg text-on-surface leading-tight mb-1">{p.name}</h3>
              <p className="text-primary font-bold text-xl mb-4 flex-1">{formatRupiah(Number(p.price))}</p>
              <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/10">
                <Link 
                  href={`/etalase/dashboard/katalog/${p.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-surface-container-low text-on-surface-variant rounded-full text-xs font-bold hover:bg-primary-fixed transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">edit</span> Edit
                </Link>
                <button 
                  onClick={() => handleDeleteClick({ id: p.id, name: p.name })}
                  className="w-10 h-10 flex items-center justify-center bg-error-container/30 text-error rounded-full hover:bg-error-container transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))}

          {/* Empty State / Add */}
          <Link 
            href="/etalase/dashboard/katalog/tambah"
            className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-8 text-center bg-surface-container-low/30 hover:bg-surface-container-low transition-colors cursor-pointer group min-h-[400px]"
          >
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">add_circle</span>
            </div>
            <h3 className="font-bold text-on-surface-variant mb-1">Produk Baru</h3>
            <p className="text-sm text-outline px-4">Mulai tambahkan produk unggulan Anda di sini</p>
          </Link>
        </div>
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
              Anda yakin ingin menghapus <span className="font-bold text-on-surface">{productToDelete?.name}</span> dari katalog? Tindakan ini tidak dapat dibatalkan.
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

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema, AddCategoryFormData } from "@/lib/validations";

export default function KategoriPage() {
  const [categories, setCategories] = useState([
    { id: "cat-1", name: "Fashion Pria", count: 12, enabled: true },
    { id: "cat-2", name: "Aksesoris", count: 8, enabled: true },
    { id: "cat-3", name: "Diskon Lebaran 🌙", count: 24, enabled: true },
    { id: "cat-4", name: "Produk Habis (Out of Stock)", count: 0, enabled: false },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddCategoryFormData>({
    resolver: zodResolver(addCategorySchema),
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{id: string, name: string} | null>(null);

  const onAddCategory = (data: AddCategoryFormData) => {
    const newId = `cat-${Date.now()}`;
    setCategories([...categories, { id: newId, name: data.name, count: 0, enabled: true }]);
    reset();
  };

  const handleSaveEdit = (id: string) => {
    if (!editingName.trim()) return;
    setCategories(categories.map(c => c.id === id ? { ...c, name: editingName } : c));
    setEditingId(null);
  };

  const toggleStatus = (id: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const confirmDelete = (cat: {id: string, name: string}) => {
    setCategoryToDelete(cat);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if(categoryToDelete) {
      setCategories(categories.filter(c => c.id !== categoryToDelete.id));
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
            Manajemen Kategori
          </h2>
          <p className="text-on-surface-variant text-sm">
            Atur kelompok etalase produk Anda untuk mempermudah navigasi pembeli.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Form Tambah Kategori */}
        <div className="lg:col-span-4 space-y-6">
          <form onSubmit={handleSubmit(onAddCategory)} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 tonal-depth">
            <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              Kategori Baru
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Nama Kategori</label>
                <input 
                  type="text" 
                  placeholder="Misal: Promo Akhir Tahun..."
                  {...register("name")}
                  className={`w-full bg-surface-container-low border-2 ${errors.name ? 'border-error' : 'border-transparent'} focus:bg-white focus:border-primary rounded-xl px-4 py-3 text-sm text-on-surface font-medium outline-none transition-colors`}
                />
                {errors.name && <p className="text-error text-xs font-bold mt-1 ml-1">{errors.name.message}</p>}
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Simpan Kategori
            </button>
          </form>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-4 items-start">
            <span className="material-symbols-outlined text-primary">tips_and_updates</span>
            <div>
              <h4 className="text-sm font-bold text-primary-fixed mb-1">Tips Konversi!</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Buat kategori khusus seperti <b>"Best Seller"</b> atau <b>"Diskon 50%"</b> dan taruh di urutan paling atas untuk memancing klik pembeli saat pertama kali membuka Link-in-Bio Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Daftar Kategori Aktif */}
        <div className="lg:col-span-8">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl shadow-sm overflow-hidden tonal-depth">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-white">
              <h3 className="font-bold text-on-surface">Daftar Kategori Anda</h3>
              <span className="text-xs font-bold bg-primary-container text-on-primary-container px-3 py-1 rounded-full">
                {categories.length} Total
              </span>
            </div>
            
            <div className="divide-y divide-outline-variant/10">
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <div key={cat.id} className="p-5 flex items-center justify-between hover:bg-surface-container-lowest transition-colors bg-white group">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Drag Handle Dummy */}
                      <span className="material-symbols-outlined text-outline-variant opacity-30 cursor-grab hover:opacity-80 active:cursor-grabbing">drag_indicator</span>
                      
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant font-bold">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        {editingId === cat.id ? (
                          <div className="flex gap-2 w-full max-w-sm">
                            <input 
                              type="text" 
                              value={editingName} 
                              onChange={(e) => setEditingName(e.target.value)}
                              className="flex-1 border-2 border-primary rounded-lg px-3 py-1 text-sm font-bold text-on-surface outline-none"
                              autoFocus
                            />
                            <button onClick={() => handleSaveEdit(cat.id)} className="bg-primary text-white p-1 rounded-md hover:bg-primary-fixed">
                              <span className="material-symbols-outlined text-[18px]">check</span>
                            </button>
                            <button onClick={() => setEditingId(null)} className="bg-surface-container text-on-surface-variant p-1 rounded-md hover:bg-surface-container-high">
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>
                        ) : (
                          <>
                            <h4 className={`font-bold text-[15px] mb-0.5 ${!cat.enabled ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>
                              {cat.name}
                            </h4>
                            <p className="text-xs text-on-surface-variant font-medium">
                              Terdapat {cat.count} produk
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      {/* Toggle Enable/Disable */}
                      <button 
                        onClick={() => toggleStatus(cat.id)}
                        className={`w-12 h-6 rounded-full relative transition-colors ${cat.enabled ? "bg-primary" : "bg-outline-variant/40"}`}
                        title={cat.enabled ? "Nonaktifkan Kategori" : "Aktifkan Kategori"}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${cat.enabled ? "translate-x-6" : "translate-x-0"}`}></span>
                      </button>

                      <div className="w-px h-6 bg-outline-variant/20 mx-2"></div>

                      <button 
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditingName(cat.name);
                        }}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors tooltip"
                        title="Edit Nama"
                        disabled={editingId === cat.id}
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button 
                        onClick={() => confirmDelete({id: cat.id, name: cat.name})}
                        className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors tooltip"
                        title="Hapus Kategori"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 pl-12 text-center text-on-surface-variant bg-white">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">category</span>
                  <p className="font-bold">Belum ada kategori tersimpan.</p>
                  <p className="text-xs">Buat kategori pertama Anda melalui form di sebelah kiri.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Hapus Kategori */}
      {isDeleteModalOpen && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          <div className="bg-surface-container-lowest max-w-sm w-full rounded-[2rem] p-8 shadow-2xl relative z-10 animate-scale-in">
            <div className="w-16 h-16 bg-error-container/50 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="material-symbols-outlined text-error text-3xl">delete_forever</span>
            </div>
            <h3 className="text-xl font-bold text-center text-on-surface mb-2">Hapus Kategori?</h3>
            <p className="text-center text-sm text-on-surface-variant mb-8 leading-relaxed">
              Anda yakin ingin menghapus kategori <span className="font-bold text-on-surface">{categoryToDelete.name}</span>? Produk di dalam kategori ini tidak akan terhapus, namun tidak akan memiliki kategori lagi di etalase Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3.5 px-6 rounded-full font-bold text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={executeDelete}
                className="flex-1 py-3.5 px-6 rounded-full font-bold text-white bg-error shadow-lg shadow-error/20 hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

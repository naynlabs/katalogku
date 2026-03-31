export default function PengaturanPage() {
  return (
    <>
      <section className="mt-4 mb-8">
        <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Pengaturan</h2>
        <p className="text-on-surface-variant">Kelola profil dan preferensi toko kamu.</p>
      </section>

      {/* Profile Section */}
      <section className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 tonal-depth mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Profil Toko</h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-4xl">storefront</span>
            </div>
            <button className="text-sm font-bold text-primary hover:underline">Ganti Foto</button>
          </div>
          <div className="flex-1 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Nama Toko</label>
              <input className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all outline-none" defaultValue="Butik Clarissa" type="text" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Deskripsi Toko</label>
              <textarea className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all outline-none h-24 resize-none" defaultValue="Fashion & lifestyle terbaik untuk wanita modern Indonesia." />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Nomor WhatsApp</label>
              <input className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all outline-none" defaultValue="+62 812 3456 7890" type="tel" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
            Simpan Perubahan
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-surface-container-lowest rounded-xl p-8 border border-error/20 tonal-depth">
        <h3 className="text-xl font-bold text-error mb-4">Zona Bahaya</h3>
        <p className="text-on-surface-variant text-sm mb-6">Aksi ini bersifat permanen dan tidak dapat dibatalkan.</p>
        <button className="px-6 py-3 bg-error-container text-on-error-container rounded-full font-bold text-sm hover:bg-error hover:text-on-error transition-colors">
          Hapus Akun
        </button>
      </section>
    </>
  );
}

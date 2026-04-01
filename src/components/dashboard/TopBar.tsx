export default function TopBar() {
  return (
    <header className="flex justify-between items-center w-full px-4 lg:px-8 py-4 z-40 bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 border-b border-outline-variant/10 text-sm font-medium">
      <div className="flex items-center gap-4">
        <span className="text-xl font-black text-slate-900 md:hidden">Katalogku</span>
        <div className="hidden md:flex flex-col">
          <span className="text-on-surface-variant text-xs">Selamat Datang,</span>
          <span className="font-bold text-lg text-on-surface">Butik Clarissa</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 outline-none" placeholder="Cari pesanan..." type="text" />
        </div>
        <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container/20 bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-xl">person</span>
        </button>
      </div>
    </header>
  );
}

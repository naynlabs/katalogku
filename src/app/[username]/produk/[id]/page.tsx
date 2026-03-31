import Link from "next/link";
import Footer from "@/components/landing/Footer"; // Gunakan Footer publik yang sudah ada

export default function PublicProductDetailPage({ params }: { params: { username: string, id: string } }) {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen pb-32 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#f8f9fb]/80 backdrop-blur-md shadow-sm border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <Link
              href={`/${params.username}`}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors group"
            >
              <span className="material-symbols-outlined text-on-surface">arrow_back</span>
            </Link>
            <span className="text-xl font-bold text-[#191c1e] font-headline tracking-tight">Katalogku</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href={`/${params.username}`} className="text-[#3525cd] font-semibold text-sm">
              Beranda
            </Link>
            <Link href={`/${params.username}#kategori`} className="text-slate-500 hover:text-[#3525cd] transition-colors text-sm">
              Kategori
            </Link>
            <Link href={`/${params.username}#tentang`} className="text-slate-500 hover:text-[#3525cd] transition-colors text-sm">
              Tentang Toko
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors text-slate-600">
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
            <button className="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors text-slate-600">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="pt-24 px-4 md:px-6 max-w-5xl mx-auto flex-1 w-full">
        {/* Back to Store Link */}
        <div className="mb-6">
          <Link
            href={`/${params.username}`}
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
            <span className="text-sm">Kembali ke Toko Utama</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Product Gallery Section */}
          <section className="space-y-4 md:sticky md:top-24">
            <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-lowest ghost-border group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5SVTMCtp4Rc5tTWJYtzQoBNezUiwPdQNF0E9ObdgFKYi_CDMBrIznJ_gJ3S9EWRAW-0dv4XYFvgljWANIZ8fHpwQ6rJPVOC2DUtMDaX9ucl1K6n7e8mn9SjOoVeqLQnHbD-5sLNJK2Jy-UHuXXdI8g0ztJkaZRhlDyg10ff8e6aBfQ8alLAC07PfRjH4NqFhV6wPXJiIbEI8CPOa-HJQFKyZYw_6BS9AoZADKXypY18lUmU8V0mwNsMc3d5VCTuQSwymS3uoWovIw"
                alt="Premium Product Image"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Thumbnail Strip */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-primary flex-shrink-0 cursor-pointer shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5xGm0zjWZjAy0spzkpuqiUhuPZqeE158dSLI5xtYrPJJ2XE0Cq3grZks-NPSxuEG_kM-qHvN4XYv1B909FwsT80UAYmAkcwdtA5Cbmup0LqMTb-UdrK7mraS6DphpP_OkLQSnzxB-aBj-LxBkBDTIm5B552OanvJBOBWY7lh5ERijbYiG-u1YJziXrqL05ncrRof2k0KgQ8r6_d-DI2k0gNCYiTC_EE4fNpbMlod7hnoRLfcedmFLFgaTmTsuJW0MLkknmdJqCHg9"
                  alt="Thumb 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-outline-variant/30 flex-shrink-0 cursor-pointer hover:border-primary/50 transition-colors">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChp5LOT1IUerLbOJ5ZlyZ22h5-mklE60R8ehh3zNsi-RkBe_s8VEIa77MJCPeL3Qd6sFXCaAR7ocOUAXOlA7CgadBjvdbMYcGPggYOXrr31KPyaY6v6z906TuR53IQVC0rIxDvDUH-LI5n9AsTyrHZUEEN2wsfZw7FFgHJWMQJIY6PndVcUiF-tdAbrvmXZ-R68pP7-Mk_vm0C2P8blDZifRqCJE1EMtP-Pm6ujrNRYz0ddo__FdFh8o9f7cq3A8AGygoGj0zhH41p"
                  alt="Thumb 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-outline-variant/30 flex-shrink-0 cursor-pointer hover:border-primary/50 transition-colors">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQuNZGwv07bOQDzc7hwGa57qyQjKgKg9gcDAty7FdEKoXtPOpSqxasUOV0F5svg7sLfsVF_89XR3IK5YDSSG5MdGYUZRtFbLK5_ECtyGvu_bXbAr41xCIh9p6-UDCtmOnqOUbLIdHBcUSdDzf1bQdF9ads8rlq8RaADVGygSjB4XhtHDYNnWKVKdWJSMbL_5YFO7uElVNDTYbsFT8JG5aVVMWCfSJU42k45_ratnN27levFRZg8Lk0VNz3fGxzmq-e9ItrMOpguvrw"
                  alt="Thumb 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Product Details Section */}
          <section className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary-fixed-variant text-[10px] font-bold uppercase tracking-wider">
                  Terlaris
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
                  Stok Ready
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface font-headline leading-tight tracking-tight">
                Jam Tangan Minimalist Signature Series v.2
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-primary font-headline tracking-tighter">Rp 1.499.000</span>
                <span className="text-lg text-on-surface-variant line-through font-bold opacity-70 border-b border-on-surface-variant/30">Rp 1.850.000</span>
              </div>
            </div>

            {/* Product Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-lowest rounded-2xl flex items-center gap-3 ghost-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest line-clamp-1">Garansi</p>
                  <p className="text-sm font-bold line-clamp-1">2 Tahun Resmi</p>
                </div>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-2xl flex items-center gap-3 ghost-border">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest line-clamp-1">Pengiriman</p>
                  <p className="text-sm font-bold line-clamp-1">Gratis Ongkir</p>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-black font-headline tracking-tight">Deskripsi Produk</h3>
              <div className="text-on-surface-variant leading-relaxed text-sm space-y-4 font-medium">
                <p>
                  Hadir dengan desain yang lebih ramping dan elegan, Signature Series v.2 adalah perpaduan sempurna antara fungsionalitas modern dan estetika klasik. Dibuat dengan material stainless steel 316L kualitas premium yang tahan korosi dan goresan.
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li className="pl-1">Mesin Quartz Jepang yang sangat presisi</li>
                  <li className="pl-1">Kaca Kristal Safir anti gores</li>
                  <li className="pl-1">Tahan air hingga kedalaman 50 meter (5 ATM)</li>
                  <li className="pl-1">Tali kulit Italia asli dengan sistem quick-release</li>
                </ul>
              </div>
            </div>

            {/* Merchant Info */}
            <div className="p-6 bg-surface-container-low rounded-xl flex items-center justify-between ghost-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm ring-2 ring-white">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0L7yr5cm6T5qypOLRdWqYcOLii2CkAOuQJJNr5_2vZFOK5eiSlQEG9-XWolM7MOYvHAY6nqDTae9Pi5J7CJtaVpRX6anZqBIv0up7RFkPYOmOv3gZc0UN3fUxN8wQwKkgC9mDUCloPudeAMvHZB_I3LoAjJ2bK7wsUBcO4bR_jM6wmPW65G8HmD7yfNjcgxiNFVR9vhOL2-2Vywr6-ybmdHpgR9uZ9NvDzaTZkSBOOtR-7HffaPVyQOJLqSh1me9SD-HI6rgMRWDo"
                    alt="Merchant"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">{params.username || "Katalogku"} Official Store</h4>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">Aktif 5 menit yang lalu • Jakarta</p>
                </div>
              </div>
              <Link
                href={`/${params.username}`}
                className="hidden sm:block px-5 py-2 bg-white text-primary text-xs font-bold rounded-full border border-primary/20 hover:bg-primary/5 transition-colors"
              >
                Kunjungi Toko
              </Link>
            </div>
          </section>
        </div>
      </main>

      <div className="mt-20">
        <Footer />
      </div>

      {/* Sticky Action Bar (Desktop & Mobile Unified Logic) */}
      <div className="fixed bottom-0 md:bottom-6 left-0 right-0 z-50 px-0 md:px-6 pointer-events-none pb-safe">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl md:rounded-full shadow-[0px_-10px_30px_rgba(77,68,227,0.08)] md:shadow-[0px_20px_50px_rgba(77,68,227,0.12)] border border-outline-variant/10 p-4 md:p-3 pointer-events-auto flex flex-col md:flex-row items-center gap-4 border-t">
          
          {/* Quantity Selector */}
          <div className="flex items-center bg-surface-container-low rounded-full p-1 w-full md:w-auto justify-between md:justify-start">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-error transition-colors text-on-surface-variant font-bold">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="px-6 font-bold text-lg min-w-[50px] text-center shrink-0 w-20">1</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors text-primary font-bold">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          
          {/* Main CTA Button */}
          <button className="w-full h-14 md:h-12 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all group shrink-0 shadow-md">
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
              shopping_cart
            </span>
            <span className="text-sm md:text-base tracking-tight truncate px-2">Tambah ke Keranjang • Rp 1.499.000</span>
          </button>
          
          {/* Desktop Secondary Actions */}
          <div className="hidden md:flex gap-2">
            <button className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary font-bold hover:bg-primary/5 hover:scale-105 active:scale-95 transition-all outline-none">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container font-bold shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center transition-all outline-none border border-secondary/20">
              <span className="material-symbols-outlined">chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

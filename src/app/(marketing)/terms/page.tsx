import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <>
    <Navbar />
    <div className="bg-background text-on-surface min-h-screen py-16 px-6 relative overflow-hidden pt-32">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-surface-container opacity-50 blur-[100px] rounded-full -z-10"></div>
      
      <main className="max-w-3xl mx-auto z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline mb-12">
          <span className="material-symbols-outlined">arrow_back</span>
          Kembali ke Beranda
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight mb-4">
          Syarat dan Ketentuan
        </h1>
        <p className="text-on-surface-variant font-medium mb-10">Pembaruan Terakhir: 1 April 2026</p>

        <div className="prose prose-neutral prose-invert max-w-none text-on-surface-variant space-y-6 bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] shadow-sm border border-outline-variant/10">
          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">1. Penerimaan Syarat</h2>
            <p className="leading-relaxed">
              Selamat datang di <strong>Katalogku</strong>. Dengan mengakses dan menggunakan platform kami (Website, Dashboard, dan Toko Publik), Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju, mohon untuk tidak menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">2. Penggunaan Layanan</h2>
            <p className="leading-relaxed">
              Katalogku menyediakan platform digital bagi pengguna untuk memamerkan dan mengatur katalog produk mereka yang terhubung ke WhatsApp. Anda bertanggung jawab penuh atas:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Keakuratan informasi produk yang Anda unggah.</li>
              <li>Menjaga kerahasiaan kata sandi akun Anda.</li>
              <li>Segala bentuk transaksi yang terjadi antara Anda dan pembeli Anda (Katalogku hanya bertindak sebagai etalase penghubung).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">3. Konten Terlarang</h2>
            <p className="leading-relaxed">
              Pengguna dilarang keras mengunggah foto, teks, atau produk yang mengandung:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Barang ilegal berdasarkan hukum Republik Indonesia.</li>
              <li>Konten dewasa, kekerasan, atau ujaran kebencian.</li>
              <li>Pelanggaran hak cipta milik pihak lain.</li>
            </ul>
            <p className="mt-2 text-error text-sm font-bold bg-error-container/20 p-3 rounded-lg">Katalogku berhak menghapus konten atau memblokir akun secara sepihak jika ditemukan pelanggaran.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">4. Pembayaran dan Langganan</h2>
            <p className="leading-relaxed">
              Paket "Pro Business" kami ditagih secara berlangganan (Bulanan/Tahunan). Pembayaran tidak dapat dikembalikan (non-refundable) kecuali ada ketertentuan khusus atau kegagalan sistem dari sisi Katalogku. Anda dapat membatalkan perpanjangan langganan kapan saja dari dasbor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">5. Batasan Tanggung Jawab</h2>
            <p className="leading-relaxed">
              Layanan Katalogku disediakan secara "apa adanya" (as is). Katalogku tidak bertanggung jawab atas kerugian langsung, tidak langsung, maupun operasional bisnis akibat gangguan server sementara (downtime), kehilangan data di luar kendali wajar, atau penipuan antara penjual dan pembeli.
            </p>
          </section>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}

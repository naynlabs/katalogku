import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function PrivacyPage() {
  return (
    <>
    <Navbar />
    <div className="bg-background text-on-surface min-h-screen py-16 px-6 relative overflow-hidden pt-32">
      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-primary opacity-5 blur-[120px] rounded-full -z-10"></div>
      
      <main className="max-w-3xl mx-auto z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline mb-12">
          <span className="material-symbols-outlined">arrow_back</span>
          Kembali ke Beranda
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight mb-4">
          Kebijakan Privasi
        </h1>
        <p className="text-on-surface-variant font-medium mb-10">Pembaruan Terakhir: 1 April 2026</p>

        <div className="prose prose-neutral prose-invert max-w-none text-on-surface-variant space-y-6 bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] shadow-sm border border-outline-variant/10">
          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p className="leading-relaxed mb-2">
              Saat Anda menggunakan <strong>Katalogku</strong>, kami mengumpulkan jenis informasi berikut agar layanan kami dapat berjalan secara optimal:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Informasi Akun:</strong> Alamat email, kata sandi (terenkripsi), dan username tokoh Anda.</li>
              <li><strong>Informasi Toko:</strong> Nomor WhatsApp, nama toko, gambar produk, dan deskripsi publik dari katalog Anda.</li>
              <li><strong>Data Analitik:</strong> Alamat IP tersamarkan, tipe peramban (browser), halaman yang sering dikunjungi untuk memberikan metrik kepada pemilik toko.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p className="leading-relaxed">
              Kami menggunakan informasi yang dikumpulkan secara ketat untuk:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Mengoperasikan, memelihara, dan menyediakan portal toko publik Anda.</li>
              <li>Mencegah aktivitas mencurigakan, spam, atau penyalahgunaan layanan.</li>
              <li>Memberikan laporan statistik internal dashboard kepada Anda (jumlah kunjungan, produk dilihat).</li>
              <li>Mengirimkan informasi teknis atau terkait pembayaran tagihan langganan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">3. Keamanan Data Publik vs Privat</h2>
            <p className="leading-relaxed">
              Ingatlah bahwa katalog, foto produk, dan nomor WhatsApp toko Anda **ditujukan untuk dilihat publik**. Data ini dapat diakses oleh siapa saja di internet yang mengunjungi link toko Anda.
            </p>
            <p className="leading-relaxed mt-4">
              Sebaliknya, **data privat** (seperti alamat email untuk login dan kata sandi Anda) dilindungi setat mungkin menggunakan standar keamanan industri *(Hashing/Bcrypt)* dan tidak pernah dibagikan ke pihak ketiga mana pun tanpa persetujuan Anda, apalagi dijual untuk keperluan iklan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">4. Cookies dan Pelacak Pihak Ketiga</h2>
            <p className="leading-relaxed">
              Katalogku menggunakan *Cookies* anonim esensial agar Anda bisa tetap masuk (login) ke dalam Dasbor. Kami juga mendukung penempatan alat analitik pihak ketiga (seperti <em>Meta Pixel</em> atau <em>TikTok Pixel</em>) **hanya jika** pemilik toko berlangganan paket Pro dan memasangnya sendiri secara sadar. Semua jejak piksel pada toko publik adalah tanggung jawab penjual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">5. Hubungi Kami</h2>
            <p className="leading-relaxed">
              Jika Anda ingin menghapus seluruh data Anda dari peladen (server) kami, Anda dapat melakukannya secara mandiri dari Dasbor bagian <strong>"Keamanan Akun"</strong>. Data Anda akan hancur permanen seutuhnya. Jika butuh bantuan terkait privasi, silakan kirungi surel ke: <span className="font-bold text-primary">privacy@katalogku.com</span>.
            </p>
          </section>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}

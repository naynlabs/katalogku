"use client";

import { useState } from "react";

const faqs = [
  { q: "Apa itu Katalogku dan untuk siapa?", a: "Katalogku adalah platform yang menggabungkan halaman 'Link-in-Bio' dengan etalase produk digital. Cocok untuk pemilik bisnis online, reseller, UMKM, kreator konten, dan siapa saja yang berjualan lewat media sosial dan ingin semua link serta produknya tersusun rapi di satu halaman." },
  { q: "Apakah saya harus bayar untuk mulai menggunakan Katalogku?", a: "Tidak. Seluruh fitur inti yang Anda butuhkan untuk memulai jualan — mulai dari membuat halaman link, mengunggah katalog produk, hingga menerima pesanan lewat WhatsApp — tersedia secara gratis tanpa batas waktu." },
  { q: "Apakah ada potongan komisi dari setiap penjualan saya?", a: "Tidak ada potongan sama sekali. Katalogku tidak memproses pembayaran. Seluruh transaksi terjadi langsung antara Anda dan pembeli melalui WhatsApp, jadi 100% uang masuk ke rekening Anda sendiri." },
  { q: "Bagaimana alur belanja dari sisi pembeli saya?", a: "Pembeli membuka tautan toko Anda, melihat-lihat produk, menambahkan yang diinginkan ke keranjang, mengisi nama dan alamat pengiriman, lalu menekan tombol Checkout. Setelah itu, sistem akan otomatis membuka WhatsApp dengan pesan berisi daftar pesanan lengkap beserta total harga yang langsung terkirim ke nomor Anda." },
  { q: "Apakah pembeli perlu mengunduh aplikasi untuk berbelanja?", a: "Tidak perlu. Pembeli cukup membuka tautan toko Anda dari browser HP mereka — bisa langsung dari Instagram, TikTok, atau aplikasi chatting mana pun. Tidak ada proses instalasi sama sekali." },
  { q: "Bagaimana cara menaruh link toko saya di Instagram?", a: "Salin alamat toko Anda (contoh: katalogku.com/namatoko), buka Instagram, ketuk 'Edit Profil', lalu tempelkan alamat tersebut di kolom 'Situs Web' atau 'Tautan'. Setelah disimpan, pengikut Anda bisa langsung mengkliknya dari profil Anda." },
  { q: "Bagaimana cara menaruh link toko di TikTok?", a: "Buka profil TikTok Anda, pilih 'Edit Profil', dan masukkan alamat toko ke kolom 'Situs Web'. Catatan penting: pastikan akun TikTok Anda sudah diubah ke mode 'Akun Bisnis' terlebih dahulu, karena kolom tautan hanya tersedia di mode tersebut." },
  { q: "Ada batasan jumlah produk yang bisa saya unggah?", a: "Saat ini tidak ada pembatasan jumlah produk. Anda bebas mengunggah sebanyak yang dibutuhkan sesuai skala bisnis Anda." },
  { q: "Kenapa foto produk saya terlihat buram atau pecah?", a: "Hal ini biasanya terjadi karena resolusi gambar terlalu rendah. Pastikan foto yang Anda unggah minimal berukuran 800x800 piksel dengan format persegi (1:1). Hindari menggunakan foto hasil screenshot atau foto yang sudah dikompres berkali-kali." },
  { q: "Apakah ongkos kirim dihitung otomatis oleh sistem?", a: "Belum untuk saat ini. Karena proses transaksi dilakukan melalui WhatsApp, Anda perlu menginformasikan biaya ongkos kirim secara manual kepada pembeli setelah menerima pesan pesanan mereka." },
  { q: "Bagaimana kalau saya ingin ganti nomor WhatsApp toko?", a: "Masuk ke menu 'Pengaturan', cari bagian nomor telepon toko, ganti dengan nomor baru Anda, lalu tekan 'Simpan'. Mulai saat itu, semua pesanan baru akan langsung diarahkan ke nomor WhatsApp yang baru." },
  { q: "Bisakah saya menjual produk digital seperti e-book atau jasa?", a: "Tentu bisa. Anda tinggal membuat produk seperti biasa — isi nama, deskripsi, dan harga. Setelah pembeli melakukan pembayaran via WhatsApp, Anda bisa mengirimkan file atau mengirimkan jasa secara manual lewat chat." },
  { q: "Bagaimana cara menandai produk yang stoknya habis?", a: "Buka menu 'Katalog', pilih produk yang dimaksud, lalu matikan toggle 'Tersedia'. Produk akan tetap terlihat di etalase toko Anda, tapi pembeli tidak bisa memasukkannya ke keranjang belanja." },
  { q: "Bagaimana cara menghapus produk dari etalase?", a: "Di menu 'Katalog', cari produk yang ingin dihapus, lalu tekan ikon atau tombol 'Hapus'. Perlu diingat bahwa produk yang sudah dihapus tidak bisa dikembalikan lagi, jadi pastikan Anda yakin sebelum menghapusnya." },
  { q: "Apa gunanya fitur Kategori?", a: "Kategori membantu mengelompokkan produk berdasarkan jenis. Misalnya jika Anda menjual pakaian, Anda bisa membuat kategori 'Atasan', 'Bawahan', dan 'Aksesoris'. Pembeli bisa memfilter produk berdasarkan kategori ini, sehingga mereka lebih cepat menemukan barang yang dicari." },
  { q: "Bisa tidak menonaktifkan toko sementara saat sedang libur?", a: "Bisa. Anda dapat menutup akses publik toko sementara melalui pengaturan akun. Selama dinonaktifkan, halaman toko tidak bisa diakses oleh siapa pun sampai Anda mengaktifkannya kembali." },
  { q: "Di mana saya bisa melihat berapa orang yang mengunjungi toko saya?", a: "Buka menu 'Analitik' di sidebar dashboard. Di sana tersedia data kunjungan, jumlah klik, serta informasi produk mana yang paling sering dilihat oleh pengunjung toko Anda." },
  { q: "Bagaimana cara mengganti warna atau tema tampilan toko?", a: "Masuk ke menu 'Links', lalu gulir ke bagian pengaturan tampilan. Di sana tersedia berbagai pilihan tema warna yang bisa langsung Anda terapkan dengan satu klik. Perubahan akan langsung terlihat di halaman publik toko Anda." },
  { q: "Kenapa pembeli bilang sudah checkout tapi pesannya tidak masuk ke WhatsApp saya?", a: "Kemungkinan besar format nomor WhatsApp yang Anda masukkan di pengaturan kurang tepat. Pastikan tidak ada spasi, tanda hubung, atau karakter aneh. Gunakan format angka yang bersih dan pastikan nomor tersebut aktif di WhatsApp." },
  { q: "Bisakah saya mengubah template pesan yang dikirim pembeli saat checkout?", a: "Bisa. Masuk ke menu 'Teks & Konten'. Di sana Anda bisa mengubah sapaan pembuka, format daftar belanja, dan kalimat penutup. Misalnya mengubah 'Halo Admin' menjadi 'Halo Kak, saya mau pesan ini ya'." },
  { q: "Bisa tidak satu toko dikelola dua admin dengan nomor WA berbeda?", a: "Untuk saat ini, satu toko hanya bisa terhubung ke satu nomor WhatsApp utama. Hal ini untuk memastikan semua pesanan masuk ke satu tempat dan tidak tercecer." },
  { q: "Apakah saya bisa mengubah alamat link (username) toko saya?", a: "Bisa, melalui menu Pengaturan. Tapi perlu diperhatikan: setelah username diganti, link lama yang sudah Anda sebarkan di berbagai tempat (bio Instagram, kartu nama, brosur) tidak akan berfungsi lagi." },
  { q: "Bagaimana cara mengganti password akun saya?", a: "Masuk ke pengaturan akun atau keamanan di dashboard. Anda bisa mengubah password dari sana. Pastikan password baru terdiri dari kombinasi huruf dan angka agar akun Anda lebih aman." },
  { q: "Apakah data toko dan produk saya aman?", a: "Ya. Kami menggunakan sistem penyimpanan awan (cloud) yang terenkripsi. Data produk, profil toko, dan informasi pelanggan Anda disimpan dengan standar keamanan yang ketat." },
  { q: "Saya masih ada kendala teknis, bagaimana cara menghubungi tim bantuan?", a: "Anda bisa langsung menghubungi tim kami melalui tombol 'Hubungi Support' yang tersedia di halaman bantuan ini, atau kirim email ke alamat yang tercantum. Tim kami akan merespons dalam waktu maksimal 1x24 jam di hari kerja." }
];

const helpTopics = [
  {
    id: "mvp",
    icon: "stars",
    title: "Pengenalan & Fitur Utama",
    content: (
      <div className="space-y-6 animate-fade-in-up">
        <div className="mb-8">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Mulai Dari Sini</p>
          <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight mb-4">Panduan Lengkap Memulai Katalogku</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">
            Katalogku adalah platform yang membantu Anda membuat halaman profil digital berisi kumpulan link penting sekaligus etalase produk — semuanya dalam satu halaman yang bisa langsung dipasang di bio Instagram, TikTok, atau media sosial lainnya.
          </p>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-2xl my-8">
          <p className="text-sm text-blue-800 flex items-start gap-3 leading-relaxed">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">info</span>
            <span>
              <strong>Hal paling penting sebelum memulai:</strong> Pastikan nomor WhatsApp yang Anda daftarkan sudah benar dan aktif. Semua pesanan dari pembeli akan dikirim ke nomor ini. Jika nomornya salah, pesanan tidak akan sampai ke Anda.
            </span>
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-on-surface">Apa saja yang bisa Anda lakukan di Katalogku?</h3>
        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
          Katalogku memiliki dua kemampuan utama yang dirancang khusus untuk kebutuhan berjualan di media sosial:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">link</span>
              </div>
              <h4 className="font-bold text-on-surface">Halaman Link-in-Bio</h4>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Kumpulkan semua link penting Anda di satu halaman. Link ke toko Shopee, akun YouTube, grup WhatsApp, formulir pendaftaran, atau apa pun yang ingin Anda bagikan — semuanya bisa ditaruh di sini dan diatur urutannya sesuka hati.
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-green-700">shopping_cart</span>
              </div>
              <h4 className="font-bold text-on-surface">Etalase & Checkout WhatsApp</h4>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Tampilkan produk lengkap dengan foto, harga, dan deskripsi. Pembeli bisa langsung memilih barang, memasukkannya ke keranjang, dan mengirim pesanan otomatis ke WhatsApp Anda dalam satu kali klik.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-12 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">3 Langkah Pertama yang Wajib Anda Lakukan</h3>
        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
          Sebelum menyebarkan link toko ke mana-mana, pastikan tiga hal fundamental ini sudah dikonfigurasi dengan benar:
        </p>
        
        <ul className="space-y-8 text-sm text-on-surface-variant">
          <li className="flex items-start gap-5">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
            <div>
              <strong className="text-on-surface font-bold text-[15px] block mb-2">Lengkapi Profil Toko Anda</strong>
              <p className="leading-relaxed mb-3">Buka menu <b>Pengaturan</b>. Unggah logo atau foto profil toko yang jelas dan menarik. Isi nama toko dan deskripsi singkat yang menjelaskan apa yang Anda jual. Profil yang lengkap membuat pembeli lebih percaya dan yakin untuk berbelanja.</p>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl leading-relaxed">
                <b>Tips:</b> Gunakan foto dengan latar belakang bersih dan pastikan logo tidak terpotong. Ukuran yang disarankan minimal 500x500 piksel.
              </div>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
            <div>
              <strong className="text-on-surface font-bold text-[15px] block mb-2">Pastikan Nomor WhatsApp Sudah Benar</strong>
              <p className="leading-relaxed mb-3">Masih di menu <b>Pengaturan</b>, periksa kolom nomor telepon toko. Ini adalah nomor yang akan menerima semua pesan pesanan dari pembeli. Pastikan nomor ini aktif di WhatsApp dan ditulis tanpa spasi atau karakter khusus.</p>
              <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-xl leading-relaxed">
                <b>Penting:</b> Jika nomor WhatsApp salah, semua pesanan pelanggan akan terkirim ke nomor yang salah atau gagal terkirim sama sekali.
              </div>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
            <div>
              <strong className="text-on-surface font-bold text-[15px] block mb-2">Unggah Produk Pertama Anda</strong>
              <p className="leading-relaxed">Buka menu <b>Katalog</b> dan tekan tombol <b>Tambah Produk</b>. Masukkan nama produk, unggah foto yang menarik, tentukan harga, dan tulis deskripsi singkat. Setelah disimpan, produk Anda langsung tampil di halaman toko publik dan siap dipesan pembeli.</p>
            </div>
          </li>
        </ul>

      </div>
    )
  },
  {
    id: "katalog",
    icon: "inventory_2",
    title: "Panduan Katalog Produk",
    content: (
      <div className="space-y-6 animate-fade-in-up">
        <div className="mb-8">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Kelola Jualan Anda</p>
          <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight mb-4">Panduan Lengkap Katalog Produk</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">
            Menu Katalog adalah tempat Anda mengelola semua produk yang ditampilkan di etalase toko. Di sini Anda bisa menambah, mengedit, menghapus, dan mengatur ketersediaan produk.
          </p>
        </div>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Cara Menambahkan Produk Baru</h3>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Buka menu <b>Katalog</b> dari sidebar, lalu tekan tombol <b>Tambah Produk</b> di pojok kanan atas. Anda akan diminta mengisi beberapa informasi berikut:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">badge</span> Nama Produk
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed pl-7">Tuliskan nama produk yang jelas dan mudah dipahami pembeli. Contoh: "Kaos Polos Katun Premium - Hitam" lebih baik daripada sekadar "Kaos Hitam".</p>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">image</span> Foto Produk
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed pl-7">Unggah foto berkualitas dengan rasio 1:1 (persegi) dan minimal berukuran 800x800 piksel. Foto yang bersih dengan pencahayaan baik akan jauh lebih menarik minat pembeli. Hindari menggunakan foto dari screenshot chat yang biasanya sudah berkualitas rendah.</p>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">sell</span> Harga
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed pl-7">Masukkan harga dalam bentuk angka saja tanpa titik, koma, atau simbol Rp. Contoh: untuk harga Rp150.000, cukup ketik <code className="bg-surface-container-high px-1.5 py-0.5 rounded text-xs font-mono">150000</code>. Sistem akan otomatis menampilkannya dengan format mata uang yang rapi di halaman toko.</p>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">local_offer</span> Harga Coret (Diskon)
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed pl-7">Jika produk Anda sedang didiskon, isi kolom harga coret dengan harga sebelum diskon. Pembeli akan melihat harga lama dicoret dan harga baru di sebelahnya — ini sangat efektif untuk menarik minat beli.</p>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">description</span> Deskripsi
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed pl-7">Jelaskan produk secara singkat namun informatif. Sebutkan bahan, ukuran, warna yang tersedia, atau keunggulan produk. Deskripsi yang baik mengurangi pertanyaan berulang dari pembeli.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-12 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Mengedit dan Menghapus Produk</h3>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Untuk mengedit produk yang sudah ada, buka menu <b>Katalog</b>, cari produk yang ingin diubah, lalu klik untuk masuk ke halaman edit. Anda bisa mengubah nama, foto, harga, deskripsi, maupun status ketersediaan.
        </p>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Untuk menghapus produk, tekan ikon hapus pada produk yang dimaksud. <b>Perhatian:</b> produk yang sudah dihapus tidak bisa dikembalikan.
        </p>

        <h3 className="text-xl font-bold mt-12 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Mengatur Ketersediaan Stok</h3>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Jika stok produk Anda habis namun Anda tidak ingin menghapusnya, cukup matikan toggle <b>"Tersedia"</b> pada halaman edit produk. Produk tersebut akan tetap terlihat di etalase (agar pembeli tahu produk itu ada), namun tombol tambah ke keranjang akan dinonaktifkan sehingga tidak bisa dipesan.
        </p>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Ketika stok sudah tersedia kembali, cukup nyalakan lagi toggle-nya dan produk langsung bisa dipesan seperti biasa.
        </p>
      </div>
    )
  },
  {
    id: "kategori",
    icon: "category",
    title: "Panduan Kategori",
    content: (
      <div className="space-y-6 animate-fade-in-up">
        <div className="mb-8">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Organisasi Produk</p>
          <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight mb-4">Panduan Lengkap Kategori Produk</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">
            Kategori membantu mengelompokkan produk Anda agar pembeli bisa menemukan barang yang diinginkan dengan cepat tanpa harus menggulir seluruh etalase.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Kapan Sebaiknya Membuat Kategori?</h3>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Jika produk Anda masih sedikit (di bawah 10 item), kategori mungkin belum terlalu dibutuhkan. Namun begitu jumlah produk bertambah, kategori menjadi sangat penting. Bayangkan jika Anda menjual pakaian pria, pakaian wanita, dan aksesoris — pembeli wanita tentu ingin langsung melihat koleksi wanita tanpa harus melewati puluhan produk pria terlebih dahulu.
        </p>

        <h3 className="text-xl font-bold mt-10 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Cara Membuat Kategori</h3>
        <ol className="space-y-4 text-sm text-on-surface-variant">
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">1</div>
            <span className="leading-relaxed">Buka menu <b>Kategori</b> dari sidebar dashboard.</span>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">2</div>
            <span className="leading-relaxed">Klik tombol <b>Tambah Kategori</b>.</span>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">3</div>
            <span className="leading-relaxed">Beri nama yang jelas dan mudah dikenali. Contoh: "Gamis Syar&apos;i", "Sepatu Sneakers", "Makanan Ringan".</span>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">4</div>
            <span className="leading-relaxed">Simpan. Kategori baru akan muncul sebagai filter di halaman publik toko Anda.</span>
          </li>
        </ol>

        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-5 rounded-2xl leading-relaxed mt-8">
          <b>Tips:</b> Jangan membuat terlalu banyak kategori jika produk masih sedikit. 3-5 kategori biasanya sudah ideal untuk toko dengan 20-50 produk. Terlalu banyak kategori justru membingungkan pembeli.
        </div>
      </div>
    )
  },
  {
    id: "links",
    icon: "link",
    title: "Panduan Link & Tampilan",
    content: (
      <div className="space-y-6 animate-fade-in-up">
        <div className="mb-8">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Halaman Publik Anda</p>
          <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight mb-4">Panduan Lengkap Halaman Link & Tampilan</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">
            Halaman Link adalah wajah utama toko Anda di dunia digital. Di sini terkumpul semua tautan penting yang ingin Anda bagikan ke audiens — dari link media sosial, link toko marketplace, hingga link kontak bisnis.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Menambahkan Link Baru</h3>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Buka menu <b>Links</b> dari sidebar dashboard. Anda akan melihat daftar link yang sudah ada beserta tombol untuk menambah link baru. Setiap link memiliki dua bagian utama:
        </p>
        <ul className="space-y-3 text-sm text-on-surface-variant ml-2">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
            <span><b>Judul:</b> Teks yang akan ditampilkan di tombol link (misalnya "Shopee Kami", "Channel YouTube", "Hubungi Kami").</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
            <span><b>URL:</b> Alamat tujuan saat tombol diklik (misalnya https://shopee.co.id/tokoanda).</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-12 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Mengubah Urutan Link</h3>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Link yang paling penting sebaiknya diletakkan di posisi paling atas agar langsung terlihat oleh pengunjung. Untuk mengubah urutan:
        </p>
        <ol className="space-y-3 text-sm text-on-surface-variant ml-2">
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">1.</span>
            <span>Arahkan kursor (atau sentuh di HP) ke <b>ikon titik-titik</b> yang ada di sisi kiri setiap kotak link.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">2.</span>
            <span>Klik dan tahan, lalu geser link ke atas atau ke bawah sesuai posisi yang diinginkan.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">3.</span>
            <span>Lepaskan. Urutan baru akan otomatis tersimpan.</span>
          </li>
        </ol>

        <h3 className="text-xl font-bold mt-12 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Mengubah Tema dan Warna Tampilan</h3>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Anda bisa menyesuaikan tampilan halaman publik agar sesuai dengan karakter atau branding bisnis Anda. Masih di halaman yang sama (menu <b>Links</b>), gulir ke bagian bawah untuk menemukan pengaturan tampilan:
        </p>
        <ul className="space-y-3 text-sm text-on-surface-variant ml-2 mb-4">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">palette</span>
            <span><b>Palet Warna:</b> Pilih kombinasi warna yang sesuai. Tersedia berbagai opsi mulai dari nuansa profesional minimalis hingga warna-warna cerah yang playful.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">rounded_corner</span>
            <span><b>Bentuk Tombol:</b> Atur tingkat kelengkungan sudut tombol — dari yang kotak tajam hingga yang sangat membulat.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">wallpaper</span>
            <span><b>Gambar Latar:</b> Unggah gambar background khusus untuk memberikan sentuhan personal pada halaman Anda.</span>
          </li>
        </ul>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Setiap perubahan bisa langsung Anda lihat hasilnya di preview tampilan, sehingga Anda bisa bereksperimen sepuasnya sebelum menyimpan.
        </p>
      </div>
    )
  },
  {
    id: "teks",
    icon: "text_fields",
    title: "Panduan Teks & Konten",
    content: (
      <div className="space-y-6 animate-fade-in-up">
        <div className="mb-8">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Personalisasi Pesan</p>
          <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight mb-4">Panduan Teks & Konten Toko</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">
            Menu ini mengatur semua teks yang muncul di halaman toko dan pesan checkout yang dikirim ke WhatsApp Anda. Anda bisa menyesuaikan sapaan, deskripsi, dan format pesan agar sesuai dengan gaya komunikasi bisnis Anda.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Template Pesan Checkout WhatsApp</h3>
        <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
          Saat pembeli menekan tombol Checkout di keranjang belanja, sistem akan menyusun sebuah pesan otomatis yang berisi rincian pesanan mereka. Anda bisa mengatur bagaimana format pesan ini terlihat:
        </p>

        <ul className="space-y-4 text-sm text-on-surface-variant ml-2 mb-6">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">waving_hand</span>
            <div>
              <b className="text-on-surface">Sapaan Pembuka:</b>
              <p className="mt-1 leading-relaxed">Kalimat pertama yang muncul di pesan. Misalnya bisa diubah dari "Halo Admin" menjadi "Assalamualaikum Kak" atau "Halo, saya mau pesan". Sesuaikan dengan karakter brand Anda.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">receipt_long</span>
            <div>
              <b className="text-on-surface">Rincian Pesanan:</b>
              <p className="mt-1 leading-relaxed">Bagian ini berisi daftar produk yang dipilih pembeli beserta harganya. Secara otomatis sistem akan menampilkan nama produk, jumlah, dan total harga.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">edit_note</span>
            <div>
              <b className="text-on-surface">Kalimat Penutup:</b>
              <p className="mt-1 leading-relaxed">Teks di akhir pesan. Bisa diisi dengan instruksi pembayaran atau ucapan terima kasih.</p>
            </div>
          </li>
        </ul>

        <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-5 rounded-2xl leading-relaxed mt-4">
          <p className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">warning</span>
            <span><b>Peringatan:</b> Di dalam template pesan, Anda akan melihat teks khusus berupa kode variabel (ditandai dengan kurung kurawal ganda). Jangan menghapus atau mengubah kode-kode ini. Kode tersebut adalah penanda yang digunakan sistem untuk menyisipkan informasi pesanan secara otomatis. Jika terhapus, data pesanan tidak akan muncul di pesan WhatsApp.</span>
          </p>
        </div>
      </div>
    )
  },
  {
    id: "analitik",
    icon: "analytics",
    title: "Panduan Analitik",
    content: (
      <div className="space-y-6 animate-fade-in-up">
        <div className="mb-8">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Pantau Performa</p>
          <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight mb-4">Panduan Analitik Toko</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">
            Menu Analitik membantu Anda memahami seberapa ramai toko Anda dikunjungi dan produk mana yang paling diminati. Informasi ini sangat berguna untuk menentukan strategi penjualan dan promosi.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-on-surface border-b border-outline-variant/10 pb-3">Apa yang bisa Anda lihat di Analitik?</h3>
        <div className="space-y-4 mb-8">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">visibility</span> Total Kunjungan
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed pl-7">Berapa kali halaman toko Anda dibuka oleh pengunjung. Angka ini menunjukkan seberapa efektif link yang Anda sebarkan di media sosial.</p>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">touch_app</span> Jumlah Klik
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed pl-7">Berapa kali link atau tombol di halaman Anda diklik oleh pengunjung. Ini membantu Anda mengetahui konten mana yang paling menarik perhatian.</p>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">trending_up</span> Produk Terpopuler
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed pl-7">Daftar produk yang paling sering dilihat atau diklik oleh pembeli. Gunakan informasi ini untuk menentukan produk mana yang perlu dipromosikan lebih gencar atau ditaruh di posisi teratas etalase.</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-5 rounded-2xl leading-relaxed">
          <b>Tips pemanfaatan data:</b> Cek analitik Anda secara rutin (setidaknya seminggu sekali). Jika ada produk yang kliknya tinggi tapi jarang dipesan, mungkin harganya perlu ditinjau ulang. Jika kunjungan rendah, coba perbanyak promosi di media sosial.
        </div>
      </div>
    )
  },
  {
    id: "faq",
    icon: "forum",
    title: "Tanya Jawab Umum (FAQ)",
    content: (
      <div className="space-y-6 animate-fade-in-up">
        <div className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight mb-2">Tanya Jawab Umum (FAQ)</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">Kumpulan pertanyaan yang paling sering ditanyakan oleh pengguna Katalogku beserta jawabannya. Jika pertanyaan Anda belum terjawab di sini, silakan hubungi tim support kami.</p>
        </div>
        
        <div className="space-y-3 pt-4 pb-16">
           {faqs.map((f, i) => (
             <div key={i} className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <h4 className="font-bold text-on-surface text-[15px] mb-2 leading-snug tracking-tight flex gap-3">
                  <span className="text-primary shrink-0">{i + 1}.</span> 
                  <span>{f.q}</span>
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed pl-7">
                  {f.a}
                </p>
             </div>
           ))}
        </div>

      </div>
    )
  }
];

export default function BantuanPage() {
  const [activeTopic, setActiveTopic] = useState(helpTopics[0].id);

  const currentContent = helpTopics.find(t => t.id === activeTopic);

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest/30 rounded-3xl overflow-hidden mt-4">
      <div className="grid grid-cols-1 xl:grid-cols-12 min-h-[75vh] border border-outline-variant/20 rounded-[2rem] bg-white overflow-hidden shadow-sm">
        
        {/* Left Navigation Sidebar */}
        <div className="xl:col-span-3 bg-surface-container-lowest border-r border-outline-variant/10 p-6 flex flex-col hide-scrollbar overflow-y-auto w-full">
          <div className="mb-8">
            <h2 className="text-lg font-black text-on-surface tracking-tight mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_stories</span>
              Pusat Bantuan
            </h2>
            <p className="text-xs text-on-surface-variant font-medium">Panduan penggunaan lengkap</p>
          </div>

          <div className="relative mb-6">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Cari topik bantuan..." 
              className="w-full bg-surface-container-low border border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium text-on-surface transition-all outline-none"
            />
          </div>

          <div className="space-y-1 mb-6">
            {helpTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTopic === topic.id
                    ? "bg-primary/10 text-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-medium"
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTopic === topic.id ? "text-primary" : "text-outline-variant"}`}>
                  {topic.icon}
                </span>
                <span className="text-sm">{topic.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-outline-variant/10">
            <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-5 text-white mb-4 shadow-lg shadow-primary/20">
              <h4 className="font-bold mb-1 text-[15px]">Butuh bantuan lebih?</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">Tim kami siap membantu menyelesaikan kendala Anda.</p>
              <button className="w-full bg-white text-primary text-xs font-bold py-2.5 rounded-xl hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">headset_mic</span>
                Hubungi Support
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="xl:col-span-9 p-6 sm:p-8 md:p-12 overflow-y-auto bg-white">
          <div className="max-w-[840px] mx-auto pb-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-outline-variant mb-8 bg-surface-container-low w-fit px-3 py-1.5 rounded-md">
              <span className="material-symbols-outlined text-[14px]">home</span>
              <span>Pusat Bantuan</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary">{currentContent?.title}</span>
            </div>

            {currentContent?.content}

            <div className="mt-20 pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                Apakah panduan ini membantu?
                <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-green-100 hover:text-green-700 transition-colors ml-2"><span className="material-symbols-outlined text-[16px]">thumb_up</span></button>
                <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-red-100 hover:text-red-700 transition-colors"><span className="material-symbols-outlined text-[16px]">thumb_down</span></button>
              </p>
              <p className="text-xs font-medium text-outline-variant flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">update</span>Terakhir diperbarui: April 2026</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

# Strategi Harga (Monetization) - Katalogku

## 1. Rencana Model Bisnis
Basis monetisasi aplikasi ini adalah skema **Freemium**.
Memberikan paket *GRATIS Penuh* untuk menarik pendaftaran pengguna dalam skala viral yang didorong dari melihat watermark di link bio milik orang lain. Paket *PRO (Berlangganan bulanan)* dijual sebagai nilai tambah untuk bisnis / penjual tingkat lanjut.

## 2. Pintu Penghalang Fitur (Feature Gating)
Aplikasi membatasi pengguna berbasis Kuantitas dan juga Akses Fitur Khusus.

*Prediksi Implementasi Batasan (Contoh Kasus):*

**Paket Gratis (Free Tier):**
* Kuota Terbatas. Maksimal unggah 10-15 Data Produk.
* Hanya boleh memasang maksimal 3-5 Tautan luar tambahan.
* Ada tulisan kecil / Label *"Powered by Katalogku"* terpampang di halaman terbawah etalase penjual (Menjadi alat pemasaran gratis bagi platform kita).

**Paket Premium (Pro Tier):**
* Kuota Data Tidak Terbatas (Unlimited Products & Links).
* Menghilangkan Watermark "Powered by".
* Mengaktifkan Data Analitik: Melacak grafik kunjungan (*Page views*) dan interaksi klik barang (*Click-through-ratio*).
* Dapat menggunakan Domain Sendiri (Custom Domains e.g. `raja-kue.com`).

## 3. Implikasi bagi Basis Data
Demi memfasilitasi mekanisme pembatasan harga ini, sangat krusial membuat baris definisi berlangganan di tabel Users.
Contoh dalam skema:
`plan_type`: `enum('FREE', 'PRO')`
`plan_expiration`: `timestamp`
Tiap fungsi krusial (seperti Action "*Tambah Produk Baru*") harus divalidasi dengan mengecek kapasitas jumlah data yang dimiliki berbanding `plan_type` akun bersangkutan.

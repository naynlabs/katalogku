# Alur Pengguna (User Flows) - Katalogku

## 1. Akuisisi & Penahan (Gatekeeping)
Diterapkan kebijakan **Wajib Login**: Pengguna (Calon Penjual) wajib mendaftarkan akun untuk bisa melihat panel / mengakses utilitas pembuatan etalase.

## 2. Alur Penjual (Seller Flow)
1. **Registrasi Awal:** Penjual sign up melalui input form Email/Password ATAU melalui provider Login Google OAuth.
2. **Onboarding Wizard (Multi-Step):**
   - Aplikasi meminta melengkapi Nama Toko.
   - Aplikasi meminta klaim URL id (contoh: `katalogku.com/raja-kue`).
   - Aplikasi wajib merekam **Nomor WhatsApp**, karena ini poros utama transaksi.
3. **Manajemen Konten:**
   - Di Dashboard, Penjual menuju menu "Katalog" untuk mengisi data Produk (*Upload Foto, Nama Barang, Harga Rupiah*). Tidak perlu setting berat pengiriman.
   - Penjual menuju menu "Tautan Eksternal", misal menaruh link promosi ke profil Shopee/TikTok mereka.
4. **Distribusi Promosi:** Penjual mengklik "Copy Link Etalase" dan menaruhnya di tautan (link-in-bio) sosial medianya.

## 3. Alur Pembeli (The Transaction Flow)
1. Pembeli mengeklik tautan `katalogku.com/raja-kue` dari bio sosial media penjual.
2. Halaman memuat tampilan Etalase Publik, menampilkan foto profil toko, barisan tombol tautan eksternal, dan grid foto produk.
3. Pembeli mengeklik produk A (qty 1) dan produk B (qty 2). Item masuk ke *State Keranjang* (*Floating cart*).
4. Pembeli menekan tombol **Checkout** atau **Beli Sekarang**.
5. Sistem mengolah data keranjang. Menghitung total harga *(A x 1) + (B x 2)*.
6. **(Transformasi):** Sistem merangkai data ini menjadi template string (contoh: *"Halo, saya ingin pesan: 1x Produk A, 2x Produk B. Total: Rp. 50.000."*).
7. Pembeli dialihkan secara otomatis keluar aplikasi web menuju aplikasi WhatsApp dengan teks yang terisi otomatis (mengamalkan format API URL `wa.me`).
8. Transaksi pembayaran dan pengiriman diselesaikan antara pembeli & penjual manual via chat WhatsApp.

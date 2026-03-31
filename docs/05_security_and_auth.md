# Keamanan & Otorisasi - Katalogku

## 1. Arsitektur Organisasi & Sesi
SaaS ini dibangun atas arsitektur dasar **Personal (B2C) Independen** (1 Akun = 1 Owner Entity).
* Tidak ada skema kolaborasi "Undang Rekan Tim" (*multi-tenant organization workspaces*). Setiap login dengan email unik mengelola datanya sendiri saja.

## 2. Provider Autentikasi
Menggunakan spesifikasi **Better Auth**:
1. Login/Sign up menggunakan **Email & Password** konvensional.
2. Didukung kemudahan **Login With Google** (OAuth2).

## 3. Hak Akses (Role Base Access)
Bersifat Sangat Sederhana:
1. **Registered User:** Penjual. Memiliki izin mutlak Membaca, Menulis, Mengubah, dan Menghapus data miliknya dengan validasi pengecekan relasi bahwa `owner_id = current_user.id`.
2. **Administrator:** Tingkatan *God-mode* untuk sistem yang tidak terekspos ke halaman publik (hanya untuk developer).

## 4. Keamanan Keutuhan Data
Mengingat tidak ada gerbang pembayaran di dalam sistem (semua diproses ke WhatsApp), tidak ada kekhawatiran terkait hacking manipulasi harga pembayaran (`cart tampering validation` tidak perlu server-side karena harga akhir tetap akan dilihat penjual di teks WhatsApp). Kecepatan aplikasi klien ditekankan di sini.

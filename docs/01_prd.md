# Product Requirements Document (PRD) - Katalogku

## 1. Visi & Identitas Produk
**Katalogku** adalah platform *etalase digital (micro-storefront)* yang dirancang untuk menggantikan link bio standar dengan pengalaman belanja yang jauh lebih praktis. Aplikasi ini mengubah profil media sosial penjual menjadi katalog produk interaktif yang secara otomatis merekap pesanan dan mengarahkannya langsung ke WhatsApp tanpa potongan admin.

## 2. Masalah & Solusi
* **Masalah:** Banyak UMKM dan pelaku bisnis online kelelahan membalas chat tanya-jawab harga, merekap pesanan satu per satu, dan sering salah menghitung total belanja. Link bio biasa tidak memfasilitasi transaksi, sementara e-commerce memotong margin keuntungan penjual kecil.
* **Solusi:** Menyediakan etalase checkout instan. Pembeli memilih barang, sistem otomatis menghitung total harga, menyusun rincian pesanan, dan mengirimkannya sebagai pesan teks rapi ke WhatsApp penjual.

## 3. Target Audience
* **Segmen B2B:** UMKM, Pemilik Olshop, Agensi Kecil.
* **Segmen B2C:** Individu, Freelancer, Kreator.

## 4. Unique Selling Proposition (USP)
1. Harga jauh lebih terjangkau dibanding langganan e-commerce platform.
2. Fitur *All-in-One* (Link bio + Katalog belanja + Order Generator).
3. Sangat mudah digunakan dengan UI/UX modern.
4. Terspesialisasi untuk target lokal Indonesia (Transaksi via WhatsApp).

## 5. Minimum Viable Product (MVP)
Berikut adalah 4 fitur inti yang wajib dirilis untuk versi 1 (berdasarkan alur pengguna):
1. **Sistem Autentikasi & Onboarding:** Register/Login (Google + Email) & setup Nama Toko, URL, Nomor WA.
2. **Dashboard Manajemen:** CRUD (Create, Read, Update, Delete) Produk (Foto, Harga) dan Tautan (Custom Links).
3. **Public Micro-Storefront:** Halaman publik responsif (mobile-friendly) menampilkan bio profil, tautan, dan katalog belanja.
4. **WhatsApp Checkout Engine:** Sistem "Keranjang Bayangan" yang mengakumulasi belanjaan dan men-generate pesan format rincian order ke WA penjual.

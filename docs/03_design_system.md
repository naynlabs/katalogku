# Desain Sistem & Panduan UI/UX - Katalogku

## 1. Konsep & Vibe
* **Atmosphere:** Cantik, Friendly (Ramah), Kasual, dan Ceria (Playful).
* **Bentuk Fisik UI:** Dominasi penggunaan sudut membulat (*rounded corners*, `rounded-xl` atau `rounded-full`). Menghindari sudut lancip khas aplikasi enterprise/formal. Menggunakan *soft shadows* untuk memberi kesan mengambang pada kartu produk.

## 2. Tipografi & Font
* **Font Utama:** `Plus Jakarta Sans` (Google Fonts)
* **Weight yang digunakan:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)
* **Pemuatan:**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  ```
* **CSS Global:**
  ```css
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  ```

## 3. Sistem Ikon
* **Library:** `Material Symbols Outlined` (Google Fonts — Variable Icon Font)
* **Pemuatan:**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  ```
* **Penggunaan di HTML:**
  ```html
  <span class="material-symbols-outlined">shopping_cart</span>
  <span class="material-symbols-outlined">storefront</span>
  ```

## 4. Referensi & Benchmark Visual
* **[Biolinky.co](https://biolinky.co):** Referensi utama. Menganut prinsip tata letak linier berpusat di layar, penggunaan tombol besar (pill shape), transisi mulus, dan *background* halus atau bergradasi lembut.

## 5. Aturan Resolusi (Responsive Design)
* **Dashboard Penjual (Admin):** 
  Desain yang seimbang (Agnostik). Bisa diakses dengan sangat nyaman di HP (Hamburger Menu / Bottom Navbar) maupun di Laptop (Sidebar Navigasi Tetap di kiri). Layout tabel/grid harus *fluid*.
* **Public Micro-Storefront (Halaman untuk Pembeli):**
  Desain harus **Mobile-First**. Asumsi 95% lalu lintas akan datang dari sosial media (Instagram/TikTok App browser). Jika diakses via Desktop, desain tidak melebar melainkan ditengah layar dengan batas lebar kustom (contoh: `max-w-md mx-auto`).

## 6. Komponen Kunci Khusus
* **"Keranjang Bayangan" (Floating Cart):** Sebuah chip/indikator keranjang yang statis/mengambang di bagian bawah halaman katalog, menampilkan jumlah barang dan subtotal secara *real-time*, yang jika diklik memicu *modal* ringkasan sebelum lempar ke WhatsApp.

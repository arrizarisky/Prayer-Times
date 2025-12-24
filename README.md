# 🕌 Pixel Prayer Times Extension

![Style: Neobrutalism](https://img.shields.io/badge/Style-Neobrutalism-FF5C00?style=for-the-badge)
![Font: Pixel](https://img.shields.io/badge/Font-Press_Start_2P-00E0FF?style=for-the-badge)

**Prayer Times** adalah ekstensi browser yang menggabungkan estetika **Retro Pixel Art** dengan desain **Neobrutalism** yang berani. Ekstensi ini berfungsi sebagai pengingat waktu sholat otomatis yang ringan dan bergaya.

---

## ✨ Fitur Utama

- **Neobrutalism UI**: Desain kontras tinggi dengan garis tebal (_thick borders_) dan bayangan tajam (_hard shadows_).
- **Active Tracking**: Menandai secara otomatis waktu sholat yang sedang berlangsung.
- **Smart Storage**: Menyimpan koordinat lokasi terakhir agar tidak perlu meminta izin lokasi berulang kali.

---

## 🚀 Cara Penggunaan

### 1. Persiapan File

Pastikan kamu memiliki struktur file berikut dalam satu folder:

- `manifest.json`
- `index.html`
- `style.css`
- `script.js`
- `icon.png` (opsional)

### 2. Instalasi ke Browser

1.  Buka browser **Chrome** atau **Edge**.
2.  Masuk ke halaman ekstensi dengan mengetik `chrome://extensions/` di address bar.
3.  Aktifkan **Developer Mode** di pojok kanan atas.
4.  Klik tombol **Load unpacked**.
5.  Pilih folder tempat kamu menyimpan file proyek ini.

### 3. Cara Menjalankan

1.  Klik ikon _Puzzle_ di toolbar browser, lalu _pin_ **Pixel Prayer Times**.
2.  Buka pop-up ekstensi.
3.  Klik tombol **Dapatkan Lokasi** untuk sinkronisasi jadwal pertama kali.
4.  Jadwal akan muncul otomatis, dan sistem akan mengecek waktu setiap menit untuk notifikasi.

---

## 🛠️ Detail Teknis

| Komponen       | Kegunaan                                                |
| :------------- | :------------------------------------------------------ |
| **API**        | Aladhan Prayer Times Calendar API                       |
| **Styling**    | CSS Neobrutalism (Garis 4px, Shadow 6px, Warna #FFDE00) |
| **Font**       | Press Start 2P (Google Fonts)                           |
| **Notifikasi** | Chrome Notification API & SetInterval Check             |

---

## 📂 Struktur Kode

- `script.js`: Mengatur pengambilan data API, kalkulasi waktu sholat aktif menggunakan perbandingan total menit, dan manajemen penyimpanan lokal (`chrome.storage`).
- `index.html`: Struktur tampilan pop-up menggunakan elemen tabel HTML5.
- `style.css`: Berisi semua _logic_ desain Neobrutalism dan animasi _blink_ pada elemen aktif.

---

## 📝 Catatan

Agar notifikasi muncul, pastikan pengaturan browser dan sistem operasi kamu mengizinkan notifikasi dari Google Chrome/Edge.

**Dibuat oleh [Arriza Risky]**

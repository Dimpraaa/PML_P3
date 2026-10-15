# Kala Kopi - Aplikasi Mobile Katalog Kopi & Pemesanan

Aplikasi mobile berbasis **React Native + Expo** yang dirancang sebagai katalog menu dan sistem pemesanan kafe/kedai kopi. Proyek ini dibangun untuk memenuhi ketentuan **Tugas 1 Mata Kuliah Pemrograman Mobile Lanjut**, dengan fokus pada implementasi *User Interaction*, *Stack Navigation*, dan *Passing Data* antar-layar.

---

## Fitur Utama

1. **Katalog Kopi & Filter Kategori (HomeScreen)**
   - Menampilkan daftar produk kopi lengkap dengan foto asli beresolusi tinggi, nama, deskripsi, harga, dan kategori.
   - Fitur filter kategori interaktif (*Semua, Espresso Based, Milk Based, Cold Brew, Signature*).
   - Menggunakan `TouchableOpacity` untuk navigasi langsung ke halaman detail produk.

2. **Detail Produk & Pengatur Kuantitas (DetailScreen)**
   - Menerima data produk (`nama`, `harga`, `kategori`, dll.) melalui `route.params`.
   - Menggunakan `useState` untuk mengelola kuantitas pesanan dengan tombol penambahan `[+]` dan pengurangan `[-]`.
   - Menghitung subtotal pembayaran secara *real-time*.
   - Aksi navigasi kembali (`navigation.goBack()`) dan lanjut ke proses checkout (`navigation.navigate('Checkout')`).

3. **Konfirmasi & Ringkasan Pesanan (CheckoutScreen)**
   - Menerima rincian pesanan (`nama`, `harga`, `jumlah`) via `route.params`.
   - Menghitung total akhir pembayaran (`harga * jumlah`).
   - Menerapkan `useState` (`isSubmitted`) untuk validasi konfirmasi pesanan.
   - Memberikan umpan balik visual (*feedback*) berupa status konfirmasi pesanan, kode transaksi unik, dan tombol untuk kembali ke halaman utama.

---

## Alur Navigasi & Passing Data

Aplikasi menggunakan alur navigasi bertumpuk (*Stack Navigation*) dengan rincian data yang diteruskan sebagai berikut:

```text
[ HomeScreen ]
      │
      │  Passing Data: { nama, harga, kategori }
      ▼
[ DetailScreen ]
      │
      │  Passing Data: { nama, harga, jumlah }
      ▼
[ CheckoutScreen ]
      │
      │  Kembali ke Menu Utama
      ▼
[ HomeScreen ]
```

---

## Struktur Direktori

```text
ISNP/
├── App.js                     # Entry point & konfigurasi NavigationContainer + Stack Navigator
├── app.json                   # Konfigurasi aplikasi Expo
├── package.json               # Dependensi & script proyek
├── .env                       # Konfigurasi environment Expo
├── assets/
│   └── images/
│       └── coffee/            # Foto lokal produk kopi beresolusi tinggi
└── src/
    ├── constants/
    │   └── coffeeData.js      # Data statis katalog kopi & daftar kategori
    └── screens/
        ├── index.js           # Central export untuk file screen
        ├── HomeScreen.js      # Layar katalog & filter menu
        ├── DetailScreen.js    # Layar detail produk & kalkulator kuantitas
        └── CheckoutScreen.js  # Layar ringkasan pembayaran & konfirmasi
```

---

## Teknologi yang Digunakan

- **Framework:** React Native (v0.86+) & Expo (SDK 57)
- **Navigasi:** `@react-navigation/native` & `@react-navigation/stack`
- **Safe Area Inset:** `react-native-safe-area-context`
- **Bahasa & Compiler:** JavaScript (ES6+), React 19, TypeScript declarations

---

## Panduan Instalasi & Menjalankan Aplikasi

### 1. Prasyarat
- Node.js (versi 18 ke atas disarankan)
- Aplikasi **Expo Go** pada perangkat seluler (Android / iOS) atau Emulator aktif.

### 2. Kloning Repositori & Instal Dependensi
```bash
git clone https://github.com/Dimpraaa/TUGAS_ISNP.git
cd TUGAS_ISNP
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npx expo start -c
```

### 4. Menjalankan di Perangkat
- **Android / iOS Fisik:** Pindai (*scan*) QR Code yang tampil di terminal menggunakan aplikasi **Expo Go** (pastikan perangkat dan komputer berada pada jaringan Wi-Fi yang sama).
- **Web Browser:** Tekan tombol `w` pada terminal untuk membuka aplikasi di peramban web.
- **Android Emulator:** Tekan tombol `a` pada terminal saat emulator telah aktif.

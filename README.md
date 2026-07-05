<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/birthday-cake_1f382.png" width="80" />
</p>

<h1 align="center">🎂 Happy Birthday Website</h1>

<p align="center">
  <b>Website ucapan ulang tahun interaktif & estetik — dibuat dengan cinta menggunakan React, Vite, dan Tailwind CSS.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0080?style=flat-square&logo=framer&logoColor=white" />
</p>

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🎈 **Balon Interaktif** | Balon melayang yang bisa di-klik untuk memunculkan pesan rahasia + efek confetti |
| 🎂 **Kue & Lilin** | Kue ulang tahun interaktif — tiup semua lilin untuk memicu perayaan kembang api! |
| 💌 **Wishes Board** | Kirim ucapan & doa ulang tahun dengan kategori (Doa Utama, Karier, Kesehatan, Kebahagiaan) |
| 🎵 **Musik Latar** | Pemutar musik built-in dengan kontrol play/mute yang elegan |
| 🎆 **Confetti & Fireworks** | Efek visual kembang api dan confetti saat momen spesial |
| ✏️ **Edit Profil** | Ubah nama, usia, tanggal, dan tagline langsung dari UI |
| 🎉 **Party Mode** | Modal perayaan khusus dengan animasi dan efek suara |
| 📱 **Responsive** | Tampilan sempurna di desktop, tablet, dan mobile |

---

## 🛠️ Tech Stack

```
React 19          →  UI Components & State Management
Vite 6            →  Lightning-fast Build Tool
Tailwind CSS 4    →  Utility-first Styling
TypeScript 5.8    →  Type Safety
Framer Motion 12  →  Smooth Animations
Canvas Confetti   →  Particle Effects
Lucide React      →  Beautiful Icons
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** ≥ 18
- **npm** ≥ 9

### Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/solivatestudio/2-Website-BD.git
cd 2-Website-BD

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka **http://localhost:3000** di browser. 🎉

### Build untuk Production

```bash
npm run build
npm run preview
```

---

## 📁 Struktur Project

```
📦 happy-birthday-matt
├── 📄 index.html                 # Entry point HTML
├── 📄 vite.config.ts             # Konfigurasi Vite + Tailwind
├── 📄 tsconfig.json              # Konfigurasi TypeScript
├── 📄 package.json               # Dependencies & scripts
│
├── 📂 src/
│   ├── 📄 main.tsx               # React entry point
│   ├── 📄 App.tsx                # Root component & state orchestration
│   ├── 📄 index.css              # Global styles, fonts, animations
│   ├── 📄 types.ts               # TypeScript interfaces
│   │
│   ├── 📂 components/
│   │   ├── 📄 Navbar.tsx             # Navigation bar
│   │   ├── 📄 HeroSection.tsx        # Hero banner utama
│   │   ├── 📄 FloatingBalloons.tsx   # Balon melayang interaktif
│   │   ├── 📄 InteractiveCake.tsx    # Kue ulang tahun & lilin
│   │   ├── 📄 WishesSection.tsx      # Board ucapan & doa
│   │   ├── 📄 MusicControllerPill.tsx # Kontrol musik floating
│   │   ├── 📄 PartyModal.tsx         # Modal perayaan
│   │   ├── 📄 EditProfileModal.tsx   # Edit profil birthday
│   │   ├── 📄 SecretMessageToast.tsx # Toast pesan rahasia
│   │   └── 📄 Footer.tsx            # Footer
│   │
│   ├── 📂 data/
│   │   └── 📄 birthdayData.ts    # Data profil, wishes, & pesan balon
│   │
│   └── 📂 utils/
│       ├── 📄 confettiHelper.ts  # Fungsi confetti & fireworks
│       └── 📄 soundEngine.ts     # Engine suara & musik
│
└── 📂 assets/                    # Aset media
```

---

## 🎨 Kustomisasi

### Ubah Nama & Data Birthday

Edit file `src/data/birthdayData.ts`:

```typescript
export const INITIAL_PROFILE: BirthdayProfile = {
  name: 'NamaKamu',        // Ganti nama
  age: 25,                  // Ganti usia
  date: '5 Juli 2026',      // Ganti tanggal
  tagline: 'Your tagline here',
};
```

### Ubah Pesan Balon

```typescript
export const BALLOON_MESSAGES = [
  '🌿 Happy Birthday!',
  '✨ Sukses Selalu!',
  // ... tambahkan pesan custom
];
```

### Ubah Wishes Awal

```typescript
export const INITIAL_WISHES: BirthdayWish[] = [
  {
    id: '1',
    category: 'Doa Utama',
    title: 'Judul Ucapan',
    message: 'Isi ucapan...',
    author: 'Nama Pengirim',
    relationship: 'Teman',
  },
  // ... tambahkan wishes lainnya
];
```

---

## 📜 Perintah yang Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan development server (port 3000) |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check dengan TypeScript |
| `npm run clean` | Hapus folder dist |

---

## 🎯 Interaksi Pengguna

1. **Klik balon** yang melayang → pesan rahasia + efek confetti 🎈
2. **Klik lilin** untuk menyalakan → klik lagi untuk meniup 🕯️
3. **Tiup semua lilin** → kembang api + modal perayaan 🎆
4. **Tulis ucapan** di Wishes Board → pilih kategori & kirim 💌
5. **Tombol musik** di pojok → play/pause musik latar 🎵
6. **Edit profil** → kustomisasi nama, usia & tagline ✏️

---

## 📄 Lisensi

Project ini dibuat untuk penggunaan personal. Silakan modifikasi dan sesuaikan dengan kebutuhan.

---

<p align="center">
  Dibuat dengan 🤍 untuk merayakan momen spesial
</p>

# Kanji Learning App

Aplikasi web untuk belajar Kanji Jepang dengan fitur pencarian, filter tingkat JLPT, dan mode latihan interaktif.

## Fitur

- 📚 **Library Kanji**: Koleksi kanji dengan informasi lengkap
- 📚 **Library Words**: Koleksi kosa kata dengan informasi lengkap
- 🔍 **Pencarian**: Cari berdasarkan kanji, arti, atau cara baca
- 📊 **Filter JLPT**: Filter berdasarkan tingkat JLPT (N5-N1)
- 🎯 **Mode Latihan**: Latihan flashcard interaktif
- 📱 **Responsive**: Mendukung desktop dan mobile
- 🌓 **Dark Mode**: Tema gelap dan terang

## Screenshot

### Halaman Utama
Tampilan library kanji dengan pencarian dan filter.

### Mode Latihan
Sistem flashcard untuk latihan menghafalkan kanji.

### Detail Kanji
Informasi lengkap tentang kanji termasuk arti dan cara baca.

## Teknologi

- **React 18** - Library UI
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Radix UI** - Komponen UI primitif

## Instalasi

### Prerequisites

- Node.js 18+ 
- npm 8+ atau yarn atau pnpm

### Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd kanji-learning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

4. **Buka browser**
   Aplikasi akan berjalan di `http://localhost:3000`

## Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Jalankan ESLint
- `npm run type-check` - Cek tipe TypeScript

## Struktur Project

```
kanji-learning-app/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── KanjiCard.tsx   # Komponen kartu kanji
│   │   ├── SearchBar.tsx   # Komponen pencarian
│   │   └── ...
│   ├── styles/
│   │   └── globals.css     # Global styles
│   ├── App.tsx            # Komponen utama
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Penggunaan

### Navigasi Library
- Jelajahi koleksi kanji di halaman utama
- Klik kartu kanji untuk melihat detail lengkap
- Gunakan search bar untuk mencari kanji spesifik
- Filter berdasarkan tingkat JLPT

### Mode Latihan
1. Klik tombol "Practice Mode"
2. Lihat kanji dan coba tebak artinya
3. Klik "Show Answer" untuk melihat jawaban
4. Navigasi dengan tombol Previous/Next
5. Reset untuk memulai dari awal

### Data Kanji
Aplikasi saat ini memiliki 18 kanji sampel dari tingkat JLPT N5-N3:

**JLPT N5 (Pemula):**
- 日 (matahari, hari)
- 月 (bulan)
- 水 (air)
- 火 (api)
- 木 (pohon)
- 金 (emas, uang)
- 土 (tanah)
- 人 (orang)
- 学 (belajar)
- 生 (hidup, siswa)

**JLPT N4:**
- 時 (waktu)
- 間 (interval, ruang)
- 心 (hati, pikiran)
- 思 (pikir)
- 考 (pertimbangkan)

**JLPT N3:**
- 経 (mengelola, melewati)
- 済 (selesai, lengkap)
- 政 (politik, pemerintah)

## Pengembangan

### Menambah Kanji Baru
Tambahkan data kanji baru di file `App.tsx` dalam array `mockKanjiData`:

```typescript
{
  kanji: "新",
  meanings: ["new", "fresh"],
  onReadings: ["シン"],
  kunReadings: ["あたら", "あら", "にい"],
  jlptLevel: "N4",
  strokes: 13
}
```

### Customize Styling
Edit file `styles/globals.css` untuk mengubah tema dan styling.

### Menambah Fitur
- Buat komponen baru di folder `components/`
- Import dan gunakan di `App.tsx`
- Ikuti pola yang sudah ada

## Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Kontak

Project Link: [https://github.com/yourusername/kanji-learning-app](https://github.com/yourusername/kanji-learning-app)

---

**Happy Learning! 頑張って！**

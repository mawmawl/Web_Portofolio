# Documentasi Analisis & Rencana Desain Portfolio (desain.md)

**Project Framer**: `Luca Mori Photography Template copy`  
**Project ID**: `r8MYC2b8GLgiC5HxjAD3`  
**Tujuan Utama**: Mengadaptasi dan mengcustom template Framer ini menjadi **Portfolio Pribadi Mahasiswa (Student Portfolio)** tanpa merusak sistem tata letak (layout), animasi, atau estetika visual yang sudah ada.

---

## 1. Halaman yang Ada (Pages & Routing)

| Path | Nama Halaman | Node ID | Deskripsi & Fungsi |
|---|---|---|---|
| `/` | **Home** | `augiA20Il` | Halaman utama yang memuat sticky hero showcase, bagian pengenalan (intro), highlight proyek utama, tentang saya (about), layanan/keahlian (services), dan footer. |
| `/projects` | **Works / Projects** | `OLKZToFoD` | Katalog lengkap seluruh proyek, karya akademik, dan studi kasus. |
| `/projects/:Projects` | **Project Detail** | `qxIXQSbjU` | Template halaman detail CMS dinamis untuk menyajikan rincian tiap proyek. |
| `/contact` | **Contact** | `dZRiDSJUR` | Halaman kontak yang berisi detail kontak langsung dan formulir interaktif. |
| `/404` | **404 Not Found** | `aSQvTFmVI` | Halaman fallback jika URL tidak ditemukan. |

---

## 2. Inventaris Komponen Utama (Components Inventory)

| Nama Komponen | ID Komponen | Varian & Kontrol | Fungsi Utama |
|---|---|---|---|
| **Nav bar** | `TNQ39JLT9` | `Desktop`, `mobile`, `mobile - Expanded` | Navigasi melayang (floating header) yang responsif dengan link navigasi dan logo. |
| **Logo** | `jPYYlnk_V` | `small logo white`, `Big logo white` | Logo personal brand dengan opsi penyesuaian warna (`logoColor`). |
| **Hero Images** | `UT7s3OGCA` | `DEsktop`, `Tablet`, `Phone` | Accordion gambar vertikal interaktif untuk showcase visual di bagian Hero. |
| **Project card** | `iqnNTsf_m` | `$control__project`, `$control__image`, `$control__year`, `$control__link` | Kartu portofolio item yang menampilkan gambar, judul, tahun, dan link proyek. |
| **Service card** | `U3gqmfn02` | `Variant 1`, `mobile` | Kartu bidang keahlian/layanan (Nomor `01`, Judul, Deskripsi). |
| **Buttons** | `fSEVAUqN0` | `Primary black`, `No-hover` | Tombol Call-To-Action utama dengan efek hover. |
| **Form Button** | `b2cLxtXLp` | `Default`, `Loading`, `Disabled`, `Success`, `Error` | Tombol formulir kontak interaktif dengan state status pengiriman. |
| **Menu Link** | `UhD5YL9vF` | `S`, `M`, `No hover` | Link navigasi menu dengan efek animasi hover. |
| **Label** | `Ecgl9niiG` | `$control__title` | Label judul seksi (misal "PROJECTS", "ABOUT", "SERVICES"). |
| **Client** | `Zq8UVyb0D` | `$control__title` | Badge/pencapaian mitra atau klien. |
| **CTA Cursor** | `TS63ZpgEJ` | Custom Cursor | Komponen cursor interaktif saat hovering elemen interaktif. |
| **Footer** | `D0xax_z3K` | `Desktop`, `Tablet`, `Phone` | Footer global yang memuat hak cipta, link sosial media, dan kontak cepat. |
| **Text_Opacity_Letters** | `codeFile/csaEhkd` | React Code Component (`Text_Opacity_Letters.tsx`) | Efek animasi opacity teks huruf-demi-huruf berbasis scroll. |
| **Smooth Scroll** | `Yppqt3Cs3Y8TZqvASnXl` | External Plugin Component | Pengatur scroll roda mouse agar pergerakan terasa sangat halus (buttery smooth). |

---

## 3. Struktur Layout & Tata Letak

- **Skema Warna Dasar**: Serba obsidian gelap (`rgb(0, 0, 0)`) dipadukan dengan teks putih kontras tinggi (`#FFFFFF`) dan teks sekunder abu-abu lembut (`rgb(160, 160, 160)`).
- **Struktur Halaman Utama (Home)**:
  - **Sticky Hero Section** (Tinggi scroll 3791px dengan pinned frame `Content` 100vh): Layar terkunci saat di-scroll, menampilkan foto profil (`us1peYMX_`), nama (`Lana Malik`), deskripsi singkat (`Photographer — Amsterdam`), dan galeri tumpuk gambar interaktif (`Hero Images`).
  - **Intro Section**: Teks pengenalan minimalis dengan efek transparansi teks saat scroll.
  - **Projects Section**: Grid kartu proyek pilihan menggunakan komponen `Project card`.
  - **About Section**: Ringkasan latar belakang, daftar pencapaian/klien, dan keahlian.
  - **Services Section**: Matriks bidang keahlian menggunakan komponen `Service card`.
  - **Footer**: Komponen footer global.
- **Struktur Halaman Projects**: Judul ("Works"), katalog grid proyek portofolio lengkap.
- **Struktur Halaman Contact**: Tata letak terpisah ("Let's Talk!", informasi email, lokasi, dan form interaktif).

---

## 4. Breakpoint Responsif & Perilaku Layar

1. **Desktop**: `(min-width: 1200px)` — Layout utama penuh multi-kolom.
2. **Tablet**: `(min-width: 810px) and (max-width: 1199.98px)` — Penyesuaian padding dan grid 2-kolom.
3. **Phone**: `(max-width: 809.98px)` — Layout 1-kolom penuh untuk smartphone, merubah `Nav bar` menjadi menu drawer `mobile - Expanded`.

---

## 5. Animasi, Transisi & Hover States

- **Pinned Scroll Sequence**: Bagian Hero menggunakan `position: sticky` (`positionStickyTop: 0`) dan 100vh height untuk mengunci layar saat user melakukan scroll.
- **Letter-by-Letter Opacity**: Animasi teks memudar per huruf berbasis scroll yang ditangani oleh komponen kode React `Text_Opacity_Letters.tsx`.
- **Spring Physics Transitions**: Transisi antar elemen dan halaman menggunakan kalkulasi fisika pegas (`spring-physics 500 60 1 0s` dan `spring-duration 0.4s 0.2 0s`).
- **Mikro-Interaksi Hover**:
  - Pergeseran teks/garis pada `Menu Link`.
  - Inversi warna tombol pada `Buttons`.
  - Zoom & fokus gambar pada `Project card`.
  - Perubahan status tombol formulir (`Default` → `Loading` → `Success`).

---

## 6. Sistem Tipografi & Gaya Warna

- **Font Display / Judul**: `Instrument Serif` (Digunakan untuk nama utama, judul besar, dan label seksi yang elegan).
- **Font Body & UI**: `Inter`, `Switzer`, `Schibsted Grotesk`, `Chivo Mono` (Digunakan untuk teks deskripsi, tahun, tanggal, dan elemen navigasi).
- **Palet Warna**: Monokromatik Hitam Pekat (`#000000`), Putih Bersih (`#FFFFFF`), dan Abu-abu Netral (`#A0A0A0`).

---

## 7. Bagian yang Dipertahankan vs. Dikustomisasi

### Bagian yang DIPERTAHANKAN:
✅ Estetika dark mode minimalis dan kombinasi tipografi (`Instrument Serif` + `Inter` / `Switzer`).  
✅ Struktur sticky hero scroll dan efek opacity teks per huruf.  
✅ Seluruh sistem komponen (`Nav bar`, `Footer`, `Project card`, `Service card`, `Buttons`, `Form Button`).  
✅ Breakpoint responsif (`Desktop`, `Tablet`, `Phone`) dan animasi transisi fisika.

### Bagian yang DIKUSTOMISASI (Untuk Portfolio Mahasiswa):
1. **Identitas Diri (Personal Branding)**:
   - Mengubah nama template ("Lana Malik") dan profesi ("Photographer — Amsterdam") menjadi nama mahasiswa, bidang keahlian (misal *Software Engineering / Full-Stack & UI/UX Student*), serta lokasi/universitas.
2. **Hero & Foto Profil**:
   - Memperbarui foto profil Hero (`us1peYMX_`) dan galeri gambar showcase (`Hero Images`).
3. **Katalog Proyek (Projects)**:
   - Mengganti proyek fotografi template dengan proyek mahasiswa (Aplikasi Web, Aplikasi Mobile, Desain UI/UX, Repositori GitHub, Studi Kasus).
4. **Layanan / Bidang Keahlian (Services)**:
   - Mengubah konten `Service card` (`01`, `02`, dsb.) menjadi bidang keahlian mahasiswa (misal: *Full-Stack Web Development*, *UI/UX Systems & Prototyping*, *Frontend Architecture*, *AI & Machine Learning Applications*).
5. **Tentang Saya & Latar Belakang (About)**:
   - Mengubah teks biografi, latar belakang pendidikan, keahlian teknis (Tech Stack), dan pengalaman/pencapaian.
6. **Kontak & Link Sosial Media**:
   - Memperbarui email kontak, link GitHub, LinkedIn, link download Resume/CV, dan pengiriman formulir kontak.

---

## 8. Rencana Langkah Kustomisasi (Next Steps)

1. **Tahap 1: Pembaruan Teks & Profil Utama (Hero & About)**
   - Mengubah teks Nama, Title, Subtitle, dan Biografi singkat pada halaman Home.
2. **Tahap 2: Pembaruan Kartu Proyek & Detail CMS**
   - Memperbarui data proyek pada `Project card` dan halaman detail `/projects/:Projects`.
3. **Tahap 3: Pembaruan Bidang Keahlian (Services)**
   - Mengisi kartu keahlian dengan tech stack dan kemampuan mahasiswa.
4. **Tahap 4: Pembaruan Kontak & Footer**
   - Memperbarui link email, GitHub, LinkedIn, dan footer global.

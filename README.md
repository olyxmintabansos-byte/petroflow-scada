# PetroFlow SCADA (Titan #18)
### Offshore Wellhead Gathering SCADA, 60 FPS Transient Slugging Canvas, 3-Phase Separator & SKK Migas Fiscal Custody ERP

![PetroFlow Architecture](https://img.shields.io/badge/Architecture-Client--Side%20Local--First-cyan?style=for-the-badge)
![Compliance](https://img.shields.io/badge/Compliance-SKK%20Migas%20%26%20ASTM%20D1250-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)

---

## 🌐 Live Production Deployments
- **Offshore Gathering Station SCADA:** https://olyxmintabansos-byte.github.io/petroflow-scada/
- **3-Phase Separator & Compressor Train Desk:** https://olyxmintabansos-byte.github.io/petroflow-scada/separator/
- **Drilling Mud Logging & Gas Chromatography:** https://olyxmintabansos-byte.github.io/petroflow-scada/mudlog/
- **SKK Migas Official Custody Transfer B/L A4:** https://olyxmintabansos-byte.github.io/petroflow-scada/custody/

---

## 📐 Arsitektur & Fitur Utama

1. **Offshore Gathering Station SCADA (`/`):**
   - Pemantauan 6 unit kepala sumur *Christmas Tree* di Blok Mahakam Offshore (W-BK-01 s/d W-BK-06).
   - Pengaturan bukaan *choke valve* interaktif terkalibrasi 1/64 inci dengan telemetri tekanan kepala *tubing* (THP) dan *casing* (CHP).
   - Layar telemetri gelombang aliran transient multiphase (*slug flow*) berkecepatan **60 FPS** berbasis HTML5 Canvas dengan deteksi kantong cairan hidrokarbon secara akustik.
   - Tombol penghentian darurat **TRIP ESD-001** (*Emergency Shutdown System Level 1*) yang mengisolasi aliran pipa secara instan (*fail-safe closed*).

2. **3-Phase Separator & Compressor Train Desk (`/separator/`):**
   - Diagram bejana pemisah gravitasi horizontal bertekanan tinggi V-101 yang menampilkan stratifikasi fasa fluida minyak, air terproduksi, dan kubah gas asosiasi.
   - Kontrol operasional kompresor sentrifugal dua tahap K-101 berdaya turbin gas lengkap dengan spektrum vibrasi poros (standar ISO 10816).
   - Pengawasan suar bakar (*smokeless flare stack*) dengan pemantauan suhu tip dan kalkulasi kehilangan hidrokarbon sesuai Permen LHK No. 13/2009.

3. **Drilling Mud Logging & Gas Chromatography (`/mudlog/`):**
   - Telemetri pengeboran eksplorasi sumur laut dalam: Kedalaman terukur (*Measured Depth* 3.450 m), *Rate of Penetration* (ROP), dan beban pada mata bor (*Weight on Bit*).
   - Detektor kromatografi gas FID yang memecah spektrum gas hidrokarbon formasi (C1 Metana, C2 Etana, C3 Propana, Butana, dan Pentana C5+).
   - Simulator bahaya semburan liar (*Formation Gas Kick*) dengan peringatan kenaikan volume lumpur (*pit gain*) dan protokol penutupan *Blowout Preventer* (BOP).

4. **SKK Migas Fiscal Custody Transfer B/L A4 Studio (`/custody/`):**
   - Format cetak A4 presisi untuk Berita Acara Serah Terima (BAST) dan *Bill of Lading* resmi lifting minyak mentah.
   - Algoritma koreksi volume ASTM D1250 / API MPMS Bab 11.1 (Tabel 5A untuk penyesuaian API Gravity 60°F dan Tabel 6A untuk *Volume Correction Factor* VCF).
   - Pengurangan kadar endapan air (*Basic Sediment & Water* - BS&W) otomatis hingga menghasilkan *Net Standard Volume* (NSV).
   - Tiga blok tanda tangan resmi (*Tri-Party Signatories*): Perwakilan SKK Migas, OIM Operator KKKS, dan Nakhoda Kapal Tanker ber-QR segel digital.

---

## 🛠️ Stack Teknologi
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";`)
- **State & Storage:** React Context + LocalStorage Persistence
- **Graphics & FX:** HTML5 Canvas (60 FPS Telemetry) + Canvas-Confetti
- **Iconography:** Lucide React
- **Static Export:** GitHub Pages (`output: 'export'`, `trailingSlash: true`, `.nojekyll`)

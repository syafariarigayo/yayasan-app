# 🖥️ Yayasan Wakaf Cendekia - Frontend

Aplikasi web React untuk sistem manajemen yayasan.

## 🚀 Tech Stack

- **React** v19.2
- **React Router** v7.9
- **Axios** v1.13
- **Tailwind CSS** v3.4
- **Chart.js** v4.5

## 📦 Installation
```bash
# Clone repository
git clone https://github.com/syafariarigayo/yayasan-app.git
cd yayasan-app

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run development server
npm start
```

Aplikasi berjalan di: **http://localhost:3000**

## 🔧 Configuration

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5100
```

## 📱 Features

- ✅ Dashboard Overview
- ✅ Data Karyawan
- ✅ Management Magang (3 bulan)
- ✅ Penilaian Kinerja
- ✅ Import Absensi (Excel)
- ✅ Rekap Absensi
- ✅ Penggajian Otomatis
- ✅ Rekap Gaji Bulanan
- ✅ Cetak Slip Gaji (PDF)
- ✅ Pengaturan

## 🎨 Pages

- `/` - Dashboard
- `/data-karyawan` - List karyawan
- `/tambah-karyawan` - Form pendaftaran lengkap
- `/magang` - Management magang
- `/penilaian-kinerja` - Penilaian karyawan
- `/import-absensi` - Upload Excel absensi
- `/rekap-absensi` - Rekap kehadiran
- `/penggajian` - Hitung gaji bulanan
- `/rekap-gaji` - Daftar gaji
- `/slip-gaji/:id` - Slip gaji detail

## 📄 License

MIT License
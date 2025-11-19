# 🖥️ Yayasan Wakaf Cendekia - Frontend

Aplikasi web React untuk sistem manajemen yayasan.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm atau yarn
- Backend API running di port 5100

### Installation
```bash
# Clone repository
git clone https://github.com/syafariarigayo/yayasan-app.git
cd yayasan-app

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env sesuai kebutuhan
# Minimal: REACT_APP_API_URL=http://localhost:5100

# Run development server
npm start
```

Aplikasi berjalan di: **http://localhost:3000**

## 📁 Project Structure
```
yayasan-app/
├── public/
├── src/
│   ├── api/            # Axios config & API calls
│   ├── components/     # Reusable components
│   ├── config/         # Constants & configuration
│   ├── layouts/        # Layout components (Dashboard, etc)
│   ├── pages/          # Page components
│   ├── utils/          # Helper functions
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── .env                # Environment variables (tidak di-commit)
├── .env.example        # Template environment
└── package.json
```

## 🎨 Features

- ✅ Dashboard Overview
- ✅ Manajemen Karyawan (CRUD)
- ✅ Management Magang (3 bulan)
- ✅ Penilaian Kinerja
- ✅ Import Absensi (Excel)
- ✅ Rekap Absensi & Gaji
- ✅ Cetak Slip Gaji (PDF)
- ✅ Autentikasi JWT

## 🔐 Login Credentials

Default admin:
- Username: `admin`
- Password: `123456`

## 🛠️ Available Scripts
```bash
npm start      # Development mode
npm build      # Production build
npm test       # Run tests
```

## 📦 Dependencies

- React 19.2
- React Router 7.9
- Axios 1.13
- Tailwind CSS 3.4
- Chart.js 4.5

## 🌐 Environment Variables

Lihat `.env.example` untuk daftar lengkap.

## 🐛 Troubleshooting

### Error: "Tidak bisa terhubung ke server"
- Pastikan backend running di port 5100
- Cek `REACT_APP_API_URL` di `.env`

### Port 3000 sudah dipakai
Jalankan di port lain:
```bash
PORT=3001 npm start
```

## 📄 License

MIT License - 2025
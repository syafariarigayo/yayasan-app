// src/pages/DataKaryawan.jsx
import { useEffect, useState } from "react";
import api from "../api/axios"; // ← Import axios yang sudah di-configure

export default function DataKaryawan() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Token otomatis dikirim via interceptor
      const res = await api.get("/karyawan");
      setRows(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data");
    }
  };

  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

---

## 🔄 Flow Lengkap Auth
```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                     │
├─────────────────────────────────────────────────────────┤
│  1. User login → POST /auth/login                       │
│  2. Simpan token ke localStorage                        │
│  3. Setiap request → attach token di header             │
│  4. Jika 401 → hapus token & redirect login             │
└─────────────────────────────────────────────────────────┘
                           ↓
                    HTTP Request
              Header: Authorization: Bearer <token>
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (Express.js)                  │
├─────────────────────────────────────────────────────────┤
│  1. Request masuk → Middleware Auth                     │
│  2. Cek token di header                                 │
│  3. Verify token dengan JWT_SECRET                      │
│  4. Jika valid → req.user = decoded                     │
│  5. next() → lanjut ke controller                       │
│  6. Jika invalid → return 401                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Checklist Implementasi

### **Backend (yayasan-api):**
- [ ] Buat folder `middleware/`
- [ ] Buat file `middleware/auth.js`
- [ ] Import di routes yang perlu proteksi
- [ ] Test dengan Postman

### **Frontend (yayasan-app):**
- [ ] Buat file `src/api/axios.js`
- [ ] Setup interceptor
- [ ] Update semua API call pakai axios instance
- [ ] Simpan token setelah login
- [ ] Handle 401 redirect

---

## 🧪 Testing dengan Postman

### **1. Login (Get Token)**
```
POST http://localhost:5100/auth/login
Body (JSON):
{
  "username": "admin",
  "password": "123456"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login berhasil"
}
```

### **2. Test Protected Route (Tanpa Token)**
```
GET http://localhost:5100/karyawan

Response: 401 Unauthorized
{
  "error": "Akses ditolak. Token tidak ditemukan."
}
```

### **3. Test Protected Route (Dengan Token)**
```
GET http://localhost:5100/karyawan
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response: 200 OK
[
  { "id": 1, "nama": "John Doe", ... }
]
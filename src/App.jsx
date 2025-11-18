import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import DashboardAdmin from "./pages/DashboardAdmin";
import DataKaryawan from "./pages/DataKaryawan";
import TambahKaryawan from "./pages/TambahKaryawan";
import EditKaryawan from "./pages/EditKaryawan";
import RekapAbsensi from "./pages/RekapAbsensi";
import HitungGaji from "./pages/HitungGaji";
import RekapGaji from "./pages/RekapGaji";
import SlipGaji from "./pages/SlipGaji";   // ← Tambahkan ini
import Login from "./pages/Login";
import FormKaryawanBaru from "./pages/FormKaryawanBaru";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/" element={<DataKaryawan />} />
          <Route path="/data-karyawan" element={<DataKaryawan />} />
          <Route path="/tambah" element={<TambahKaryawan />} />
          <Route path="/edit/:id" element={<EditKaryawan />} />
          <Route path="/rekap-absensi" element={<RekapAbsensi />} />
          <Route path="/hitung-gaji" element={<HitungGaji />} />
          <Route path="/rekap-gaji" element={<RekapGaji />} />
	  <Route path="/pendaftaran-karyawan" element={<FormKaryawanBaru />} />

          {/*  💥 ROUTE BARU DI SINI */}
          <Route path="/slip-gaji/:id" element={<SlipGaji />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
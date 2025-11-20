import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardOverview from "./pages/DashboardOverview";
import DataKaryawan from "./pages/DataKaryawan";
import EditKaryawan from "./pages/EditKaryawan";
import ImportAbsensi from "./pages/ImportAbsensi";
import RekapAbsensi from "./pages/RekapAbsensi";
import Penggajian from "./pages/Penggajian";
import RekapGaji from "./pages/RekapGaji";
import SlipGaji from "./pages/SlipGaji";
import PenilaianKinerja from "./pages/PenilaianKinerja";
import ManagementMagang from "./pages/ManagementMagang";
import Pengaturan from "./pages/Pengaturan";
import Login from "./pages/Login";

import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/data-karyawan" element={<DataKaryawan />} />
                <Route path="/edit/:id" element={<EditKaryawan />} />
                
                {/* ✅ ROUTES BARU */}
                <Route path="/magang" element={<ManagementMagang />} />
                <Route path="/penilaian-kinerja" element={<PenilaianKinerja />} />
                
                <Route path="/import-absensi" element={<ImportAbsensi />} />
                <Route path="/rekap-absensi" element={<RekapAbsensi />} />
                <Route path="/penggajian" element={<Penggajian />} />
                <Route path="/rekap-gaji" element={<RekapGaji />} />
                <Route path="/slip-gaji/:id" element={<SlipGaji />} />
                <Route path="/pengaturan" element={<Pengaturan />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
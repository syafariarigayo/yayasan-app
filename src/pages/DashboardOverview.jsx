import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ModalTambahKaryawan from "../components/ModalTambahKaryawan";

export default function DashboardOverview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalKaryawan: 0,
    karyawanMagang: 0,
    karyawanTetap: 0,
    totalUnit: 0
  });
  const [loading, setLoading] = useState(true);
  const [modalTambahOpen, setModalTambahOpen] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/dashboard/summary");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* WELCOME */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8 mb-6">
        <h1 className="text-4xl font-bold mb-2">
          Selamat Datang di Sistem Informasi Yayasan
        </h1>
        <p className="text-blue-100 text-lg">
          Dashboard Admin - Kelola data karyawan dengan mudah
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">👥</div>
            <div className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-semibold">
              Total
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {loading ? "..." : stats.totalKaryawan}
          </div>
          <div className="text-sm text-gray-600">Total Karyawan</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">🎓</div>
            <div className="text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm font-semibold">
              Magang
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {loading ? "..." : stats.karyawanMagang}
          </div>
          <div className="text-sm text-gray-600">Sedang Magang</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">✅</div>
            <div className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-semibold">
              Tetap
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {loading ? "..." : stats.karyawanTetap}
          </div>
          <div className="text-sm text-gray-600">Karyawan Tetap</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">🏢</div>
            <div className="text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-sm font-semibold">
              Unit
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {loading ? "..." : (stats.totalUnit || 4)}
          </div>
          <div className="text-sm text-gray-600">Unit Kerja</div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Tambah Karyawan - MODAL */}
          <div 
            onClick={() => setModalTambahOpen(true)}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-3">➕</div>
            <h3 className="text-lg font-bold">Tambah Karyawan</h3>
            <p className="text-sm text-blue-100 mt-1">Daftar karyawan baru</p>
          </div>

          {/* Penilaian Kinerja */}
          <div 
            onClick={() => navigate("/penilaian-kinerja")}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-3">⭐</div>
            <h3 className="text-lg font-bold">Penilaian Kinerja</h3>
            <p className="text-sm text-purple-100 mt-1">Nilai performa karyawan</p>
          </div>

          {/* Management Magang */}
          <div 
            onClick={() => navigate("/magang")}
            className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-3">📚</div>
            <h3 className="text-lg font-bold">Management Magang</h3>
            <p className="text-sm text-orange-100 mt-1">Kelola karyawan magang</p>
          </div>

          {/* Import Absensi */}
          <div 
            onClick={() => navigate("/import-absensi")}
            className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-3">📥</div>
            <h3 className="text-lg font-bold">Import Absensi</h3>
            <p className="text-sm text-green-100 mt-1">Upload data kehadiran</p>
          </div>

        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Karyawan Magang Aktif */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Karyawan Magang Aktif</h3>
            <button 
              onClick={() => navigate("/magang")}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
            >
              Lihat Semua →
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Memuat data...</div>
            ) : (
              <>
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="text-sm">Klik "Lihat Semua" untuk detail</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Penilaian Terbaru */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Penilaian Kinerja Terbaru</h3>
            <button 
              onClick={() => navigate("/penilaian-kinerja")}
              className="text-purple-600 hover:text-purple-800 text-sm font-semibold"
            >
              Lihat Semua →
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Memuat data...</div>
            ) : (
              <>
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">⭐</div>
                  <p className="text-sm">Klik "Lihat Semua" untuk detail</p>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* MODAL TAMBAH KARYAWAN */}
      <ModalTambahKaryawan 
        isOpen={modalTambahOpen}
        onClose={() => setModalTambahOpen(false)}
        onSuccess={() => {
          fetchStats(); // Refresh stats
          setModalTambahOpen(false);
        }}
      />

    </div>
  );
}

import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5100";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalKaryawan: 0,
    karyawanLulus: 0,
    karyawanMagang: 0,
    penilaianBulanIni: 0,
    statusData: [],
    jabatanData: []
  });
  
  const [recentMagang, setRecentMagang] = useState([]);
  const [recentPenilaian, setRecentPenilaian] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    
    try {
      // Load summary stats
      const resSum = await fetch(`${API_URL}/dashboard/summary`);
      const summary = await resSum.json();
      
      // Load recent magang
      const resMagang = await fetch(`${API_URL}/magang?hasil=Sedang Berjalan`);
      const magang = await resMagang.json();
      
      // Load recent penilaian
      const bulan = new Date().getMonth() + 1;
      const tahun = new Date().getFullYear();
      const resPenilaian = await fetch(`${API_URL}/penilaian-kinerja?bulan=${bulan}&tahun=${tahun}`);
      const penilaian = await resPenilaian.json();
      
      setStats({
        totalKaryawan: summary.total || 0,
        karyawanLulus: summary.status?.find(s => s.status === "LULUS")?.jumlah || 0,
        karyawanMagang: summary.status?.find(s => s.status === "MAGANG")?.jumlah || 0,
        penilaianBulanIni: penilaian.length || 0,
        statusData: summary.status || [],
        jabatanData: summary.jabatan || []
      });
      
      setRecentMagang(magang.slice(0, 5));
      setRecentPenilaian(penilaian.slice(0, 5));
      
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const hitungSisaHari = (tanggalMulai) => {
    if (!tanggalMulai) return "-";
    const mulai = new Date(tanggalMulai);
    const target = new Date(mulai);
    target.setMonth(target.getMonth() + 3);
    const sekarang = new Date();
    const diffTime = target - sekarang;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Telah Lewat";
    if (diffDays === 0) return "Hari Ini";
    return `${diffDays} hari`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-200 text-sm font-semibold">Total Karyawan</p>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-4xl font-bold">{stats.totalKaryawan}</p>
            <p className="text-blue-200 text-xs mt-2">Semua status</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-200 text-sm font-semibold">Karyawan Tetap</p>
              <span className="text-3xl">✓</span>
            </div>
            <p className="text-4xl font-bold">{stats.karyawanLulus}</p>
            <p className="text-green-200 text-xs mt-2">Status LULUS</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-yellow-200 text-sm font-semibold">Sedang Magang</p>
              <span className="text-3xl">📚</span>
            </div>
            <p className="text-4xl font-bold">{stats.karyawanMagang}</p>
            <p className="text-yellow-200 text-xs mt-2">Durasi 3 bulan</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-200 text-sm font-semibold">Penilaian Bulan Ini</p>
              <span className="text-3xl">⭐</span>
            </div>
            <p className="text-4xl font-bold">{stats.penilaianBulanIni}</p>
            <p className="text-purple-200 text-xs mt-2">
              {new Date().toLocaleString('id-ID', { month: 'long' })}
            </p>
          </div>

        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* STATUS KARYAWAN */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Status Karyawan</h3>
            <div className="space-y-3">
              {stats.statusData.map((item, idx) => {
                const percentage = ((item.jumlah / stats.totalKaryawan) * 100).toFixed(1);
                const colors = {
                  "LULUS": "bg-green-600",
                  "MAGANG": "bg-yellow-600"
                };
                return (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold">{item.status || "Unknown"}</span>
                      <span className="text-sm text-gray-400">{item.jumlah} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`${colors[item.status] || "bg-gray-600"} h-3 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DISTRIBUSI JABATAN */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Distribusi Jabatan</h3>
            <div className="space-y-3">
              {stats.jabatanData.slice(0, 5).map((item, idx) => {
                const percentage = ((item.jumlah / stats.totalKaryawan) * 100).toFixed(1);
                return (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold">{item.jabatan || "Tidak Ada"}</span>
                      <span className="text-sm text-gray-400">{item.jumlah} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* TABLES ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* MAGANG AKTIF */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Magang Aktif</h3>
              <a href="/magang" className="text-blue-400 text-sm hover:underline">
                Lihat Semua →
              </a>
            </div>
            
            {recentMagang.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Tidak ada magang aktif</p>
            ) : (
              <div className="space-y-3">
                {recentMagang.map((item) => (
                  <div key={item.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-semibold">{item.nama}</p>
                        <p className="text-sm text-gray-400">{item.unit_kerja || "Unit belum ditentukan"}</p>
                      </div>
                      <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
                        Aktif
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>
                        Mulai: {item.magang_mulai 
                          ? new Date(item.magang_mulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
                          : "-"
                        }
                      </span>
                      <span className="text-yellow-400 font-semibold">
                        Sisa: {hitungSisaHari(item.magang_mulai)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PENILAIAN TERBARU */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Penilaian Terbaru</h3>
              <a href="/penilaian-kinerja" className="text-blue-400 text-sm hover:underline">
                Lihat Semua →
              </a>
            </div>
            
            {recentPenilaian.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Belum ada penilaian bulan ini</p>
            ) : (
              <div className="space-y-3">
                {recentPenilaian.map((item) => {
                  const kategoriColors = {
                    "Sangat Baik": "text-green-400",
                    "Baik": "text-blue-400",
                    "Cukup": "text-yellow-400",
                    "Kurang": "text-orange-400",
                    "Sangat Kurang": "text-red-400"
                  };
                  return (
                    <div key={item.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-semibold">{item.nama}</p>
                          <p className="text-sm text-gray-400">{item.jabatan}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-400">{item.nilai_akhir}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className={`font-semibold ${kategoriColors[item.kategori]}`}>
                          {item.kategori}
                        </span>
                        <span className={`px-2 py-1 rounded ${
                          item.status === 'Final' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/tambah-karyawan" className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-center transition">
              <span className="text-3xl block mb-2">➕</span>
              <span className="font-semibold">Tambah Karyawan</span>
            </a>
            
            <a href="/penilaian-kinerja" className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition">
              <span className="text-3xl block mb-2">⭐</span>
              <span className="font-semibold">Penilaian Kinerja</span>
            </a>
            
            <a href="/magang" className="bg-yellow-600 hover:bg-yellow-700 rounded-lg p-4 text-center transition">
              <span className="text-3xl block mb-2">📚</span>
              <span className="font-semibold">Management Magang</span>
            </a>
            
            <a href="/import-absensi" className="bg-green-600 hover:bg-green-700 rounded-lg p-4 text-center transition">
              <span className="text-3xl block mb-2">📊</span>
              <span className="font-semibold">Import Absensi</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
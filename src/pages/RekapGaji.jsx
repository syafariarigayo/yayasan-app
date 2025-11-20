import React, { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function RekapGaji() {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ FIX: Better validation & error handling
  const loadRekap = async () => {
    // Validate inputs
    if (!bulan || !tahun) {
      alert("Pilih bulan dan tahun terlebih dahulu!");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const res = await api.get(
        `/rekap-gaji/bulanan?bulan=${bulan}&tahun=${tahun}`
      );
      
      if (res.data && Array.isArray(res.data)) {
        setRows(res.data);
        
        if (res.data.length === 0) {
          setError("Tidak ada data gaji untuk periode yang dipilih");
        }
      } else {
        setRows([]);
        setError("Format data tidak valid");
      }
      
    } catch (err) {
      console.error("Load rekap error:", err);
      
      if (err.response?.status === 404) {
        setError("Data gaji tidak ditemukan untuk periode ini");
      } else if (err.response?.status === 401) {
        setError("Sesi Anda telah berakhir. Silakan login kembali.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(err.response?.data?.message || "Gagal memuat data. Pastikan backend berjalan.");
      }
      
      setRows([]);
      
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: Better download handler
  const handleDownload = (id, nama) => {
    try {
      const url = `http://localhost:5100/slip/download/${id}`;
      window.open(url, '_blank');
    } catch (err) {
      console.error("Download error:", err);
      alert("Gagal mendownload slip gaji");
    }
  };

  // Format currency helper
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Rekap Gaji Bulanan</h1>
          <p className="text-gray-400">Lihat dan kelola rekap gaji karyawan per bulan</p>
        </div>

        {/* FILTER CARD */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            {/* Bulan Select */}
            <div>
              <label className="block text-sm mb-2 font-semibold">Bulan:</label>
              <select 
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                onChange={(e) => setBulan(e.target.value)}
                value={bulan}
              >
                <option value="">-- Pilih Bulan --</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((b) => (
                  <option key={b} value={b}>
                    {new Date(2025, b - 1).toLocaleString('id-ID', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>

            {/* Tahun Select */}
            <div>
              <label className="block text-sm mb-2 font-semibold">Tahun:</label>
              <select 
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                onChange={(e) => setTahun(e.target.value)}
                value={tahun}
              >
                <option value="">-- Pilih Tahun --</option>
                {[2023, 2024, 2025, 2026].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Spacer */}
            <div></div>

            {/* Button */}
            <div>
              <button 
                onClick={loadRekap} 
                disabled={loading || !bulan || !tahun}
                className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Memuat...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    Tampilkan
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Selected Period Info */}
          {bulan && tahun && (
            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-300">Periode Dipilih: </span>
              <span className="font-bold text-blue-400">
                {new Date(2025, parseInt(bulan) - 1).toLocaleString('id-ID', { month: 'long' })} {tahun}
              </span>
            </div>
          )}
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* EMPTY STATE - Before Search */}
        {!loading && rows.length === 0 && !error && !bulan && !tahun && (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Pilih Periode Gaji</h3>
            <p className="text-gray-400">
              Pilih bulan dan tahun di atas, lalu klik "Tampilkan" untuk melihat rekap gaji
            </p>
          </div>
        )}

        {/* EMPTY STATE - After Search */}
        {!loading && rows.length === 0 && !error && bulan && tahun && (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold mb-2">Tidak Ada Data</h3>
            <p className="text-gray-400">
              Belum ada data gaji untuk periode{' '}
              {new Date(2025, parseInt(bulan) - 1).toLocaleString('id-ID', { month: 'long' })} {tahun}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Pastikan gaji sudah dihitung di menu "Hitung Gaji" terlebih dahulu
            </p>
          </div>
        )}

        {/* TABLE - With Data */}
        {!loading && rows.length > 0 && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-5">
                <p className="text-blue-300 text-sm mb-1">Total Karyawan</p>
                <p className="text-3xl font-bold">{rows.length}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-lg p-5">
                <p className="text-green-300 text-sm mb-1">Total Pengeluaran</p>
                <p className="text-2xl font-bold">
                  Rp {formatRupiah(rows.reduce((sum, r) => sum + parseFloat(r.total_gaji || 0), 0))}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg p-5">
                <p className="text-purple-300 text-sm mb-1">Rata-rata Gaji</p>
                <p className="text-2xl font-bold">
                  Rp {formatRupiah(rows.reduce((sum, r) => sum + parseFloat(r.total_gaji || 0), 0) / rows.length)}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-3 text-left">No</th>
                      <th className="p-3 text-left">Nama</th>
                      <th className="p-3 text-left">Jabatan</th>
                      <th className="p-3 text-center">Hadir</th>
                      <th className="p-3 text-center">Telat</th>
                      <th className="p-3 text-center">Izin</th>
                      <th className="p-3 text-center">Alpa</th>
                      <th className="p-3 text-right">Total Gaji</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.id || i} className="border-t border-gray-700 hover:bg-gray-750 transition-all">
                        <td className="p-3 text-gray-400">{i + 1}</td>
                        <td className="p-3">
                          <div className="font-semibold">{r.nama}</div>
                          {r.email && (
                            <div className="text-xs text-gray-400">{r.email}</div>
                          )}
                        </td>
                        <td className="p-3">{r.jabatan || "-"}</td>
                        <td className="p-3 text-center">
                          <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-sm">
                            {r.total_hadir || 0}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded text-sm">
                            {r.total_telat || 0}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-sm">
                            {r.total_izin || 0}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-sm">
                            {r.total_alpa || 0}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <span className="font-bold text-green-400 text-lg">
                            Rp {formatRupiah(r.total_gaji || 0)}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2 justify-center">
                            <Link 
                              to={`/slip-gaji/${r.id}`}
                              className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-semibold transition-all flex items-center gap-1"
                            >
                              <span>👁️</span>
                              Lihat
                            </Link>
                            
                            <button
                              onClick={() => handleDownload(r.id, r.nama)}
                              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-all flex items-center gap-1"
                            >
                              <span>⬇️</span>
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Actions */}
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-400">
                Menampilkan {rows.length} karyawan untuk periode{' '}
                {new Date(2025, parseInt(bulan) - 1).toLocaleString('id-ID', { month: 'long' })} {tahun}
              </p>
              
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-all flex items-center gap-2">
                  <span>📊</span>
                  Export Excel
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-all flex items-center gap-2">
                  <span>📄</span>
                  Export PDF
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
// src/pages/DashboardPenggajian.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPenggajian() {
  const [bulan, setBulan] = useState(new Date().getMonth() + 1);
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/dashboard/gaji-summary?bulan=${bulan}&tahun=${tahun}`);
      setSummary(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat ringkasan gaji");
    }
    setLoading(false);
  };

  useEffect(() => { loadSummary(); }, [bulan, tahun]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard Penggajian</h1>

      <div className="mb-4 flex items-center gap-3">
        <select value={bulan} onChange={e => setBulan(e.target.value)} className="text-black p-2">
          {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
        </select>

        <select value={tahun} onChange={e => setTahun(e.target.value)} className="text-black p-2">
          {[2023,2024,2025,2026].map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <button onClick={loadSummary} className="bg-blue-600 px-4 py-2 rounded">Refresh</button>
      </div>

      {loading && <p>Memuat...</p>}

      {summary && (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-sm">Total Pengeluaran</div>
              <div className="text-2xl font-bold text-yellow-400">Rp {Number(summary.totalPengeluaran).toLocaleString()}</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-sm">Jumlah Karyawan</div>
              <div className="text-2xl font-bold">{summary.jumlahKaryawan}</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-sm">Rata-rata Gaji</div>
              <div className="text-2xl font-bold">Rp {Number(summary.rataRataGaji).toLocaleString()}</div>
            </div>
          </div>

          <div className="mb-4 bg-gray-700 p-3 rounded">
            <div className="text-sm">Absensi (total bulan): Hadir {summary.totalHadir} — Telat {summary.totalTelat} — Alpa {summary.totalAlpa}</div>
          </div>

          <h2 className="text-lg font-bold mb-2">Top 10 Gaji Tertinggi</h2>
          <table className="w-full bg-gray-800">
            <thead className="bg-gray-700">
              <tr>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Total Gaji</th>
              </tr>
            </thead>
            <tbody>
              {summary.top10.map((r) => (
                <tr key={r.id} className="border-b border-gray-600">
                  <td className="p-2">{r.nama}</td>
                  <td>{r.jabatan}</td>
                  <td className="font-bold text-yellow-400">Rp {Number(r.total_gaji).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
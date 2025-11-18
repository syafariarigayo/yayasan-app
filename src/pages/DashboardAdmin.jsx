import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardAdmin() {
  const [dataKaryawan, setDataKaryawan] = useState(null);
  const [gaji, setGaji] = useState(null);

  const [bulan, setBulan] = useState(new Date().getMonth() + 1);
  const [tahun, setTahun] = useState(new Date().getFullYear());

  // ============================
  // LOAD DASHBOARD KARYAWAN
  // ============================
  useEffect(() => {
    axios.get("http://localhost:5000/dashboard/summary")
      .then(r => setDataKaryawan(r.data))
      .catch(e => {
        console.error(e);
        setDataKaryawan({ total: 0, status: [], jabatan: [] });
      });
  }, []);

  // ============================
  // LOAD DASHBOARD PENGGAJIAN
  // ============================
  const loadGajiSummary = () => {
    axios
      .get(
        `http://localhost:5000/dashboard/gaji-summary?bulan=${bulan}&tahun=${tahun}`
      )
      .then((r) => setGaji(r.data))
      .catch((e) => {
        console.error(e);
        alert("Gagal memuat ringkasan gaji!");
      });
  };

  useEffect(() => {
    loadGajiSummary();
  }, [bulan, tahun]);

  if (!dataKaryawan) return <p>Memuat dashboard...</p>;

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* =====================================================
          BAGIAN 1 — DASHBOARD KARYAWAN
      ====================================================== */}
      <h2 className="text-xl font-bold mb-3">Dashboard Kepegawaian</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-sm">Total Karyawan</div>
          <div className="text-3xl font-bold">{dataKaryawan.total}</div>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-sm font-bold">Status Karyawan</div>
          <ul>
            {dataKaryawan.status.map((s) => (
              <li key={s.status}>{s.status}: {s.jumlah}</li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-sm font-bold">Jabatan</div>
          <ul>
            {dataKaryawan.jabatan.map((j) => (
              <li key={j.jabatan}>{j.jabatan}: {j.jumlah}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* =====================================================
          BAGIAN 2 — DASHBOARD PENGGAJIAN
      ====================================================== */}
      <h2 className="text-xl font-bold mb-3">Dashboard Penggajian</h2>

      {/* FILTER BULAN & TAHUN */}
      <div className="mb-4 flex items-center gap-3">
        <select
          onChange={(e) => setBulan(e.target.value)}
          value={bulan}
          className="text-black p-2"
        >
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          onChange={(e) => setTahun(e.target.value)}
          value={tahun}
          className="text-black p-2"
        >
          {[2023,2024,2025,2026].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <button onClick={loadGajiSummary} className="bg-blue-600 px-4 py-2 rounded">
          Refresh
        </button>
      </div>

      {/* JIKA DATA BELUM ADA */}
      {!gaji && <p>Memuat gaji...</p>}

      {/* CARD RINGKAS */}
      {gaji && (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-800 rounded">
              <div className="text-sm">Total Pengeluaran</div>
              <div className="text-2xl font-bold text-yellow-400">
                Rp {Number(gaji.totalPengeluaran).toLocaleString()}
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded">
              <div className="text-sm">Jumlah Karyawan Digaji</div>
              <div className="text-2xl font-bold">{gaji.jumlahKaryawan}</div>
            </div>

            <div className="p-4 bg-gray-800 rounded">
              <div className="text-sm">Rata-rata Gaji</div>
              <div className="text-2xl font-bold">
                Rp {Number(gaji.rataRataGaji).toLocaleString()}
              </div>
            </div>
          </div>

          {/* RINGKASAN ABSENSI */}
          <div className="bg-gray-800 p-4 rounded mb-6">
            <h3 className="font-bold mb-2 text-sm">Ringkasan Absensi Bulan Ini</h3>
            <p>Hadir: {gaji.totalHadir}</p>
            <p>Telat: {gaji.totalTelat}</p>
            <p>Alpa: {gaji.totalAlpa}</p>
          </div>

          {/* TOP 10 GAJI */}
          <h3 className="text-lg font-bold mb-2">Top 10 Gaji Tertinggi</h3>
          <table className="w-full bg-gray-900">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-2">Nama</th>
                <th>Jabatan</th>
                <th>Total Gaji</th>
              </tr>
            </thead>

            <tbody>
              {gaji.top10.map((x) => (
                <tr key={x.id} className="border-b border-gray-700">
                  <td className="p-2">{x.nama}</td>
                  <td>{x.jabatan}</td>
                  <td className="font-bold text-green-400">
                    Rp {Number(x.total_gaji).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
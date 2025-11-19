import React, { useState } from "react";
import api from "../api/axios";  // ✅ Gunakan api instance, bukan axios langsung
import { Link } from "react-router-dom";

export default function RekapGaji() {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRekap = async () => {
    if (!bulan || !tahun) return alert("Pilih bulan dan tahun!");

    setLoading(true);
    try {
      const res = await api.get(
        `/rekap-gaji/bulanan?bulan=${bulan}&tahun=${tahun}`
      );
      setRows(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Tidak bisa memuat rekap gaji");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-6">Rekap Gaji Bulanan</h1>

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm mb-2">Bulan:</label>
              <select 
                className="text-black p-2 rounded" 
                onChange={e => setBulan(e.target.value)}
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

            <div>
              <label className="block text-sm mb-2">Tahun:</label>
              <select 
                className="text-black p-2 rounded" 
                onChange={e => setTahun(e.target.value)}
                value={tahun}
              >
                <option value="">-- Pilih Tahun --</option>
                {[2023, 2024, 2025, 2026].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="self-end">
              <button 
                onClick={loadRekap} 
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold disabled:bg-gray-600"
                disabled={loading}
              >
                {loading ? "Memuat..." : "Tampilkan"}
              </button>
            </div>
          </div>
        </div>

        {rows.length === 0 && !loading && (
          <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
            Pilih bulan dan tahun, lalu klik Tampilkan
          </div>
        )}

        {rows.length > 0 && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
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
                  <tr key={i} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3 font-semibold">{r.nama}</td>
                    <td className="p-3">{r.jabatan}</td>
                    <td className="p-3 text-center">{r.total_hadir}</td>
                    <td className="p-3 text-center">{r.total_telat}</td>
                    <td className="p-3 text-center">{r.total_izin}</td>
                    <td className="p-3 text-center">{r.total_alpa}</td>
                    <td className="p-3 text-right font-bold text-green-400">
                      Rp {Number(r.total_gaji).toLocaleString('id-ID')}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <Link 
                          to={`/slip-gaji/${r.id}`}  {/* ✅ FIX: Pakai kurung kurawal */}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-semibold"
                        >
                          Lihat Slip
                        </Link>
                        
                          href={`http://localhost:5100/slip/download/${r.id}`}  {/* ✅ FIX: Pakai kurung kurawal + port 5100 */}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold"
                          target="_blank"
                          rel="noreferrer"  {/* ✅ FIX: Tambahkan rel="noreferrer" */}
                        >
                          Download
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
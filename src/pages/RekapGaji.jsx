import React, { useState } from "react";
import axios from "axios";
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
      const res = await axios.get(
        `http://localhost:5000/rekap-gaji/bulanan?bulan=${bulan}&tahun=${tahun}`
      );
      setRows(res.data || []);
    } catch (err) {
      alert("Tidak bisa memuat rekap gaji");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Rekap Gaji Bulanan</h1>

      <div className="mb-4">
        <select className="text-black p-2 mr-2" onChange={e => setBulan(e.target.value)}>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select className="text-black p-2" onChange={e => setTahun(e.target.value)}>
          {[2023,2024,2025].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <button onClick={loadRekap} className="bg-blue-600 px-4 py-2 ml-3 rounded">
          {loading ? "Memuat..." : "Tampilkan"}
        </button>
      </div>

      <table className="w-full bg-gray-800">
        <thead className="bg-gray-700">
          <tr>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Hadir</th>
            <th>Telat</th>
            <th>Izin</th>
            <th>Alpa</th>
            <th>Total Gaji</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td>{r.nama}</td>
              <td>{r.jabatan}</td>
              <td>{r.total_hadir}</td>
              <td>{r.total_telat}</td>
              <td>{r.total_izin}</td>
              <td>{r.total_alpa}</td>
              <td>Rp {Number(r.total_gaji).toLocaleString()}</td>

              <td className="flex gap-2">
                <Link to={`/slip-gaji/${r.id}`} className="px-3 py-1 bg-green-600 rounded">
                  Lihat Slip
                </Link>

                <a
                  href={`http://localhost:5000/slip/download/${r.id}`}
                  className="px-3 py-1 bg-blue-600 rounded"
                  target="_blank"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
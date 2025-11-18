import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RekapAbsensi() {
  const [rows, setRows] = useState([]);

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:5100/absensi");
      setRows(res.data || []);
    } catch (err) {
      console.error("GAGAL MEMUAT ABSENSI:", err);
      alert("Gagal memuat data absensi (cek backend)");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Rekap Absensi</h1>
      <p className="mb-4">
        Menampilkan semua data absensi. Nanti bisa ditambahkan filter per
        bulan/tahun.
      </p>

      <div className="overflow-auto">
        <table className="w-full bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2">#</th>
              <th>Nama</th>
              <th>Tanggal</th>
              <th>Masuk</th>
              <th>Pulang</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{r.nama}</td>
                <td className="p-2">{r.tanggal}</td>
                <td className="p-2">{r.jam_masuk}</td>
                <td className="p-2">{r.jam_pulang}</td>
                <td className="p-2">{r.status}</td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
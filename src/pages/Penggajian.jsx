import React, { useState } from "react";
import axios from "axios";

export default function Penggajian() {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [rows, setRows] = useState([]);

  const hitung = async () => {
    if (!bulan || !tahun) return alert("Pilih bulan dan tahun!");

    try {
      const res = await axios.post("http://localhost:5000/gaji/hitung", {
        bulan, tahun
      });
      setRows(res.data);
    } catch (err) {
      alert("Gagal menghitung gaji");
    }
  };

  const simpanRekap = async () => {
    if (rows.length === 0) return alert("Hitung gaji dulu!");

    try {
      await axios.post("http://localhost:5000/rekap-gaji/simpan", {
        bulan, tahun, data: rows
      });
      alert("Rekap gaji disimpan!");
    } catch (err) {
      alert("Gagal menyimpan rekap");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Hitung Gaji</h1>

      <div className="mb-4">
        <select className="text-black p-2 mr-2" onChange={e => setBulan(e.target.value)}>
          <option value="">Pilih Bulan</option>
          {[...Array(12)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1}</option>
          ))}
        </select>

        <select className="text-black p-2" onChange={e => setTahun(e.target.value)}>
          <option value="">Pilih Tahun</option>
          {[2023, 2024, 2025].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <button onClick={hitung} className="bg-green-600 px-4 py-2 ml-3 rounded">
          Hitung
        </button>
      </div>

      {rows.length > 0 && (
        <button onClick={simpanRekap} className="bg-blue-600 px-4 py-2 rounded mb-3">
          Simpan Rekap Gaji
        </button>
      )}

      <table className="w-full bg-gray-800">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Nama</th>
            <th>Jabatan</th>
            <th>Hadir</th>
            <th>Telat</th>
            <th>Izin</th>
            <th>Alpa</th>
            <th>Total Gaji</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="p-2">{r.nama}</td>
              <td>{r.jabatan}</td>
              <td>{r.total_hadir}</td>
              <td>{r.total_telat}</td>
              <td>{r.total_izin}</td>
              <td>{r.total_alpa}</td>
              <td className="font-bold text-yellow-400">
                Rp {Number(r.total_gaji).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
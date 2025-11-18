import React, { useState } from "react";
import axios from "axios";

export default function HitungGaji() {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [hasil, setHasil] = useState([]);
  const [loading, setLoading] = useState(false);

  const hitung = async () => {
    if (!bulan || !tahun) {
      alert("Silakan pilih bulan dan tahun!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/penggajian/hitung", {
        bulan: Number(bulan),
        tahun: Number(tahun),
      });

      alert("Gaji berhasil dihitung dan disimpan!");
      setHasil(res.data.data); // simpan data hasilnya

    } catch (err) {
      alert(err.response?.data?.error || "Gagal menghitung gaji");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Penggajian (Hitung Gaji)</h1>

      {/* PILIH BULAN */}
      <label className="mr-2">Bulan:</label>
      <select
        className="text-black p-2 mb-3"
        value={bulan}
        onChange={(e) => setBulan(e.target.value)}
      >
        <option value="">-- Pilih Bulan --</option>
        <option value="1">Januari</option>
        <option value="2">Februari</option>
        <option value="3">Maret</option>
        <option value="4">April</option>
        <option value="5">Mei</option>
        <option value="6">Juni</option>
        <option value="7">Juli</option>
        <option value="8">Agustus</option>
        <option value="9">September</option>
        <option value="10">Oktober</option>
        <option value="11">November</option>
        <option value="12">Desember</option>
      </select>

      <br />

      {/* PILIH TAHUN */}
      <label className="mr-2">Tahun:</label>
      <select
        className="text-black p-2 mb-3"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
      >
        <option value="">-- Pilih Tahun --</option>
        {["2023", "2024", "2025", "2026"].map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <br />

      {/* BUTTON HITUNG */}
      <button
        onClick={hitung}
        disabled={loading}
        className="bg-green-600 px-4 py-2 rounded"
      >
        {loading ? "Menghitung..." : "Hitung Gaji"}
      </button>

      {/* TABEL HASIL */}
      {hasil.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            Hasil Perhitungan Gaji Bulan {bulan}/{tahun}
          </h2>

          <table className="w-full bg-gray-800">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-2">#</th>
                <th>Nama</th>
                <th>Hadir</th>
                <th>Telat</th>
                <th>Izin</th>
                <th>Alpa</th>
                <th>Total Gaji</th>
              </tr>
            </thead>

            <tbody>
              {hasil.map((r, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{r.nama}</td>
                  <td className="p-2">{r.total_hadir}</td>
                  <td className="p-2">{r.total_telat}</td>
                  <td className="p-2">{r.total_izin}</td>
                  <td className="p-2">{r.total_alpa}</td>
                  <td className="p-2 font-bold text-yellow-400">
                    Rp {Number(r.gaji_bersih).toLocaleString("id-ID")}
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
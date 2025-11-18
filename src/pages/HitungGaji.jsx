import React, { useState, useEffect } from "react";
import axios from "axios";

function HitungGaji() {
  const [karyawan, setKaryawan] = useState([]);
  const [karyawanId, setKaryawanId] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [hasil, setHasil] = useState(null);

  useEffect(() => {
    loadKaryawan();
  }, []);

  const loadKaryawan = async () => {
    const res = await axios.get("http://localhost:5000/karyawan");
    setKaryawan(res.data);
  };

  const prosesHitung = async () => {
    if (!karyawanId || !bulan || !tahun)
      return alert("Lengkapi semua data!");

    const res = await axios.post("http://localhost:5000/gaji/hitung", {
      karyawan_id: karyawanId,
      bulan,
      tahun,
    });

    setHasil(res.data);
  };

  return (
    <div style={{ color: "white" }}>
      <h1 className="text-3xl font-bold mb-4">💰 Hitung Gaji Karyawan</h1>

      <div className="bg-gray-800 p-4 rounded mb-6">

        <div className="mb-3">
          <label>Karyawan</label>
          <select onChange={(e) => setKaryawanId(e.target.value)} className="text-black">
            <option value="">-- pilih --</option>
            {karyawan.map((k) => (
              <option key={k.id} value={k.id}>{k.nama}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Bulan</label>
          <select onChange={(e) => setBulan(e.target.value)} className="text-black">
            <option value="">-- pilih --</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Tahun</label>
          <input 
            type="number"
            onChange={(e) => setTahun(e.target.value)}
            className="text-black"
          />
        </div>

        <button
          onClick={prosesHitung}
          className="px-4 py-2 bg-blue-600 rounded"
        >Hitung Gaji</button>
      </div>

      {hasil?.gaji_id && (
        <a
          href={`http://localhost:5000/slip/download/${hasil.gaji_id}`}
          className="px-4 py-2 bg-green-600 text-white rounded mt-3 inline-block"
        >
          Download Slip Gaji (PDF)
        </a>
      )}

      {hasil && (
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-3">Hasil Perhitungan</h2>
          <p>Total Gaji: <b>Rp {hasil.total_gaji.toLocaleString()}</b></p>

          <h3 className="mt-4">Rincian:</h3>
          <ul>
            <li>Hadir: {hasil.rincian.totalHadir}</li>
            <li>Terlambat: {hasil.rincian.totalTerlambat}</li>
            <li>Tidak Hadir: {hasil.rincian.totalTidakHadir}</li>
            <li>Lembur: {hasil.rincian.totalLembur} jam</li>
            <li>Potongan: Rp {hasil.rincian.potongan.toLocaleString()}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HitungGaji;
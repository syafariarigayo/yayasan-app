import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SlipGaji() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/slip/${id}`)
      .then(res => setData(res.data))
      .catch(() => alert("Slip gaji tidak ditemukan"));
  }, [id]);

  if (!data) return <p className="text-white p-6">Memuat slip gaji...</p>;

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Slip Gaji {data.nama}</h1>

      <div className="bg-gray-800 p-4 rounded">
        <p>Nama: {data.nama}</p>
        <p>Jabatan: {data.jabatan}</p>
        <p>Periode: {data.bulan}-{data.tahun}</p>

        <h3 className="mt-4 mb-2 font-bold">Rincian:</h3>
        <p>Hadir: {data.total_hadir}</p>
        <p>Telat: {data.total_telat}</p>
        <p>Izin: {data.total_izin}</p>
        <p>Alpa: {data.total_alpa}</p>

        <h3 className="mt-4 font-bold text-yellow-300">
          Total Gaji: Rp {Number(data.total_gaji).toLocaleString()}
        </h3>
      </div>

      <a
        href={`http://localhost:5000/slip/download/${id}`}
        className="mt-4 inline-block px-4 py-2 bg-blue-600 rounded"
      >
        Download PDF
      </a>
    </div>
  );
}
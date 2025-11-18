import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000/karyawan';

export default function KaryawanList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert('Gagal mengambil data');
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus data ini?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus');
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Daftar Karyawan</h2>
        <Link to="/tambah" className="px-3 py-2 bg-blue-600 text-white rounded">Tambah Karyawan</Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Jabatan</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">HP</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Foto</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((k, i) => (
            <tr key={k.id} className="hover:bg-gray-100">
              <td className="p-2 border">{i+1}</td>
              <td className="p-2 border">{k.nama}</td>
              <td className="p-2 border">{k.jabatan}</td>
              <td className="p-2 border">{k.email}</td>
              <td className="p-2 border">{k.no_hp}</td>
              <td className="p-2 border">{k.status_magang}</td>
              <td className="p-2 border">
                {k.foto_ktp ? <img src={`http://localhost:5000/uploads/${k.foto_ktp}`} alt="ktp" className="h-12 rounded" /> : '-'}
              </td>
              <td className="p-2 border">
                <button onClick={()=>navigate(`/tambah/${k.id}`)} className="px-2 py-1 bg-yellow-400 rounded mr-2">Edit</button>
                <button onClick={()=>handleDelete(k.id)} className="px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

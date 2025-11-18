import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DataKaryawan() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    email: "",
    no_hp: ""
  });

  const loadData = () => {
    axios.get("http://localhost:5000/karyawan")
      .then(r => setRows(r.data))
      .catch(e => console.error(e));
  };

  const simpan = () => {
    axios.post("http://localhost:5000/karyawan/tambah", form)
      .then(() => {
        alert("Karyawan berhasil ditambahkan!");
        setOpen(false);
        loadData();
      })
      .catch(() => alert("Gagal menambah karyawan"));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Data Karyawan</h1>

        {/* Tombol Tambah */}
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          + Tambah Karyawan
        </button>
      </div>

      {/* TABEL */}
      <table className="w-full bg-gray-800">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Nama</th>
            <th>Jabatan</th>
            <th>Email</th>
            <th>No HP</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-gray-700">
              <td className="p-2">{r.nama}</td>
              <td>{r.jabatan}</td>
              <td>{r.email}</td>
              <td>{r.no_hp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL TAMBAH */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded text-black w-96">

            <h2 className="text-lg font-bold mb-4">Tambah Karyawan</h2>

            <input
              className="p-2 w-full border mb-2"
              placeholder="Nama"
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
            <input
              className="p-2 w-full border mb-2"
              placeholder="Jabatan"
              onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
            />
            <input
              className="p-2 w-full border mb-2"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="p-2 w-full border mb-4"
              placeholder="No HP"
              onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-400 px-3 py-1 rounded"
              >
                Batal
              </button>
              <button
                onClick={simpan}
                className="bg-blue-600 px-3 py-1 rounded text-white"
              >
                Simpan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
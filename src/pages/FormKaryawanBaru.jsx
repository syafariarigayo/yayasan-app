import React, { useState } from "react";
import axios from "axios";

export default function FormKaryawanBaru() {
  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    email: "",
    no_hp: "",
    alamat: "",
    tgl_lahir: "",
    status_magang: "Tetap"
  });

  const submit = () => {
    axios.post("http://localhost:5000/karyawan/tambah", form)
      .then(() => {
        alert("Pendaftaran berhasil! Data Anda telah dikirim.");
        setForm({
          nama: "",
          jabatan: "",
          email: "",
          no_hp: "",
          alamat: "",
          tgl_lahir: "",
          status_magang: "Tetap"
        });
      })
      .catch(err => {
        console.error(err);
        alert("Gagal mengirim data");
      });
  };

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Form Pendaftaran Karyawan Baru
        </h1>

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Nama"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Jabatan"
          value={form.jabatan}
          onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Nomor HP"
          value={form.no_hp}
          onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Alamat"
          value={form.alamat}
          onChange={(e) => setForm({ ...form, alamat: e.target.value })}
        />

        <label className="block mb-1">Tanggal Lahir</label>
        <input
          type="date"
          className="w-full p-2 mb-3 text-black"
          value={form.tgl_lahir}
          onChange={(e) => setForm({ ...form, tgl_lahir: e.target.value })}
        />

        <label className="block mb-1">Status</label>
        <select
          className="w-full p-2 mb-4 text-black"
          value={form.status_magang}
          onChange={(e) => setForm({ ...form, status_magang: e.target.value })}
        >
          <option value="Tetap">Karyawan Tetap</option>
          <option value="Magang">Karyawan Magang</option>
        </select>

        <button
          onClick={submit}
          className="w-full bg-blue-600 py-2 rounded font-bold"
        >
          Kirim Pendaftaran
        </button>
      </div>
    </div>
  );
}
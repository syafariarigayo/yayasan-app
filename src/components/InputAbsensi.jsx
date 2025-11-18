import React, { useState, useEffect } from "react";

function InputAbsensi({ karyawan, onSubmit, initialData }) {
  const [form, setForm] = useState({
    karyawan_id: "",
    tanggal: "",
    jam_masuk: "",
    jam_pulang: "",
    status: "Hadir",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="bg-gray-800 p-6 rounded text-white">
      <label className="block mb-2">Nama Karyawan</label>
      <select
        name="karyawan_id"
        className="w-full p-2 mb-3 bg-gray-700 rounded"
        value={form.karyawan_id}
        onChange={change}
        required
      >
        <option value="">-- pilih --</option>
        {karyawan.map((k) => (
          <option key={k.id} value={k.id}>
            {k.nama}
          </option>
        ))}
      </select>

      <label className="block mb-2">Tanggal</label>
      <input
        type="date"
        name="tanggal"
        className="w-full p-2 mb-3 bg-gray-700 rounded"
        value={form.tanggal}
        onChange={change}
        required
      />

      <label className="block mb-2">Jam Masuk</label>
      <input
        type="time"
        name="jam_masuk"
        className="w-full p-2 mb-3 bg-gray-700 rounded"
        value={form.jam_masuk}
        onChange={change}
      />

      <label className="block mb-2">Jam Pulang</label>
      <input
        type="time"
        name="jam_pulang"
        className="w-full p-2 mb-3 bg-gray-700 rounded"
        value={form.jam_pulang}
        onChange={change}
      />

      <label className="block mb-2">Status</label>
      <select
        name="status"
        className="w-full p-2 mb-3 bg-gray-700 rounded"
        value={form.status}
        onChange={change}
      >
        <option>Hadir</option>
        <option>Izin</option>
        <option>Sakit</option>
        <option>Alpa</option>
      </select>

      <button className="px-4 py-2 bg-blue-600 rounded w-full mt-3">
        Simpan
      </button>
    </form>
  );
}

export default InputAbsensi;
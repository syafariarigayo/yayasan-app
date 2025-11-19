import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function DataKaryawan() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    email: "",
    no_hp: ""
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/karyawan");
      setRows(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data karyawan");
    } finally {
      setLoading(false);
    }
  };

  const simpan = async () => {
    if (!form.nama || !form.email) {
      return alert("Nama dan Email wajib diisi!");
    }

    try {
      await api.post("/karyawan", form);
      alert("Karyawan berhasil ditambahkan!");
      setModalOpen(false);
      setForm({ nama: "", jabatan: "", email: "", no_hp: "" });
      loadData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal menambah karyawan");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Data Karyawan</h1>
            <p className="text-gray-400">Kelola data karyawan yayasan</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            + Tambah Karyawan
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-400">Memuat data...</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-left">Jabatan</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">No HP</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      Belum ada data karyawan
                    </td>
                  </tr>
                ) : (
                  rows.map((r, i) => (
                    <tr key={r.id} className="border-t border-gray-700 hover:bg-gray-750">
                      <td className="p-4">{i + 1}</td>
                      <td className="p-4 font-semibold">{r.nama}</td>
                      <td className="p-4">{r.jabatan || "-"}</td>
                      <td className="p-4">{r.email}</td>
                      <td className="p-4">{r.no_hp || "-"}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded text-sm ${
                          r.status_magang === "LULUS" 
                            ? "bg-green-900 text-green-300"
                            : "bg-yellow-900 text-yellow-300"
                        }`}>
                          {r.status_magang || "MAGANG"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* MODAL TAMBAH */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            
            <h2 className="text-2xl font-bold mb-6">Tambah Karyawan</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Jabatan</label>
                <input
                  type="text"
                  value={form.jabatan}
                  onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  placeholder="Masukkan jabatan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">No HP / WhatsApp</label>
                <input
                  type="text"
                  value={form.no_hp}
                  onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setForm({ nama: "", jabatan: "", email: "", no_hp: "" });
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded font-semibold"
              >
                Batal
              </button>
              <button
                onClick={simpan}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold"
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
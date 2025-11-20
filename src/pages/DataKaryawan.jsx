import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import ModalTambahKaryawan from "../components/ModalTambahKaryawan";

export default function DataKaryawan() {
  const [karyawan, setKaryawan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchKaryawan = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/karyawan");
      setKaryawan(response.data);
    } catch (error) {
      console.error("Error fetching karyawan:", error);
      alert("Gagal memuat data karyawan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data karyawan ini?")) return;
    
    try {
      await axios.delete(`/karyawan/${id}`);
      alert("Data berhasil dihapus");
      fetchKaryawan();
    } catch (error) {
      alert("Gagal menghapus data: " + error.message);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setModalOpen(true);
  };

  const handleTambah = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Karyawan</h1>
            <p className="text-gray-600">Kelola data karyawan yayasan</p>
          </div>
          <button
            onClick={handleTambah}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
          >
            <span className="text-xl">+</span>
            Tambah Karyawan
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            Memuat data...
          </div>
        ) : karyawan.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg">Belum ada data karyawan</p>
            <p className="text-sm mt-2">Klik tombol "Tambah Karyawan" untuk menambah data</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Jabatan</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">No HP</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {karyawan.map((k, index) => (
                  <tr key={k.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{k.nama}</div>
                      {k.gelar && <div className="text-xs text-gray-500">{k.gelar}</div>}
                      {k.kode_registrasi && <div className="text-xs text-blue-600 font-mono">{k.kode_registrasi}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {k.jabatan || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {k.email || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {k.no_hp || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        k.status_magang === "LULUS" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {k.status_magang || "MAGANG"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.location.href = `/karyawan/${k.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Detail
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleEdit(k)}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(k.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STATS */}
      {!loading && karyawan.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{karyawan.length}</div>
              <div className="text-sm text-gray-600">Total Karyawan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {karyawan.filter(k => k.status_magang === "MAGANG").length}
              </div>
              <div className="text-sm text-gray-600">Sedang Magang</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {karyawan.filter(k => k.status_magang === "LULUS").length}
              </div>
              <div className="text-sm text-gray-600">Karyawan Tetap</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      <ModalTambahKaryawan 
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSuccess={fetchKaryawan}
        editData={editData}
      />

    </div>
  );
}

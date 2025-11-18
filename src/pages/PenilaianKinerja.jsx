import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5100";

export default function PenilaianKinerja() {
  const [data, setData] = useState([]);
  const [karyawan, setKaryawan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [filter, setFilter] = useState({
    bulan: new Date().getMonth() + 1,
    tahun: new Date().getFullYear()
  });
  
  const [form, setForm] = useState({
    karyawan_id: "",
    periode_bulan: new Date().getMonth() + 1,
    periode_tahun: new Date().getFullYear(),
    kedisiplinan: 80,
    kualitas_kerja: 80,
    kuantitas_kerja: 80,
    inisiatif: 80,
    kerjasama: 80,
    tanggung_jawab: 80,
    komunikasi: 80,
    kehadiran: 80,
    kelebihan: "",
    kekurangan: "",
    rekomendasi: "",
    catatan_tambahan: "",
    status: "Draft"
  });

  useEffect(() => {
    loadData();
    loadKaryawan();
  }, [filter]);

  const loadData = async () => {
    try {
      const res = await fetch(`${API_URL}/penilaian-kinerja?bulan=${filter.bulan}&tahun=${filter.tahun}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  const loadKaryawan = async () => {
    try {
      const res = await fetch(`${API_URL}/karyawan?status_magang=LULUS`);
      const json = await res.json();
      setKaryawan(json);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const hitungRataRata = () => {
    const skor = [
      form.kedisiplinan, form.kualitas_kerja, form.kuantitas_kerja,
      form.inisiatif, form.kerjasama, form.tanggung_jawab,
      form.komunikasi, form.kehadiran
    ];
    const total = skor.reduce((sum, val) => sum + parseInt(val || 0), 0);
    return (total / 8).toFixed(2);
  };

  const getKategori = (nilai) => {
    if (nilai >= 90) return { label: "Sangat Baik", color: "text-green-400" };
    if (nilai >= 75) return { label: "Baik", color: "text-blue-400" };
    if (nilai >= 60) return { label: "Cukup", color: "text-yellow-400" };
    if (nilai >= 40) return { label: "Kurang", color: "text-orange-400" };
    return { label: "Sangat Kurang", color: "text-red-400" };
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = editMode 
        ? `${API_URL}/penilaian-kinerja/${currentId}`
        : `${API_URL}/penilaian-kinerja`;
      
      const method = editMode ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      const result = await res.json();
      
      if (res.ok) {
        alert(result.message);
        setModalOpen(false);
        resetForm();
        loadData();
      } else {
        alert(result.message || "Gagal menyimpan");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus penilaian ini?")) return;
    try {
      const res = await fetch(`${API_URL}/penilaian-kinerja/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Penilaian berhasil dihapus");
        loadData();
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleFinalisasi = async (id) => {
    if (!confirm("Finalisasi penilaian? Data tidak bisa diubah setelah difinalisasi.")) return;
    try {
      const res = await fetch(`${API_URL}/penilaian-kinerja/${id}/finalisasi`, { method: "POST" });
      if (res.ok) {
        alert("Penilaian berhasil difinalisasi");
        loadData();
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const resetForm = () => {
    setForm({
      karyawan_id: "",
      periode_bulan: new Date().getMonth() + 1,
      periode_tahun: new Date().getFullYear(),
      kedisiplinan: 80,
      kualitas_kerja: 80,
      kuantitas_kerja: 80,
      inisiatif: 80,
      kerjasama: 80,
      tanggung_jawab: 80,
      komunikasi: 80,
      kehadiran: 80,
      kelebihan: "",
      kekurangan: "",
      rekomendasi: "",
      catatan_tambahan: "",
      status: "Draft"
    });
    setEditMode(false);
    setCurrentId(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Penilaian Kinerja Karyawan</h1>
            <p className="text-gray-400">Kelola penilaian kinerja bulanan</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            + Tambah Penilaian
          </button>
        </div>

        {/* FILTER */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm mb-1">Bulan</label>
              <select 
                value={filter.bulan}
                onChange={(e) => setFilter({ ...filter, bulan: e.target.value })}
                className="p-2 bg-gray-700 rounded"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {new Date(2025, i).toLocaleString('id-ID', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Tahun</label>
              <select 
                value={filter.tahun}
                onChange={(e) => setFilter({ ...filter, tahun: e.target.value })}
                className="p-2 bg-gray-700 rounded"
              >
                {[2023, 2024, 2025, 2026].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <div className="text-right">
              <p className="text-sm text-gray-400">Total Penilaian</p>
              <p className="text-2xl font-bold">{data.length}</p>
            </div>
          </div>
        </div>

        {/* TABEL */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Jabatan</th>
                <th className="p-3 text-center">Nilai Akhir</th>
                <th className="p-3 text-center">Kategori</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Belum ada data penilaian untuk periode ini
                  </td>
                </tr>
              ) : (
                data.map((item) => {
                  const kategori = getKategori(item.nilai_akhir);
                  return (
                    <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-750">
                      <td className="p-3">{item.nama}</td>
                      <td className="p-3">{item.jabatan}</td>
                      <td className="p-3 text-center font-bold text-blue-400">{item.nilai_akhir}</td>
                      <td className={`p-3 text-center font-semibold ${kategori.color}`}>
                        {item.kategori}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-3 py-1 rounded text-sm ${
                          item.status === 'Final' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex gap-2 justify-center">
                          {item.status === 'Draft' && (
                            <>
                              <button
                                onClick={() => handleFinalisasi(item.id)}
                                className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
                              >
                                Finalisasi
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
                              >
                                Hapus
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL FORM */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tambah Penilaian Kinerja</h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2">Karyawan *</label>
                  <select
                    name="karyawan_id"
                    value={form.karyawan_id}
                    onChange={handleChange}
                    className="p-3 bg-gray-700 rounded w-full"
                  >
                    <option value="">Pilih Karyawan</option>
                    {karyawan.map(k => (
                      <option key={k.id} value={k.id}>
                        {k.nama} - {k.jabatan}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Bulan</label>
                  <select
                    name="periode_bulan"
                    value={form.periode_bulan}
                    onChange={handleChange}
                    className="p-3 bg-gray-700 rounded w-full"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {new Date(2025, i).toLocaleString('id-ID', { month: 'long' })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Tahun</label>
                  <select
                    name="periode_tahun"
                    value={form.periode_tahun}
                    onChange={handleChange}
                    className="p-3 bg-gray-700 rounded w-full"
                  >
                    {[2023, 2024, 2025, 2026].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-semibold mb-4">Aspek Penilaian (Skala 0-100)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'kedisiplinan', label: 'Kedisiplinan' },
                    { key: 'kualitas_kerja', label: 'Kualitas Kerja' },
                    { key: 'kuantitas_kerja', label: 'Kuantitas Kerja' },
                    { key: 'inisiatif', label: 'Inisiatif' },
                    { key: 'kerjasama', label: 'Kerjasama' },
                    { key: 'tanggung_jawab', label: 'Tanggung Jawab' },
                    { key: 'komunikasi', label: 'Komunikasi' },
                    { key: 'kehadiran', label: 'Kehadiran' }
                  ].map(aspek => (
                    <div key={aspek.key}>
                      <label className="block mb-2">{aspek.label}</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          name={aspek.key}
                          min="0"
                          max="100"
                          value={form[aspek.key]}
                          onChange={handleChange}
                          className="flex-1"
                        />
                        <input
                          type="number"
                          name={aspek.key}
                          value={form[aspek.key]}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-16 p-2 bg-gray-700 rounded text-center"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Nilai Rata-Rata:</span>
                  <span className="text-3xl font-bold text-blue-400">{hitungRataRata()}</span>
                </div>
                <div className="mt-2">
                  <span>Kategori: </span>
                  <span className={`font-bold ${getKategori(hitungRataRata()).color}`}>
                    {getKategori(hitungRataRata()).label}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-gray-700 py-3 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.karyawan_id}
                  className="flex-1 bg-blue-600 py-3 rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {loading ? "Menyimpan..." : "Simpan Penilaian"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
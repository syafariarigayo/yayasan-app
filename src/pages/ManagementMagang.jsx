import React, { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:5100";

export default function ManagementMagang() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKaryawan, setSelectedKaryawan] = useState(null);
  const [filter, setFilter] = useState("Sedang Berjalan");
  
  const [formVerifikasi, setFormVerifikasi] = useState({
    hasil: "Lulus",
    nilai_akhir: 80,
    catatan: ""
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const url = filter === "Semua" 
        ? `${API_URL}/magang`
        : `${API_URL}/magang?hasil=${filter}`;
      
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadData();
  }, [filter, loadData]);

  const hitungDurasi = (tanggalMulai) => {
    if (!tanggalMulai) return "-";
    const mulai = new Date(tanggalMulai);
    const sekarang = new Date();
    const diffTime = Math.abs(sekarang - mulai);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const bulan = Math.floor(diffDays / 30);
    const hari = diffDays % 30;
    return `${bulan} bulan ${hari} hari`;
  };

  const hitungSisaHari = (tanggalMulai) => {
    if (!tanggalMulai) return "-";
    const mulai = new Date(tanggalMulai);
    const target = new Date(mulai);
    target.setMonth(target.getMonth() + 3);
    const sekarang = new Date();
    const diffTime = target - sekarang;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return <span className="text-red-400">Telah Lewat</span>;
    if (diffDays === 0) return <span className="text-yellow-400">Hari Ini</span>;
    return <span className="text-green-400">{diffDays} hari lagi</span>;
  };

  const openVerifikasiModal = (karyawan) => {
    setSelectedKaryawan(karyawan);
    setFormVerifikasi({
      hasil: "Lulus",
      nilai_akhir: 80,
      catatan: ""
    });
    setModalOpen(true);
  };

  const handleVerifikasi = async () => {
    if (!selectedKaryawan) return;
    
    if (!window.confirm(`Yakin ingin verifikasi ${selectedKaryawan.nama} sebagai ${formVerifikasi.hasil}?`)) {
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/magang/${selectedKaryawan.id}/verifikasi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formVerifikasi)
      });
      
      const result = await res.json();
      
      if (res.ok) {
        alert(result.message);
        setModalOpen(false);
        loadData();
      } else {
        alert(result.message || "Gagal verifikasi");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      "Sedang Berjalan": "bg-blue-900 text-blue-300",
      "Lulus": "bg-green-900 text-green-300",
      "Tidak Lulus": "bg-red-900 text-red-300"
    };
    return badges[status] || "bg-gray-900 text-gray-300";
  };

  const stats = {
    total: data.length,
    berjalan: data.filter(d => d.status_magang === "Sedang Berjalan").length,
    lulus: data.filter(d => d.status_magang === "Lulus").length,
    tidakLulus: data.filter(d => d.status_magang === "Tidak Lulus").length
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Management Magang</h1>
          <p className="text-gray-400">Monitoring dan verifikasi karyawan magang (3 bulan)</p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-5">
            <p className="text-gray-400 text-sm mb-1">Total Magang</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-5">
            <p className="text-blue-300 text-sm mb-1">Sedang Berjalan</p>
            <p className="text-3xl font-bold">{stats.berjalan}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-5">
            <p className="text-green-300 text-sm mb-1">Lulus</p>
            <p className="text-3xl font-bold">{stats.lulus}</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-5">
            <p className="text-red-300 text-sm mb-1">Tidak Lulus</p>
            <p className="text-3xl font-bold">{stats.tidakLulus}</p>
          </div>
        </div>

        {/* FILTER */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            {["Semua", "Sedang Berjalan", "Lulus", "Tidak Lulus"].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded font-semibold ${
                  filter === status 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* TABEL */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3 text-left">Unit Kerja</th>
                  <th className="p-3 text-left">Kontak</th>
                  <th className="p-3 text-center">Tanggal Mulai</th>
                  <th className="p-3 text-center">Durasi</th>
                  <th className="p-3 text-center">Sisa Waktu</th>
                  <th className="p-3 text-center">Nilai</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="p-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="p-8 text-center text-gray-500">
                      Tidak ada data magang
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-750">
                      <td className="p-3">
                        <div className="font-semibold">{item.nama}</div>
                        <div className="text-sm text-gray-400">{item.email}</div>
                      </td>
                      <td className="p-3">{item.unit_kerja || "-"}</td>
                      <td className="p-3">
                        <div className="text-sm">{item.no_hp || "-"}</div>
                      </td>
                      <td className="p-3 text-center">
                        {item.magang_mulai 
                          ? new Date(item.magang_mulai).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })
                          : "-"
                        }
                      </td>
                      <td className="p-3 text-center text-sm">
                        {hitungDurasi(item.magang_mulai)}
                      </td>
                      <td className="p-3 text-center text-sm font-semibold">
                        {item.status_magang === "Sedang Berjalan" 
                          ? hitungSisaHari(item.magang_mulai)
                          : "-"
                        }
                      </td>
                      <td className="p-3 text-center">
                        {item.nilai_akhir ? (
                          <span className="font-bold text-blue-400">{item.nilai_akhir}</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${getStatusBadge(item.status_magang)}`}>
                          {item.status_magang}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {item.status_magang === "Sedang Berjalan" ? (
                          <button
                            onClick={() => openVerifikasiModal(item)}
                            className="bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-700 font-semibold"
                          >
                            Verifikasi
                          </button>
                        ) : (
                          <button
                            className="bg-gray-600 px-4 py-2 rounded text-sm cursor-default"
                          >
                            Lihat Detail
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL VERIFIKASI */}
      {modalOpen && selectedKaryawan && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Verifikasi Magang</h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* INFO KARYAWAN */}
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Nama Lengkap</p>
                  <p className="font-semibold text-lg">{selectedKaryawan.nama}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Unit Kerja</p>
                  <p className="font-semibold">{selectedKaryawan.unit_kerja || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tanggal Mulai</p>
                  <p className="font-semibold">
                    {selectedKaryawan.magang_mulai 
                      ? new Date(selectedKaryawan.magang_mulai).toLocaleDateString('id-ID')
                      : "-"
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Durasi Magang</p>
                  <p className="font-semibold">{hitungDurasi(selectedKaryawan.magang_mulai)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* HASIL VERIFIKASI */}
              <div>
                <label className="block mb-2 font-semibold">Hasil Verifikasi *</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setFormVerifikasi({ ...formVerifikasi, hasil: "Lulus" })}
                    className={`flex-1 py-3 rounded-lg font-semibold border-2 ${
                      formVerifikasi.hasil === "Lulus"
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:border-green-600"
                    }`}
                  >
                    ✓ LULUS
                  </button>
                  <button
                    onClick={() => setFormVerifikasi({ ...formVerifikasi, hasil: "Tidak Lulus" })}
                    className={`flex-1 py-3 rounded-lg font-semibold border-2 ${
                      formVerifikasi.hasil === "Tidak Lulus"
                        ? "bg-red-600 border-red-600 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:border-red-600"
                    }`}
                  >
                    ✗ TIDAK LULUS
                  </button>
                </div>
              </div>

              {/* NILAI AKHIR */}
              <div>
                <label className="block mb-2 font-semibold">Nilai Akhir Magang (0-100) *</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formVerifikasi.nilai_akhir}
                    onChange={(e) => setFormVerifikasi({ ...formVerifikasi, nilai_akhir: e.target.value })}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formVerifikasi.nilai_akhir}
                    onChange={(e) => setFormVerifikasi({ ...formVerifikasi, nilai_akhir: e.target.value })}
                    className="w-20 p-3 bg-gray-700 rounded text-center font-bold text-xl"
                  />
                </div>
                
                <div className="mt-2 text-sm">
                  {formVerifikasi.nilai_akhir >= 80 && <span className="text-green-400">⭐ Sangat Baik</span>}
                  {formVerifikasi.nilai_akhir >= 60 && formVerifikasi.nilai_akhir < 80 && <span className="text-blue-400">👍 Baik</span>}
                  {formVerifikasi.nilai_akhir >= 40 && formVerifikasi.nilai_akhir < 60 && <span className="text-yellow-400">⚠️ Cukup</span>}
                  {formVerifikasi.nilai_akhir < 40 && <span className="text-red-400">❌ Kurang</span>}
                </div>
              </div>

              {/* CATATAN */}
              <div>
                <label className="block mb-2 font-semibold">Catatan & Evaluasi *</label>
                <textarea
                  value={formVerifikasi.catatan}
                  onChange={(e) => setFormVerifikasi({ ...formVerifikasi, catatan: e.target.value })}
                  placeholder="Tuliskan evaluasi, kelebihan, kekurangan, dan rekomendasi untuk karyawan ini..."
                  className="w-full p-3 bg-gray-700 rounded h-32"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Catatan ini akan disimpan di riwayat magang karyawan
                </p>
              </div>

              {/* WARNING */}
              {formVerifikasi.hasil === "Tidak Lulus" && (
                <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded p-4">
                  <p className="text-red-300 text-sm">
                    <strong>⚠️ Perhatian:</strong> Karyawan yang tidak lulus magang akan tetap berstatus MAGANG dan perlu mengulang atau mengikuti program lanjutan.
                  </p>
                </div>
              )}

              {formVerifikasi.hasil === "Lulus" && (
                <div className="bg-green-900 bg-opacity-30 border border-green-600 rounded p-4">
                  <p className="text-green-300 text-sm">
                    <strong>✓ Informasi:</strong> Karyawan yang lulus akan diangkat menjadi karyawan tetap (status LULUS) dan dapat melanjutkan ke tahap pengisian data lengkap.
                  </p>
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-gray-700 py-3 rounded hover:bg-gray-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleVerifikasi}
                  disabled={loading || !formVerifikasi.catatan}
                  className={`flex-1 py-3 rounded font-semibold ${
                    formVerifikasi.hasil === "Lulus"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } disabled:bg-gray-600 disabled:cursor-not-allowed`}
                >
                  {loading ? "Memproses..." : `Konfirmasi ${formVerifikasi.hasil}`}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

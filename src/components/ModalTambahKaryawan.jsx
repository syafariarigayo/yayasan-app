import React, { useState } from "react";
import axios from "../api/axios";

export default function ModalTambahKaryawan({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "", gelar: "", jenis_kelamin: "", tempat_lahir: "", tanggal_lahir: "",
    nik: "", email: "", no_hp: "", jabatan: "", unit_kerja: "",
    tanggal_mulai: "", status_magang: "MAGANG",
    alamat_jalan: "", desa: "", kecamatan: "", kabupaten: "",
    nama_pemilik_buku: "", nomor_rekening: "",
    nama_panggilan: "", golongan_darah: "", suku: "", agama: "",
    no_kk: "", npwp: "", kewarganegaraan: "Indonesia",
    anak_ke: "", dari_bersaudara: "", tinggal_bersama: "", jumlah_tanggungan: 0,
    kontak_keluarga: "", status_kontak_keluarga: "",
    pendidikan_terakhir: "", alumni_dari: "", jurusan: "", tahun_lulus: "",
    hobi: "", keahlian: "", riwayat_penyakit: "", status_penyakit: "Sehat"
  });

  const [files, setFiles] = useState({
    foto_ktp: null,
    foto_buku_rekening: null,
    foto_profil: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles({ ...files, [name]: fileList[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.nama || !form.jenis_kelamin || !form.email || !form.no_hp || !form.jabatan) {
      alert("Mohon lengkapi data wajib:\n• Nama Lengkap\n• Jenis Kelamin\n• Email\n• No HP\n• Jabatan");
      return;
    }

    if (!files.foto_ktp || !files.foto_buku_rekening) {
      alert("Mohon upload:\n• Foto KTP\n• Foto Buku Rekening Bank Aceh");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      
      Object.keys(form).forEach(key => {
        if (form[key] !== '' && form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });
      
      Object.keys(files).forEach(key => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });
      
      const response = await axios.post("/karyawan", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      alert(`Berhasil! Kode Registrasi: ${response.data.kode_registrasi}`);
      onSuccess();
      onClose();
      
      setForm({
        nama: "", gelar: "", jenis_kelamin: "", tempat_lahir: "", tanggal_lahir: "",
        nik: "", email: "", no_hp: "", jabatan: "", unit_kerja: "",
        tanggal_mulai: "", status_magang: "MAGANG",
        alamat_jalan: "", desa: "", kecamatan: "", kabupaten: "",
        nama_pemilik_buku: "", nomor_rekening: "",
        nama_panggilan: "", golongan_darah: "", suku: "", agama: "",
        no_kk: "", npwp: "", kewarganegaraan: "Indonesia",
        anak_ke: "", dari_bersaudara: "", tinggal_bersama: "", jumlah_tanggungan: 0,
        kontak_keluarga: "", status_kontak_keluarga: "",
        pendidikan_terakhir: "", alumni_dari: "", jurusan: "", tahun_lulus: "",
        hobi: "", keahlian: "", riwayat_penyakit: "", status_penyakit: "Sehat"
      });
      setFiles({ foto_ktp: null, foto_buku_rekening: null, foto_profil: null });
      
    } catch (error) {
      alert("Gagal menyimpan data: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">📋 Form Pendaftaran Karyawan</h2>
          <button 
            onClick={onClose} 
            className="text-2xl hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              👤 Data Dasar & Kontak
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input 
                  name="nama" 
                  value={form.nama} 
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gelar</label>
                <input 
                  name="gelar" 
                  value={form.gelar} 
                  onChange={handleChange}
                  placeholder="S.Pd, M.Kom, dll"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select 
                  name="jenis_kelamin" 
                  value={form.jenis_kelamin} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  required
                >
                  <option value="">-- Pilih --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tempat Lahir</label>
                <input 
                  name="tempat_lahir" 
                  value={form.tempat_lahir} 
                  onChange={handleChange}
                  placeholder="Contoh: Lhokseumawe"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal Lahir</label>
                <input 
                  type="date"
                  name="tanggal_lahir" 
                  value={form.tanggal_lahir} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">NIK</label>
                <input 
                  name="nik" 
                  value={form.nik} 
                  onChange={handleChange}
                  placeholder="16 digit"
                  maxLength="16"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email"
                  name="email" 
                  value={form.email} 
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  No HP <span className="text-red-500">*</span>
                </label>
                <input 
                  name="no_hp" 
                  value={form.no_hp} 
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Jabatan <span className="text-red-500">*</span>
                </label>
                <input 
                  name="jabatan" 
                  value={form.jabatan} 
                  onChange={handleChange}
                  placeholder="Guru, Staf, dll"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Unit Kerja</label>
                <input 
                  name="unit_kerja" 
                  value={form.unit_kerja} 
                  onChange={handleChange}
                  placeholder="YAYASAN, SD, SMP, SMA"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              📎 Upload Dokumen
            </h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Foto KTP <span className="text-red-500">*</span>
                </label>
                <input 
                  type="file" 
                  name="foto_ktp" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full text-white"
                  required
                />
                {files.foto_ktp && (
                  <p className="text-sm text-green-400 mt-1">✓ {files.foto_ktp.name}</p>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Foto Buku Rekening <span className="text-red-500">*</span>
                </label>
                <input 
                  type="file" 
                  name="foto_buku_rekening" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full text-white"
                  required
                />
                {files.foto_buku_rekening && (
                  <p className="text-sm text-green-400 mt-1">✓ {files.foto_buku_rekening.name}</p>
                )}
              </div>
            </div>
          </div>

        </form>

        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Batal
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-2.5 rounded-lg font-semibold transition flex items-center gap-2 ${
              loading ? 'bg-gray-600 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Menyimpan...
              </>
            ) : (
              <>💾 Simpan Data</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
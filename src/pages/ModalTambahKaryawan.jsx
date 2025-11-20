import React, { useState, useEffect } from "react";
import axios from "../api/axios";

export default function ModalTambahKaryawan({ isOpen, onClose, onSuccess, editData = null }) {
  const [loading, setLoading] = useState(false);
  const isEditMode = editData !== null;
  
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
    status_pernikahan_ke: 1, status_anak: "",
    pendidikan_terakhir: "", alumni_dari: "", jurusan: "", tahun_lulus: "",
    pekerjaan_sekarang: "", bidang_spesifik: "", pangkat_golongan: "", alamat_kerja: "",
    pengalaman_organisasi: "",
    hobi: "", minat_bakat: "", keahlian: "", tokoh_dikagumi: "",
    jumlah_buku_rumah: "", judul_buku_dibaca: "", akun_sosmed: "",
    sosmed_sering_diakses: "", konten_digemari: "",
    penghasilan_perbulan: "", usaha_sampingan: "", pengeluaran_perbulan: "",
    hutang_konsumtif: "", hutang_produktif: "", 
    prediksi_total_aset: "", status_tempat_tinggal: "", kendaraan_dimiliki: "",
    riwayat_penyakit: "", status_penyakit: "Sehat", pantangan_kesehatan: "",
    karakter_menonjol: "", hal_tidak_disukai: "", perilaku_positif: "", perilaku_negatif: "",
    orang_terdekat: "", ibadah_ketinggalan: "", ibadah_sunnah: "",
    pembimbing_islam: "", sejak_tahun: ""
  });

  const [files, setFiles] = useState({
    foto_ktp: null,
    foto_buku_rekening: null,
    foto_profil: null
  });

  // Load data saat mode EDIT
  useEffect(() => {
    if (editData) {
      setForm({
        nama: editData.nama || "",
        gelar: editData.gelar || "",
        jenis_kelamin: editData.jenis_kelamin || "",
        tempat_lahir: editData.tempat_lahir || "",
        tanggal_lahir: editData.tanggal_lahir || "",
        nik: editData.nik || "",
        email: editData.email || "",
        no_hp: editData.no_hp || "",
        jabatan: editData.jabatan || "",
        unit_kerja: editData.unit_kerja || "",
        tanggal_mulai: editData.tanggal_mulai || "",
        status_magang: editData.status_magang || "MAGANG",
        alamat_jalan: editData.alamat_jalan || "",
        desa: editData.desa || "",
        kecamatan: editData.kecamatan || "",
        kabupaten: editData.kabupaten || "",
        nama_pemilik_buku: editData.nama_pemilik_buku || "",
        nomor_rekening: editData.nomor_rekening || "",
        nama_panggilan: editData.nama_panggilan || "",
        golongan_darah: editData.golongan_darah || "",
        suku: editData.suku || "",
        agama: editData.agama || "",
        no_kk: editData.no_kk || "",
        npwp: editData.npwp || "",
        kewarganegaraan: editData.kewarganegaraan || "Indonesia",
        anak_ke: editData.anak_ke || "",
        dari_bersaudara: editData.dari_bersaudara || "",
        tinggal_bersama: editData.tinggal_bersama || "",
        jumlah_tanggungan: editData.jumlah_tanggungan || 0,
        kontak_keluarga: editData.kontak_keluarga || "",
        status_kontak_keluarga: editData.status_kontak_keluarga || "",
        status_pernikahan_ke: editData.status_pernikahan_ke || 1,
        status_anak: editData.status_anak || "",
        pendidikan_terakhir: editData.pendidikan_terakhir || "",
        alumni_dari: editData.alumni_dari || "",
        jurusan: editData.jurusan || "",
        tahun_lulus: editData.tahun_lulus || "",
        pekerjaan_sekarang: editData.pekerjaan_sekarang || "",
        bidang_spesifik: editData.bidang_spesifik || "",
        pangkat_golongan: editData.pangkat_golongan || "",
        alamat_kerja: editData.alamat_kerja || "",
        pengalaman_organisasi: editData.pengalaman_organisasi || "",
        hobi: editData.hobi || "",
        minat_bakat: editData.minat_bakat || "",
        keahlian: editData.keahlian || "",
        tokoh_dikagumi: editData.tokoh_dikagumi || "",
        jumlah_buku_rumah: editData.jumlah_buku_rumah || "",
        judul_buku_dibaca: editData.judul_buku_dibaca || "",
        akun_sosmed: editData.akun_sosmed || "",
        sosmed_sering_diakses: editData.sosmed_sering_diakses || "",
        konten_digemari: editData.konten_digemari || "",
        penghasilan_perbulan: editData.penghasilan_perbulan || "",
        usaha_sampingan: editData.usaha_sampingan || "",
        pengeluaran_perbulan: editData.pengeluaran_perbulan || "",
        hutang_konsumtif: editData.hutang_konsumtif || "",
        hutang_produktif: editData.hutang_produktif || "",
        prediksi_total_aset: editData.prediksi_total_aset || "",
        status_tempat_tinggal: editData.status_tempat_tinggal || "",
        kendaraan_dimiliki: editData.kendaraan_dimiliki || "",
        riwayat_penyakit: editData.riwayat_penyakit || "",
        status_penyakit: editData.status_penyakit || "Sehat",
        pantangan_kesehatan: editData.pantangan_kesehatan || "",
        karakter_menonjol: editData.karakter_menonjol || "",
        hal_tidak_disukai: editData.hal_tidak_disukai || "",
        perilaku_positif: editData.perilaku_positif || "",
        perilaku_negatif: editData.perilaku_negatif || "",
        orang_terdekat: editData.orang_terdekat || "",
        ibadah_ketinggalan: editData.ibadah_ketinggalan || "",
        ibadah_sunnah: editData.ibadah_sunnah || "",
        pembimbing_islam: editData.pembimbing_islam || "",
        sejak_tahun: editData.sejak_tahun || ""
      });
    }
  }, [editData]);

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
    
    // Validasi
    if (!form.nama || !form.jenis_kelamin || !form.email || !form.no_hp || !form.jabatan) {
      alert("Mohon lengkapi data wajib:\n• Nama Lengkap\n• Jenis Kelamin\n• Email\n• No HP\n• Jabatan");
      return;
    }

    // Validasi file hanya untuk mode TAMBAH
    if (!isEditMode && (!files.foto_ktp || !files.foto_buku_rekening)) {
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
      
      let response;
      if (isEditMode) {
        // MODE EDIT - PUT request
        response = await axios.put(`/karyawan/${editData.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Data berhasil diupdate!");
      } else {
        // MODE TAMBAH - POST request
        response = await axios.post("/karyawan", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert(`Berhasil! Kode Registrasi: ${response.data.kode_registrasi}`);
      }
      
      onSuccess();
      onClose();
      
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
        
        {/* HEADER */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            📋 {isEditMode ? "Edit Data Karyawan" : "Form Pendaftaran Karyawan"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-2xl hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* SCROLLABLE FORM */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          
          {/* ========== SECTION 1: DATA DASAR ========== */}
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
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal Mulai Bekerja</label>
                <input 
                  type="date"
                  name="tanggal_mulai" 
                  value={form.tanggal_mulai} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status Kepegawaian</label>
                <select 
                  name="status_magang" 
                  value={form.status_magang} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                >
                  <option value="MAGANG">Magang</option>
                  <option value="LULUS">Karyawan Tetap</option>
                </select>
              </div>
            </div>
          </div>

          {/* ========== SECTION 2: ALAMAT ========== */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              🏠 Alamat Lengkap
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Alamat Jalan</label>
              <textarea 
                name="alamat_jalan" 
                value={form.alamat_jalan} 
                onChange={handleChange}
                placeholder="Jl. Merdeka No. 123"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Desa/Kelurahan</label>
                <input 
                  name="desa" 
                  value={form.desa} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Kecamatan</label>
                <input 
                  name="kecamatan" 
                  value={form.kecamatan} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Kabupaten</label>
                <input 
                  name="kabupaten" 
                  value={form.kabupaten} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* ========== SECTION 3: REKENING ========== */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              💳 Rekening Bank Aceh
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nama Pemilik Rekening</label>
                <input 
                  name="nama_pemilik_buku" 
                  value={form.nama_pemilik_buku} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nomor Rekening</label>
                <input 
                  name="nomor_rekening" 
                  value={form.nomor_rekening} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* ========== SECTION 4: DATA PRIBADI ========== */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              👥 Data Pribadi & Keluarga
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nama Panggilan</label>
                <input 
                  name="nama_panggilan" 
                  value={form.nama_panggilan} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Golongan Darah</label>
                <select 
                  name="golongan_darah" 
                  value={form.golongan_darah} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                >
                  <option value="">-- Pilih --</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Suku</label>
                <input 
                  name="suku" 
                  value={form.suku} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agama</label>
                <select 
                  name="agama" 
                  value={form.agama} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                >
                  <option value="">-- Pilih --</option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">No. KK</label>
                <input 
                  name="no_kk" 
                  value={form.no_kk} 
                  onChange={handleChange}
                  maxLength="16"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">NPWP</label>
                <input 
                  name="npwp" 
                  value={form.npwp} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Kontak Keluarga (Darurat)</label>
                <input 
                  name="kontak_keluarga" 
                  value={form.kontak_keluarga} 
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hubungan</label>
                <input 
                  name="status_kontak_keluarga" 
                  value={form.status_kontak_keluarga} 
                  onChange={handleChange}
                  placeholder="Ayah/Ibu/Kakak"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* ========== SECTION 5: KARAKTER ========== */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              ⭐ Karakter & Spiritual
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Karakter Menonjol</label>
                <textarea 
                  name="karakter_menonjol" 
                  value={form.karakter_menonjol} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Perilaku Positif</label>
                <textarea 
                  name="perilaku_positif" 
                  value={form.perilaku_positif} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ibadah Sunnah</label>
                <input 
                  name="ibadah_sunnah" 
                  value={form.ibadah_sunnah} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pembimbing Islam</label>
                <input 
                  name="pembimbing_islam" 
                  value={form.pembimbing_islam} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* ========== SECTION 6: PENDIDIKAN ========== */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              🎓 Pendidikan & Pekerjaan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pendidikan Terakhir</label>
                <select 
                  name="pendidikan_terakhir" 
                  value={form.pendidikan_terakhir} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                >
                  <option value="">-- Pilih --</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Alumni Dari</label>
                <input 
                  name="alumni_dari" 
                  value={form.alumni_dari} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Jurusan</label>
                <input 
                  name="jurusan" 
                  value={form.jurusan} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tahun Lulus</label>
                <input 
                  type="number"
                  name="tahun_lulus" 
                  value={form.tahun_lulus} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* ========== SECTION 7: HOBI & LAINNYA ========== */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              🎨 Hobi & Minat
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hobi</label>
                <input 
                  name="hobi" 
                  value={form.hobi} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Keahlian</label>
                <input 
                  name="keahlian" 
                  value={form.keahlian} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* ========== SECTION 8: KESEHATAN ========== */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              🏥 Kesehatan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Riwayat Penyakit</label>
                <textarea 
                  name="riwayat_penyakit" 
                  value={form.riwayat_penyakit} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status Kesehatan</label>
                <input 
                  name="status_penyakit" 
                  value={form.status_penyakit} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* ========== SECTION 9: UPLOAD DOKUMEN ========== */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              📎 Upload Dokumen {!isEditMode && <span className="text-red-500">*</span>}
            </h3>
            
            {isEditMode && (
              <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded p-3 mb-4">
                <p className="text-sm text-yellow-200">
                  ℹ️ Upload file baru hanya jika ingin mengganti file lama
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Foto KTP {!isEditMode && <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="file" 
                  name="foto_ktp" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full text-white"
                />
                {files.foto_ktp && (
                  <p className="text-sm text-green-400 mt-1">✓ {files.foto_ktp.name}</p>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Foto Buku Rekening {!isEditMode && <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="file" 
                  name="foto_buku_rekening" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full text-white"
                />
                {files.foto_buku_rekening && (
                  <p className="text-sm text-green-400 mt-1">✓ {files.foto_buku_rekening.name}</p>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Foto Profil</label>
                <input 
                  type="file" 
                  name="foto_profil" 
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full text-white"
                />
                {files.foto_profil && (
                  <p className="text-sm text-green-400 mt-1">✓ {files.foto_profil.name}</p>
                )}
              </div>
            </div>
          </div>

        </form>

        {/* FOOTER */}
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Batal
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-2.5 rounded-lg font-semibold flex items-center gap-2 ${
              loading ? 'bg-gray-600 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Menyimpan...
              </>
            ) : (
              <>💾 {isEditMode ? "Update Data" : "Simpan Data"}</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
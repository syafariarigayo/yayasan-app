import React, { useState, useEffect } from "react";
import axios from "../api/axios";

export default function ModalTambahKaryawan({ isOpen, onClose, onSuccess, editData = null }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const isEditMode = editData !== null;
  
  const [form, setForm] = useState({
    // Step 1: Data Dasar & Kontak
    nama: "", gelar: "", jenis_kelamin: "", tempat_lahir: "", tanggal_lahir: "",
    nik: "", email: "", no_hp: "", jabatan: "", unit_kerja: "",
    tanggal_mulai: "", status_magang: "MAGANG",
    
    // Step 2: Alamat & Rekening
    alamat_jalan: "", desa: "", kecamatan: "", kabupaten: "",
    nama_pemilik_buku: "", nomor_rekening: "",
    
    // Step 3: Data Pribadi & Keluarga
    nama_panggilan: "", golongan_darah: "", suku: "", agama: "",
    no_kk: "", npwp: "", kewarganegaraan: "Indonesia",
    anak_ke: "", dari_bersaudara: "", tinggal_bersama: "", jumlah_tanggungan: 0,
    status_pernikahan_ke: 1, status_anak: "", kontak_keluarga: "", status_kontak_keluarga: "",
    
    // Step 4: Karakter & Spiritual
    karakter_menonjol: "", hal_tidak_disukai: "", perilaku_positif: "", perilaku_negatif: "",
    orang_terdekat: "", ibadah_ketinggalan: "", ibadah_sunnah: "",
    pembimbing_islam: "", sejak_tahun: "",
    
    // Step 5: Pendidikan & Pekerjaan
    pendidikan_terakhir: "", alumni_dari: "", jurusan: "", tahun_lulus: "",
    pekerjaan_sekarang: "", bidang_spesifik: "", pangkat_golongan: "", alamat_kerja: "",
    pengalaman_organisasi: "",
    
    // Step 6: Hobi, Minat & Finansial
    hobi: "", minat_bakat: "", keahlian: "", tokoh_dikagumi: "",
    jumlah_buku_rumah: "", judul_buku_dibaca: "", akun_sosmed: "",
    sosmed_sering_diakses: "", konten_digemari: "",
    penghasilan_perbulan: "", usaha_sampingan: "", pengeluaran_perbulan: "",
    hutang_konsumtif: "", hutang_produktif: "", aset_tunai: "", aset_kredit: "",
    lembaga_pemberi_kredit: "", prediksi_total_aset: "", status_tempat_tinggal: "",
    kendaraan_dimiliki: "", riwayat_penyakit: "", status_penyakit: "Sehat", 
    pantangan_kesehatan: ""
  });

  const [files, setFiles] = useState({
    foto_ktp: null,
    foto_buku_rekening: null,
    foto_profil: null,
    file_kk: null,
    file_akta_kelahiran: null,
    file_pas_foto: null,
    file_buku_nikah: null,
    file_npwp: null,
    file_ijazah: [],
    file_sertifikat: []
  });

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
        karakter_menonjol: editData.karakter_menonjol || "",
        hal_tidak_disukai: editData.hal_tidak_disukai || "",
        perilaku_positif: editData.perilaku_positif || "",
        perilaku_negatif: editData.perilaku_negatif || "",
        orang_terdekat: editData.orang_terdekat || "",
        ibadah_ketinggalan: editData.ibadah_ketinggalan || "",
        ibadah_sunnah: editData.ibadah_sunnah || "",
        pembimbing_islam: editData.pembimbing_islam || "",
        sejak_tahun: editData.sejak_tahun || "",
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
        aset_tunai: editData.aset_tunai || "",
        aset_kredit: editData.aset_kredit || "",
        lembaga_pemberi_kredit: editData.lembaga_pemberi_kredit || "",
        prediksi_total_aset: editData.prediksi_total_aset || "",
        status_tempat_tinggal: editData.status_tempat_tinggal || "",
        kendaraan_dimiliki: editData.kendaraan_dimiliki || "",
        riwayat_penyakit: editData.riwayat_penyakit || "",
        status_penyakit: editData.status_penyakit || "Sehat",
        pantangan_kesehatan: editData.pantangan_kesehatan || ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (name === "file_ijazah" || name === "file_sertifikat") {
      setFiles({ ...files, [name]: Array.from(fileList) });
    } else {
      setFiles({ ...files, [name]: fileList[0] });
    }
  };

  const nextStep = () => {
    // Validasi Step 1
    if (step === 1) {
      if (!form.nama || !form.jenis_kelamin || !form.email || !form.no_hp || !form.jabatan) {
        alert("Mohon lengkapi data wajib:\n• Nama Lengkap\n• Jenis Kelamin\n• Email\n• No HP\n• Jabatan");
        return;
      }
    }
    
    // Validasi Step 7 - Upload dokumen (hanya untuk mode tambah)
    if (step === 7 && !isEditMode) {
      if (!files.foto_ktp || !files.foto_buku_rekening) {
        alert("Minimal upload:\n• Foto KTP\n• Foto Buku Rekening Bank Aceh");
        return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
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
          if (Array.isArray(files[key])) {
            files[key].forEach(file => formData.append(key, file));
          } else {
            formData.append(key, files[key]);
          }
        }
      });
      
      let response;
      if (isEditMode) {
        response = await axios.put(`/karyawan/${editData.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Data berhasil diupdate!");
      } else {
        response = await axios.post("/karyawan", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert(`Berhasil! Kode Registrasi: ${response.data.kode_registrasi}`);
      }
      
      onSuccess();
      onClose();
      setStep(1);
      
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

        {/* PROGRESS BAR */}
        <div className="bg-gray-700 px-6 py-3">
          <div className="flex justify-between mb-2">
            {[1,2,3,4,5,6,7].map(s => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                  {s}
                </div>
                <span className="text-xs mt-1 text-gray-400">
                  {s === 1 && "Dasar"}
                  {s === 2 && "Alamat"}
                  {s === 3 && "Pribadi"}
                  {s === 4 && "Karakter"}
                  {s === 5 && "Pendidikan"}
                  {s === 6 && "Lainnya"}
                  {s === 7 && "Dokumen"}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-gray-600 h-2 rounded-full">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ========== STEP 1: DATA DASAR ========== */}
          {step === 1 && (
            <div className="space-y-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <option value="MAGANG">Magang (Probation 3 Bulan)</option>
                    <option value="LULUS">Karyawan Tetap</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 2: ALAMAT & REKENING ========== */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                🏠 Alamat & Rekening Bank
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Alamat Lengkap</label>
                <textarea 
                  name="alamat_jalan" 
                  value={form.alamat_jalan} 
                  onChange={handleChange}
                  placeholder="Jl. Merdeka No. 123, Gang Mawar"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-24"
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

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h4 className="font-bold mb-3">💳 Informasi Rekening Bank Aceh</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nama Pemilik Rekening</label>
                    <input 
                      name="nama_pemilik_buku" 
                      value={form.nama_pemilik_buku} 
                      onChange={handleChange}
                      placeholder="Sesuai buku rekening"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nomor Rekening</label>
                    <input 
                      name="nomor_rekening" 
                      value={form.nomor_rekening} 
                      onChange={handleChange}
                      placeholder="Nomor rekening Bank Aceh"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 3: DATA PRIBADI ========== */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                👤 Data Pribadi & Keluarga
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Anak Ke - Dari Bersaudara</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      name="anak_ke" 
                      placeholder="Ke" 
                      value={form.anak_ke} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                    <span className="self-center text-xl">dari</span>
                    <input 
                      type="number" 
                      name="dari_bersaudara" 
                      placeholder="Total" 
                      value={form.dari_bersaudara} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tinggal Bersama</label>
                  <input 
                    name="tinggal_bersama" 
                    value={form.tinggal_bersama} 
                    onChange={handleChange}
                    placeholder="Orangtua, Istri, Sendiri"
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          )}

          {/* ========== STEP 4: KARAKTER ========== */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                ⭐ Karakter & Spiritual
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Karakter Menonjol</label>
                <textarea 
                  name="karakter_menonjol" 
                  value={form.karakter_menonjol} 
                  onChange={handleChange}
                  placeholder="Tuliskan karakter positif yang menonjol..."
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hal yang Tidak Disukai</label>
                <textarea 
                  name="hal_tidak_disukai" 
                  value={form.hal_tidak_disukai} 
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Perilaku Positif</label>
                  <textarea 
                    name="perilaku_positif" 
                    value={form.perilaku_positif} 
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Perilaku Negatif (perlu diperbaiki)</label>
                  <textarea 
                    name="perilaku_negatif" 
                    value={form.perilaku_negatif} 
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-20"
                  />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h4 className="font-bold mb-3">🕌 Spiritual & Keagamaan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ibadah Sering Tertinggal</label>
                    <input 
                      name="ibadah_ketinggalan" 
                      value={form.ibadah_ketinggalan} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ibadah Sunnah Dikerjakan</label>
                    <input 
                      name="ibadah_sunnah" 
                      value={form.ibadah_sunnah} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pembimbing Islam / Ustadz</label>
                    <input 
                      name="pembimbing_islam" 
                      value={form.pembimbing_islam} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Sejak Tahun</label>
                    <input 
                      type="number" 
                      name="sejak_tahun" 
                      value={form.sejak_tahun} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 5: PENDIDIKAN ========== */}
          {step === 5 && (
            <div className="space-y-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h4 className="font-bold mb-3">💼 Riwayat Pekerjaan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pekerjaan Sebelumnya</label>
                    <input 
                      name="pekerjaan_sekarang" 
                      value={form.pekerjaan_sekarang} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bidang Spesifik</label>
                    <input 
                      name="bidang_spesifik" 
                      value={form.bidang_spesifik} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 mt-4">Pengalaman Organisasi</label>
                  <textarea 
                    name="pengalaman_organisasi" 
                    value={form.pengalaman_organisasi} 
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 h-24"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 6: HOBI & FINANSIAL ========== */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                🎨 Hobi, Minat & Informasi Lainnya
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

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h4 className="font-bold mb-3">💰 Informasi Finansial (Opsional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Penghasilan Per Bulan</label>
                    <input 
                      type="number" 
                      name="penghasilan_perbulan" 
                      value={form.penghasilan_perbulan} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pengeluaran Per Bulan</label>
                    <input 
                      type="number" 
                      name="pengeluaran_perbulan" 
                      value={form.pengeluaran_perbulan} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status Tempat Tinggal</label>
                    <select 
                      name="status_tempat_tinggal" 
                      value={form.status_tempat_tinggal} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    >
                      <option value="">-- Pilih --</option>
                      <option value="Milik Sendiri">Milik Sendiri</option>
                      <option value="Kontrak">Kontrak</option>
                      <option value="Menumpang">Menumpang</option>
                      <option value="Orangtua">Orangtua</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Kendaraan Dimiliki</label>
                    <input 
                      name="kendaraan_dimiliki" 
                      value={form.kendaraan_dimiliki} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h4 className="font-bold mb-3">🏥 Kesehatan</h4>
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pantangan Kesehatan</label>
                    <input 
                      name="pantangan_kesehatan" 
                      value={form.pantangan_kesehatan} 
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 7: UPLOAD DOKUMEN ========== */}
          {step === 7 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                📎 Upload Dokumen Persyaratan
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

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Scan KK</label>
                  <input 
                    type="file" 
                    name="file_kk" 
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="w-full text-white"
                  />
                  {files.file_kk && (
                    <p className="text-sm text-green-400 mt-1">✓ {files.file_kk.name}</p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pas Foto 4x6</label>
                  <input 
                    type="file" 
                    name="file_pas_foto" 
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full text-white"
                  />
                  {files.file_pas_foto && (
                    <p className="text-sm text-green-400 mt-1">✓ {files.file_pas_foto.name}</p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ijazah (Multiple)</label>
                  <input 
                    type="file" 
                    name="file_ijazah" 
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    multiple
                    className="w-full text-white"
                  />
                  {files.file_ijazah.length > 0 && (
                    <p className="text-sm text-green-400 mt-1">✓ {files.file_ijazah.length} file dipilih</p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sertifikat (Multiple)</label>
                  <input 
                    type="file" 
                    name="file_sertifikat" 
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    multiple
                    className="w-full text-white"
                  />
                  {files.file_sertifikat.length > 0 && (
                    <p className="text-sm text-green-400 mt-1">✓ {files.file_sertifikat.length} file dipilih</p>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER NAVIGATION */}
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-700">
          <button
            type="button"
            onClick={step === 1 ? onClose : prevStep}
            className="px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            {step === 1 ? "Batal" : "← Sebelumnya"}
          </button>
          
          <div className="text-center text-gray-400 text-sm">
            Step {step} dari 7
          </div>

          {step < 7 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Selanjutnya →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-8 py-2.5 rounded-lg font-semibold flex items-center gap-2 ${
                loading ? 'bg-gray-600 cursor-wait' : 'bg-green-600 hover:bg-green-700'
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
          )}
        </div>

      </div>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5100";

export default function FormPendaftaranMagang() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [form, setForm] = useState({
    unit_kerja: "",
    nama: "",
    gelar: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    tanggal_mulai: "",
    jabatan: "",
    email: "",
    no_hp: "",
    alamat_jalan: "",
    desa: "",
    kecamatan: "",
    kabupaten: "",
    nama_pemilik_buku: "",
    nomor_rekening: "",
    status_magang: "MAGANG"
  });

  const [files, setFiles] = useState({
    foto_ktp: null,
    foto_buku_rekening: null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error saat user mulai mengetik
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles({ ...files, [name]: fileList[0] });
    // Clear error
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi field wajib
    if (!form.unit_kerja) newErrors.unit_kerja = "Unit kerja wajib diisi";
    if (!form.nama) newErrors.nama = "Nama lengkap wajib diisi";
    if (!form.jenis_kelamin) newErrors.jenis_kelamin = "Jenis kelamin wajib dipilih";
    if (!form.tempat_lahir) newErrors.tempat_lahir = "Tempat lahir wajib diisi";
    if (!form.tanggal_lahir) newErrors.tanggal_lahir = "Tanggal lahir wajib diisi";
    if (!form.tanggal_mulai) newErrors.tanggal_mulai = "Tanggal mulai bekerja wajib diisi";
    if (!form.jabatan) newErrors.jabatan = "Jabatan wajib diisi";
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.no_hp) newErrors.no_hp = "No HP/WhatsApp wajib diisi";
    if (!form.alamat_jalan) newErrors.alamat_jalan = "Alamat wajib diisi";
    if (!form.nama_pemilik_buku) newErrors.nama_pemilik_buku = "Nama pemilik rekening wajib diisi";
    if (!form.nomor_rekening) newErrors.nomor_rekening = "Nomor rekening wajib diisi";

    // Validasi file
    if (!files.foto_ktp) newErrors.foto_ktp = "Foto KTP wajib diupload";
    if (!files.foto_buku_rekening) newErrors.foto_buku_rekening = "Foto buku rekening wajib diupload";

    // Validasi format email
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi nomor HP
    if (form.no_hp && !/^[0-9]{10,13}$/.test(form.no_hp.replace(/\D/g, ""))) {
      newErrors.no_hp = "Nomor HP harus 10-13 digit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Append semua field form
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      // Append files
      if (files.foto_ktp) formData.append("foto_ktp", files.foto_ktp);
      if (files.foto_buku_rekening) formData.append("foto_buku_rekening", files.foto_buku_rekening);

      const response = await axios.post(`${API_URL}/karyawan`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage(`✅ Pendaftaran berhasil! Kode Registrasi: ${response.data.kode_registrasi}`);
      
      // Reset form
      setForm({
        unit_kerja: "", nama: "", gelar: "", jenis_kelamin: "", tempat_lahir: "",
        tanggal_lahir: "", tanggal_mulai: "", jabatan: "", email: "", no_hp: "",
        alamat_jalan: "", desa: "", kecamatan: "", kabupaten: "",
        nama_pemilik_buku: "", nomor_rekening: "", status_magang: "MAGANG"
      });
      setFiles({ foto_ktp: null, foto_buku_rekening: null });

      // Scroll ke atas
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Redirect setelah 3 detik
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      alert("Gagal menyimpan data: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center">
            <div className="text-5xl mb-3">📋</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Form Pendaftaran Karyawan Magang
            </h1>
            <p className="text-gray-600">
              Yayasan Wakaf Cendekia
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Periode Magang: 3 Bulan
            </p>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
            <p className="font-bold">Berhasil!</p>
            <p>{successMessage}</p>
            <p className="text-sm mt-2">Anda akan diarahkan ke halaman utama...</p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          
          {/* SECTION 1: DATA PRIBADI */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              👤 Data Pribadi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Unit Kerja */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit/Tempat Kerja <span className="text-red-500">*</span>
                </label>
                <select
                  name="unit_kerja"
                  value={form.unit_kerja}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.unit_kerja ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Pilih Unit Kerja --</option>
                  <option value="YAYASAN">Yayasan</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="UMUM">Umum/Administrasi</option>
                </select>
                {errors.unit_kerja && <p className="text-red-500 text-sm mt-1">{errors.unit_kerja}</p>}
              </div>

              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.nama ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
              </div>

              {/* Gelar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gelar (Jika Ada)
                </label>
                <input
                  type="text"
                  name="gelar"
                  value={form.gelar}
                  onChange={handleChange}
                  placeholder="S.Pd, M.Kom, dll"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  name="jenis_kelamin"
                  value={form.jenis_kelamin}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.jenis_kelamin ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Pilih --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jenis_kelamin && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin}</p>}
              </div>

              {/* Tempat Lahir */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tempat_lahir"
                  value={form.tempat_lahir}
                  onChange={handleChange}
                  placeholder="Contoh: Banda Aceh"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.tempat_lahir ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.tempat_lahir && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir}</p>}
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={form.tanggal_lahir}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.tanggal_lahir ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.tanggal_lahir && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir}</p>}
              </div>

              {/* Tanggal Mulai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Mulai Bekerja <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal_mulai"
                  value={form.tanggal_mulai}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.tanggal_mulai ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.tanggal_mulai && <p className="text-red-500 text-sm mt-1">{errors.tanggal_mulai}</p>}
              </div>

              {/* Jabatan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jabatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jabatan"
                  value={form.jabatan}
                  onChange={handleChange}
                  placeholder="Guru Magang, Staf Admin, dll"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.jabatan ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.jabatan && <p className="text-red-500 text-sm mt-1">{errors.jabatan}</p>}
              </div>

            </div>
          </div>

          {/* SECTION 2: KONTAK */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              📞 Informasi Kontak
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* No HP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HP/WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="no_hp"
                  value={form.no_hp}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.no_hp ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.no_hp && <p className="text-red-500 text-sm mt-1">{errors.no_hp}</p>}
              </div>

            </div>
          </div>

          {/* SECTION 3: ALAMAT */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              🏠 Alamat Lengkap
            </h2>

            <div className="space-y-4">
              
              {/* Alamat Jalan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Jalan <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="alamat_jalan"
                  value={form.alamat_jalan}
                  onChange={handleChange}
                  placeholder="Jl. Merdeka No. 123, Gang Mawar"
                  rows="3"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.alamat_jalan ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.alamat_jalan && <p className="text-red-500 text-sm mt-1">{errors.alamat_jalan}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Desa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desa/Kelurahan
                  </label>
                  <input
                    type="text"
                    name="desa"
                    value={form.desa}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Kecamatan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={form.kecamatan}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Kabupaten */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kabupaten/Kota
                  </label>
                  <input
                    type="text"
                    name="kabupaten"
                    value={form.kabupaten}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* SECTION 4: REKENING */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              💳 Informasi Rekening Bank Aceh
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Nama Pemilik Buku */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pemilik Rekening <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_pemilik_buku"
                  value={form.nama_pemilik_buku}
                  onChange={handleChange}
                  placeholder="Sesuai buku rekening"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.nama_pemilik_buku ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.nama_pemilik_buku && <p className="text-red-500 text-sm mt-1">{errors.nama_pemilik_buku}</p>}
              </div>

              {/* Nomor Rekening */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Rekening <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nomor_rekening"
                  value={form.nomor_rekening}
                  onChange={handleChange}
                  placeholder="Nomor rekening Bank Aceh"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.nomor_rekening ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.nomor_rekening && <p className="text-red-500 text-sm mt-1">{errors.nomor_rekening}</p>}
              </div>

            </div>
          </div>

          {/* SECTION 5: UPLOAD DOKUMEN */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              📎 Upload Dokumen
            </h2>

            <div className="space-y-4">
              
              {/* Foto KTP */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto KTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="foto_ktp"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className={`w-full ${errors.foto_ktp ? "text-red-500" : ""}`}
                />
                {files.foto_ktp && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.foto_ktp.name}</p>
                )}
                {errors.foto_ktp && <p className="text-red-500 text-sm mt-1">{errors.foto_ktp}</p>}
                <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, atau PDF (Max 5MB)</p>
              </div>

              {/* Foto Buku Rekening */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Foto Buku Rekening <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="foto_buku_rekening"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className={`w-full ${errors.foto_buku_rekening ? "text-red-500" : ""}`}
                />
                {files.foto_buku_rekening && (
                  <p className="text-sm text-green-600 mt-2">✓ {files.foto_buku_rekening.name}</p>
                )}
                {errors.foto_buku_rekening && <p className="text-red-500 text-sm mt-1">{errors.foto_buku_rekening}</p>}
                <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, atau PDF (Max 5MB)</p>
              </div>

            </div>
          </div>

          {/* DISCLAIMER */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Perhatian:</strong> Pastikan semua data yang Anda isi sudah benar. 
              Data ini akan digunakan untuk proses magang selama 3 bulan dan penilaian kinerja.
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                ← Kembali
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition flex items-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>📝 Daftar Sekarang</>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Dengan mendaftar, Anda menyetujui untuk mengikuti program magang selama 3 bulan
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
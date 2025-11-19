import React, { useState } from "react";

const API_URL = "http://localhost:5100";

export default function TambahKaryawanLengkap() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
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
    kendaraan_dimiliki: "", riwayat_penyakit: "", status_penyakit: "", pantangan_kesehatan: ""
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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value 
    });
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (name === "file_ijazah" || name === "file_sertifikat") {
      setFiles({ ...files, [name]: Array.from(fileList) });
    } else {
      setFiles({ ...files, [name]: fileList[0] });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Append form data
      Object.keys(form).forEach(key => {
        if (form[key] !== '' && form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });
      
      // Append files
      Object.keys(files).forEach(key => {
        if (files[key]) {
          if (Array.isArray(files[key])) {
            files[key].forEach(file => formData.append(key, file));
          } else {
            formData.append(key, files[key]);
          }
        }
      });
      
      const response = await fetch(`${API_URL}/karyawan`, {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage(`Berhasil! Kode Registrasi: ${data.kode_registrasi}`);
        setTimeout(() => {
          window.location.href = "/data-karyawan";
        }, 3000);
      } else {
        alert("Gagal menyimpan data: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Gagal menyimpan data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    // Validasi Step 1
    if (step === 1) {
      if (!form.nama || !form.jenis_kelamin || !form.email || !form.no_hp || !form.jabatan) {
        alert("Mohon lengkapi data wajib:\n• Nama Lengkap\n• Jenis Kelamin\n• Email\n• No HP\n• Jabatan");
        return;
      }
      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        alert("Format email tidak valid!");
        return;
      }
    }
    
    // Validasi Step 7 - At least KTP & Buku Rekening
    if (step === 7) {
      if (!files.foto_ktp || !files.foto_buku_rekening) {
        alert("Minimal upload:\n• Foto KTP\n• Foto Buku Rekening Bank Aceh");
        return;
      }
    }
    
    setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

  // Success screen
  if (successMessage) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="bg-green-600 p-8 rounded-lg text-center max-w-md">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-lg">{successMessage}</p>
          <p className="mt-4 text-sm">Mengalihkan ke halaman data karyawan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Form Pendaftaran Karyawan Lengkap</h1>
          <p className="text-gray-400">Lengkapi semua data dengan teliti</p>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1,2,3,4,5,6,7].map(s => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-blue-600' : 'bg-gray-700'}`}>
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
          <div className="bg-gray-700 h-2 rounded-full">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 7) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-400 mt-2">
            Step {step} dari 7 - {
              step === 1 ? "Data Dasar & Kontak" :
              step === 2 ? "Alamat & Rekening" :
              step === 3 ? "Data Pribadi & Keluarga" :
              step === 4 ? "Karakter & Spiritual" :
              step === 5 ? "Pendidikan & Pekerjaan" :
              step === 6 ? "Hobi, Minat & Finansial" :
              "Upload Dokumen"
            }
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">

          {/* ==================== STEP 1: DATA DASAR & KONTAK ==================== */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                📋 Data Dasar & Kontak
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input name="nama" placeholder="Contoh: Ahmad Fauzi" value={form.nama} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" required />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Gelar (opsional)</label>
                  <input name="gelar" placeholder="S.Pd, M.Kom, dll" value={form.gelar} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Jenis Kelamin <span className="text-red-500">*</span></label>
                  <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" required>
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Tempat Lahir</label>
                  <input name="tempat_lahir" placeholder="Contoh: Lhokseumawe" value={form.tempat_lahir} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Tanggal Lahir</label>
                  <input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">NIK (16 digit)</label>
                  <input name="nik" placeholder="Nomor Induk Kependudukan" value={form.nik} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" maxLength="16" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Email <span className="text-red-500">*</span></label>
                  <input name="email" type="email" placeholder="email@example.com" value={form.email} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" required />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">No. HP/WhatsApp <span className="text-red-500">*</span></label>
                  <input name="no_hp" placeholder="08xxxxxxxxxx" value={form.no_hp} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Jabatan <span className="text-red-500">*</span></label>
                  <input name="jabatan" placeholder="Guru, Staf, Direktur, dll" value={form.jabatan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" required />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Unit Kerja</label>
                  <input name="unit_kerja" placeholder="Contoh: YAYASAN, SD, SMP, SMA" value={form.unit_kerja} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Tanggal Mulai Bekerja</label>
                  <input type="date" name="tanggal_mulai" value={form.tanggal_mulai} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Status Kepegawaian</label>
                  <select name="status_magang" value={form.status_magang} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white">
                    <option value="MAGANG">Magang (Probation 3 Bulan)</option>
                    <option value="LULUS">Karyawan Tetap (Sudah Lulus Magang)</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded p-3 mt-4">
                <p className="text-sm text-blue-200">
                  <strong>ℹ️ Info:</strong> Data bertanda <span className="text-red-400">*</span> wajib diisi untuk melanjutkan ke step berikutnya.
                </p>
              </div>
            </div>
          )}

          {/* ==================== STEP 2: ALAMAT & REKENING ==================== */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                🏠 Alamat & Rekening Bank
              </h2>

              <div>
                <label className="block mb-2 text-sm font-medium">Alamat Lengkap (Jalan/Gang/No Rumah)</label>
                <textarea name="alamat_jalan" placeholder="Contoh: Jl. Merdeka No. 123, Gang Mawar" value={form.alamat_jalan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white h-24" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Desa/Kelurahan</label>
                  <input name="desa" placeholder="Nama Desa/Kelurahan" value={form.desa} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Kecamatan</label>
                  <input name="kecamatan" placeholder="Nama Kecamatan" value={form.kecamatan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Kabupaten/Kota</label>
                  <input name="kabupaten" placeholder="Contoh: Aceh Utara" value={form.kabupaten} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="font-bold mb-3">💳 Informasi Rekening (Bank Aceh)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Nama Pemilik Rekening</label>
                    <input name="nama_pemilik_buku" placeholder="Sesuai buku rekening" value={form.nama_pemilik_buku} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Nomor Rekening</label>
                    <input name="nomor_rekening" placeholder="Nomor rekening Bank Aceh" value={form.nomor_rekening} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded p-3 mt-4">
                <p className="text-sm text-yellow-200">
                  <strong>⚠️ Penting:</strong> Pastikan nama pemilik rekening sesuai dengan yang tertera di buku rekening Bank Aceh untuk memudahkan proses transfer gaji.
                </p>
              </div>
            </div>
          )}

          {/* ==================== STEP 3: DATA PRIBADI & KELUARGA ==================== */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                👤 Data Pribadi & Keluarga
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Nama Panggilan</label>
                  <input name="nama_panggilan" placeholder="Nama yang biasa dipanggil" value={form.nama_panggilan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Golongan Darah</label>
                  <select name="golongan_darah" value={form.golongan_darah} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white">
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
                  <label className="block mb-2 text-sm font-medium">Suku</label>
                  <input name="suku" placeholder="Contoh: Aceh, Jawa, Batak, dll" value={form.suku} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Agama</label>
                  <select name="agama" value={form.agama} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white">
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
                  <label className="block mb-2 text-sm font-medium">No. Kartu Keluarga (KK)</label>
                  <input name="no_kk" placeholder="16 digit nomor KK" value={form.no_kk} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" maxLength="16" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">NPWP</label>
                  <input name="npwp" placeholder="Nomor NPWP (jika ada)" value={form.npwp} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Kewarganegaraan</label>
                  <input name="kewarganegaraan" value={form.kewarganegaraan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Anak Ke - Dari Berapa Bersaudara</label>
                  <div className="flex gap-2">
                    <input type="number" name="anak_ke" placeholder="Ke" value={form.anak_ke} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                    <span className="text-2xl">dari</span>
                    <input type="number" name="dari_bersaudara" placeholder="Total" value={form.dari_bersaudara} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Tinggal Bersama</label>
                  <input name="tinggal_bersama" placeholder="Contoh: Orangtua, Istri, Sendiri" value={form.tinggal_bersama} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Jumlah Tanggungan</label>
                  <input type="number" name="jumlah_tanggungan" placeholder="0" value={form.jumlah_tanggungan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Status Pernikahan Ke</label>
                  <input type="number" name="status_pernikahan_ke" value={form.status_pernikahan_ke} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Status Anak</label>
                  <input name="status_anak" placeholder="Contoh: Belum menikah, Sudah menikah" value={form.status_anak} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="font-bold mb-3">📞 Kontak Darurat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">No. HP Keluarga/Darurat</label>
                    <input name="kontak_keluarga" placeholder="08xxxxxxxxxx" value={form.kontak_keluarga} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Hubungan</label>
                    <input name="status_kontak_keluarga" placeholder="Contoh: Ayah, Ibu, Istri, Kakak" value={form.status_kontak_keluarga} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 4: KARAKTER & SPIRITUAL ==================== */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                ⭐ Karakter & Spiritual
              </h2>

              <div>
                <label className="block mb-2 text-sm font-medium">Karakter Menonjol</label>
                <textarea name="karakter_menonjol" placeholder="Tuliskan karakter positif yang menonjol..." value={form.karakter_menonjol} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white h-20" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Hal yang Tidak Disukai</label>
                <textarea name="hal_tidak_disukai" placeholder="Tuliskan hal-hal yang tidak disukai..." value={form.hal_tidak_disukai} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white h-20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Perilaku Positif</label>
                  <textarea name="perilaku_positif" placeholder="Contoh: Disiplin, Jujur, Ramah..." value={form.perilaku_positif} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white h-20" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Perilaku Negatif (yang perlu diperbaiki)</label>
                  <textarea name="perilaku_negatif" placeholder="Contoh: Terlambat, Mudah marah..." value={form.perilaku_negatif} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white h-20" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Orang Terdekat / Sahabat</label>
                <input name="orang_terdekat" placeholder="Nama orang terdekat" value={form.orang_terdekat} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="font-bold mb-3">🕌 Spiritual & Keagamaan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Ibadah yang Sering Tertinggal</label>
                    <input name="ibadah_ketinggalan" placeholder="Contoh: Sholat Dhuha" value={form.ibadah_ketinggalan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Ibadah Sunnah yang Dikerjakan</label>
                    <input name="ibadah_sunnah" placeholder="Contoh: Puasa Senin-Kamis, Tahajud" value={form.ibadah_sunnah} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Pembimbing Islam / Ustadz</label>
                    <input name="pembimbing_islam" placeholder="Nama ustadz/pembimbing" value={form.pembimbing_islam} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Sejak Tahun</label>
                    <input type="number" name="sejak_tahun" placeholder="Contoh: 2020" value={form.sejak_tahun} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 5: PENDIDIKAN & PEKERJAAN ==================== */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                🎓 Pendidikan & Pekerjaan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Pendidikan Terakhir</label>
                  <select name="pendidikan_terakhir" value={form.pendidikan_terakhir} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white">
                    <option value="">-- Pilih --</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA/SMK">SMA/SMK</option>
                    <option value="D3">D3 (Diploma)</option>
                    <option value="S1">S1 (Sarjana)</option>
                    <option value="S2">S2 (Magister)</option>
                    <option value="S3">S3 (Doktor)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Alumni Dari</label>
                  <input name="alumni_dari" placeholder="Nama sekolah/universitas" value={form.alumni_dari} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Jurusan</label>
                  <input name="jurusan" placeholder="Contoh: Pendidikan Matematika" value={form.jurusan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Tahun Lulus</label>
                  <input type="number" name="tahun_lulus" placeholder="Contoh: 2020" value={form.tahun_lulus} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="font-bold mb-3">💼 Riwayat Pekerjaan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Pekerjaan Sebelumnya</label>
                    <input name="pekerjaan_sekarang" placeholder="Nama perusahaan/instansi" value={form.pekerjaan_sekarang} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Bidang Spesifik</label>
                    <input name="bidang_spesifik" placeholder="Contoh: IT, Marketing, Guru" value={form.bidang_spesifik} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Pangkat/Golongan (jika PNS)</label>
                    <input name="pangkat_golongan" placeholder="Contoh: III/a" value={form.pangkat_golongan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Alamat Tempat Kerja Sebelumnya</label>
                    <input name="alamat_kerja" placeholder="Alamat lengkap" value={form.alamat_kerja} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Pengalaman Organisasi</label>
                <textarea name="pengalaman_organisasi" placeholder="Contoh: Ketua OSIS (2018-2019), Anggota PMR (2017-2018)" value={form.pengalaman_organisasi} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white h-24" />
              </div>
            </div>
          )}

          {/* ==================== STEP 6: HOBI, MINAT & FINANSIAL ==================== */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                🎨 Hobi, Minat & Informasi Lainnya
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Hobi</label>
                  <input name="hobi" placeholder="Contoh: Membaca, Olahraga" value={form.hobi} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Minat & Bakat</label>
                  <input name="minat_bakat" placeholder="Contoh: Musik, Desain Grafis" value={form.minat_bakat} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Keahlian</label>
                  <input name="keahlian" placeholder="Contoh: Microsoft Office, Photoshop" value={form.keahlian} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Tokoh yang Dikagumi</label>
                  <input name="tokoh_dikagumi" placeholder="Nama tokoh" value={form.tokoh_dikagumi} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Jumlah Buku di Rumah</label>
                  <input type="number" name="jumlah_buku_rumah" placeholder="0" value={form.jumlah_buku_rumah} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Judul Buku yang Sedang/Pernah Dibaca</label>
                  <input name="judul_buku_dibaca" placeholder="Pisahkan dengan koma" value={form.judul_buku_dibaca} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="font-bold mb-3">📱 Media Sosial</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Akun Media Sosial</label>
                    <textarea name="akun_sosmed" placeholder="Contoh: IG: @username, FB: Nama Lengkap, Twitter: @handle" value={form.akun_sosmed} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white h-20" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Sosmed yang Sering Diakses</label>
                    <input name="sosmed_sering_diakses" placeholder="Contoh: Instagram, YouTube" value={form.sosmed_sering_diakses} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium">Konten yang Digemari</label>
                  <input name="konten_digemari" placeholder="Contoh: Edukatif, Comedy, Tutorial" value={form.konten_digemari} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="font-bold mb-3">💰 Informasi Finansial (Opsional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Penghasilan Per Bulan (Rp)</label>
                    <input type="number" name="penghasilan_perbulan" placeholder="0" value={form.penghasilan_perbulan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Pengeluaran Per Bulan (Rp)</label>
                    <input type="number" name="pengeluaran_perbulan" placeholder="0" value={form.pengeluaran_perbulan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Usaha Sampingan</label>
                  <input name="usaha_sampingan" placeholder="Jelaskan jika ada" value={form.usaha_sampingan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Hutang Konsumtif (Rp)</label>
                    <input type="number" name="hutang_konsumtif" placeholder="0" value={form.hutang_konsumtif} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Hutang Produktif (Rp)</label>
                    <input type="number" name="hutang_produktif" placeholder="0" value={form.hutang_produktif} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Aset Tunai</label>
                    <input name="aset_tunai" placeholder="Contoh: Tabungan, Emas" value={form.aset_tunai} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Aset Kredit</label>
                    <input name="aset_kredit" placeholder="Contoh: Rumah KPR, Motor Kredit" value={form.aset_kredit} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Lembaga Pemberi Kredit</label>
                    <input name="lembaga_pemberi_kredit" placeholder="Nama bank/lembaga" value={form.lembaga_pemberi_kredit} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Estimasi Total Aset (Rp)</label>
                    <input type="number" name="prediksi_total_aset" placeholder="0" value={form.prediksi_total_aset} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Status Tempat Tinggal</label>
                    <select name="status_tempat_tinggal" value={form.status_tempat_tinggal} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white">
                      <option value="">-- Pilih --</option>
                      <option value="Milik Sendiri">Milik Sendiri</option>
                      <option value="Kontrak">Kontrak</option>
                      <option value="Menumpang">Menumpang</option>
                      <option value="Orangtua">Orangtua</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Kendaraan yang Dimiliki</label>
                    <input name="kendaraan_dimiliki" placeholder="Contoh: Motor, Mobil" value={form.kendaraan_dimiliki} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="font-bold mb-3">🏥 Informasi Kesehatan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Riwayat Penyakit</label>
                    <textarea name="riwayat_penyakit" placeholder="Tuliskan jika ada penyakit yang pernah diderita" value={form.riwayat_penyakit} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white h-20" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Status Penyakit Saat Ini</label>
                    <input name="status_penyakit" placeholder="Sehat / Dalam Pengobatan" value={form.status_penyakit} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium">Pantangan Kesehatan / Alergi</label>
                  <input name="pantangan_kesehatan" placeholder="Contoh: Alergi seafood, Asma" value={form.pantangan_kesehatan} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 7: UPLOAD DOKUMEN ==================== */}
          {step === 7 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                📎 Upload Dokumen Persyaratan
              </h2>

              <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded p-3 mb-4">
                <p className="text-sm text-blue-200">
                  <strong>ℹ️ Info:</strong> Format yang diterima: JPG, PNG, PDF. Ukuran max: 5MB per file.
                </p>
              </div>

              <div className="space-y-4">
                
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">
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
                  <label className="block mb-2 text-sm font-medium">
                    Foto Buku Rekening Bank Aceh <span className="text-red-500">*</span>
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

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">Foto Profil</label>
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

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">Scan Kartu Keluarga (KK)</label>
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

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">Pas Foto 4x6</label>
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

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">Scan Akta Kelahiran</label>
                  <input 
                    type="file" 
                    name="file_akta_kelahiran" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf" 
                    className="w-full text-white"
                  />
                  {files.file_akta_kelahiran && (
                    <p className="text-sm text-green-400 mt-1">✓ {files.file_akta_kelahiran.name}</p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">Ijazah (Bisa Multiple)</label>
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

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">Sertifikat (Bisa Multiple)</label>
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

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">Buku Nikah (jika sudah menikah)</label>
                  <input 
                    type="file" 
                    name="file_buku_nikah" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf" 
                    className="w-full text-white"
                  />
                  {files.file_buku_nikah && (
                    <p className="text-sm text-green-400 mt-1">✓ {files.file_buku_nikah.name}</p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition">
                  <label className="block mb-2 text-sm font-medium">Scan NPWP (jika ada)</label>
                  <input 
                    type="file" 
                    name="file_npwp" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf" 
                    className="w-full text-white"
                  />
                  {files.file_npwp && (
                    <p className="text-sm text-green-400 mt-1">✓ {files.file_npwp.name}</p>
                  )}
                </div>

              </div>

              <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded p-3 mt-4">
                <p className="text-sm text-yellow-200">
                  <strong>⚠️ Penting:</strong> Pastikan file yang diupload jelas dan terbaca. File bertanda <span className="text-red-400">*</span> wajib diupload.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
              step === 1 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            ← Sebelumnya
          </button>

          <div className="text-center text-gray-400 text-sm">
            {step === 7 && (
              <p className="mb-2">Pastikan semua data sudah benar sebelum submit</p>
            )}
          </div>

          {step < 7 ? (
            <button 
              onClick={nextStep} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              Selanjutnya →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                loading 
                  ? 'bg-gray-600 cursor-wait' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  ✓ Submit Pendaftaran
                </>
              )}
            </button>
          )}
        </div>

        {/* HELP TEXT */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Butuh bantuan? Hubungi Admin di <span className="text-blue-400">admin@yayasan.com</span>
          </p>
        </div>

      </div>
    </div>
  );
}

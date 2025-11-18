import React, { useState } from "react";

const API_URL = "http://localhost:5100";

export default function TambahKaryawanLengkap() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [form, setForm] = useState({
    nama: "", gelar: "", jenis_kelamin: "", tempat_lahir: "", tanggal_lahir: "",
    nik: "", tanggal_mulai: "", jabatan: "", email: "", no_hp: "", unit_kerja: "",
    status_magang: "MAGANG", alamat_jalan: "", desa: "", kecamatan: "", kabupaten: "",
    nama_pemilik_buku: "", nomor_rekening: "", nama_panggilan: "", golongan_darah: "",
    suku: "", agama: "", no_kk: "", npwp: "", kewarganegaraan: "Indonesia",
    anak_ke: "", dari_bersaudara: "", tinggal_bersama: "", jumlah_tanggungan: 0,
    karakter_menonjol: "", hal_tidak_disukai: "", ibadah_ketinggalan: "",
    ibadah_sunnah: "", jumlah_buku_rumah: "", judul_buku_dibaca: "",
    akun_sosmed: "", sosmed_sering_diakses: "", konten_digemari: "",
    hobi: "", minat_bakat: "", keahlian: "", tokoh_dikagumi: "",
    riwayat_penyakit: "", status_penyakit: "", pantangan_kesehatan: "",
    perilaku_negatif: "", perilaku_positif: "", orang_terdekat: "",
    pendidikan_terakhir: "", alumni_dari: "", jurusan: "", tahun_lulus: "",
    pekerjaan_sekarang: "", bidang_spesifik: "", pangkat_golongan: "",
    alamat_kerja: "", penghasilan_perbulan: "", usaha_sampingan: "",
    pengeluaran_perbulan: "", hutang_konsumtif: "", hutang_produktif: "",
    aset_tunai: "", aset_kredit: "", lembaga_pemberi_kredit: "",
    prediksi_total_aset: "", status_tempat_tinggal: "", kendaraan_dimiliki: "",
    status_pernikahan_ke: 1, status_anak: "", pengalaman_organisasi: "",
    pembimbing_islam: "", sejak_tahun: "", kontak_keluarga: "", status_kontak_keluarga: ""
  });
  
  const [files, setFiles] = useState({
    foto_ktp: null, foto_buku_rekening: null, foto_profil: null,
    file_kk: null, file_akta_kelahiran: null, file_pas_foto: null,
    file_buku_nikah: null, file_npwp: null, file_ijazah: [], file_sertifikat: []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      Object.keys(form).forEach(key => {
        if (form[key]) formData.append(key, form[key]);
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
      
      const response = await fetch(`${API_URL}/karyawan`, {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage(`Berhasil! Kode Registrasi: ${data.kode_registrasi}`);
        setTimeout(() => {
          window.location.href = "/data-karyawan";
        }, 2000);
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
    if (step === 1) {
      if (!form.nama || !form.jenis_kelamin || !form.email || !form.no_hp) {
        alert("Mohon lengkapi data wajib (Nama, Jenis Kelamin, Email, No HP)");
        return;
      }
    }
    setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

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
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Pendaftaran Karyawan</h1>
          <p className="text-gray-400">Lengkapi data dengan teliti</p>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1,2,3,4,5,6,7].map(s => (
              <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-blue-600' : 'bg-gray-700'}`}>
                {s}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">
            Step {step} dari 7 - {
              step === 1 ? "Data Dasar" :
              step === 2 ? "Alamat & Rekening" :
              step === 3 ? "Data Pribadi" :
              step === 4 ? "Karakter & Spiritual" :
              step === 5 ? "Pendidikan & Pekerjaan" :
              step === 6 ? "Finansial & Aset" :
              "Dokumen Upload"
            }
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">

          {/* STEP 1: DATA DASAR */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Data Dasar</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="nama" placeholder="Nama Lengkap *" value={form.nama} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" required />
                <input name="gelar" placeholder="Gelar (opsional)" value={form.gelar} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white">
                  <option value="">Pilih Jenis Kelamin *</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <input name="nama_panggilan" placeholder="Nama Panggilan" value={form.nama_panggilan} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="tempat_lahir" placeholder="Tempat Lahir *" value={form.tempat_lahir} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
                <input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
              </div>

              <input name="nik" placeholder="NIK (16 digit) *" value={form.nik} onChange={handleChange} className="p-3 bg-gray-700 rounded w-full text-white" maxLength="16" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
                <input name="no_hp" placeholder="No. HP/WhatsApp *" value={form.no_hp} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="jabatan" placeholder="Jabatan *" value={form.jabatan} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
                <input name="unit_kerja" placeholder="Unit Kerja" value={form.unit_kerja} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="date" name="tanggal_mulai" placeholder="Tanggal Mulai Bekerja" value={form.tanggal_mulai} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white" />
                <select name="status_magang" value={form.status_magang} onChange={handleChange} className="p-3 bg-gray-700 rounded text-white">
                  <option value="MAGANG">Magang (3 bulan)</option>
                  <option value="LULUS">Sudah Lulus Magang</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2-6: Simplified untuk hemat space */}
          {step === 2 && <div className="text-center py-8 text-gray-400">Form Step 2: Alamat & Rekening (implementasi sama seperti Step 1)</div>}
          {step === 3 && <div className="text-center py-8 text-gray-400">Form Step 3: Data Pribadi</div>}
          {step === 4 && <div className="text-center py-8 text-gray-400">Form Step 4: Karakter & Spiritual</div>}
          {step === 5 && <div className="text-center py-8 text-gray-400">Form Step 5: Pendidikan & Pekerjaan</div>}
          {step === 6 && <div className="text-center py-8 text-gray-400">Form Step 6: Finansial & Aset</div>}

          {/* STEP 7: DOKUMEN UPLOAD */}
          {step === 7 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Upload Dokumen</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Foto KTP *</label>
                  <input type="file" name="foto_ktp" onChange={handleFileChange} accept="image/*,.pdf" className="p-2 bg-gray-700 rounded w-full text-white" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Foto Buku Rekening Bank Aceh *</label>
                  <input type="file" name="foto_buku_rekening" onChange={handleFileChange} accept="image/*,.pdf" className="p-2 bg-gray-700 rounded w-full text-white" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ijazah (Bisa multiple)</label>
                  <input type="file" name="file_ijazah" onChange={handleFileChange} accept="image/*,.pdf" multiple className="p-2 bg-gray-700 rounded w-full text-white" />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded font-semibold ${step === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          >
            ← Sebelumnya
          </button>

          {step < 7 ? (
            <button onClick={nextStep} className="px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
              Selanjutnya →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-3 rounded font-semibold ${loading ? 'bg-gray-600 cursor-wait' : 'bg-green-600 hover:bg-green-700'} text-white`}
            >
              {loading ? "Menyimpan..." : "✓ Submit Pendaftaran"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
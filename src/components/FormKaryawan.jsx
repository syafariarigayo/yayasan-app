import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API = 'http://localhost:5000/karyawan';

export default function FormKaryawan() {
  const { id } = useParams(); // undefined for create, exists for edit
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: '', gelar: '', jenis_kelamin: 'Laki-laki', tempat_lahir:'', tanggal_lahir:'',
    nik:'', tanggal_mulai:'', jabatan:'', email:'', no_hp:'', alamat_jalan:'',
    desa:'', kecamatan:'', kabupaten:'', nama_pemilik_buku:'', nomor_rekening:'',
    tempat_kerja:'', status_magang:'MAGANG'
  });

  const [fotoKtp, setFotoKtp] = useState(null);
  const [fotoRek, setFotoRek] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`${API}/${id}`)
        .then(res => {
          setForm({
            ...form,
            ...res.data
          });
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e, setFn) => setFn(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.keys(form).forEach(k => fd.append(k, form[k] || ''));

      if (fotoKtp) fd.append('foto_ktp', fotoKtp);
      if (fotoRek) fd.append('foto_buku_rekening', fotoRek);

      if (id) {
        await axios.put(`${API}/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Data berhasil diperbarui');
      } else {
        await axios.post(API, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Data berhasil disimpan');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data');
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Karyawan' : 'Form Karyawan (Magang)'}</h2>
      {loading ? <p>Loading...</p> : (
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="nama" placeholder="Nama" value={form.nama || ''} onChange={handleChange} className="p-2 border rounded" required />
        <input name="gelar" placeholder="Gelar" value={form.gelar || ''} onChange={handleChange} className="p-2 border rounded" />
        <select name="jenis_kelamin" value={form.jenis_kelamin || 'Laki-laki'} onChange={handleChange} className="p-2 border rounded">
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        <input name="tempat_lahir" placeholder="Tempat Lahir" value={form.tempat_lahir || ''} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="tanggal_lahir" value={form.tanggal_lahir || ''} onChange={handleChange} className="p-2 border rounded" />
        <input name="nik" placeholder="NIK" value={form.nik || ''} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="tanggal_mulai" value={form.tanggal_mulai || ''} onChange={handleChange} className="p-2 border rounded" />
        <input name="jabatan" placeholder="Jabatan" value={form.jabatan || ''} onChange={handleChange} className="p-2 border rounded" />
        <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} className="p-2 border rounded" />
        <input name="no_hp" placeholder="HP / Whatsapp" value={form.no_hp || ''} onChange={handleChange} className="p-2 border rounded" />

        <div>
          <label className="block mb-1">Foto KTP</label>
          <input type="file" accept="image/*" onChange={(e)=>handleFile(e, setFotoKtp)} />
          {form.foto_ktp && !fotoKtp && (
            <div className="mt-2">
              <img src={`http://localhost:5000/uploads/${form.foto_ktp}`} alt="ktp" className="h-20" />
              <p className="text-sm text-gray-600">Foto KTP saat ini</p>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">Foto Buku Rekening</label>
          <input type="file" accept="image/*" onChange={(e)=>handleFile(e, setFotoRek)} />
          {form.foto_buku_rekening && !fotoRek && (
            <div className="mt-2">
              <img src={`http://localhost:5000/uploads/${form.foto_buku_rekening}`} alt="rek" className="h-20" />
              <p className="text-sm text-gray-600">Foto Rekening saat ini</p>
            </div>
          )}
        </div>

        <textarea name="alamat_jalan" placeholder="Alamat Jalan" value={form.alamat_jalan || ''} onChange={handleChange} className="p-2 border rounded md:col-span-2" />

        <input name="desa" placeholder="Desa" value={form.desa || ''} onChange={handleChange} className="p-2 border rounded" />
        <input name="kecamatan" placeholder="Kecamatan" value={form.kecamatan || ''} onChange={handleChange} className="p-2 border rounded" />
        <input name="kabupaten" placeholder="Kabupaten" value={form.kabupaten || ''} onChange={handleChange} className="p-2 border rounded" />

        <input name="nama_pemilik_buku" placeholder="Nama Pemilik Rekening" value={form.nama_pemilik_buku || ''} onChange={handleChange} className="p-2 border rounded" />
        <input name="nomor_rekening" placeholder="Nomor Rekening" value={form.nomor_rekening || ''} onChange={handleChange} className="p-2 border rounded" />
        <input name="tempat_kerja" placeholder="Tempat Kerja" value={form.tempat_kerja || ''} onChange={handleChange} className="p-2 border rounded" />
        <select name="status_magang" value={form.status_magang || 'MAGANG'} onChange={handleChange} className="p-2 border rounded">
          <option value="MAGANG">MAGANG</option>
          <option value="LULUS">LULUS</option>
        </select>

        <div className="md:col-span-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{id ? 'Update' : 'Simpan'}</button>
        </div>
      </form>
      )}
    </div>
  );
}

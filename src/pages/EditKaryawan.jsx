import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditKaryawan(){
  const { id } = useParams();
  const nav = useNavigate();
  const [form,setForm] = useState(null);

  useEffect(()=> {
    axios.get(`http://localhost:5000/karyawan/${id}`).then(r=>setForm(r.data)).catch(e=>{console.error(e);});
  },[id]);

  if(!form) return <p className="p-6 text-white">Memuat...</p>;

  const submit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/karyawan/${id}`, form);
    alert("Terupdate");
    nav("/data-karyawan");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Karyawan</h1>
      <form onSubmit={submit} className="space-y-3 max-w-md">
        <input required value={form.nama||""} onChange={e=>setForm({...form,nama:e.target.value})} className="w-full p-2 rounded bg-gray-700"/>
        <input value={form.jabatan||""} onChange={e=>setForm({...form,jabatan:e.target.value})} className="w-full p-2 rounded bg-gray-700"/>
        <input value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 rounded bg-gray-700"/>
        <input value={form.no_hp||""} onChange={e=>setForm({...form,no_hp:e.target.value})} className="w-full p-2 rounded bg-gray-700"/>
        <button className="px-4 py-2 bg-green-600 rounded">Update</button>
      </form>
    </div>
  );
}
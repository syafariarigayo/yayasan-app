import React, { useEffect, useState } from "react";
import axios from "axios";
import AbsensiTable from "../components/AbsensiTable";
import InputAbsensi from "../components/InputAbsensi";

function Absensi() {
  const [data, setData] = useState([]);
  const [karyawan, setKaryawan] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const a = await axios.get("http://localhost:5000/absensi");
    const k = await axios.get("http://localhost:5000/karyawan");
    setData(a.data);
    setKaryawan(k.data);
  };

  const saveAbsensi = async (form) => {
    if (editData) {
      await axios.put("http://localhost:5000/absensi/" + editData.id, form);
      setEditData(null);
    } else {
      await axios.post("http://localhost:5000/absensi", form);
    }
    load();
  };

  const deleteAbsensi = async (id) => {
    if (window.confirm("Hapus absensi?"))
      await axios.delete("http://localhost:5000/absensi/" + id);
    load();
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">📅 Absensi Karyawan</h1>

      <div className="grid grid-cols-2 gap-6">
        <InputAbsensi
          karyawan={karyawan}
          onSubmit={saveAbsensi}
          initialData={editData}
        />

        <AbsensiTable
          data={data}
          onEdit={(row) => setEditData(row)}
          onDelete={deleteAbsensi}
        />
      </div>
    </div>
  );
}

export default Absensi;
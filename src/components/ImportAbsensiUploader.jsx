// ImportAbsensiUploader.jsx
import React, { useState } from "react";
import axios from "axios";

export default function ImportAbsensiUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onUpload = async () => {
    if (!file) return alert("Pilih file .xlsx terlebih dahulu.");
    const form = new FormData();
    form.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/import-absensi", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message || "Import selesai");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Upload / import gagal");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded text-white">
      <h2 className="text-xl mb-3">📤 Import Absensi (Excel)</h2>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />
      <div>
        <button
          onClick={onUpload}
          className="px-4 py-2 bg-blue-600 rounded"
          disabled={loading}
        >
          {loading ? "Mengupload..." : "Upload & Import"}
        </button>
      </div>
      <p className="text-sm text-gray-300 mt-2">
        Format header yang direkomendasikan: <b>nama, tanggal, jam_masuk, jam_pulang, status</b>.
      </p>
    </div>
  );
}
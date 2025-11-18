// ImportAbsensi.jsx
import React from "react";
import ImportAbsensiUploader from "../components/ImportAbsensiUploader";

export default function ImportAbsensi() {
  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📁 Import Absensi</h1>
      <ImportAbsensiUploader />
    </div>
  );
}
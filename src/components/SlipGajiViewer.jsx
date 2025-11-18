import React from "react";

function SlipGajiViewer({ data }) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded">
      <h2 className="text-2xl mb-4">Slip Gaji</h2>

      <p><b>Nama:</b> {data.nama}</p>
      <p><b>Jabatan:</b> {data.jabatan}</p>
      <p><b>Total Gaji:</b> Rp {data.total_gaji}</p>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 rounded"
        onClick={() => window.print()}
      >
        Cetak PDF
      </button>
    </div>
  );
}

export default SlipGajiViewer;
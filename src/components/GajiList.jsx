import React from "react";

function GajiList({ data }) {
  return (
    <table className="w-full bg-gray-800 text-white rounded">
      <thead className="bg-gray-700">
        <tr>
          <th className="p-2">Nama</th>
          <th className="p-2">Jabatan</th>
          <th className="p-2">Total Gaji</th>
          <th className="p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="4" className="p-4 text-center">
              Tidak ada data gaji
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="p-2">{row.nama}</td>
              <td className="p-2">{row.jabatan}</td>
              <td className="p-2">Rp {row.total_gaji}</td>
              <td className="p-2">
                <a
                  className="px-3 py-1 bg-green-600 rounded"
                  href={`/slip-gaji/${row.id}`}
                >
                  Slip
                </a>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default GajiList;
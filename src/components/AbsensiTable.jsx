import React from "react";

function AbsensiTable({ data, onEdit, onDelete }) {
  return (
    <table className="w-full bg-gray-800 text-white rounded">
      <thead className="bg-gray-700">
        <tr>
          <th className="p-2">No</th>
          <th className="p-2">Nama</th>
          <th className="p-2">Tanggal</th>
          <th className="p-2">Jam Masuk</th>
          <th className="p-2">Jam Pulang</th>
          <th className="p-2">Status</th>
          <th className="p-2">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((row, i) => (
            <tr key={row.id} className="border-b border-gray-700">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{row.nama}</td>
              <td className="p-2">{row.tanggal}</td>
              <td className="p-2">{row.jam_masuk || "-"}</td>
              <td className="p-2">{row.jam_pulang || "-"}</td>
              <td className="p-2">{row.status}</td>

              <td className="p-2">
                <button
                  onClick={() => onEdit(row)}
                  className="px-2 py-1 bg-yellow-500 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(row.id)}
                  className="px-2 py-1 bg-red-600 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="p-3 text-center">
              Tidak ada absensi
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AbsensiTable;
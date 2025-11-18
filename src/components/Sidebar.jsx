import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/", icon: "📊" },
    { label: "Data Karyawan", path: "/data-karyawan", icon: "👥" },
    { label: "Tambah Karyawan", path: "/tambah", icon: "➕" },
    { label: "Import Absensi", path: "/import-absensi", icon: "🗂️" },
    { label: "Rekap Absensi", path: "/rekap-absensi", icon: "📘" },
    { label: "Hitung Gaji", path: "/penggajian", icon: "💰" },
    { label: "Rekap Gaji Bulanan", path: "/rekap-gaji", icon: "💵" },
    { label: "Pengaturan", path: "/pengaturan", icon: "⚙️" },
  ];

  return (
    <div
      style={{
        width: "250px",
        background: "#111827",
        color: "white",
        minHeight: "100vh",
        padding: "15px",
        borderRight: "1px solid #1f2937",
      }}
    >
      {/* Logo */}
      <h2
        style={{
          marginBottom: "40px",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Yayasan Wakaf Cendekia
      </h2>

      {/* Loop Menu */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menu.map((m) => (
          <li key={m.path} style={{ marginBottom: "15px" }}>
            <Link
              to={m.path}
              style={{
                textDecoration: "none",
                padding: "10px 15px",
                display: "block",
                borderRadius: "8px",
                color: "white",
                background:
                  location.pathname === m.path ? "#1f2937" : "transparent",
              }}
            >
              <span style={{ marginRight: "10px" }}>{m.icon}</span>
              {m.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
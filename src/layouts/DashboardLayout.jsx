import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // CEK LOGIN
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // MENU ITEMS
  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/data-karyawan", label: "Data Karyawan", icon: "👥" },
    { path: "/tambah-karyawan", label: "Tambah Karyawan", icon: "➕" },
    { path: "/magang", label: "Management Magang", icon: "📚" },
    { path: "/penilaian-kinerja", label: "Penilaian Kinerja", icon: "⭐" },
    { path: "/import-absensi", label: "Import Absensi", icon: "📥" },
    { path: "/rekap-absensi", label: "Rekap Absensi", icon: "📋" },
    { path: "/penggajian", label: "Hitung Gaji", icon: "💰" },
    { path: "/rekap-gaji", label: "Rekap Gaji Bulanan", icon: "📊" },
    { path: "/pengaturan", label: "Pengaturan", icon: "⚙️" }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        
        {/* LOGO/HEADER */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-center">
            Yayasan Wakaf<br/>Cendekia
          </h1>
        </div>

        {/* MENU */}
        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* USER INFO & LOGOUT */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* AREA KONTEN */}
      <div className="flex-1 flex flex-col">
        
        {/* NAVBAR */}
        <div className="bg-blue-600 text-white px-6 py-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Sistem Informasi Yayasan</h2>
              <p className="text-sm text-blue-200">
                {menuItems.find(m => m.path === location.pathname)?.label || "Dashboard"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-blue-100">
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* HALAMAN CONTENT */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>

        {/* FOOTER */}
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>© 2025 Yayasan Wakaf Cendekia. All rights reserved.</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;
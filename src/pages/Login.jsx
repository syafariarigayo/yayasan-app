import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5100/auth/login", {
        username,
        password,
      });

      // Simpan token
      localStorage.setItem("token", res.data.token);

      alert("Login berhasil!");

      // Redirect langsung ke dashboard
      window.location.href = "/dashboard-admin";

    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "Login gagal");
      } else {
        alert("Tidak bisa terhubung ke server!");
      }
    }
  };

  return (
    <div className="text-center p-10 text-white">
      <h1 className="text-3xl mb-6">Login Sistem Yayasan</h1>

      <input
        type="text"
        placeholder="Username"
        className="text-black p-2 mb-3"
        onChange={(e) => setUser(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        className="text-black p-2 mb-4"
        onChange={(e) => setPass(e.target.value)}
      /><br />

      <button onClick={login} className="bg-blue-600 px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}

export default Login;
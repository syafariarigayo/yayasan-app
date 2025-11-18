import React from "react";

function BackupButton() {
  const runBackup = () => {
    fetch("http://localhost:5000/backup/manual")
      .then((res) => res.json())
      .then((data) => alert("✓ " + data.message))
      .catch(() => alert("✗ Backup gagal!"));
  };

  return (
    <button
      onClick={runBackup}
      className="px-4 py-2 bg-green-600 rounded text-white"
    >
      📦 Backup Database
    </button>
  );
}

export default BackupButton;
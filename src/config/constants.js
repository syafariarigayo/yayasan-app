// src/config/constants.js
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5100';
export const APP_NAME = process.env.REACT_APP_NAME || 'Yayasan Wakaf Cendekia';
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';
export const MAX_FILE_SIZE = parseInt(process.env.REACT_APP_MAX_FILE_SIZE) * 1024 * 1024; // MB to bytes
export const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || 'token';
export const DEBUG = process.env.REACT_APP_DEBUG === 'true';

// Status Karyawan
export const STATUS_KARYAWAN = {
  MAGANG: 'MAGANG',
  LULUS: 'LULUS'
};

// Status Absensi
export const STATUS_ABSENSI = {
  HADIR: 'HADIR',
  TELAT: 'TELAT',
  IZIN: 'IZIN',
  SAKIT: 'SAKIT',
  ALPA: 'ALPA'
};

// Role Admin
export const ROLES = {
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
  USER: 'user'
};

// Pagination
export const ITEMS_PER_PAGE = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE) || 10;
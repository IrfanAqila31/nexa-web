# Dokumentasi API Otentikasi (Auth)

Dokumentasi ini berisi struktur request dan response JSON dari endpoint yang ada di dalam `auth.controller.ts`. Format ini akan mempermudah tim frontend untuk melakukan penyesuaian (integration) dengan backend.

---

## 1. Registrasi (Register)

Endpoint ini digunakan untuk mendaftarkan pengguna baru.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Response Berhasil (201 Created)
Dikembalikan ketika pengguna berhasil didaftarkan.
```json
{
  "message": "Registrasi berhasil",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Response Gagal: Email Sudah Terdaftar (400 Bad Request)
Dikembalikan ketika email yang dimasukkan sudah ada di database.
```json
{
  "error": "Email sudah terdaftar"
}
```

### Response Gagal: Validasi Input (400 Bad Request)
Dikembalikan ketika input tidak memenuhi kriteria skema Zod (contoh: email tidak valid, password kurang panjang). Struktur error berbentuk array of objects standar Zod.
```json
{
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "email"
      ],
      "message": "Required"
    }
  ]
}
```

### Response Gagal: Kesalahan Server (500 Internal Server Error)
Dikembalikan ketika terjadi masalah internal pada server.
```json
{
  "error": "Terjadi kesalahan server"
}
```

---

## 2. Masuk (Login)

Endpoint ini digunakan untuk autentikasi pengguna yang sudah terdaftar.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response Berhasil (200 OK)
Dikembalikan ketika email dan password valid. Di sini frontend akan mendapatkan `token` (JWT) yang bisa disimpan di Cookies atau Local Storage untuk otorisasi selanjutnya.
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYT...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Response Gagal: Kredensial Salah (401 Unauthorized)
Dikembalikan ketika email tidak ditemukan atau password yang dimasukkan salah.
```json
{
  "error": "Kredensial tidak valid"
}
```

### Response Gagal: Validasi Input (400 Bad Request)
Dikembalikan ketika input tidak memenuhi kriteria skema Zod (misalnya field email/password kosong).
```json
{
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "password"
      ],
      "message": "Required"
    }
  ]
}
```

### Response Gagal: Kesalahan Server (500 Internal Server Error)
Dikembalikan ketika terjadi masalah internal pada server.
```json
{
  "error": "Terjadi kesalahan server"
}
```

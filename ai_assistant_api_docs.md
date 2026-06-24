# Dokumentasi API: AI Assistant (Generate Caption)

Dokumentasi ini menjelaskan cara mengintegrasikan fitur "AI Generate Caption" di sisi Frontend. API ini berfungsi untuk membuat caption otomatis yang viral dan menarik berdasarkan data `ClipCard` menggunakan Google Gemini AI.

## Informasi Endpoint

- **Method:** `GET` / `POST` *(Sesuaikan dengan routing di Express, misal: `/api/ai/generate-caption/:clipCardId`)*
- **URL Parameter:** `clipCardId` (UUID/String) - ID dari ClipCard yang ingin dibuatkan caption-nya.
- **Header Autentikasi:** Membutuhkan token JWT pada header `Authorization: Bearer <token>`

---

## Persyaratan & Validasi (Penting untuk Frontend!)

Sebelum memanggil API ini, Frontend **sangat disarankan** untuk memastikan bahwa User sudah mengisi **Hashtag** pada salah satu platform di dalam ClipCard. 

Jika tidak ada hashtag sama sekali di `platformData`, API akan menolak permintaan dan mengembalikan error `400`. Hal ini bisa Anda gunakan untuk menampilkan validasi/popup peringatan di UI sebelum *loading state* berjalan.

---

## Skenario Response API

### 1. Berhasil (200 OK)
Jika AI berhasil membuat caption, API akan mengembalikan respons JSON berisi teks murni tanpa hashtag tambahan (AI sudah diinstruksikan hanya untuk membuat kalimat teks).

**Response Body:**
```json
{
  "caption": "Pernah nggak sih ngerasa... (teks caption viral yang digenerate oleh AI)"
}
```

### 2. Gagal: Hashtag Belum Diisi (400 Bad Request)
Jika `ClipCard` tidak memiliki satupun data platform yang berisi `hashtags`, API akan menolak *request*.

**Response Body:**
```json
{
  "message": "Tolong masukan hashtag, (serta tags dan id platform jika ada) agar mempermudah pekerjaan anda"
}
```
> **Tip Frontend:** Tampilkan pesan ini di UI (seperti Toast/Snackbar) dan arahkan user untuk mengisi hashtag terlebih dahulu.

### 3. Gagal: Data Tidak Ditemukan / Bukan Pemilik (404 Not Found)
Jika `clipCardId` tidak ada di database, atau `ClipCard` tersebut bukan milik user yang sedang login.

**Response Body:**
```json
{
  "message": "ClipCard tidak ditemukan"
}
```

### 4. Gagal: Server Error / Token Tidak Valid (401 / 500)
- **401 Unauthorized**: Token kadaluarsa atau tidak valid (ditangani oleh middleware auth).
- **500 Internal Server Error**: Kegagalan dari server atau layanan Google Gemini AI sedang gangguan.

---

## Contoh Implementasi Fetch di Frontend (Javascript/TypeScript)

```typescript
async function generateAiCaption(clipCardId: string, token: string) {
  try {
    // Sesuaikan endpoint '/api/ai/caption/' dengan routing backend kalian
    const response = await fetch(`/api/ai/caption/${clipCardId}`, {
      method: 'POST', // atau GET, sesuaikan dengan backend
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      // Menangkap error 400 (Hashtag kosong) atau 404 (Data tidak ada)
      throw new Error(data.message || 'Terjadi kesalahan saat generate AI');
    }

    // Mengembalikan hasil caption text
    return data.caption;

  } catch (error) {
    console.error('Error generating caption:', error);
    alert(error.message); // Tampilkan ke user
    throw error;
  }
}
```

# Dokumentasi API ClipCard

Dokumentasi ini menjelaskan endpoint yang tersedia untuk fitur **ClipCard**. Semua endpoint memerlukan autentikasi melalui token JWT yang dikirimkan di header request.

## Base URL
`/api/clipcards`

## Autentikasi
Semua request ke endpoint ini wajib menyertakan header `Authorization` dengan format:
`Authorization: Bearer <token>`

---

## 1. Membuat ClipCard Baru

Membuat sebuah entri ClipCard baru untuk user yang sedang login.

- **Endpoint:** `POST /api/clipcards/`
- **Tujuan:** Membuat ClipCard baru.
- **Header:** `Authorization: Bearer <token>`

### Request Body (JSON)

| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `videoReference` | `string` | **Wajib**. Referensi dari video yang diunggah. |
| `platformData` | `array` dari `PlatformMetadata` | *Opsional*. Data metadata untuk platform sosial media (contoh: TikTok, Instagram, dll). |

**Struktur Objek `PlatformMetadata`:**

| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `platformName` | `string` | **Wajib**. Nama platform (contoh: `Tiktok`, `Instagram`). |
| `caption` | `string` | *Opsional*. Caption untuk postingan. |
| `hashtags` | `string` | *Opsional*. Hashtag yang digunakan. |
| `mentions` | `string` | *Opsional*. Akun yang di-mention. |
| `platformId` | `string` | *Opsional*. ID referensi platform eksternal. |

**Contoh Request Body:**
```json
{
  "videoReference": "https://storage.provider/video.mp4",
  "platformData": [
    {
      "platformName": "Tiktok",
      "caption": "Video keren banget!",
      "hashtags": "#keren #fyp",
      "mentions": "@username"
    }
  ]
}
```

### Response Berhasil (201 Created)
```json
{
  "message": "ClipCard berhasil dibuat",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174001",
    "videoReference": "https://storage.provider/video.mp4",
    "platformData": [...],
    "createdAt": "2026-06-17T12:00:00.000Z",
    "updatedAt": "2026-06-17T12:00:00.000Z"
  }
}
```

---

## 2. Mengambil Semua ClipCard

Mengambil daftar semua ClipCard yang dimiliki oleh user yang sedang login.

- **Endpoint:** `GET /api/clipcards/`
- **Tujuan:** Mendapatkan semua ClipCard.
- **Header:** `Authorization: Bearer <token>`

### Response Berhasil (200 OK)
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "userId": "123e4567-e89b-12d3-a456-426614174001",
      "videoReference": "https://storage.provider/video.mp4",
      "platformData": [...],
      "createdAt": "2026-06-17T12:00:00.000Z",
      "updatedAt": "2026-06-17T12:00:00.000Z"
    }
  ]
}
```

---

## 3. Mengambil Detail ClipCard

Mengambil detail dari sebuah ClipCard berdasarkan ID-nya.

- **Endpoint:** `GET /api/clipcards/:id`
- **Tujuan:** Mendapatkan detail spesifik sebuah ClipCard.
- **Header:** `Authorization: Bearer <token>`
- **URL Params:** `id` (ID dari ClipCard)

### Response Berhasil (200 OK)
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174001",
    "videoReference": "https://storage.provider/video.mp4",
    "platformData": [...],
    "createdAt": "2026-06-17T12:00:00.000Z",
    "updatedAt": "2026-06-17T12:00:00.000Z"
  }
}
```

---

## 4. Memperbarui ClipCard

Memperbarui data sebuah ClipCard (bisa update secara parsial / sebagian).

- **Endpoint:** `PUT /api/clipcards/:id`
- **Tujuan:** Mengupdate data ClipCard berdasarkan ID.
- **Header:** `Authorization: Bearer <token>`
- **URL Params:** `id` (ID dari ClipCard)

### Request Body (JSON)
Semua field bersifat *opsional*, kirimkan hanya field yang ingin diperbarui.

| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `videoReference` | `string` | *Opsional*. |
| `platformData` | `array` dari `PlatformMetadata` | *Opsional*. Akan mengganti data platform sebelumnya jika dikirimkan. |

**Contoh Request Body:**
```json
{
  "videoReference": "https://storage.provider/video_baru.mp4"
}
```

### Response Berhasil (200 OK)
```json
{
  "message": "ClipCard berhasil diperbarui",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    ...
    "videoReference": "https://storage.provider/video_baru.mp4",
    ...
  }
}
```

---

## 5. Menghapus ClipCard

Menghapus sebuah ClipCard secara permanen dari database.

- **Endpoint:** `DELETE /api/clipcards/:id`
- **Tujuan:** Menghapus ClipCard berdasarkan ID.
- **Header:** `Authorization: Bearer <token>`
- **URL Params:** `id` (ID dari ClipCard)

### Response Berhasil (200 OK)
```json
{
  "message": "ClipCard berhasil dihapus"
}
```

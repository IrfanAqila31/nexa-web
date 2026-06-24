# Dokumentasi Fitur Pembatasan Kuota ClipCard

Dokumentasi ini menjelaskan pembaruan pada endpoint pembuatan ClipCard, di mana sekarang terdapat batasan kuota untuk pengguna gratis (non-premium). Fitur ini dibuat agar pengguna gratis hanya dapat membuat maksimal 5 kartu, sedangkan pengguna premium dapat membuat kartu tanpa batas.

## Endpoint yang Terdampak

- **URL:** `/api/clip-cards` (atau path sesuai dengan routing `createCard` Anda)
- **Method:** `POST`
- **Auth Required:** Yes (Bearer Token)

## Perubahan Logika Bisnis (Business Logic)

Pada saat proses pembuatan ClipCard (`createCard`), sistem backend sekarang akan melakukan pengecekan status langganan pengguna:

1. **Pengguna Premium (`isPremium: true`):**
   - Tidak ada batasan kuota.
   - Pembuatan ClipCard akan selalu diproses.
2. **Pengguna Gratis (`isPremium: false`):**
   - Memiliki **batas maksimal 5 ClipCard**.
   - Jika pengguna sudah memiliki 5 ClipCard atau lebih, maka request untuk membuat kartu ke-6 akan **ditolak**.

## Respon Error (HTTP 403 Forbidden)

Jika pengguna gratis mencoba membuat kartu dan kuota mereka telah habis, backend akan mengembalikan respons HTTP `403 Forbidden` dengan format JSON sebagai berikut:

```json
{
  "message": "Kuota gratis habis. Silakan Upgrade ke Premium untuk membuat ClipCard tanpa batas."
}
```

> [!WARNING]
> Frontend **wajib** menangani status code `403` dari endpoint ini agar aplikasi tidak *crash* atau menampilkan *generic error*.

## Rekomendasi Penanganan di Frontend

Berikut adalah *best practice* yang disarankan untuk menangani respons ini di sisi Frontend:

1. **Tangkap Error `403` pada API Client:**
   Ketika melakukan pemanggilan `POST` ke endpoint pembuatan kartu, pastikan blok `catch` atau *error interceptor* menangkap status `403`.

2. **Tampilkan UI Upgrade (Modal / Pop-up):**
   Gunakan pesan dari backend (`err.response.data.message`) untuk ditampilkan kepada pengguna.
   Tampilkan pop-up atau modal *Call to Action* (CTA) yang menarik untuk mengarahkan pengguna ke halaman "Upgrade Premium".

### Contoh Implementasi di Frontend (Axios)

```javascript
try {
  const response = await axios.post('/api/clip-cards', cardData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  // Sukses membuat kartu
  console.log('Berhasil!', response.data);
  
} catch (error) {
  if (error.response && error.response.status === 403) {
    // Tangkap error kuota habis (403 Forbidden)
    const errorMessage = error.response.data.message;
    
    // Tampilkan pesan error ke user (misalnya menggunakan Toast atau Modal)
    toast.error(errorMessage);
    
    // Tampilkan Modal Upgrade ke Premium
    showUpgradePremiumModal();
  } else {
    // Tangani error lainnya (400, 401, 500, dll)
    toast.error(error.response?.data?.message || 'Terjadi kesalahan sistem');
  }
}
```

> [!TIP]
> Frontend juga bisa secara proaktif menghitung jumlah ClipCard yang dimiliki user di sisi klien. Jika jumlahnya sudah mencapai 5 dan status user bukan premium, tombol "Buat Card" bisa di-*disable* atau langsung memunculkan modal upgrade **sebelum** melakukan request ke backend untuk menghemat *bandwidth*.

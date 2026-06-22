# Dokumentasi API: Login with Google

Dokumentasi ini ditujukan untuk tim Frontend yang akan mengimplementasikan fitur **Login with Google**. 

Proses otentikasi Google pada aplikasi ini menggunakan metode **ID Token**. Frontend bertanggung jawab untuk memunculkan prompt login Google, mendapatkan *ID Token*, dan mengirimkannya ke backend.

---

## 📌 Alur Kerja (Workflow)

1. Frontend menampilkan tombol/prompt "Login with Google".
2. User melakukan login melalui pop-up/redirect Google.
3. Google mengembalikan kredensial berupa **ID Token** ke Frontend.
4. Frontend mengirimkan **ID Token** tersebut ke endpoint backend `/auth/google`.
5. Backend memverifikasi token ke server Google.
   - Jika belum terdaftar, backend akan otomatis membuatkan akun (Register).
   - Jika sudah terdaftar, backend akan melakukan proses Login.
6. Backend mengembalikan **JWT Token** (token sesi aplikasi kita) beserta data *user* ke Frontend.
7. Frontend menyimpan **JWT Token** untuk otorisasi endpoint-endpoint lain.

---

## 🚀 Endpoint API

### `POST /auth/google`
*(Catatan: Sesuaikan prefix URL jika menggunakan prefix seperti `/api/auth/google`)*

**Deskripsi:** Mengautentikasi pengguna menggunakan Google ID Token dan mengembalikan JWT Token aplikasi.

### 📥 Request

- **Method:** `POST`
- **Headers:** 
  - `Content-Type: application/json`
- **Body:**

```json
{
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRiY..." // ID Token yang didapat dari Google
}
```

> [!IMPORTANT]
> Pastikan yang dikirim adalah **ID Token** dari Google, bukan *Access Token*.

### 📤 Responses

#### ✅ 200 OK (Berhasil)
Akan dikembalikan jika token Google valid dan berhasil diproses (baik register otomatis maupun login).

```json
{
  "message": "Login Google berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT Token untuk digunakan sebagai Bearer Token di API lain
  "user": {
    "id": 1,
    "email": "user.email@gmail.com",
    "name": "Nama Pengguna"
  }
}
```

#### ❌ 400 Bad Request (Token Tidak Ditemukan)
Akan dikembalikan jika payload `token` kosong atau tidak disertakan pada request body.

```json
{
  "message": "Token Google tidak ditemukan"
}
```

#### ❌ 400 Bad Request (Payload Token Tidak Valid)
Akan dikembalikan jika token Google gagal diverifikasi (misal: kadaluwarsa, tidak valid, atau Client ID tidak sesuai).

```json
{
  "message": "Payload Google tidak valid"
}
```

#### ❌ 500 Internal Server Error
Akan dikembalikan jika terjadi kesalahan tidak terduga di server.

---

## 💡 Contoh Implementasi Frontend (React / Next.js)

Berikut adalah referensi gambaran umum implementasi menggunakan `@react-oauth/google`:

```javascript
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const handleGoogleSuccess = async (credentialResponse) => {
    // credentialResponse.credential adalah ID Token dari Google
    const googleIdToken = credentialResponse.credential;

    try {
      const res = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleIdToken }),
      });

      const data = await res.json();

      if (res.ok) {
        // Simpan token JWT aplikasi ke localStorage / cookies
        localStorage.setItem('token', data.token);
        console.log('Login berhasil:', data.user);
        // Redirect ke dashboard
      } else {
        console.error('Login gagal:', data.message);
      }
    } catch (error) {
      console.error('Error saat menghubungi backend:', error);
    }
  };

  return (
    <div>
      <h2>Login ke Akun Anda</h2>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default LoginPage;
```

> [!TIP]
> Frontend juga perlu menggunakan **Google Client ID** yang sama dengan yang digunakan di Backend (`process.env.GOOGLE_CLIENT_ID`) saat inisialisasi *Google OAuth Provider*.

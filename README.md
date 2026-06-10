# nexa-web

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Penjelasan Detail Kode `src/services/api.ts`

File `api.ts` berfungsi sebagai konfigurasi utama Axios untuk melakukan HTTP Request (komunikasi dengan API backend). Berikut adalah penjelasan setiap baris kodenya:

### 1. Import dan Pembuatan Instance Axios

```typescript
import axios from 'axios'
```
- **`import axios from 'axios'`**: Memanggil *library* Axios. Axios adalah alat yang mempermudah kita mengambil atau mengirim data ke server (GET, POST, dll).

```typescript
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})
```
- **`const api = axios.create(...)`**: Membuat sebuah instance (salinan khusus) Axios yang sudah dikonfigurasi. Hasilnya kita simpan dalam variabel bernama `api`.
- **`baseURL: 'https://dummyjson.com'`**: Menetapkan alamat dasar (URL awal) untuk semua request. Jadi nanti jika kita memanggil `/users`, sistem otomatis mengubahnya menjadi `https://dummyjson.com/users`.
- **`headers: { 'Content-Type': 'application/json' }`**: Memberitahu backend bahwa bentuk data yang kita kirimkan berformat JSON.

### 2. Konfigurasi Request Interceptors

```typescript
api.interceptors.request.use(
```
- **`api`**: Merujuk ke instance Axios yang sudah kita buat di atas.
- **`interceptors`**: Fitur bawaan Axios yang bertindak seperti "satpam" pencegat. Fitur ini bisa mencegat proses *sebelum* dikirim ke server, atau *sebelum* datanya diterima kembali oleh aplikasi kita.
- **`request`**: Kita secara spesifik ingin mencegat pada fase **request** (fase saat data akan diberangkatkan/dikirim dari aplikasi ke server).
- **`use(...)`**: Mendaftarkan atau mengaktifkan fungsi yang akan dieksekusi pada saat proses pencegatan tersebut terjadi.

```typescript
  (config) => {
```
- **`(config) => { ... }`**: Ini adalah fungsi yang dipanggil saat pencegatan. Parameter `config` adalah sebuah *object* yang berisi semua informasi terkait request saat ini (URL tujuan, tipe request, headers, dll). Di sini, kita punya kesempatan untuk **memodifikasi** `config` tersebut.

```typescript
    const token = localStorage.getItem('token')
```
- **`localStorage.getItem('token')`**: Mengambil data dengan nama kunci `'token'` dari penyimpanan browser (Local Storage). Biasanya ini adalah token keamanan yang disimpan sistem sesaat setelah user berhasil login.

```typescript
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
```
- **`if (token)`**: Mengecek apakah token berhasil ditemukan.
- Jika token ada, kita menyusupkannya ke dalam header pengiriman data di bawah nama properti **`Authorization`**.
- **`Bearer ${token}`**: Ini merupakan standar keamanan yang umum. Kata `Bearer` (yang berarti pembawa mandat) digabungkan dengan nilai teks dari token itu sendiri.

```typescript
    return config
  },
```
- **`return config`**: Ini adalah baris yang sangat krusial. Setelah kita menambahkan token, kita **wajib mengembalikan** konfigurasi tersebut agar Axios tahu untuk melanjutkan perjalanan request ke backend dengan konfigurasi yang baru.

```typescript
  (error) => {
    return Promise.reject(error)
  },
)
```
- Parameter fungsi kedua pada `.use()` berfungsi untuk menangani kasus jika terjadi _error_ fatal pada pembuatan request-nya sendiri (misalnya ada kesalahan fatal pada setting internet/request sebelum berangkat).
- **`Promise.reject(error)`**: Akan melemparkan pesan error tersebut agar nantinya bisa ditangkap oleh blok `.catch()` di komponen tempat API dipanggil.

```typescript
export default api
```
- **`export default api`**: Mengekspor variabel `api` ini ke luar, agar file lain (seperti komponen Vue atau *store* Pinia) bisa meng-import dan memakai template Axios yang sudah pintar (bisa otomatis pasang token) ini.

## Penjelasan Detail Kode `src/services/authService.ts`

File `authService.ts` berfungsi sebagai tempat kumpulan fungsi yang berhubungan dengan autentikasi (seperti proses login). Berikut adalah penjelasan setiap baris kodenya:

```typescript
import api from './api'
```
- **`import api from './api'`**: Mengambil (mengimpor) *instance* Axios yang sudah kita buat dan konfigurasi di file `api.ts` sebelumnya. Dengan begini, setiap request yang dibuat di sini akan otomatis menggunakan aturan dari `api.ts` (seperti memakai `baseURL` dan menyisipkan token secara otomatis melalui *interceptor*).

```typescript
export const authService = {
```
- **`export const authService = { ... }`**: Membuat sebuah *object* (wadah) bernama `authService` dan langsung mengekspornya (`export`) agar bisa diakses oleh file lain (misalnya halaman antarmuka login). Di dalam *object* ini, kita bisa mendaftarkan berbagai macam fungsi terkait pengguna, seperti `login()`, `register()`, atau `logout()`.

```typescript
  async login(username: string, password: string) {
```
- **`async login(...)`**: Mendefinisikan sebuah fungsi bernama `login`. Kata kunci **`async`** (*asynchronous*) digunakan karena proses pengiriman dan penerimaan data ke server melalui internet membutuhkan waktu tempuh (tidak instan).
- **`(username: string, password: string)`**: Fungsi ini mengharuskan kita memberikan dua data saat memanggilnya: `username` dan `password` (keduanya harus berupa teks atau `string`).

```typescript
    const respon = await api.post('/auth/login', {
```
- **`const respon = ...`**: Kita menyiapkan variabel bernama `respon` untuk menampung balasan yang nanti akan diberikan oleh server.
- **`await`**: Pasangan dari `async`. Kata kunci ini menyuruh kode untuk **menunggu** sejenak sampai server selesai memberikan jawaban, baru boleh melanjutkan ke baris kode di bawahnya.
- **`api.post('/auth/login', ...)`**: Memerintahkan alat Axios kita (`api`) untuk mengirimkan data secara tertutup/aman menggunakan metode pengiriman **`POST`**. Alamat tujuannya adalah `/auth/login`. *(Karena sudah disetting di `api.ts`, maka sebenarnya data dikirim ke `https://dummyjson.com/auth/login`)*.

```typescript
      username: username,
      password: password,
      expiresInMins: 60,
    })
```
- Ini adalah "paket data" (*payload / body request*) yang akan kita kirim ke server di dalam request `POST` tadi.
- **`username`** dan **`password`**: Dikirim ke server menggunakan data dari parameter saat fungsi ini dipanggil.
- **`expiresInMins: 60`**: Ini adalah parameter spesifik milik API *dummyjson* yang memberi tahu server: "Tolong buatkan sesi/token yang masa berlakunya akan habis dalam 60 menit".

```typescript
    return respon.data
  },
}
```
- **`return respon.data`**: Objek respons utuh dari Axios biasanya sangat panjang (mengandung informasi *status HTTP*, *header*, dll). Baris ini berfungsi memisahkan hal-hal tersebut dan **hanya memberikan inti data balasan dari server** (`respon.data`) ke komponen Vue yang nantinya memanggil fungsi `login()` ini.

## Penjelasan Detail Kode `src/stores/authStore.ts`

File `authStore.ts` menggunakan Pinia sebagai *State Management* (sistem penyimpanan data global khusus Vue). File ini secara khusus mengelola sesi pengguna, status autentikasi, dan sistem kredit/poin. Berikut penjelasan per barisnya:

### 1. Import Library dan Service

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/authService'
```
- **`import { defineStore } from 'pinia'`**: Memanggil fungsi dari Pinia untuk mendefinisikan sebuah wadah penyimpanan (*store*) global yang bisa diakses oleh komponen mana saja.
- **`import { ref } from 'vue'`**: Memanggil `ref` dari Vue. `ref` digunakan untuk membuat variabel menjadi *reactive* (jika nilainya berubah di belakang layar, tampilan antarmuka (UI) yang menampilkan variabel ini otomatis ikut diperbarui).
- **`import { authService } from '@/services/authService'`**: Mengimpor layanan yang kita buat di file sebelumnya untuk melakukan komunikasi (seperti proses login) ke server.

### 2. Mendefinisikan Store

```typescript
export const useAuthStore = defineStore('auth', () => {
```
- **`export const useAuthStore`**: Mendeklarasikan dan mengekspor fungsi *store* ini dengan format penamaan standar Pinia, yaitu `use...Store`.
- **`defineStore('auth', () => { ... })`**: Kita memberi nama *store* ini `'auth'`. Semua variabel data (state) dan fungsi pengubahnya (actions) akan kita letakkan di dalam fungsi *arrow* `() => { ... }` ini. Ini disebut pendekatan *Setup Store* (mengikuti pola Vue 3 Composition API).

### 3. Deklarasi State (Data Global)

```typescript
  const user = ref(null)
  const isAuthenticated = ref<boolean>(false)
  const credit = ref<number>(0)
```
- **`const user = ref(null)`**: Membuat variabel reaktif bernama `user` untuk menampung informasi detail profil pengguna setelah login. Secara default isinya `null` (kosong).
- **`const isAuthenticated = ref<boolean>(false)`**: Menyimpan status apakah ada pengguna yang sedang login (`true`) atau tidak (`false`).
- **`const credit = ref<number>(0)`**: Menyimpan jumlah koin/poin kredit yang dimiliki. Standarnya `0`.

### 4. Deklarasi Actions (Fungsi Pengubah Data)

#### A. Fungsi `initialize`
```typescript
  function initialize() {
    const token = localStorage.getItem('token')
    if (token) {
      isAuthenticated.value = true
      credit.value = 2
    }
  }
```
- **Fungsi `initialize`**: Dipanggil saat website baru saja dimuat atau di-*refresh*.
- Tujuannya adalah mengecek isi `localStorage`. Jika di memori browser ternyata masih ada `token` sisa dari login sebelumnya, aplikasi akan langsung mengenali user sebagai "sudah login" (`isAuthenticated.value = true`) dan memberikan saldo kredit awal sebanyak `2`.

#### B. Fungsi `login`
```typescript
  async function login(username: string, password: string) {
    const data = await authService.login(username, password)
```
- **Fungsi `login`**: Fungsi utama untuk masuk ke akun. Fungsi ini akan memanggil `authService.login(...)` yang sudah dijelaskan sebelumnya. Proses ini akan ditunggu (`await`) sampai server mengembalikan data user (termasuk token-nya) dan dimasukkan ke variabel lokal `data`.

```typescript
    localStorage.setItem('token', data.token)
    user.value = data
    isAuthenticated.value = true
    credit.value = 2
  }
```
- **`localStorage.setItem(...)`**: Setelah data didapat, token login segera diamankan ke dalam `localStorage` browser agar tidak hilang walau tab tertutup.
- **`user.value = data`**: Kita mengisi *state* `user` (yang asalnya `null`) dengan profil yang baru saja didapat. *(Ingat, variabel `ref` harus diakses melalui `.value`)*.
- **`isAuthenticated.value = true`**: Mengubah bendera status agar aplikasi tahu sekarang user dalam keadaan masuk (Login).
- **`credit.value = 2`**: Memberikan 2 token kredit hadiah setiap kali user berhasil melakukan login.

#### C. Fungsi `logout`
```typescript
  function logout() {
    localStorage.removeItem('token')
    user.value = null
    isAuthenticated.value = false
    credit.value = 0
  }
```
- **Fungsi `logout`**: Digunakan saat user ingin keluar. Fungsinya membersihkan `token` dari browser, mengosongkan profil `user` kembali menjadi `null`, mengubah status `isAuthenticated` jadi `false`, dan menghanguskan poin kreditnya jadi `0`.

#### D. Fungsi `useCredit`
```typescript
  function useCredit() {
    if (credit.value > 0) {
      credit.value--
      return true
    }
    return false
  }
```
- **Fungsi `useCredit`**: Mensimulasikan pemakaian saldo poin (kredit) jika user mencoba fitur premium.
- Jika kredit masih lebih besar dari 0, kurangi saldonya 1 angka (`credit.value--`) lalu kembalikan `true` (transaksi sukses/diizinkan).
- Sebaliknya, jika kredit sudah habis (0), kembalikan `false` (transaksi ditolak).

### 5. Return (Mengekspos Isi Store)

```typescript
  return {
    user,
    isAuthenticated,
    credit,
    useCredit,
    login,
    logout,
    initialize,
  }
})
```
- Bagian terakhir dari *Setup Store* yang wajib ada. Agar *state* (`user`, `credit`, dll) dan *actions* (`login`, `logout`, dll) yang dibuat di dalam sini bisa dibaca dan dipanggil oleh komponen visual Vue (seperti tombol di UI), mereka harus dikembalikan/diekspor lewat `return { ... }` ini.

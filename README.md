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

## Penjelasan Detail Kode `src/components/DashboardHeader.vue`

File `DashboardHeader.vue` berfungsi sebagai *header* (bilah atas) di area dashboard. Komponen ini menampilkan sapaan kepada pengguna yang sedang login beserta sisa kredit yang dimiliki. Berikut penjelasan per barisnya:

### 1. Bagian Script (Logika)

```typescript
import { useAuthStore } from '@/stores/authStore'
```
- **`import { useAuthStore } from '@/stores/authStore'`**: Mengimpor fungsi *store* Pinia untuk autentikasi. Simbol `@/` adalah alias path yang mengarah ke folder `src/`.

```typescript
const authStore = useAuthStore()
```
- **`const authStore = useAuthStore()`**: Memanggil *store* dan menyimpannya ke variabel `authStore`. Melalui variabel ini kita bisa membaca data global seperti `user` dan `credit`.

### 2. Bagian Template (Tampilan)

```html
<header
  class="bg-white shadow px-8 py-4 flex justify-between items-center"
  aria-label="Header Profil"
>
```
- **`<header>`**: Elemen semantik HTML untuk bagian kepala halaman.
- **`class="bg-white shadow px-8 py-4 flex justify-between items-center"`**: Kelas Tailwind CSS — latar putih, bayangan, padding horizontal/vertikal, dan layout *flexbox* dengan item di kiri-kanan serta rata tengah vertikal.
- **`aria-label="Header Profil"`**: Label aksesibilitas agar pembaca layar (*screen reader*) tahu fungsi elemen ini.

```html
<h3 class="text-lg font-semibold text-gray-600">Halo,{{ authStore.user || 'user' }}</h3>
```
- **`<h3>`**: Judul tingkat 3 untuk teks sapaan.
- **`Halo,{{ authStore.user || 'user' }}`**: Menampilkan sapaan. Jika `authStore.user` ada nilainya, ditampilkan; jika kosong/`null`, fallback ke teks `'user'`.

```html
<div
  class="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-bold text-sm"
  aria-live="polite"
>
  Sisa Credit:{{ authStore.credit }}
</div>
```
- **`<div>`**: Wadah untuk badge informasi kredit.
- **`class="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-bold text-sm"`**: Latar biru muda, teks biru gelap, bentuk pil (*rounded-full*), ukuran teks kecil, dan tebal.
- **`aria-live="polite"`**: Memberitahu pembaca layar bahwa isi elemen ini bisa berubah dinamis (misalnya saat kredit berkurang).
- **`Sisa Credit:{{ authStore.credit }}`**: Menampilkan jumlah kredit dari *store* Pinia secara reaktif.

## Penjelasan Detail Kode `src/components/FooterComponent.vue`

File `FooterComponent.vue` berfungsi sebagai komponen footer (bilah bawah) yang menampilkan informasi hak cipta. Komponen ini hanya berisi template tanpa logika script. Berikut penjelasan per barisnya:

```html
<footer class="text-center py-4 text-sm text-gray-500" role="contentinfo">
```
- **`<footer>`**: Elemen semantik HTML untuk bagian kaki halaman.
- **`class="text-center py-4 text-sm text-gray-500"`**: Teks rata tengah, padding vertikal, ukuran kecil, warna abu-abu.
- **`role="contentinfo"`**: Atribut ARIA yang menandai elemen ini berisi informasi tentang situs (hak cipta, dll.).

```html
<p>&copy; 2026 Nexa Clipper App. Hak Cipta Dilindungi.</p>
```
- **`<p>`**: Paragraf teks hak cipta.
- **`&copy;`**: Entitas HTML yang dirender sebagai simbol ©.

## Penjelasan Detail Kode `src/components/NavbarComponent.vue`

File `NavbarComponent.vue` berfungsi sebagai *navbar* (bilah navigasi atas) untuk halaman publik/SaaS. Menampilkan logo aplikasi dan tautan ke halaman login. Berikut penjelasan per barisnya:

```html
<header class="bg-white shadow px-6 py-4 flex justify-between items-center" role="banner">
```
- **`<header>`**: Bilah atas halaman.
- **`class="bg-white shadow px-6 py-4 flex justify-between items-center"`**: Latar putih, bayangan, padding, layout *flex* kiri-kanan.
- **`role="banner"`**: Menandai elemen ini sebagai banner utama situs (aksesibilitas).

```html
<h1 class="text-xl font-bold text-blue-500">Nexa CLipper</h1>
```
- **`<h1>`**: Judul utama/nama aplikasi di navbar.
- **`class="text-xl font-bold text-blue-500"`**: Ukuran besar, tebal, warna biru.

```html
<nav aria-label="Navigasi Utama">
```
- **`<nav>`**: Elemen navigasi berisi tautan.
- **`aria-label="Navigasi Utama"`**: Label untuk pembaca layar.

```html
<router-link to="/login" class="text-gray-600 hover:text-blue-600 font-medium">Login</router-link>
```
- **`<router-link>`**: Komponen Vue Router untuk navigasi tanpa reload halaman penuh.
- **`to="/login"`**: Tujuan navigasi ke rute `/login`.
- **`class="text-gray-600 hover:text-blue-600 font-medium"`**: Teks abu-abu, berubah biru saat di-*hover*, ketebalan medium.

## Penjelasan Detail Kode `src/components/SidebarComponent.vue`

File `SidebarComponent.vue` berfungsi sebagai *sidebar* (menu sisi kiri) di area dashboard. Berisi navigasi antar halaman dan tombol logout. Berikut penjelasan per barisnya:

### 1. Bagian Script (Logika)

```typescript
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
```
- **`import { useAuthStore } from '../stores/authStore'`**: Mengimpor *store* autentikasi untuk proses logout.
- **`import { useRouter } from 'vue-router'`**: Mengimpor hook Vue Router untuk mengarahkan pengguna ke halaman lain setelah logout.

```typescript
const authStore = useAuthStore()
const router = useRouter()
```
- **`const authStore = useAuthStore()`**: Instance *store* untuk memanggil fungsi seperti `logout()`.
- **`const router = useRouter()`**: Instance router untuk navigasi programmatic (misalnya `router.push()`).

```typescript
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
```
- **`const handleLogout = () => { ... }`**: Fungsi yang dipanggil saat tombol "Keluar" diklik.
- **`authStore.logout()`**: Membersihkan token, mengosongkan data user, dan mereset status login di *store*.
- **`router.push('/login')`**: Mengalihkan pengguna ke halaman login setelah logout.

### 2. Bagian Template (Tampilan)

```html
<aside class="w-64 bg-slate-800 text-white flex flex-col" aria-label="Sidebar Aplikasi">
```
- **`<aside>`**: Elemen semantik untuk konten samping.
- **`w-64`**: Lebar tetap 16rem (256px).
- **`bg-slate-800 text-white`**: Latar gelap, teks putih.
- **`flex flex-col`**: Layout vertikal (logo di atas, menu di tengah, logout di bawah).

```html
<div class="p-6">
  <h2 class="text-2xl font-bold">Nexa App</h2>
</div>
```
- **`<div class="p-6">`**: Area branding/logo aplikasi di bagian atas sidebar dengan padding.
- **`<h2 class="text-2xl font-bold">Nexa App</h2>`**: Nama aplikasi di sidebar.

```html
<nav class="flex-grow px-4 space-y-2" aria-label="Navigasi Dashboard">
```
- **`<nav>`**: Menu navigasi dashboard.
- **`class="flex-grow px-4 space-y-2"`**: Mengisi ruang vertikal agar tombol logout tetap di bawah, dengan jarak antar item menu.

```html
<router-link
  to="/app"
  class="block py-2 px-4 rounded hover:bg-slate-700 transition"
  exact-active-class="bg-blue-600 hover:bg-blue-600"
>Dashboard</router-link>
```
- **`to="/app"`**: Tautan ke halaman dashboard.
- **`class="block py-2 px-4 rounded hover:bg-slate-700 transition"`**: Tampilan sebagai blok klik dengan efek *hover*.
- **`exact-active-class="bg-blue-600 hover:bg-blue-600"`**: Kelas tambahan saat rute aktif persis `/app` (menyorot menu yang sedang dibuka).

```html
<router-link
  to="/pricing"
  class="block py-2 px-4 rounded hover:bg-slate-700 transition"
  exact-active-class="bg-blue-600 hover:bg-blue-600"
>Paket Harga</router-link>
```
- **`to="/pricing"`**: Tautan ke halaman paket harga.
- **`exact-active-class`**: Menyorot menu saat rute `/pricing` sedang aktif.

```html
<div class="p-4 border-t border-slate-700">
  <button
    @click="handleLogout"
    aria-label="Keluar dari akun"
    class="w-full text-left py-2 px-4 hover:bg-red-600 rounded text-red-200 hover:text-white transition"
  >
    Keluar
  </button>
</div>
```
- **`<div class="p-4 border-t border-slate-700">`**: Area bawah sidebar dengan garis pemisah atas.
- **`@click="handleLogout"`**: Saat diklik, jalankan fungsi logout.
- **`aria-label="Keluar dari akun"`**: Label aksesibilitas untuk tombol.
- **`class="w-full text-left py-2 px-4 hover:bg-red-600 rounded text-red-200 hover:text-white transition"`**: Tombol lebar penuh, teks merah muda, berubah merah saat di-*hover*.

## Penjelasan Detail Kode `src/layouts/DashboardLayouts.vue`

File `DashboardLayouts.vue` berfungsi sebagai *layout* (kerangka halaman) untuk area dashboard yang sudah login. Menggabungkan sidebar, header, dan area konten dinamis dari router. Berikut penjelasan per barisnya:

### 1. Bagian Script (Import Komponen)

```typescript
import SidebarComponent from '@/components/SidebarComponent.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
```
- **`import SidebarComponent from '@/components/SidebarComponent.vue'`**: Mengimpor komponen menu sisi kiri.
- **`import DashboardHeader from '@/components/DashboardHeader.vue'`**: Mengimpor komponen header profil/kredit.

### 2. Bagian Template (Struktur Layout)

```html
<div class="min-h-screen bg-gray-100 flex">
```
- **`<div class="min-h-screen bg-gray-100 flex">`**: Wadah utama layout dengan tinggi minimal layar penuh, latar abu-abu terang, dan susunan horizontal (sidebar kiri, konten kanan).

```html
<SidebarComponent />
```
- **`<SidebarComponent />`**: Merender komponen sidebar di sisi kiri.

```html
<section class="flex-1 flex flex-col">
```
- **`<section class="flex-1 flex flex-col">`**: Area kanan yang mengambil sisa lebar layar, dengan susunan vertikal (header di atas, konten di bawah).

```html
<DashboardHeader />
```
- **`<DashboardHeader />`**: Merender komponen header dashboard di bagian atas area kanan.

```html
<main class="p-8 flex-grow" role="main">
  <router-view />
</main>
```
- **`<main class="p-8 flex-grow" role="main">`**: Elemen konten utama dengan padding dan mengisi ruang vertikal yang tersisa.
- **`<router-view />`**: Tempat Vue Router merender komponen halaman sesuai rute aktif (misalnya Dashboard, Pricing).

## Penjelasan Detail Kode `src/layouts/SaasLayout.vue`

File `SaasLayout.vue` berfungsi sebagai *layout* untuk halaman publik (sebelum/saat login). Menampilkan navbar di atas, konten di tengah, dan footer di bawah. Berikut penjelasan per barisnya:

### 1. Bagian Script

```typescript
import NavbarComponent from '../components///NavbarComponent.vue'
```
- **`import NavbarComponent from '../components///NavbarComponent.vue'`**: Mengimpor komponen navbar untuk ditampilkan di bagian atas layout.

### 2. Bagian Template

```html
<div class="min-h-screen bg-gray-50 flex flex-col">
```
- **`<div class="min-h-screen bg-gray-50 flex flex-col">`**: Wadah utama dengan tinggi minimal layar penuh, latar abu-abu sangat terang, dan layout vertikal.

```html
<NavbarComponent />
```
- **`<NavbarComponent />`**: Merender navbar di bagian atas halaman.

```html
<main class="flex-grow flex justify-center items-center" role="main">
  <router-view />
</main>
```
- **`<main class="flex-grow flex justify-center items-center" role="main">`**: Konten utama yang mengisi ruang vertikal dan memposisikan isi di tengah layar.
- **`<router-view />`**: Menampilkan halaman anak sesuai rute (misalnya `LoginView`).

```html
<footer class="text-center py-4 text-sm text-gray-500" role="contentinfo">
  <p>&copy; 2026 Nexa Clipper App. Hak Cipta Dilindungi.</p>
</footer>
```
- **`<footer class="text-center py-4 text-sm text-gray-500" role="contentinfo">`**: Footer dengan teks hak cipta rata tengah.
- **`role="contentinfo"`**: Menandai informasi situs untuk aksesibilitas.

## Penjelasan Detail Kode `src/router/index.ts`

File `index.ts` di folder `router` berfungsi sebagai pusat konfigurasi Vue Router — mendefinisikan URL mana yang menampilkan layout dan halaman apa. Berikut penjelasan per barisnya:

```typescript
import { createRouter, createWebHistory } from 'vue-router'
```
- **`createRouter`**: Fungsi untuk membuat instance router Vue.
- **`createWebHistory`**: Mode routing berbasis URL biasa (tanpa `#` di alamat), memakai History API browser.

```typescript
import SaasLayout from '../layouts/SaasLayout.vue'
import LoginView from '../views/LoginView.vue'
```
- **`import SaasLayout from '../layouts/SaasLayout.vue'`**: Mengimpor layout publik yang membungkus halaman login.
- **`import LoginView from '../views/LoginView.vue'`**: Mengimpor halaman form login.

```typescript
const router = createRouter({
```
- **`const router = createRouter({ ... })`**: Membuat instance router dan menyimpannya ke variabel `router`.

```typescript
  history: createWebHistory(import.meta.env.BASE_URL),
```
- **`createWebHistory(...)`**: Mengaktifkan mode *history* HTML5.
- **`import.meta.env.BASE_URL`**: Variabel lingkungan Vite untuk path dasar aplikasi (misalnya `/` saat di root, atau subfolder saat di-deploy).

```typescript
  routes: [
```
- **`routes: [ ... ]`**: Array berisi daftar semua rute aplikasi.

```typescript
    {
      path: '/',
      component: SaasLayout,
```
- **`path: '/'`**: Rute root (halaman utama).
- **`component: SaasLayout`**: Saat mengakses `/`, gunakan layout `SaasLayout` sebagai kerangka.

```typescript
      children: [
```
- **`children: [ ... ]`**: Rute anak (*nested routes*) di dalam layout parent. Konten anak dirender di `<router-view />` milik `SaasLayout`.

```typescript
        {
          path: '',
          redirect: '/login',
        },
```
- **`path: ''`**: Rute kosong di bawah parent `/` (artinya persis `/`).
- **`redirect: '/login'`**: Jika user membuka `/`, otomatis dialihkan ke `/login`.

```typescript
        {
          path: 'login',
          name: 'login',
          component: LoginView,
        },
```
- **`path: 'login'`**: URL relatif menjadi `/login` (digabung dengan parent `/`).
- **`name: 'login'`**: Nama rute untuk navigasi programmatic (`router.push({ name: 'login' })`).
- **`component: LoginView`**: Menampilkan komponen form login di dalam layout.

```typescript
      ],
    },
  ],
})
```
- **`})`**: Menutup konfigurasi `createRouter`.

```typescript
export default router
```
- **`export default router`**: Mengekspor instance router agar bisa di-*register* di `main.ts` dan dipakai seluruh aplikasi.

## Penjelasan Detail Kode `src/views/LoginView.vue`

File `LoginView.vue` berfungsi sebagai halaman form login. Menggabungkan validasi form (Zod + VeeValidate), autentikasi via Pinia, notifikasi toast, dan navigasi setelah login berhasil. Berikut penjelasan per barisnya:

### 1. Import Library dan Hook

```typescript
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
```
- **`import { useAuthStore } from '../stores/authStore'`**: Mengimpor *store* Pinia untuk proses login.
- **`import { useRouter } from 'vue-router'`**: Mengimpor hook untuk navigasi setelah login sukses/gagal.
- **`import { useToast } from 'vue-toastification'`**: Mengimpor hook untuk menampilkan notifikasi pop-up.
- **`import { useForm, useField } from 'vee-validate'`**: Mengimpor hook VeeValidate untuk mengelola form dan field individual.
- **`import { toTypedSchema } from '@vee-validate/zod'`**: Menghubungkan skema Zod ke VeeValidate dengan dukungan TypeScript.
- **`import * as z from 'zod'`**: Mengimpor library Zod untuk mendefinisikan aturan validasi data.

```typescript
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()
```
- **`const authStore = useAuthStore()`**: Inisialisasi *store* autentikasi.
- **`const router = useRouter()`**: Inisialisasi instance router.
- **`const toast = useToast()`**: Inisialisasi instance notifikasi toast.

### 2. Validasi dengan Zod

```typescript
const loginSchema = toTypedSchema(
  z.object({
    username: z.string().min(1, 'Username tidak boleh kosong'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
  }),
)
```
- **`const loginSchema = toTypedSchema(...)`**: Skema validasi yang dipakai VeeValidate.
- **`z.object({ ... })`**: Objek form dengan dua field.
- **`username: z.string().min(1, ...)`**: Username harus string, minimal 1 karakter (tidak boleh kosong).
- **`password: z.string().min(6, ...)`**: Password harus string, minimal 6 karakter.

### 3. Registrasi Form VeeValidate

```typescript
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: loginSchema,
})
```
- **`useForm({ validationSchema: loginSchema })`**: Mendaftarkan form ke VeeValidate dengan aturan Zod.
- **`handleSubmit`**: Fungsi pembungkus — callback submit hanya dijalankan jika validasi lolos.
- **`isSubmitting`**: Status reaktif `true` saat proses submit sedang berjalan (untuk disable tombol).

### 4. Field Individual

```typescript
const { value: username, errorMessage: usernameError } = useField<string>('username')
const { value: password, errorMessage: passwordError } = useField<string>('password')
```
- **`useField<string>('username')`**: Mengikat field `username` ke form.
- **`value: username`**: Nilai input username (untuk `v-model`).
- **`errorMessage: usernameError`**: Pesan error dari Zod jika validasi gagal.
- **`useField<string>('password')`**: Sama untuk field password.

### 5. Fungsi Submit

```typescript
const onSubmit = handleSubmit(async (values) => {
```
- **`const onSubmit = handleSubmit(async (values) => { ... })`**: Membungkus logika submit. `values` berisi `{ username, password }` yang sudah tervalidasi.

```typescript
  try {
    await authStore.login(values.username, values.password)
```
- **`try { ... }`**: Blok untuk menangani keberhasilan/gagal.
- **`await authStore.login(values.username, values.password)`**: Memanggil action login di Pinia (yang memanggil API dan menyimpan token).

```typescript
    toast.success('Login Berhasil! Selamat datang.')
    router.push('/app')
```
- **`toast.success('Login Berhasil! Selamat datang.')`**: Notifikasi hijau saat login berhasil.
- **`router.push('/app')`**: Mengalihkan ke halaman dashboard `/app`.

```typescript
  } catch {
    toast.error('Login Gagal! Username atau password salah.')
  }
})
```
- **`catch { ... }`**: Menangkap error dari `authStore.login` (misalnya kredensial salah).
- **`toast.error('Login Gagal! Username atau password salah.')`**: Notifikasi merah untuk memberi tahu user.

### 6. Template Form Login

```html
<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
```
- **`<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">`**: Kartu form putih dengan bayangan dan lebar maksimal medium.

```html
<h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Masuk ke Nexa</h2>
```
- **`<h2 class="text-2xl font-bold text-center mb-6 text-gray-800">`**: Judul halaman login.

```html
<form @submit.prevent="onSubmit" class="space-y-4">
```
- **`<form @submit.prevent="onSubmit" class="space-y-4">`**: Form yang mencegah reload halaman saat submit dan menjalankan `onSubmit`, dengan jarak vertikal antar field.

```html
<label class="block text-sm font-medium text-gray-700">Username</label>
```
- **`<label class="block text-sm font-medium text-gray-700">Username</label>`**: Label untuk field username.

```html
<input
  v-model="username"
  type="text"
  class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  :class="usernameError ? 'border-red-500' : 'border-gray-300'"
  placeholder="Masukkan username"
/>
```
- **`v-model="username"`**: *Two-way binding* dengan nilai VeeValidate.
- **`type="text"`**: Input teks biasa.
- **`class="mt-1 block w-full ..."`**: Styling input penuh lebar dengan fokus ring biru.
- **`:class="usernameError ? 'border-red-500' : 'border-gray-300'"`**: Border merah jika ada error, abu-abu jika valid.
- **`placeholder="Masukkan username"`**: Teks petunjuk di dalam input.

```html
<p v-if="usernameError" class="mt-1 text-sm text-red-600">{{ usernameError }}</p>
```
- **`v-if="usernameError"`**: Tampilkan pesan error hanya jika ada.
- **`{{ usernameError }}`**: Menampilkan teks error dari Zod.

```html
<label class="block text-sm font-medium text-gray-700">Password</label>
<input
  v-model="password"
  type="password"
  class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  :class="passwordError ? 'border-red-500' : 'border-gray-300'"
  placeholder="Masukkan password"
/>
<p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
```
- **`type="password"`**: Karakter password disembunyikan saat diketik.
- **`v-model="password"`**: *Two-way binding* dengan nilai VeeValidate untuk field password.
- **`:class="passwordError ? 'border-red-500' : 'border-gray-300'"`**: Border merah jika password tidak valid.

```html
<button
  type="submit"
  :disabled="isSubmitting"
  class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
>
  {{ isSubmitting ? 'Memeriksa...' : 'Login' }}
</button>
```
- **`type="submit"`**: Memicu submit form.
- **`:disabled="isSubmitting"`**: Tombol nonaktif saat request login sedang berjalan.
- **`disabled:opacity-50`**: Tampilan redup saat disabled.
- **`{{ isSubmitting ? 'Memeriksa...' : 'Login' }}`**: Teks tombol berubah saat loading.

```html
<div class="mt-6 text-center text-sm text-gray-500">
  Coba gunakan username: <b>emilys</b> dan password: <b>emilyspass</b>
</div>
```
- **`<div class="mt-6 text-center text-sm text-gray-500">`**: Petunjuk kredensial demo untuk pengujian (sesuai data dummy API).

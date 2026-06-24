<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="w-64 bg-slate-800 text-white flex flex-col" aria-label="Sidebar Aplikasi">
    <div class="p-6">
      <h2 class="text-2xl font-bold">Nexa App</h2>
    </div>

    <nav class="grow px-4 space-y-2" aria-label="Navigasi Dashboard">
      <router-link
        to="/dashboard"
        class="block py-2 px-4 rounded hover:bg-slate-700 transition"
        exact-active-class="bg-blue-600 hover:bg-blue-600"
        >Dashboard</router-link
      >
      <router-link
        to="/pricing"
        class="block py-2 px-4 rounded hover:bg-slate-700 transition"
        exact-active-class="bg-blue-600 hover:bg-blue-600"
        >Paket Harga</router-link
      >
    </nav>

    <div class="p-4 border-t border-slate-700">
      <button
        @click="handleLogout"
        aria-label="Keluar dari akun"
        class="w-full text-left py-2 px-4 hover:bg-red-600 rounded text-red-200 hover:text-white transition"
      >
        Keluar
      </button>
    </div>
  </aside>
</template>

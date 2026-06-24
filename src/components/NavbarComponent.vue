<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isMenuOpen = ref<boolean>(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  isMenuOpen.value = false
}
</script>

<template>
  <header
    class="bg-zinc-900/80 max-w-7xl mx-auto backdrop-blur-xl border border-slate-800 px-6 py-4 flex justify-between items-center rounded-full fixed top-3 left-4 right-4 z-50"
    role="banner"
  >
    <h1
      class="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-lime-400 to-lime-500"
    >
      Easy Caption
    </h1>
    <!-- absolute left-1/2 -translate-x-1/2 untuk menengahkan nav -->
    <nav
      aria-label="Navigasi Utama"
      class="items-center gap-6 absolute left-1/2 -translate-x-1/2 hidden md:flex"
    >
      <router-link
        to="/ai"
        class="text-slate-300 hover:text-lime-400 font-medium text-sm transition duration-400 rounded-xl shadow-lg"
        >Generate AI</router-link
      >
      <router-link
        v-if="!authStore.isAuthenticated"
        to="/login"
        class="text-slate-300 hover:text-lime-400 font-medium text-sm transition duration-400 rounded-xl shadow-lg"
        >Panduan</router-link
      >
      <router-link
        v-else
        to="/dashboard"
        class="text-slate-300 hover:text-lime-400 font-medium text-sm transition duration-400 rounded-xl shadow-lg"
        >Dashboard</router-link
      >
    </nav>
    <div class="hidden md:flex items-center gap-4">
      <template v-if="!authStore.isAuthenticated">
        <router-link
          to="/register"
          class="text-slate-300 hover:text-white font-medium text-sm border border-slate-600 hover:bg-linear-to-r hover:from-lime-500 hover:to-green-500 transition duration-400 px-7 py-2 rounded-xl shadow-lg"
          >Daftar</router-link
        >
        <router-link
          to="/login"
          class="text-slate-100 font-medium text-sm bg-linear-to-r from-lime-600 to-green-600 hover:bg-linear-to-r hover:from-lime-500 hover:to-green-500 transition duration-400 px-7 py-2 rounded-xl shadow-lg"
          >Login</router-link
        >
      </template>
      <template v-else>
        <span class="text-sm font-medium text-slate-300 hidden lg:block">Halo, {{ authStore.user?.name || 'Pengguna' }}</span>
        <button
          @click="handleLogout"
          class="text-slate-100 font-medium text-sm bg-slate-800 hover:bg-red-600 transition duration-400 px-5 py-2 rounded-xl shadow-lg"
        >
          Logout
        </button>
      </template>
    </div>
    <button
      class="md:hidden text-slate-300 hover:text-lime-400 focus:outline-none relative w-6 h-6"
      @click="isMenuOpen = !isMenuOpen"
      aria-label="Buka Menu mobile"
    >
      <!-- hamburger menu -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="absolute inset-0 transition-all duration-400"
        :class="isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
      </svg>
      <!-- close menu -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="absolute inset-0 transition-all duration-400"
        :class="isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </header>
  <!-- kotak menu -->
  <transition
    enter-active-class="transition duration-400 ease-out"
    enter-from-class="opacity-0 -translate-y-10"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-10"
  >
    <div
      v-if="isMenuOpen"
      class="md:hidden fixed top-24 left-4 right-4 bg-slate-950/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl z-40"
    >
      <router-link
        to="/ai"
        @click="isMenuOpen = false"
        class="text-slate-300 hover:text-lime-400 font-medium py-2 border-b border-slate-800/50"
        >Generate AI</router-link
      >
      <router-link
        v-if="!authStore.isAuthenticated"
        to="/login"
        @click="isMenuOpen = false"
        class="text-slate-300 hover:text-lime-400 font-medium py-2 border-b border-slate-800/50"
        >Panduan</router-link
      >
      <router-link
        v-else
        to="/dashboard"
        @click="isMenuOpen = false"
        class="text-slate-300 hover:text-lime-400 font-medium py-2 border-b border-slate-800/50"
        >Dashboard</router-link
      >
      <div class="flex flex-col gap-3 mt-4" v-if="!authStore.isAuthenticated">
        <router-link
          to="/register"
          @click="isMenuOpen = false"
          class="text-center text-slate-300 font-medium border border-slate-600 px-6 py-3 rounded-xl hover:bg-slate-800 transition"
          >Daftar</router-link
        >
        <router-link
          to="/login"
          @click="isMenuOpen = false"
          class="text-center text-slate-100 font-medium bg-linear-to-r from-lime-600 to-green-600 px-6 py-3 rounded-xl shadow-lg"
          >Login</router-link
        >
      </div>
      <div class="flex flex-col gap-3 mt-4" v-else>
        <button
          @click="handleLogout"
          class="text-center text-slate-100 font-medium bg-slate-800 hover:bg-red-600 px-6 py-3 rounded-xl shadow-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  </transition>
</template>

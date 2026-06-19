<script setup lang="ts"></script>

<template>
  <header
    class="bg-slate-950 max-w-7xl mx-auto backdrop-blur-xl border border-slate-800 px-6 py-4 flex justify-between items-center rounded-full fixed"
    role="banner"
  >
    <h1
      class="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-lime-400 to-lime-500"
    >
      Nexa
    </h1>
    <!-- absolute left-1/2 -translate-x-1/2 untuk menengahkan nav -->
    <nav
      aria-label="Navigasi Utama"
      class="flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
    >
      <router-link
        to="/login"
        class="text-slate-300 hover:text-lime-400 font-medium text-sm transition duration-400 rounded-xl shadow-lg"
        >Generate AI</router-link
      >
      <router-link
        to="/login"
        class="text-slate-300 hover:text-lime-400 font-medium text-sm transition duration-400 rounded-xl shadow-lg"
        >Profil</router-link
      >
      <router-link
        to="/login"
        class="text-slate-300 hover:text-lime-400 font-medium text-sm transition duration-400 rounded-xl shadow-lg"
        >Cara Mulai</router-link
      >
    </nav>
    <div class="flex items-center gap-4">
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
    </div>
  </header>
</template>

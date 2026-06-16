<script setup lang="ts"></script>

<template>
  <header
    class="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 px-6 py-4 flex justify-between items-center"
    role="banner"
  >
    <h1
      class="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500"
    >
      Nexa
    </h1>
    <nav aria-label="Navigasi Utama">
      <router-link
        to="/login"
        class="text-gray-300 hover:text-white transition-colors font-medium text-sm"
        >Login</router-link
      >
    </nav>
  </header>
</template>

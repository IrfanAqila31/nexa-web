<script setup lang="ts">
import { useAuthStore } from './stores/authStore'
import { Toaster } from 'vue-sonner'
// Memanggil fungsi dari Pinia untuk mengecek apakah token login masih ada
const authStore = useAuthStore()
authStore.initialize()
</script>

<template>
  <Toaster richColors theme="dark" position="top-right" />

  <!-- Titik masuk utama untuk Vue Router -->
  <router-view />
</template>

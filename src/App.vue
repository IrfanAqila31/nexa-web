<script setup lang="ts">
import { useAuthStore } from './stores/authStore'

// Memanggil fungsi dari Pinia untuk mengecek apakah token login masih ada
const authStore = useAuthStore()
authStore.initialize()
</script>

<template>
  <!-- Titik masuk utama untuk Vue Router -->
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <header
    class="bg-white shadow px-8 py-4 flex justify-between items-center"
    aria-label="Header Profil"
  >
    <h3 class="text-lg font-semibold text-gray-600">Halo,{{ authStore.user || 'user' }}</h3>
    <div
      class="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-bold text-sm"
      aria-live="polite"
    >
      Sisa Credit:{{ authStore.credit }}
    </div>
  </header>
</template>

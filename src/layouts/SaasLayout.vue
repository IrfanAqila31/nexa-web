<script setup lang="ts">
import NavbarComponent from '../components/NavbarComponent.vue'
</script>

<template>
  <div class="bg-zinc-900 min-h-screen">
    <NavbarComponent
      v-if="$route.name !== 'login' && $route.name !== 'register'"
      class="relative z-20"
    />

    <main class="grow flex justify-center items-center relative z-10 p-4" role="main">
      <router-view />
    </main>

    <!-- <footer
      class="text-center py-6 text-sm text-gray-500 relative z-10 border-t border-gray-800/50 mt-auto"
      role="contentinfo"
    >
      <p>&copy; 2026 Nexa. Hak Cipta Dilindungi.</p>
    </footer> -->
  </div>
</template>

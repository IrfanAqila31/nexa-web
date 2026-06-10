<script setup lang="ts">

import NavbarComponent from '../components///NavbarComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    
    <NavbarComponent />
    
    <main class="flex-grow flex justify-center items-center" role="main">
      <router-view />
    </main>

    <footer class="text-center py-4 text-sm text-gray-500" role="contentinfo">
      <p>&copy; 2026 Nexa Clipper App. Hak Cipta Dilindungi.</p>
    </footer>
  </div>
</template>
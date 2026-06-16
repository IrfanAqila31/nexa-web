<script setup lang="ts">
import NavbarComponent from '../components/NavbarComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-950 flex flex-col relative overflow-hidden text-gray-100">
    <div
      class="fixed top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"
    ></div>
    <div
      class="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"
    ></div>

    <NavbarComponent v-if="$route.name !== 'login'" class="relative z-20" />

    <main class="grow flex justify-center items-center relative z-10 p-4" role="main">
      <router-view />
    </main>

    <footer
      class="text-center py-6 text-sm text-gray-500 relative z-10 border-t border-gray-800/50 mt-auto"
      role="contentinfo"
    >
      <p>&copy; 2026 Nexa. Hak Cipta Dilindungi.</p>
    </footer>
  </div>
</template>

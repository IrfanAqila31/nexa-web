<script setup lang="ts">
// Mengimpor kedua komponen yang sudah Anda buat
import SidebarComponent from '@/components/SidebarComponent.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    
    <SidebarComponent />

  
    <section class="flex-1 flex flex-col">
   
      <DashboardHeader />

      
      <main class="p-8 flex-grow" role="main">
        <router-view />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import PrimaryButton from '../components/PrimaryButton.vue'
import { ref } from 'vue'
import ClipcardFormModal from '../components/ClipcardFormModal.vue'

const authStore = useAuthStore()

const showModal = ref(false)
</script>
<template>
  <section class="max-w-4xl mx-auto pt-40 px-6">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-100">
          Halo, {{ authStore.user?.name || 'Pengguna' }}!
        </h1>
        <p class="text-slate-400 mt-2">
          Selamat datang di Dashboard Easy Captions. Apa yang ingin Anda buat hari ini?
        </p>
      </div>
      <PrimaryButton @click="showModal = true">Buat Clipcard Sekarang</PrimaryButton>
    </header>

    <div
      class="mt-10 border border-dashed border-slate-700 rounded-2xl h-64 flex items-center justify-center"
    >
      <p class="text-slate-500">Belum ada Clipcard. Buat satu sekarang!</p>
    </div>
  </section>
  <ClipcardFormModal v-if="showModal" @close="showModal = false" />
</template>

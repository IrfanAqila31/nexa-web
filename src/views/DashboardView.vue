<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import PrimaryButton from '../components/PrimaryButton.vue'
import { ref, onMounted } from 'vue'
import ClipcardFormModal from '../components/ClipcardFormModal.vue'
import { clipcardService } from '../services/clipcardService'
import ClipcardItem from '../components/ClipcardItem.vue'

const authStore = useAuthStore()

const showModal = ref(false)

interface ClipcardData {
  id: string
  videoReference: string
  platformData: {
    platformName: string
    caption: string
    hashtags: string
    mentions: string
  }[]
}
const clipcards = ref<ClipcardData[]>([])
const fetchClipcards = async () => {
  try {
    const respon = await clipcardService.getAllClipcards()
    // Sesuai dokumen API, data ada di dalam properti "data"
    clipcards.value = respon.data
  } catch (error) {
    console.error('Gagal mengambil data clipcard', error)
  }
}

// Otomatis dipanggil saat halaman pertama kali dibuka
onMounted(() => {
  fetchClipcards()
})

// Fungsi untuk menutup modal dan me-refresh data
const handleModalClose = () => {
  showModal.value = false
  fetchClipcards()
}
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

    <!-- Jika masih kosong -->
    <div
      v-if="clipcards.length === 0"
      class="mt-10 border border-dashed border-slate-700 rounded-2xl h-64 flex items-center justify-center"
    >
      <p class="text-slate-500">Belum ada Clipcard. Buat satu sekarang!</p>
    </div>

    <!-- Jika data sudah ada, Loop memanggil komponen ClipcardItem -->
    <div v-else class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ClipcardItem v-for="clipcard in clipcards" :key="clipcard.id" :clipcard="clipcard" />
    </div>
  </section>
  <ClipcardFormModal v-if="showModal" @close="handleModalClose" />
</template>

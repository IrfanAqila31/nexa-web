<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { clipcardService } from '../services/clipcardService'
import { aiService } from '../services/aiService'
import { toast } from 'vue-sonner'
import PrimaryButton from '../components/PrimaryButton.vue'
import AiResultCard from '../components/AiResultCard.vue'

interface ClipcardOption {
  id: string
  videoReference: string
}

const clipcards = ref<ClipcardOption[]>([])
const selectedClipcardId = ref<string>('')
const generatedCaption = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  try {
    const data = await clipcardService.getAllClipcards()
    clipcards.value = data
  } catch (error) {
    console.error('Gagal mengambil daftar ClipCard:', error)
    toast.error('Gagal mengambil daftar ClipCard')
  }
})

const handleGenerate = async () => {
  if (!selectedClipcardId.value) {
    toast.error('Pilih ClipCard terlebih dahulu')
    return
  }
  
  isLoading.value = true
  generatedCaption.value = ''
  
  try {
    const result = await aiService.generateCaption(selectedClipcardId.value)
    generatedCaption.value = result.caption || result
    toast.success('Yeay! Caption ajaib berhasil dibuat!')
  } catch (error: unknown) {
    console.error(error)
    
    // Mendefinisikan bentuk tipe error dari Axios tanpa menggunakan 'any'
    interface AxiosErrorType {
      response?: { data?: { message?: string } }
      message?: string
    }
    
    const err = error as AxiosErrorType
    // Mengambil pesan error dari response backend (jika ada), jika tidak gunakan pesan bawaan
    const errorMessage = err.response?.data?.message || err.message || 'Gagal membuat caption AI. Pastikan Hashtag sudah diisi!'
    toast.error(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="w-full max-w-3xl mx-auto pt-40 pb-16 px-4" aria-labelledby="page-title">
    <header class="text-center mb-10">
      <h1
        id="page-title"
        class="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-lime-600 mb-4"
      >
        AI Magic Caption 
      </h1>
      <p class="text-slate-400">
        Pilih ClipCard Anda, dan biarkan AI kami merangkai kata-kata viral untuk Anda.
      </p>
    </header>
    <section
      class="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
      aria-label="Area Generate AI"
    >
      <!-- Glow effect -->
      <div
        class="absolute -top-10 -right-10 w-40 h-40 bg-lime-500/10 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      ></div>
      <!-- Pilihan Select -->
      <div class="mb-6 relative z-10">
        <label for="clipcard-select" class="block text-sm font-medium text-slate-300 mb-2"
          >Pilih Video / ClipCard Anda</label
        >
        <select
          id="clipcard-select"
          v-model="selectedClipcardId"
          class="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-lime-500/50 cursor-pointer"
        >
          <option value="" disabled>-- Pilih ClipCard --</option>
          <option v-for="card in clipcards" :key="card.id" :value="card.id">
            {{ card.videoReference }}
          </option>
        </select>
      </div>
      <!-- Tombol (menggunakan komponen PrimaryButton) -->
      <div class="relative z-10 mb-8">
        <PrimaryButton
          @click="handleGenerate"
          :isLoading="isLoading"
          loadingText="Sedang Meracik Kata..."
        >
          Generate Caption Sekarang!
        </PrimaryButton>
      </div>
      <!-- Area Hasil (menggunakan komponen AiResultCard) -->
      <div v-if="generatedCaption" class="relative z-10 animate-fade-in" aria-live="polite">
        <AiResultCard :caption="generatedCaption" />
      </div>
    </section>
  </main>
</template>
<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

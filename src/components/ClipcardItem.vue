<script setup lang="ts">
import { toast } from 'vue-sonner'

interface PlatformData {
  platformId?: string
  platformName: string
  caption?: string
  hashtags?: string
  mentions?: string
}

// Beri nama 'props' pada defineProps agar bisa dipanggil di fungsi bawahnya
const props = defineProps<{
  clipcard: {
    id: string
    videoReference: string
    platformData: {
      platformId?: string
      platformName: string
      caption?: string
      hashtags?: string
      mentions?: string
    }[]
  }
}>()

// Fungsi untuk menyalin teks
const copyToClipboard = async (platform: PlatformData) => {
  // Merangkai teks yang akan disalin (Array -> Gabung dengan enter baris baru)
  const parts = []

  parts.push(props.clipcard.videoReference) // Judul masuk paling atas
  parts.push('') // Jarak 1 baris

  if (platform.caption) parts.push(platform.caption)
  if (platform.platformId) parts.push(`Kode: ${platform.platformId}`)

  parts.push('') // Jarak 1 baris sebelum hashtag
  if (platform.hashtags) parts.push(platform.hashtags)
  if (platform.mentions) parts.push(platform.mentions)

  // Gabungkan semua dengan enter (\n)
  const textToCopy = parts.join('\n').trim()

  try {
    await navigator.clipboard.writeText(textToCopy)
    toast.success(`Teks ${platform.platformName} berhasil disalin!`)
  } catch (error) {
    console.error('Pesan error asli:', error)
    toast.error('Gagal menyalin teks')
  }
}
</script>

<template>
  <article
    class="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden hover:border-lime-500/50 transition-all group flex flex-col"
  >
    <!-- Efek Cahaya Hijau (Glow) di Sudut Kanan Atas -->
    <div
      class="absolute -top-10 -right-10 w-32 h-32 bg-lime-500/20 blur-3xl rounded-full"
      aria-hidden="true"
    ></div>

    <div class="relative z-10 flex-1 flex flex-col">
      <!-- Header: Judul Video -->
      <header class="mb-4">
        <h3 class="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
          {{ clipcard.videoReference }}
        </h3>
      </header>

      <!-- Looping Platform (Karena 1 Video bisa masuk ke banyak platform) -->
      <div
        v-for="platform in clipcard.platformData"
        :key="platform.platformName"
        class="flex-1 flex flex-col mt-2"
      >
        <!-- Baris Lencana (Badges) & Tombol Copy -->
        <div class="flex flex-wrap items-center justify-between mb-4 gap-3">
          <!-- Area Kiri: Badge -->
          <div class="flex flex-wrap items-center gap-3">
            <span
              class="inline-flex items-center px-3 py-1 bg-slate-800 border border-slate-700 rounded-full"
            >
              <span class="text-xs font-semibold text-slate-300 tracking-wide">
                Platform: {{ platform.platformName }}
              </span>
            </span>
          </div>

          <!-- Area Kanan: Tombol Copy -->
          <button
            @click="copyToClipboard(platform)"
            class="text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 p-2.5 rounded-xl transition-all border border-slate-700 hover:border-lime-500/50 active:scale-95"
            title="Salin Teks"
          >
            <!-- Icon Copy / Clipboard -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>

        <!-- Konten Caption Utama -->
        <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-6 flex-1 wrap-break-word">
          {{ platform.caption || 'Tidak ada caption' }}
        </p>
        <div v-if="platform.platformId" class="mb-4">
          <span
            class="inline-block px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs font-mono text-lime-400 font-bold tracking-wider"
          >
            Kode: {{ platform.platformId }}
          </span>
        </div>
        <!-- Footer: Mention & Hashtag -->
        <footer class="mt-auto">
          <p
            v-if="platform.mentions"
            class="text-sm text-white font-medium mb-3 wrap-break-word cursor-pointer hover:underline"
          >
            {{ platform.mentions }}
          </p>

          <p
            v-if="platform.hashtags"
            class="text-blue-400 text-sm wrap-break-word cursor-pointer hover:text-blue-300"
          >
            {{ platform.hashtags }}
          </p>
        </footer>
      </div>
    </div>
  </article>
</template>

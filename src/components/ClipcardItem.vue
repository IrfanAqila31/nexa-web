<script setup lang="ts">
defineProps<{
  clipcard: {
    id: string
    videoReference: string
    platformData: {
      platformName: string
      caption?: string
      hashtags?: string
      mentions?: string
    }[]
  }
}>()
</script>
<template>
  <!-- Menggunakan tag <article> karena ini adalah konten independen -->
  <article
    class="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-lime-500/50 transition-all group flex flex-col"
  >
    <!-- Menggunakan tag <header> untuk judul -->
    <header class="mb-4">
      <h3 class="font-bold text-slate-100 text-lg truncate" :title="clipcard.videoReference">
        {{ clipcard.videoReference }}
      </h3>
    </header>

    <!-- Looping detail platform (misal Tiktok/IG) -->
    <div
      v-for="platform in clipcard.platformData"
      :key="platform.platformName"
      class="flex-1 flex flex-col"
    >
      <div class="mb-3">
        <span
          class="inline-block px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium text-lime-400"
        >
          {{ platform.platformName }}
        </span>
      </div>

      <p class="text-sm text-slate-300 line-clamp-3 mb-3 flex-1">
        {{ platform.caption || 'Tidak ada caption' }}
      </p>

      <!-- Menggunakan tag <footer> untuk metadata seperti hashtag/mention -->
      <footer class="space-y-1 mt-auto">
        <p v-if="platform.hashtags" class="text-xs text-lime-500/80 font-medium truncate">
          {{ platform.hashtags }}
        </p>
        <p v-if="platform.mentions" class="text-xs text-blue-400/80 truncate">
          {{ platform.mentions }}
        </p>
      </footer>
    </div>
  </article>
</template>

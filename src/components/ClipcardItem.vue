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
  <!-- Background Card dengan efek Blur dan Shadow (mengikuti PreviewCard) -->
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
        <!-- Baris Lencana (Badges) -->
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <!-- Badge Icon Petir (Style PreviewCard) -->
          <span
            class="inline-flex items-center gap-2 px-3 py-1 bg-lime-500/10 border border-lime-500/20 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-lime-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-xs font-semibold text-lime-400 tracking-wide">Clipcard</span>
          </span>

          <!-- Badge Nama Platform -->
          <span
            class="inline-flex items-center px-3 py-1 bg-slate-800 border border-slate-700 rounded-full"
          >
            <span class="text-xs font-semibold text-slate-300 tracking-wide">
              Platform: {{ platform.platformName }}
            </span>
          </span>
        </div>

        <!-- Konten Caption Utama -->
        <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-6 flex-1 wrap-break-word">
          {{ platform.caption || 'Tidak ada caption' }}
        </p>

        <!-- Footer: Mention & Hashtag -->
        <footer class="mt-auto">
          <!-- Mention (Warna Putih + Hover Garis Bawah seperti PreviewCard) -->
          <p
            v-if="platform.mentions"
            class="text-sm text-white font-medium mb-3 wrap-break-word cursor-pointer hover:underline"
          >
            {{ platform.mentions }}
          </p>

          <!-- Hashtags (Warna Biru + Hover Terang seperti PreviewCard) -->
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

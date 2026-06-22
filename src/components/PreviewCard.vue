<script setup lang="ts">
interface Props {
  platformName: string
  title: string
  caption: string
  mention: string[]
  hastags: string[]
}

defineProps<Props>()
</script>

<template>

  <article
    class="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-6 text-left w-[350px] md:w-[400px] shrink-0 shadow-2xl relative overflow-hidden"
  >
  
    <div
      class="absolute -top-10 -right-10 w-32 h-32 bg-lime-500/20 blur-3xl rounded-full"
      aria-hidden="true"
    ></div>

    <div class="relative z-10">

      <header>
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <!-- Badge AI -->
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
            <span class="text-xs font-semibold text-lime-400 tracking-wide">Buat Caption Cepat</span>
          </span>

          <!-- Badge Platform Name -->
          <span
            class="inline-flex items-center px-3 py-1 bg-slate-800 border border-slate-700 rounded-full"
          >
            <span class="text-xs font-semibold text-slate-300 tracking-wide"
              >Platform: {{ platformName }}</span
            >
          </span>
        </div>

        <h3 class="text-xl md:text-2xl font-bold text-white mb-2">{{ title }}</h3>
      </header>

      <!-- Konten Utama (Caption) -->
      <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
        {{ caption }}
      </p>

      <footer>
        <ul aria-label="Daftar Mention" class="flex flex-wrap gap-2 text-sm mb-3 list-none">
          <li v-for="(userMention, index) in mention" :key="index">
            <span class="text-white font-medium cursor-pointer hover:underline">
              {{ userMention }}
            </span>
          </li>
        </ul>

        <!-- Menggunakan <ul> karena ini adalah daftar hashtag -->
        <ul aria-label="Daftar Hashtag" class="flex flex-wrap gap-2 list-none">
          <li v-for="(tag, index) in hastags" :key="index">
            <span class="text-blue-400 text-sm cursor-pointer hover:text-blue-300">
              {{ tag }}
            </span>
          </li>
        </ul>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
const props = defineProps<{
  caption: string
}>()
const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(props.caption)
    toast.success('Caption AI berhasil disalin!')
  } catch (error) {
    console.error('Gagal menyalin ke clipboard:', error)
    toast.error('Gagal menyalin')
  }
}
</script>

<template>
  <article
    class="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative group"
    aria-labelledby="ai-result-title"
  >
    <header class="mb-3">
      <h3 id="ai-result-title" class="text-sm font-semibold text-lime-400 uppercase tracking-wider">
        Hasil AI:
      </h3>
    </header>

    <div class="relative">
      <p class="text-slate-200 leading-relaxed whitespace-pre-wrap pr-8">{{ caption }}</p>

      <button
        @click="copyResult"
        class="absolute -top-2 right-0 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700"
        title="Salin Teks"
        aria-label="Salin caption"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
  </article>
</template>

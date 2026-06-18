<script setup lang="ts">
defineProps<{
  isLoading?: boolean
  loadingText?: string
  type?: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="isLoading"
    class="w-full bg-linear-to-r from-lime-600 to-green-600 hover:from-lime-500 hover:to-green-500 text-white cursor-pointer font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
  >
    <!-- Ikon Loading bawaan Tailwind -->
    <svg
      v-if="isLoading"
      class="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- Jika sedang loading, tampilkan teks loading. Jika tidak, tampilkan SLOT -->
    <span v-if="isLoading">{{ loadingText || 'Memuat...' }}</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import PrimaryButton from './PrimaryButton.vue'
import { clipcardService } from '../services/clipcardService'
import { toast } from 'vue-sonner'

const emit = defineEmits(['close'])

const clipcardSchema = toTypedSchema(
  z.object({
    videoReference: z.string().min(1, { message: 'Judul/Referensi wajib diisi' }).default(''),
    platformName: z.string().min(1, { message: 'Platform wajib dipilih' }).default('Tiktok'),
    caption: z.string().default(''),
    platformId: z.string().default(''),
    hashtags: z.string().default(''),
    mentions: z.string().default(''),
  }),
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: clipcardSchema,
})

const { value: videoReference, errorMessage: videoRefError } = useField<string>('videoReference')
const { value: platformName, errorMessage: platformError } = useField<string>('platformName')
const { value: caption } = useField<string>('caption')
const { value: hashtags } = useField<string>('hashtags')
const { value: mentions } = useField<string>('mentions')
const { value: platformId } = useField<string>('platformId')

const onSubmit = handleSubmit(async (values) => {
  try {
    // Menyusun data sesuai kerangka (skema) yang diminta Backend
    const payload = {
      videoReference: values.videoReference,
      platformData: [
        {
          platformId: values.platformId,
          platformName: values.platformName,
          caption: values.caption,
          hashtags: values.hashtags,
          mentions: values.mentions,
        },
      ],
    }

    // Mengirim ke API
    await clipcardService.createClipcard(payload)

    // Pesan Sukses
    toast.success('Yeay! Clipcard berhasil dibuat!')

    // Tutup Modal
    emit('close')
  } catch (error) {
    toast.error('Gagal membuat Clipcard, silakan coba lagi.')
    console.error(error)
  }
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay Gelap -->
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="emit('close')"></div>

    <!-- Kotak Modal Utama -->
    <div
      class="relative bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl p-6 z-10"
    >
      <!-- Header Modal -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-slate-100">Buat Clipcard Baru</h2>
        <button
          @click="emit('close')"
          class="text-slate-400 hover:text-slate-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <!-- Area Formulir -->
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Input Judul -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Judul Video</label>
            <input
              v-model="videoReference"
              type="text"
              class="w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-500"
              :class="videoRefError ? 'border-red-500/50' : 'border-slate-800'"
              placeholder="Contoh: Rahasia Cepat Kaya"
            />
            <p v-if="videoRefError" class="mt-1 text-xs text-red-400">{{ videoRefError }}</p>
          </div>
          <!-- Pilihan Platform -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Platform</label>
            <select
              v-model="platformName"
              class="w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-500 cursor-pointer"
              :class="platformError ? 'border-red-500/50' : 'border-slate-800'"
            >
              <option value="Tiktok">TikTok</option>
              <option value="Instagram">Instagram Reels</option>
              <option value="YouTube">YouTube Shorts</option>
            </select>
            <p v-if="platformError" class="mt-1 text-xs text-red-400">{{ platformError }}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Caption</label>
          <textarea
            v-model="caption"
            rows="3"
            class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-500"
            placeholder="Tulis cerita atau penjelasan menarik di sini..."
          ></textarea>
          <div class="mt-3">
            <label class="block text-sm font-medium text-slate-300 mb-1"
              >Kode / ID Referensi (Opsional)</label
            >
            <input
              v-model="platformId"
              type="text"
              class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-500"
              placeholder="(Opsional)"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Hashtag</label>
            <input
              v-model="hashtags"
              type="text"
              class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-500"
              placeholder="Contoh: #viral #tips"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Mention Akun</label>
            <input
              v-model="mentions"
              type="text"
              class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-500"
              placeholder="Contoh: @windahbasudara"
            />
          </div>
        </div>
        <div class="pt-4 flex justify-end gap-3">
          <button
            type="button"
            @click="emit('close')"
            class="px-5 py-2.5 text-slate-300 hover:text-white transition-colors"
          >
            Batal
          </button>
          <PrimaryButton type="submit" :isLoading="isSubmitting" loadingText="Menyimpan..."
            >Simpan Clipcard</PrimaryButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

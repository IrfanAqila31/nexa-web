<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email('Format email tidak valid').min(1, 'email tidak boleh kosong'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
  }),
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: loginSchema,
})

const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values.email, values.password)

    toast.success('Login Berhasil! Selamat datang.')
    router.push('/app')
  } catch {
    toast.error('Login Gagal! Email atau password salah.')
  }
})
</script>

<template>
  <div class="w-full max-w-md relative">
    <div
      class="bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl relative z-10"
    >
      <div class="text-center mb-8">
        <h2
          class="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 mb-2"
        >
          Nexa
        </h2>
        <p class="text-gray-400 text-sm">Selamat datang kembali! Silakan login.</p>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-2.5 bg-gray-950/50 border rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            :class="
              emailError
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-800'
            "
            placeholder="Masukkan email"
          />
          <p v-if="emailError" class="mt-1.5 text-xs text-red-400">{{ emailError }}</p>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="block text-sm font-medium text-gray-300">Password</label>
            <a href="#" class="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >Lupa Password?</a
            >
          </div>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2.5 bg-gray-950/50 border rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            :class="
              passwordError
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-800'
            "
            placeholder="••••••••"
          />
          <p v-if="passwordError" class="mt-1.5 text-xs text-red-400">{{ passwordError }}</p>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          <svg
            v-if="isSubmitting"
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
          {{ isSubmitting ? 'Memeriksa...' : 'Login' }}
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-gray-800/60 text-center">
        <p class="text-xs text-gray-500">
          Coba gunakan email: <span class="text-gray-300 font-medium">emily@gmail.com</span> /
          password: <span class="text-gray-300 font-medium">emilyspass</span>
        </p>
      </div>
    </div>
  </div>
</template>

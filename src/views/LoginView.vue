<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import PrimaryButton from '../components/PrimaryButton.vue'

const authStore = useAuthStore()
const router = useRouter()

const showPassword = ref(false)

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email({ message: 'Format email tidak valid' }).default(''),
    password: z.string().min(6, { message: 'Password minimal 6 karakter' }).default(''),
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
    router.push('/')
  } catch {
    toast.error('Login Gagal! Email atau password salah.')
  }
})
</script>

<template>
  <section class="w-full max-w-md pt-20" aria-labelledby="login-heading">
    <div
      class="bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl relative z-10"
    >
      <header class="text-center mb-8">
        <h1
          id="login-heading"
          class="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-lime-300 to-lime-500 mb-2"
        >
          Easy Caption
        </h1>
        <p class="text-gray-400 text-sm">Selamat datang kembali! Silakan login</p>
      </header>

      <form @submit.prevent="onSubmit" class="space-y-5" aria-label="Formulir Login">
        <!-- Input Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="off"
            class="w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-500 transition-all duration-200 autofill:shadow-[inset_0_0_0_30px_#030712] autofill:[-webkit-text-fill-color:#f3f4f6]"
            :class="
              emailError
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
                : 'border-slate-600'
            "
            placeholder="Masukkan email"
            :aria-invalid="!!emailError"
          />
          <p v-if="emailError" class="mt-1.5 text-xs text-red-400" role="alert">{{ emailError }}</p>
        </div>

        <!-- Input Password -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="text-gray-400 hover:text-gray-300 transition-colors mr-2"
              :title="showPassword ? 'Sembunyikan password' : 'Lihat password'"
              :aria-label="showPassword ? 'Sembunyikan password' : 'Lihat password'"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
              >
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye-closed-icon lucide-eye-closed h-5 w-5"
              >
                <path d="m15 18-.722-3.25" />
                <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                <path d="m20 15-1.726-2.05" />
                <path d="m4 15 1.726-2.05" />
                <path d="m9 18 .722-3.25" />
              </svg>
            </button>
          </div>
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            class="w-full px-4 py-2.5 mb-5 bg-slate-950 border rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-500 transition-all duration-200 autofill:shadow-[inset_0_0_0_30px_#030712] autofill:[-webkit-text-fill-color:#f3f4f6]"
            :class="
              passwordError
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
                : 'border-slate-600'
            "
            placeholder="••••••••"
            :aria-invalid="!!passwordError"
          />
          <p v-if="passwordError" class="mt-1.5 text-xs text-red-400" role="alert">
            {{ passwordError }}
          </p>
        </div>

        <PrimaryButton
          type="submit"
          :isLoading="isSubmitting"
          loadingText="Memeriksa kredensial..."
        >
          Login Sekarang
        </PrimaryButton>
      </form>
      <!-- Garis Pemisah (Atau) -->
      <div class="mt-6 flex items-center justify-center space-x-3">
        <div class="h-px bg-slate-800 flex-1"></div>
        <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Atau</span>
        <div class="h-px bg-slate-800 flex-1"></div>
      </div>

      <!-- Tombol Login Google -->
      <button
        type="button"
        class="mt-6 w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 rounded-xl text-slate-300 font-medium transition-all duration-300 cursor-pointer"
      >
        <!-- Ikon SVG Google -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Lanjutkan dengan Google
      </button>

      <!-- Menggunakan <footer> untuk bagian bawah komponen -->
      <footer class="mt-8 pt-6 border-t border-gray-800/60 text-center">
        <p class="text-xs md:text-sm text-slate-400">
          Belum punya akun?
          <RouterLink
            to="/register"
            class="text-lime-400 hover:text-lime-300 font-medium transition-colors ml-1"
          >
            Daftar sekarang
          </RouterLink>
        </p>
      </footer>
    </div>
  </section>
</template>

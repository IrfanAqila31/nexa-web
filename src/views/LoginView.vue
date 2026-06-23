<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import PrimaryButton from '../components/PrimaryButton.vue'
import { GoogleLogin } from 'vue3-google-login'

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

const handleGoogleLogin = async (respone: { credential?: string }) => {
  try {
    if (!respone.credential) throw new Error('Token tidak ditemukan')
    // response.credential adalah ID Token yang dikirim oleh Google
    const idToken = respone.credential
    await authStore.loginWithGoogle(idToken)
    toast.success('Login Google Berhasil!')
    router.push('/')
  } catch (error) {
    toast.error('Login Google Gagal Silahkan Coba Lagi')
    console.log(error)
  }
}
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

      <div class="mt-6 flex items-center justify-center space-x-3">
        <div class="h-px bg-slate-800 flex-1"></div>
        <span class="text-xs text-slate-500 font-medium uppercase">Atau</span>
        <div class="h-px bg-slate-800 flex-1"></div>
      </div>

      <!-- button login google -->
      <div class="mt-6 flex justify-center">
        <GoogleLogin
          :callback="handleGoogleLogin"
          :buttonConfig="{
            theme: 'filled_black',
            shape: 'rectangular',
            width: 300,
            text: 'signin_with',
          }"
        />
      </div>
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

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import PrimaryButton from '../components/PrimaryButton.vue'

const authStore = useAuthStore()
const router = useRouter()

const registerSchema = toTypedSchema(
  z.object({
    name: z.string().min(3, 'Nama minimal 3 karakter'),
    email: z.string().email('Format email tidak valid').min(1, 'email tidak boleh kosong'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
  }),
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: registerSchema,
})

const { value: name, errorMessage: nameError } = useField<string>('name')

const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.register(values.name, values.email, values.password)

    toast.success('Registrasi Berhasil! Selamat datang.')
    router.push('/login')
  } catch {
    toast.error('Registrasi Gagal! Silakan coba lagi.')
  }
})
</script>

<template>
  <!-- Menggunakan tag <section> untuk menandakan bagian mandiri, lengkap dengan label untuk pembaca layar -->
  <section class="w-full max-w-md relative pb-16 pt-16" aria-labelledby="register-heading">
    <div
      class="bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl relative z-10"
    >
      <!-- Bagian kepala form menggunakan tag <header> -->
      <header class="text-center mb-8">
        <!-- Menggunakan <h1> karena ini adalah judul paling utama di komponen ini -->
        <h1
          id="register-heading"
          class="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 mb-2"
        >
          Nexa
        </h1>
        <p class="text-gray-400 text-sm">Daftar Akun Baru.</p>
      </header>

      <!-- Menambahkan aria-label pada form -->
      <form @submit.prevent="onSubmit" class="space-y-5" aria-label="Formulir Pendaftaran">
        <!-- Input Nama -->
        <div>
          <!-- Menghubungkan label dan input menggunakan atribut 'for' dan 'id' -->
          <label for="name" class="block text-sm font-medium text-gray-300 mb-1"
            >Nama Lengkap</label
          >
          <input
            id="name"
            v-model="name"
            type="text"
            autocomplete="name"
            class="w-full px-4 py-2.5 bg-gray-950/50 border rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            :class="
              nameError
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-800'
            "
            placeholder="Masukkan nama Anda"
            :aria-invalid="!!nameError"
          />
         
          <p v-if="nameError" class="mt-1.5 text-xs text-red-400" role="alert">{{ nameError }}</p>
        </div>

        <!-- Input Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            class="w-full px-4 py-2.5 bg-gray-950/50 border rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            :class="
              emailError
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-800'
            "
            placeholder="Masukkan email"
            :aria-invalid="!!emailError"
          />
          <p v-if="emailError" class="mt-1.5 text-xs text-red-400" role="alert">{{ emailError }}</p>
        </div>

        <!-- Input Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="new-password"
            class="w-full px-4 py-2.5 bg-gray-950/50 border rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            :class="
              passwordError
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-800'
            "
            placeholder="••••••••"
            :aria-invalid="!!passwordError"
          />
          <p v-if="passwordError" class="mt-1.5 text-xs text-red-400" role="alert">
            {{ passwordError }}
          </p>
        </div>

        <!-- Tombol Submit Semantic (Menggunakan komponen buatan kita sendiri) -->
        <PrimaryButton type="submit" :isLoading="isSubmitting" loadingText="Memeriksa...">
          Daftar Sekarang
        </PrimaryButton>
      </form>

      <!-- Bagian kaki komponen dibungkus menggunakan tag <footer> -->
      <footer class="mt-8 pt-6 border-t border-gray-800/60 text-center">
        <p class="text-xs text-gray-500">
          Sudah punya akun?
          <router-link to="/login" class="text-blue-400 hover:text-blue-300 transition-colors">
            Login di sini
          </router-link>
        </p>
      </footer>
    </div>
  </section>
</template>

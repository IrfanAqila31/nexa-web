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
    username: z.string().min(1, 'Username tidak boleh kosong'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
  }),
)


const { handleSubmit, isSubmitting } = useForm({
  validationSchema: loginSchema,
})


const { value: username, errorMessage: usernameError } = useField<string>('username')
const { value: password, errorMessage: passwordError } = useField<string>('password')


const onSubmit = handleSubmit(async (values) => {
  try {

    await authStore.login(values.username, values.password)


    toast.success('Login Berhasil! Selamat datang.')
    router.push('/app')
  } catch {
   
    toast.error('Login Gagal! Username atau password salah.')
  }
})
</script>

<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Masuk ke Nexa</h2>

    <form @submit.prevent="onSubmit" class="space-y-4">
   
      <div>
        <label class="block text-sm font-medium text-gray-700">Username</label>
       
        <input
          v-model="username"
          type="text"
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="usernameError ? 'border-red-500' : 'border-gray-300'"
          placeholder="Masukkan username"
        />
     
        <p v-if="usernameError" class="mt-1 text-sm text-red-600">{{ usernameError }}</p>
      </div>

    
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="passwordError ? 'border-red-500' : 'border-gray-300'"
          placeholder="Masukkan password"
        />
        <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
      </div>

      
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {{ isSubmitting ? 'Memeriksa...' : 'Login' }}
      </button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-500">
      Coba gunakan username: <b>emilys</b> dan password: <b>emilyspass</b>
    </div>
  </div>
</template>

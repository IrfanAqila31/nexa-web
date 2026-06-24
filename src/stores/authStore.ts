import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ name: string; email: string } | null>(null)

  const isAuthenticated = ref<boolean>(false)

  const credit = ref<number>(0)

  function initialize() {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (token) {
      isAuthenticated.value = true
      credit.value = 2
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
    }
  }

  async function login(email: string, password: string) {
    const data = await authService.login(email, password)

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    user.value = data.user
    isAuthenticated.value = true

    credit.value = 2
  }

  async function register(name: string, email: string, password: string) {
    await authService.register(name, email, password)
    await login(email, password)
  }

  async function loginWithGoogle(googleToken: string) {
    const data = await authService.loginWithGoogle(googleToken)
    // menyimpan token aplikasi dan data user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    user.value = data.user
    isAuthenticated.value = true
    credit.value = 2
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    user.value = null
    isAuthenticated.value = false
    credit.value = 0
  }

  function useCredit() {
    if (credit.value > 0) {
      credit.value--
      return true
    }
    return false
  }
  return {
    user,
    isAuthenticated,
    credit,
    useCredit,
    login,
    register,
    logout,
    initialize,
    loginWithGoogle,
  }
})

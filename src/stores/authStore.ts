import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/authService'
import { boolean } from 'zod'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref<boolean>(false)

  const credit = ref<number>(0)

  function initialize() {
    const token = localStorage.getItem('token')
    if (token) {
      isAuthenticated.value = true
      credit.value = 2
    }
  }

  async function login(username: string, password: string) {
    const data = await authService.login(username, password)

    localStorage.setItem('token', data.token)
    user.value = data
    isAuthenticated.value = true

    credit.value = 2
  }

  function logout() {
    localStorage.removeItem('token')
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
    logout,
    initialize,
  }
})

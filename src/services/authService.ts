import api from './api'

export const authService = {
  async login(email: string, password: string) {
    const respon = await api.post('/auth/login', {
      email: email,
      password: password,

      expiresInMins: 60,
    })
    return respon.data
  },
}

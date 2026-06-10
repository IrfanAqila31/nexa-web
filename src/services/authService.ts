import api from './api'

export const authService = {
  async login(username: string, password: string) {
    const respon = await api.post('/auth/login', {
      username: username,
      password: password,

      expiresInMins: 60,
    })
    return respon.data
  },
}

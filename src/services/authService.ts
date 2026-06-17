import api from './api'

export const authService = {
  async login(email: string, password: string) {
    const respon = await api.post('/auth/login', {
      email: email,
      password: password,
    })
    return respon.data
  },
  async register(name: string, email: string, password: string) {
    const respon = await api.post('/auth/register', {
      name: name,
      email: email,
      password: password,
    })
    return respon.data
  },
}

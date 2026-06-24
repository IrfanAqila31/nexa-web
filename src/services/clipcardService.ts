import api from './api'

export interface ClipcardPayload {
  videoReference: string
  platformData: {
    platformName: string
    caption?: string
    hashtags?: string
    mentions?: string
  }[]
}

export const clipcardService = {
  async createClipcard(payload: ClipcardPayload) {
    const respon = await api.post('/clipcards/', payload)

    return respon.data
  },
}

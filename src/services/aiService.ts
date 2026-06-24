import api from './api'

export const aiService = {
  //untuk meminta AI membuat caption berdasarkan ID ClipCard
  async generateCaption(clipcardId: string) {
    // mengggunakan POST sesuai dokumentasi AI 
    const respon = await api.get(`/ai/generate-caption/${clipcardId}`)
    return respon.data
  }
}

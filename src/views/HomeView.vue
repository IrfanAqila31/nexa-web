<script setup lang="ts">
import PreviewCard from '../components/PreviewCard.vue'

// Data 5 contoh caption dengan tema berbeda
const previewCards = [
  {
    platform: 'Tiktok',
    title: '🔥 EPIC COMEBACK! Musuh Auto Kena Mental!',
    caption:
      'Gak nyangka banget match kali ini bakal se-tegang ini! Dari yang awalnya mau nyerah, tiba-tiba dapet momentum balikin keadaan. 🤯🎮',
    mention: ['@WindahBasudara', '@JessNoLimit'],
    hashtags: ['#EpicComeback', '#GamingHighlight', '#AutoWin'],
  },
  {
    platform: 'Instagram',
    title: 'Rahasia Sukses Usia 20-an (Bocor!)',
    caption:
      'CEO sukses ini bocorin mindset gila yang bikin dia bisa raih miliaran sebelum umur 30. Simak sampai habis! 💸✨',
    mention: ['@DeddyCorbuzier', '@RaymondChin'],
    hashtags: ['#PodcastIndonesia', '#MindsetBisnis'],
  },
  {
    platform: 'YouTube',
    title: 'Cara Cepat Belajar Coding Pemula!',
    caption:
      'Pusing belajar coding? Terapkan trik 3 langkah ini. Dijamin dalam 1 bulan udah bisa bikin website! Link di kolom komentar! 🚀',
    mention: ['@WebProgrammingUNPAS', '@SandhikaGalih'],
    hashtags: ['#TutorialCoding', '#ProgrammerPemula'],
  },
  {
    platform: 'Tiktok',
    title: 'Review iPhone 15 Pro: Worth It?!',
    caption:
      'Jujur-juran setelah pakai sebulan penuh. Baterainya awet atau gimmick? Kamera barunya gimana? Tonton review lengkapnya! 🍎🔍',
    mention: ['@GadgetIn', '@DavidBrendi'],
    hashtags: ['#ReviewGadget', '#iPhone15Pro'],
  },
  {
    platform: 'Instagram Reels',
    title: 'Hidden Gem Bali! Masih Sepi Banget!',
    caption:
      'Tempat liburan estetik di Bali yang belum banyak orang tahu. View-nya pantai privat. Jangan lupa save video ini! 🏖️🍹',
    mention: ['@BaliLife', '@ExploreBali'],
    hashtags: ['#HiddenGemBali', '#TravelVlog'],
  },
]
</script>
<template>
  <section aria-labelledby="hero-title" class="text-center pt-42">
    <header class="px-4 max-w-xl md:max-w-3xl mx-auto">
      <h1
        id="hero-title"
        class="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 mx-auto bg-clip-text text-transparent bg-linear-to-r from-lime-300 to-lime-500"
      >
        Buat <span class="italic">Caption</span> Video <span class="italic">Viral</span> Tanpa Mikir
        Keras
      </h1>
      <p class="text-slate-200 mb-8 mx-auto">
        Nexa membantu para clipper mengelola judul, tag, hingga deskripsi video dalam satu tempat.
        Sedang buntu ide? Biarkan AI kami merangkai caption yang mengundang klik dalam hitungan
        detik.
      </p>
    </header>
    <div class="flex justify-center flex-wrap gap-5">
      <router-link
        to="/login"
        class="bg-linear-to-r from-lime-600 to-green-600 hover:bg-linear-to-r hover:from-lime-500 hover:to-green-500 transition duration-400 text-white px-4 py-3 md:px-6 md:py-4 text-sm md:text-lg rounded-2xl cursor-pointer"
        >Mulai Sekarang</router-link
      >
    </div>
    <div
      class="mt-20 mb-20 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden fade-edges py-4"
    >
      <div class="flex w-max animate-slide hover:[animation-play-state:paused]">
        <div class="flex gap-8 pr-8">
          <PreviewCard
            v-for="(card, index) in previewCards"
            :key="'A' + index"
            :platformName="card.platform"
            :title="card.title"
            :caption="card.caption"
            :mention="card.mention"
            :hastags="card.hashtags"
          />
        </div>

        <div class="flex gap-8 pr-8" aria-hidden="true">
          <PreviewCard
            v-for="(card, index) in previewCards"
            :key="'B' + index"
            :platformName="card.platform"
            :title="card.title"
            :caption="card.caption"
            :mention="card.mention"
            :hastags="card.hashtags"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Efek Fade / Pudar di Kiri dan Kanan */
.fade-edges {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    transparent 5%,
    black 30%,
    black 70%,
    transparent 95%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    transparent 5%,
    black 30%,
    black 70%,
    transparent 95%,
    transparent
  );
}

/* Keyframe khusus untuk menggeser rombongan 1 dan 2 secara berkesinambungan */
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-slide {
  animation: slide 40s linear infinite;
}
</style>

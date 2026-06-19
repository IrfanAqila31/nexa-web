<script setup lang="ts"></script>
<template>
  <section aria-labelledby="hero-title" class="text-center pt-42">
    <header>
      <h1
        id="hero-title"
        class="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:max-w-2xl bg-clip-text text-transparent bg-linear-to-r from-lime-300 to-lime-500"
      >
        Buat Caption Video Viral. Tanpa Mikir Keras.
      </h1>
      <p class="text-slate-200 mb-8 md:max-w-2xl mx-auto">
        Nexa membantu para clipper mengelola judul, tag, hingga deskripsi video dalam satu tempat.
        Sedang buntu ide? Biarkan AI kami merangkai caption yang mengundang klik dalam hitungan
        detik.
      </p>
    </header>
    <div class="flex justify-center flex-wrap gap-5">
      <router-link
        to="/login"
        class="bg-linear-to-r from-lime-600 to-green-600 hover:bg-linear-to-r hover:from-lime-500 hover:to-green-500 transition duration-400 text-white px-6 py-4 text-lg rounded-2xl cursor-pointer"
        >Mulai Sekarang</router-link
      >
      <router-link
        to="/login"
        class="border border-slate-600 hover:bg-linear-to-r hover:from-lime-500 hover:to-green-500 transition duration-400 text-white px-6 py-4 text-lg rounded-2xl cursor-pointer"
        >Mulai Sekarang</router-link
      >
    </div>
  </section>
</template>

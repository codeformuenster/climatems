<template>
  <div class="relative">
    <Image :src="imageSrc" alt="Image" width="75%" class="flex items-center justify-center"/>

    <!-- Hintergrund-Overlay für bessere Lesbarkeit des Textes -->
    <div class="absolute inset-0 bg-black opacity-40"/>

    <!-- Zentrierte Textbox -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="relative z-10 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center max-w-lg mx-4">
        <h2 class="text-2xl text-black font-bold mb-4">{{ title }}</h2>
        <p class="text-gray-700">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Image from 'primevue/image';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHeader',
  props: {
    imageSrc: {
      url: String,
      required: true,
    },
    title: {
      text: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
});
</script>

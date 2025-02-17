import Aura from '@primevue/themes/aura';
import tailwindTypography from '@tailwindcss/typography';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxt/eslint',
    '@scalar/nuxt'
  ],
  css: [
    'primeicons/primeicons.css',
    '~/assets/styles/main.css'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.this is fake'
        }
      },
    }
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography]
    }
  },
  nitro: {
    preset: 'node-server',
    experimental: {
      openAPI: true,
    },
  },
  vite: {
    build: {
      target: 'esnext'
    }
  }
})
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
    '@nuxt/eslint'
  ],
  css: [
    'primeicons/primeicons.css'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography]
    }
  },
  target: 'static',
  router: {
    base: '/climatems/'
  }
})
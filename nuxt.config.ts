// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  imports: {
    dirs: [
      './enums',
      './lib'
    ]
  },
  modules: [
    'nuxt-primevue',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  primevue: {
    cssLayerOrder: 'reset,primevue',
    components: {
      prefix: 'Prime',
      include: '*'
    },
    directives: {
      include: '*'
    }
  },
  css: [
    'primevue/resources/themes/aura-dark-noir/theme.css',
    'primeicons/primeicons.css'
  ]
})

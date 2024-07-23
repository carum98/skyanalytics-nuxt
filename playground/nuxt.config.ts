export default defineNuxtConfig({
  modules: ['../src/module'],
  skyanalytics: {
    host: 'http://localhost:8080',
    key: '12345678',
  },
  compatibilityDate: '2024-07-23',
})

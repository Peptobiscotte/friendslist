export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/image',
  ],
  runtimeConfig: {
    public: {
      EMAIL: process.env.EMAIL,
      DB: process.env.MY_DB,
      SIGN_IN: process.env.SIGN_IN,
      SIGN_UP: process.env.SIGN_UP,
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  compatibilityDate: '2024-10-29'
})
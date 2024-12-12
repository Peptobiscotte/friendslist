export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/giraffe.svg' },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" }
      ]
    }
  },
  css: [
    '/assets/css/fonts.css',
  ],
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
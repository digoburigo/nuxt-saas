// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  nitro: {
    preset: 'bun',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/fonts',
    'nuxt-security',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  build: {
    transpile: ['trpc-nuxt'],
  },
  app: {
    head: {
      bodyAttrs: {
        class: 'min-h-screen bg-background font-sans antialiased',
      },
    },
  },
  css: ['./assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    configPath: './tailwind.config.js',
    cssPath: './assets/css/tailwind.css',
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
    componentDir: './components/ui',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://tile.openstreetmap.org'],
        'script-src-attr': ["'unsafe-inline'"],
      },
      permissionsPolicy: {
        geolocation: ['self'],
      },
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
});

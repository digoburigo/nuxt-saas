// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  experimental: {
    typedPages: true,
  },
  nitro: {
    // preset: 'cloudflare-pages',
    preset: 'bun',
    prerender: {
      autoSubfolderIndex: false,
    },
    // debug: true,
    // dev: true,
    // logLevel: 5,
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
    '@vue-email/nuxt',
    'nuxt-icon',
  ],
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
        'img-src': [
          "'self'",
          'data:',
          'https://github.com',
          'https://avatars.githubusercontent.com',
          'https://images.unsplash.com',
        ],
        'script-src-attr': ["'unsafe-inline'"],
      },
      permissionsPolicy: {
        geolocation: ['self'],
      },
    },
  },
  i18n: {
    locales: [
      {
        code: 'pt-BR',
        file: 'pt-BR.ts',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'pt-BR',
  },
  vueEmail: {
    useNuxtTailwind: true,
    emailsDir: './emails',
    playground: true,
    baseUrl: 'http://localhost:3000',
    autoImport: true,
  },
});

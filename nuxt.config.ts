import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-07-07',
  // srcDir: '.',
  // dir: {
  //   app: 'app'
  // },
  // compatibilityDate: '2024-07-04',
  // alias: {
  //   '@vue/devtools-api': '@vue/devtools-api',
  // },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    }
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    // Keys within public, will be also exposed to the client-side
    public: {
      baseUrl: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000',
    }
  },
  experimental: {
    typedPages: true,
  },
  nitro: {
    // preset: 'cloudflare-pages',
    // preset: process.env.PRESET_NUXT ?? undefined,
    // preset: 'bun',
    prerender: {
      autoSubfolderIndex: false,
    },
    // debug: true,
    // dev: true,
    // logLevel: 5,
    rollupConfig: {
      // @ts-ignore
      plugins: [vue()]
    },
  },
  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/fonts',
    'nuxt-security',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/icon',
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
    componentDir: './app/components/ui',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  security: {
    csrf: true,
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'production' ? 'require-corp' : 'unsafe-none',
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'https://github.com',
          'https://avatars.githubusercontent.com',
          'https://images.unsplash.com',
        ],
        'script-src-attr': ["'unsafe-inline'"],
        "connect-src": process.env.NODE_ENV === 'production' ? ['self', 'https:', 'http:'] : undefined,
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
  // vueEmail: {
  //   useNuxtTailwind: true,
  //   emailsDir: './emails',
  //   playground: true,
  //   baseUrl: 'http://localhost:3000',
  //   autoImport: true,
  // },
});
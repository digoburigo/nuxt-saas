import vue from "@vitejs/plugin-vue";

const sw = import.meta.env.SW === "true";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	future: {
		typescriptBundlerResolution: true,
		compatibilityVersion: 4,
	},
	compatibilityDate: "2024-07-13",
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
	eslint: {
		config: {
			stylistic: {
				indent: "tab",
				semi: true,
				quotes: "double",
			},
		},
	},
	runtimeConfig: {
		// The private keys which are only available within server-side
		googleClientId: import.meta.env.GOOGLE_CLIENT_ID,
		googleClientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
		googleRedirectUri: import.meta.env.GOOGLE_REDIRECT_URI,

		smtpHost: import.meta.env.SMTP_HOST,
		smtpPort: import.meta.env.SMTP_PORT,
		smtpUser: import.meta.env.SMTP_USER,
		smtpPassword: import.meta.env.SMTP_PASSWORD,
		smtpFromEmail: import.meta.env.SMTP_FROM_EMAIL,

		databaseUrl: import.meta.env.DATABASE_URL,
		tursoDatabaseUrl: import.meta.env.TURSO_DATABASE_URL,
		tursoAuthToken: import.meta.env.TURSO_AUTH_TOKEN,

		// Keys within public, will be also exposed to the client-side
		public: {
			baseUrl: import.meta.env.NODE_ENV === "production" ? import.meta.env.BASE_URL : "http://localhost:3000",
		},
	},
	experimental: {
		// payloadExtraction: false,
		// renderJsonPayloads: true,
		typedPages: true,
	},
	nitro: {
		// preset: "bun",
		prerender: {
			autoSubfolderIndex: false,
		},
		esbuild: {
			options: {
				target: "esnext",
			},
		},
		// debug: true,
		// dev: true,
		// logLevel: 5,
		rollupConfig: {
			// @ts-expect-error @vue-email: type instatiation is possibly infinite
			plugins: [vue()],
		},
	},
	modules: [
		"@nuxt/devtools",
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"shadcn-nuxt",
		"@vueuse/nuxt",
		"@pinia/nuxt",
		"@vee-validate/nuxt",
		"@nuxt/fonts",
		"nuxt-security",
		"@nuxtjs/i18n",
		"@nuxt/image",
		"@nuxt/icon",
		"@nuxt/eslint",
		"@vite-pwa/nuxt",
	],
	css: ["./assets/css/tailwind.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	tailwindcss: {
		configPath: "./tailwind.config.js",
		cssPath: "./assets/css/tailwind.css",
	},
	shadcn: {
		/**
     * Prefix for all the imported component
     */
		prefix: "",
		/**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
		componentDir: "./app/components/ui",
	},
	pinia: {
		storesDirs: ["./stores/**"],
	},
	security: {
		csrf: true,
		headers: {
			crossOriginEmbedderPolicy:
        import.meta.env.NODE_ENV === "production" ? "require-corp" : "unsafe-none",
			contentSecurityPolicy: {
				"img-src": [
					"'self'",
					"data:",
				],
				"script-src-attr": ["'unsafe-inline'"],
				"connect-src": import.meta.env.NODE_ENV === "production" ? ["self", "https:"] : undefined,
			},
			permissionsPolicy: {
				geolocation: ["self"],
			},
		},
	},
	i18n: {
		locales: [
			{
				code: "pt-BR",
				file: "pt-BR.ts",
			},
		],
		lazy: true,
		langDir: "lang",
		defaultLocale: "pt-BR",
	},
	colorMode: {
		preference: "light", // default value of $colorMode.preference
		fallback: "light", // fallback value if not system preference found
		classSuffix: "",
	},
	pwa: {
		strategies: sw ? "injectManifest" : "generateSW",
		srcDir: sw ? "service-worker" : undefined,
		filename: sw ? "sw.ts" : undefined,
		registerType: "autoUpdate",
		manifest: {
			name: "Nuxt Vite PWA",
			short_name: "NuxtVitePWA",
			theme_color: "#ffffff",
			icons: [
				{
					src: "pwa-192x192.png",
					sizes: "192x192",
					type: "image/png",
				},
				{
					src: "pwa-512x512.png",
					sizes: "512x512",
					type: "image/png",
				},
				{
					src: "pwa-512x512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "any maskable",
				},
			],
		},
		workbox: {
			globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
		},
		injectManifest: {
			globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
		},
		client: {
			installPrompt: true,
			// you don't need to include this: only for testing purposes
			// if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
			periodicSyncForUpdates: 20,
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			navigateFallback: "/",
			navigateFallbackAllowlist: [/^\/$/],
			type: "module",
		},
	},
});

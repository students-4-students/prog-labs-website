// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-lucide-icons',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    'nuxt-vitalizer',
    '@sentry/nuxt/module',
  ],

  vite: {
    build: {
      target: 'es2022',
      rollupOptions: {
        output: {
          manualChunks(id) {
            const chunks = ['shiki', '@xterm'];
            if (id.includes('/node_modules/')) {
              for (const chunkName of chunks) {
                if (id.includes(chunkName)) {
                  return chunkName;
                }
              }
            }
          },
        },
      },
    },
    worker: {
      format: 'es',
    },
    resolve: {
      dedupe: ['monaco-editor', 'vscode'],
    },
    plugins: [
      // Allow SharedArrayBuffer use in development
      {
        name: 'configure-response-headers',
        configureServer: (server) => {
          server.middlewares.use((_req, res, next) => {
            res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
            next();
          });
        },
      },
    ],
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
    // compressPublicAssets: true,
    preset: 'bun',
  },

  routeRules: {
    // Allow SharedArrayBuffer use in production
    '/**': {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
    '/api/**': {
      // allow full access to the API
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, Content-Type, Accept',
        'Access-Control-Max-Age': '86400',
      },
    },
    // Cache language servers
    '/language-servers/**': {
      headers: {
        'Cache-Control': `max-age=${14 * 24 * 60 * 60 * 1000}, public`,
      },
    },
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

  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light-default',
        dark: 'github-dark',
      },
      langs: ['cpp', 'java', 'python'],
    },
  },

  colorMode: {
    classSuffix: '',
  },

  googleFonts: {
    families: {
      Inter: {
        wght: '300..850',
        ital: '300..850',
      },
      'JetBrains+Mono': '200..800',
    },
    display: 'swap',
  },

  vitalizer: {
    delayHydration: {
      // Load heavy components only when the page content has been loaded
      hydrateOnEvents: ['DOMContentLoaded'],
    },
  },

  compatibilityDate: '2024-07-04',

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          href: '/favicon.png',
        },
      ],
    },
  },

  // @ts-expect-error
  sentry: {
    sourceMapsUploadOptions: {
      org: 's4s-prog',
      project: 's4s-prog',
      authToken:
        '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',
    },
  },

  sourcemap: true,
});

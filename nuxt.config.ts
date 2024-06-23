// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-monaco-editor',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-lucide-icons',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
  ],
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
        default: 'github-light',
        dark: 'github-dark',
      },
      langs: ['c', 'cpp', 'java', 'python'],
    },
  },
  colorMode: {
    classSuffix: '',
  },
  vite: {
    define: {
      // Make ansis think that it's running in a terminal
      'process.env.FORCE_COLOR': 'true',
    },
  },
  googleFonts: {
    families: {
      'JetBrains+Mono': '100..800',
    },
  },
});

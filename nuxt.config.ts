// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
      "nuxt-primevue",
      "@pinia/nuxt",
      "@pinia-plugin-persistedstate/nuxt",
      "nuxt-electron",
  ],

  primevue: {
      components: {
          include: "*",
      },
  },

  css: [
      "~/assets/css/main.css",
      "primevue/resources/themes/aura-light-noir/theme.css",
      "primeicons/primeicons.css",
  ],

  // NOTE: electronの環境を使いたかったら有効化する。
  electron: {
      build: [
          {
              entry: "electron/main.ts",
          },
      ],
  },

  ssr: false,

  typescript: {
      typeCheck: true,
  },

  compatibilityDate: "2024-07-12",
});
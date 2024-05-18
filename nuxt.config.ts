// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        "nuxt-primevue",
        "@nuxt/test-utils/module",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        // "nuxt-electron",
    ],
    primevue: {
        options: {
            ripple: true,
        },
        components: {
            include: ["Button"],
        },
    },
    css: [
        "~/assets/css/main.css",
        "primevue/resources/themes/aura-light-noir/theme.css",
        "primeicons/primeicons.css",
    ],

    // NOTE: electronの環境を使いたかったら有効化する。
    // electron: {
    //     build: [
    //         {
    //             entry: "electron/main.ts",
    //         },
    //     ],
    // },
    ssr: false,

    typescript: {
        typeCheck: true,
    },
});

import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DOUNATSU",
  description: "Documentation for Developers",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: {
      "/pages/": [
        { text: "PAGES", link: "/pages/index" },
        { text: "TOP", link: "/pages/top" },
        { text: "Daily Report", link: "/pages/daily-report" },
        { text: "Start Notification", link: "/pages/start-notification" },
        { text: "Settings", link: "/pages/settings" },
      ],
      "/stores/": [
        { text: "STORES", link: "/stores/index" },
        { text: "Daily Report", link: "/stores/daily-report" },
        { text: "Settings", link: "/stores/settings" },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

import { createRouter, createWebHashHistory } from "vue-router";

import Top from "@/pages/Top.vue";
import Settings from "@/pages/Settings.vue";
import DailyReport from "@/pages/DailyReport.vue";
import StartNotification from "@/pages/StartNotification.vue";

const routes = [
  { path: "/", name: "top", component: Top },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/daily-report",
    component: DailyReport,
  },
  {
    path: "/start-notification",
    component: StartNotification,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createRouter, createWebHashHistory } from 'vue-router'
import mainPage from '../pages/mainPage.vue'
import createReport from '../pages/createReport.vue'
import preparation from '../pages/preparation.vue'
import startChat from '../pages/startChat.vue'

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: mainPage
  },
  {
    path: '/createReport',
    name: 'createReport',
    component: createReport
  },
  {
    path: '/preparation',
    name: 'preparation',
    component: preparation
  },
  {
    path: '/startChat',
    name: 'startChat',
    component: startChat
  }
]

// ビルドしたときはcreateWebHashHistoryじゃないと動かないらしい
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

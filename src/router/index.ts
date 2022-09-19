import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../pages/mainPage.vue'
import createReport from '../pages/createReport.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

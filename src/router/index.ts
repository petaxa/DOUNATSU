import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../pages/mainPage.vue'
import createReport from '../pages/createReport.vue'
import preparation from '../pages/preparation.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

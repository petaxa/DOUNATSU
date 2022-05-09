import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../pages/mainPage'
import createReport from '../pages/createReport'

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

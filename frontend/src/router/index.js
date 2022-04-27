import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HomePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/UserLogin.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/UserRegister.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

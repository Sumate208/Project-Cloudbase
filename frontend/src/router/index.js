import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/user/checkout',
    name: 'checkout',
    component: () => import('../views/CheckOut.vue')
  },
  {
    path: '/product/detail/:id',
    name: 'detail',
    component: () => import('../views/Product/DetailProduct.vue')
  },
  {
    path: '/product/create',
    name: 'add-product',
    component: () => import('../views/Product/AddProduct.vue')
  },
  {
    path: '/product/update/:id',
    name: 'update-product',
    component: () => import('../views/Product/UpdateProduct.vue')
  },
]

const router = new VueRouter({ routes })

export default router

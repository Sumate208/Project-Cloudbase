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
    path: '/products/detail/:id',
    name: 'detail',
    component: () => import('../views/products/DetailBlog.vue')
  },
  {
    path: '/products/create',
    name: 'create-blog',
    meta: { login: true },
    component: () => import('../views/products/CreateBlog.vue')
  },
  {
    path: '/products/update/:id',
    name: 'update-blog',
    meta: { login: true },
    component: () => import('../views/products/UpdateBlog.vue')
  },
  {
    path: '/user/signup',
    name: 'signup',
    meta: { guess: true },
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    meta: { guess: true },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user/cart/',
    name: 'cart',
    meta: { login: true },
    component: () => import('../views/Cart.vue')
  },
  
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/user/login' })
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in")
    next({ path: '/'})
  }

  next()
})

export default router

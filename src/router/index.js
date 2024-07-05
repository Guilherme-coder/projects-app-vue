import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.isLoggedIn) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (userStore.isLoggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

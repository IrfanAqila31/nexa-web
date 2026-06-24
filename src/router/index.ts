import { createRouter, createWebHistory } from 'vue-router'

import SaasLayout from '../layouts/SaasLayout.vue'
import LoginView from '../views/LoginView.vue'

import DashboardLayout from '../layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: SaasLayout,

      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView,
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/RegisterView.vue'),
        },
      ],
    },
    // Rute Dashboard
    {
      path: '/dashboard',
      component: SaasLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
      ],
    },
    {
      path: '/ai',
      component: SaasLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'ai-caption',
          component: () => import('../views/AiCaptionView.vue'),
        },
      ],
    },
  ],
})
// --- SATPAM ROUTER (Navigation Guard) ---
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')

  // 1. Jika rute butuh login (requiresAuth) TAPI token tidak ada
  if (to.meta.requiresAuth && !token) {
    next('/login') // Tendang ke halaman login
  }
  // 2. Jika sudah login (ada token) TAPI mencoba buka halaman login/register
  else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/dashboard') // Arahkan kembali ke dashboard
  }
  // 3. Jika aman, persilakan lewat
  else {
    next()
  }
})

export default router

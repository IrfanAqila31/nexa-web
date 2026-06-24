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

export default router

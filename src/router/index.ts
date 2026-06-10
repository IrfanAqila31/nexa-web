import { createRouter, createWebHistory } from 'vue-router'

import SaasLayout from '../layouts/SaasLayout.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: SaasLayout,

      children: [
        {
          path: '',
          redirect: '/login',
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView,
        },
      ],
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise((resolve) => {
        let attempts = 0
        const maxAttempts = 30
        const interval = 50

        const poll = () => {
          try {
            const el = document.querySelector(to.hash)
            if (el) {
              resolve({
                el: to.hash,
                behavior: 'smooth',
              })
              return
            }
          } catch {
            // Invalid selector fallback
          }

          if (attempts < maxAttempts) {
            attempts++
            setTimeout(poll, interval)
          } else {
            resolve({ top: 0 })
          }
        }

        setTimeout(poll, 20)
      })
    }
    return { top: 0 }
  },
})

export default router

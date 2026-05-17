/**
 * index.js
 * @summary VueRouter configuration with routes for all bounded contexts.
 * @author Student Developer
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../maintenance/presentation/views/home-view.vue')
  },
  {
    path: '/support',
    children: [
      {
        path: 'issues/new',
        name: 'new-issue',
        component: () => import('../support/presentation/views/new-issue-view.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../shared/presentation/views/not-found-view.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

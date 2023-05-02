import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/phonetic',
      name: 'phonetic',
      component: () => import('../views/PhoneticExerciseView.vue')
    },
    {
      path: '/semantic',
      name: 'semantic',
      component: () => import('../views/SemanticExerciseView.vue')
    },
    {
      path: '/association',
      name: 'association',
      component: () => import('../views/AssociationExerciseView.vue')
    },
    {
      path: '/commonality',
      name: 'commonality',
      component: () => import('../views/CommonalityExerciseView.vue')
    }
  ]
})

export default router

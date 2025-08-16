import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Template1 from '../components/Template1.vue'

export const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/template1/:id', component: Template1, props: true },
  ],
})

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Manage from '@/views/Manage.vue'

const routes=[
  {
    name:'home',
    path:"/",
    component:Home,
  },
  {
    name:'about',
    path:"/about",
    component:About,
  },
  {
    name:'manage',
    path:"/manage",
    component:Manage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass:'text-yellow-500',
})

export default router

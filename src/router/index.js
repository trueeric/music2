import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from "@/views/About.vue"
import Manage from '@/views/Manage.vue'
import useUserStore from "@/stores/user"

const routes=[
  {
    name:'home',
    path:"/",
    component:Home,
  },
  {
    name:'about',
    path:'/about',
    component:About,
  },
  {
    name:'manage',
    // // 用alias 取代下方的redirect
    // alias:'/manage',
    path:'/manage-music',
    component:Manage,
    beforeEnter:(to, from ,next)=>{
      console.log('Manage Route Guard')
      next()
    },
    meta:{
      requiresAuth:true,
    }
  },
  {
    path:'/manage',
    redirect:{name:'manage'},
  },
  {
    // 出現找不到現存網址的內容，直接轉回首頁
    path:'/:catchAll(.*)*',
    redirect:{name:'home'},
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass:'text-yellow-500',
})

router.beforeEach((to, from, next)=>{
  console.log('index.js Global Guard');
  // console.log(to.meta);
  if(!to.meta.requiresAuth){
    next()
    return
  }
  const store=useUserStore()

  // 檢查是否登入才能進權限頁面
  if(store.userLoggedIn){
    next()
  }else{
    next({name:"home"})
  }
})

export default router

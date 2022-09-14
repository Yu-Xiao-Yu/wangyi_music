import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/item_music',
    name: 'ItemMusic',
    component: () => import(/* webpackChunkName: "itemMusic" */'../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */'../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "search" */'../views/Login.vue')
  },
  {
    path: '/info_user',
    name: 'InfoUser',
    //接口状态 时好时坏 所以注销掉
    // beforeEnter: (to, from, next) => {
    //   if (store.state.isLogin && store.state.token && localStorage.getItem('token')) {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // },
    component: () => import(/* webpackChunkName: "search" */'../views/InfoUser.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//底部组件的显示
router.beforeEach((to, from) => {
  if (to.path === '/login') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router

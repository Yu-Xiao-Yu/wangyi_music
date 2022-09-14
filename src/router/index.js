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
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin && store.state.token && localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    },
    component: () => import(/* webpackChunkName: "search" */'../views/InfoUser.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.path === '/login') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router

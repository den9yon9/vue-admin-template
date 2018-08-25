import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/login',
    component: Login
  }]
})


router.beforeEach((to, from, next) => {
  let login = localStorage.getItem('login')
  if (!login && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router

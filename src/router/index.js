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


export default router

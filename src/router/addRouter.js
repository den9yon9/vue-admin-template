// 权限管理 路由，相应的页面只给有权限的用户看
import router from './index.js'
import Home from '@/pages/Home'
import Something from '@/pages/Something'
import SomethingList from '@/pages/SomethingList'

import NotFound404 from '@/pages/NotFound404'


const home = {
  path: '/',
  redirect: '/something',
  component: Home
}

const something = {
  path: '/something',
  redirect: '/something/list',
  component: Something
}

const somethinglist = {
  path: '/something/list',
  component: SomethingList
}

const notfound404 = {
  path: '*',
  component: NotFound404
}


export default function(condition) {
  /*
    TODO: 根据condition生成路由
  */
  home.children = [something]
  something.children = [somethinglist]


  // 添加到路由需要放到最后一步
  router.addRoutes([home, notfound404])
}
